import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { RE_DTS } from 'rolldown-plugin-dts'
import type { TsdownChunks } from '..'
import type { NormalizedFormat, ResolvedOptions } from '../options'
import type { PackageJson } from 'pkg-types'
import type { OutputAsset, OutputChunk } from 'rolldown'

export async function writeExports(
  options: ResolvedOptions,
  chunks: TsdownChunks,
): Promise<void> {
  if (!options.exports) return

  const { outDir, pkg } = options
  if (!pkg) {
    throw new Error('`package.json` not found, cannot write exports')
  }

  const generated = generateExports(pkg, outDir, chunks)

  await writeFile(
    pkg.packageJsonPath,
    `${JSON.stringify(
      { ...pkg, ...generated, packageJsonPath: undefined },
      null,
      2,
    )}\n`,
  )
}

export function generateExports(
  pkg: PackageJson,
  outDir: string,
  chunks: TsdownChunks,
): {
  main: string | undefined
  module: string | undefined
  types: string | undefined
  exports: Record<string, any>
} {
  const packageJsonPath = pkg.packageJsonPath as string
  const basePath = path.relative(path.dirname(packageJsonPath), outDir)

  let main: string | undefined,
    module: string | undefined,
    cjsTypes: string | undefined,
    esmTypes: string | undefined
  const exportsMap: Map<string, Map<'cjs' | 'es', string>> = new Map()

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

      const distFile = `./${path.join(basePath, chunk.fileName)}`

      const ext = path.extname(chunk.fileName)
      let name = chunk.fileName.slice(0, -ext.length)

      const isDts = name.endsWith('.d')
      if (isDts) {
        name = name.slice(0, -2)
      }
      const isIndex = name === 'index' || onlyOneEntry

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
        name = `./${name}`
      }

      let map = exportsMap.get(name)
      if (!map) {
        map = new Map()
        exportsMap.set(name, map)
      }

      if (!isDts && !RE_DTS.test(chunk.fileName)) {
        map.set(format, distFile)
      }
    }
  }

  const exports = Object.fromEntries(
    Array.from(exportsMap.entries())
      .sort(([a], [b]) => {
        if (a === 'index') return -1
        return a.localeCompare(b)
      })
      .map(([name, map]) => {
        let value
        if (map.size === 1) {
          value = map.get('cjs') || map.get('es')
        } else {
          value = {
            import: map.get('es'),
            require: map.get('cjs'),
          }
        }
        return [name, value]
      }),
  )
  if (!exports['./package.json']) {
    exports['./package.json'] = './package.json'
  }

  return {
    main: main || module || pkg.main,
    module: module || pkg.module,
    types: cjsTypes || esmTypes || pkg.types,
    exports,
  }
}
