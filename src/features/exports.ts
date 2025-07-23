import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { RE_DTS } from 'rolldown-plugin-dts/filename'
import { slash } from '../utils/general'
import type { NormalizedFormat, ResolvedOptions } from '../options'
import type { Awaitable } from '../utils/types'
import type { PackageJson } from 'pkg-types'
import type { OutputAsset, OutputChunk } from 'rolldown'

export type TsdownChunks = Partial<
  Record<NormalizedFormat, Array<OutputChunk | OutputAsset>>
>

export interface ExportsOptions {
  /**
   * Generate exports that link to source code during development.
   * - string: add as a custom condition.
   * - true: all conditions point to source files, and add dist exports to `publishConfig`.
   */
  devExports?: boolean | string

  /**
   * Exports for all files.
   */
  all?: boolean

  customExports?: (
    exports: Record<string, any>,
    context: {
      pkg: PackageJson
      chunks: TsdownChunks
      outDir: string
      isPublish: boolean
    },
  ) => Awaitable<Record<string, any>>
}

export async function writeExports(
  options: ResolvedOptions,
  chunks: TsdownChunks,
): Promise<void> {
  if (!options.exports) return

  const { outDir, pkg } = options
  if (!pkg) {
    throw new Error('`package.json` not found, cannot write exports')
  }

  const { publishExports, ...generated } = await generateExports(
    pkg,
    outDir,
    chunks,
    options.exports,
  )

  const updatedPkg = {
    ...pkg,
    ...generated,
    packageJsonPath: undefined,
  }

  if (publishExports) {
    updatedPkg.publishConfig ||= {}
    updatedPkg.publishConfig.exports = publishExports
  }

  const original = await readFile(pkg.packageJsonPath, 'utf8')
  let contents = JSON.stringify(
    updatedPkg,
    null,
    original.includes('\t') ? '\t' : 2,
  )
  if (original.endsWith('\n')) contents += '\n'
  if (contents !== original) {
    await writeFile(pkg.packageJsonPath, contents, 'utf8')
  }
}

type SubExport = Partial<Record<'cjs' | 'es' | 'src', string>>

export async function generateExports(
  pkg: PackageJson,
  outDir: string,
  chunks: TsdownChunks,
  { devExports, all, customExports }: ExportsOptions,
): Promise<{
  main: string | undefined
  module: string | undefined
  types: string | undefined
  exports: Record<string, any>
  publishExports?: Record<string, any>
}> {
  const pkgJsonPath = pkg.packageJsonPath as string
  const pkgRoot = path.dirname(pkgJsonPath)
  const outDirRelative = slash(path.relative(pkgRoot, outDir))

  let main: string | undefined,
    module: string | undefined,
    cjsTypes: string | undefined,
    esmTypes: string | undefined
  const exportsMap: Map<string, SubExport> = new Map()

  for (const [format, chunksByFormat] of Object.entries(chunks) as [
    NormalizedFormat,
    (OutputChunk | OutputAsset)[],
  ][]) {
    if (format !== 'es' && format !== 'cjs') continue

    const onlyOneEntry =
      chunksByFormat.filter(
        (chunk) =>
          chunk.type === 'chunk' &&
          chunk.isEntry &&
          !RE_DTS.test(chunk.fileName),
      ).length === 1
    for (const chunk of chunksByFormat) {
      if (chunk.type !== 'chunk' || !chunk.isEntry) continue

      const ext = path.extname(chunk.fileName)
      let name = chunk.fileName.slice(0, -ext.length)

      const isDts = name.endsWith('.d')
      if (isDts) {
        name = name.slice(0, -2)
      }
      const isIndex = onlyOneEntry || name === 'index'
      const distFile = `${outDirRelative ? `./${outDirRelative}` : '.'}/${chunk.fileName}`

      if (isIndex) {
        name = '.'
        if (format === 'cjs') {
          if (isDts) {
            cjsTypes = distFile
          } else {
            main = distFile
          }
        } else if (format === 'es') {
          if (isDts) {
            esmTypes = distFile
          } else {
            module = distFile
          }
        }
      } else {
        const isDirIndex = name.endsWith('/index')
        name = isDirIndex ? `./${name.slice(0, -6)}` : `./${name}`
      }

      let subExport = exportsMap.get(name)
      if (!subExport) {
        subExport = {}
        exportsMap.set(name, subExport)
      }

      if (!isDts) {
        subExport[format] = distFile
        if (chunk.facadeModuleId && !subExport.src) {
          subExport.src = `./${slash(path.relative(pkgRoot, chunk.facadeModuleId))}`
        }
      }
    }
  }

  const sorttedExportsMap = Array.from(exportsMap.entries()).sort(
    ([a], [b]) => {
      if (a === 'index') return -1
      return a.localeCompare(b)
    },
  )

  let exports: Record<string, any> = Object.fromEntries(
    sorttedExportsMap.map(([name, subExport]) => [
      name,
      genSubExport(devExports, subExport),
    ]),
  )
  exportMeta(exports, all)
  if (customExports) {
    exports = await customExports(exports, {
      pkg,
      outDir,
      chunks,
      isPublish: false,
    })
  }

  let publishExports: Record<string, any> | undefined
  if (devExports) {
    publishExports = Object.fromEntries(
      sorttedExportsMap.map(([name, subExport]) => [
        name,
        genSubExport(false, subExport),
      ]),
    )
    exportMeta(publishExports, all)
    if (customExports) {
      publishExports = await customExports(publishExports, {
        pkg,
        outDir,
        chunks,
        isPublish: true,
      })
    }
  }

  return {
    main: main || module || pkg.main,
    module: module || pkg.module,
    types: cjsTypes || esmTypes || pkg.types,
    exports,
    publishExports,
  }
}

function genSubExport(
  devExports: string | boolean | undefined,
  { src, es, cjs }: SubExport,
) {
  if (devExports === true) {
    return src!
  }

  let value: any
  const dualFormat = es && cjs
  if (!dualFormat && !devExports) {
    value = cjs || es
  } else {
    value = {}
    if (typeof devExports === 'string') {
      value[devExports] = src
    }
    if (es) value[dualFormat ? 'import' : 'default'] = es
    if (cjs) value[dualFormat ? 'require' : 'default'] = cjs
  }

  return value
}

function exportMeta(exports: Record<string, any>, all?: boolean) {
  if (all) {
    exports['./*'] = './*'
  } else {
    exports['./package.json'] = './package.json'
  }
}
