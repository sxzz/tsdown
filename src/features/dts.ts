import path from 'node:path'
import process from 'node:process'
import { ResolverFactory } from 'oxc-resolver'
import { rollup } from 'rollup'
import DtsPlugin from 'rollup-plugin-dts'
import { fsExists, fsRemove } from '../utils/fs'
import { typeAsserts } from '../utils/general'
import type { NormalizedFormat, ResolvedOptions } from '../options'
import { ExternalPlugin } from './external'
import type { OutputExtension } from './output'
import type { PackageJson } from 'pkg-types'
import type { Options as IsolatedDeclOptions } from 'unplugin-isolated-decl'

const TEMP_DTS_DIR = '.tsdown-types'

export function getTempDtsDir(format: NormalizedFormat) {
  return `${TEMP_DTS_DIR}-${format}`
}

let resolver: ResolverFactory | undefined

export async function bundleDts(
  options: ResolvedOptions,
  jsExtension: OutputExtension,
  format: NormalizedFormat,
  pkg?: PackageJson,
): Promise<void> {
  typeAsserts<IsolatedDeclOptions>(options.dts)

  const ext = jsExtension.replace('j', 't')
  const dtsOutDir = path.resolve(options.outDir, getTempDtsDir(format))
  const dtsEntry = Object.fromEntries(
    Object.keys(options.entry).map((key) => [
      key,
      path.resolve(dtsOutDir, `${key}.d.${ext}`),
    ]),
  )
  resolver ||= new ResolverFactory({
    mainFields: ['types'],
    conditionNames: ['types', 'typings', 'import', 'require'],
    extensions: ['.d.ts', '.ts'],
    modules: ['node_modules', 'node_modules/@types'],
  })
  const build = await rollup({
    input: dtsEntry,
    external: options.external,
    onLog(level, log, defaultHandler) {
      if (log.code !== 'EMPTY_BUNDLE' && log.code !== 'UNRESOLVED_IMPORT') {
        defaultHandler(level, log)
      }
    },
    plugins: [
      ExternalPlugin(options, pkg) as any,
      {
        name: 'resolve-dts',
        async resolveId(id, importer) {
          if (id[0] === '.' || path.isAbsolute(id)) return
          if (/\0/.test(id)) return

          const directory = importer ? path.dirname(importer) : process.cwd()
          const { path: resolved } = await resolver!.async(directory, id)
          if (!resolved) return

          // try to resolve same-name d.ts
          if (/[cm]?jsx?$/.test(resolved)) {
            const dts = resolved.replace(/\.([cm]?)jsx?$/, '.d.$1ts')
            return (await fsExists(dts)) ? dts : undefined
          }

          return resolved
        },
      },
      DtsPlugin(),
    ],
  })

  let outDir = options.outDir
  const extraOutdir = options.dts.extraOutdir
  if (extraOutdir) {
    outDir = path.resolve(outDir, extraOutdir)
  }

  await build.write({
    dir: outDir,
    format: 'es',
    entryFileNames: `[name].d.${ext}`,
  })
  await fsRemove(dtsOutDir)
}
