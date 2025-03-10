import path from 'node:path'
import process from 'node:process'
import Debug from 'debug'
import { ResolverFactory } from 'oxc-resolver'
import { rollup, type Plugin } from 'rollup'
import DtsPlugin from 'rollup-plugin-dts'
import { fsExists, fsRemove } from '../utils/fs'
import { typeAsserts } from '../utils/general'
import type {
  BundleDtsOptions,
  NormalizedFormat,
  ResolvedOptions,
} from '../options'
import { ExternalPlugin } from './external'
import type { OutputExtension } from './output'
import type { PackageJson } from 'pkg-types'
import type { ScriptTarget } from 'typescript'
import type { Options as IsolatedDeclOptions } from 'unplugin-isolated-decl'

const debug = Debug('tsdown:dts')
const TEMP_DTS_DIR = '.tsdown-types'

export function getTempDtsDir(format: NormalizedFormat) {
  return `${TEMP_DTS_DIR}-${format}`
}

export async function bundleDts(
  options: ResolvedOptions,
  jsExtension: OutputExtension,
  format: NormalizedFormat,
  pkg?: PackageJson,
): Promise<void> {
  typeAsserts<IsolatedDeclOptions>(options.dts)
  typeAsserts<BundleDtsOptions>(options.bundleDts)

  const ext = jsExtension.replace('j', 't')
  const dtsOutDir = path.resolve(options.outDir, getTempDtsDir(format))
  const dtsEntry = Object.fromEntries(
    Object.keys(options.entry).map((key) => [
      key,
      path.resolve(dtsOutDir, `${key}.d.${ext}`),
    ]),
  )
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
      options.bundleDts.resolve && ResolveDtsPlugin(),
      DtsPlugin({
        compilerOptions: {
          ...options.bundleDts.compilerOptions,
          declaration: true,
          noEmit: false,
          emitDeclarationOnly: true,
          noEmitOnError: true,
          checkJs: false,
          declarationMap: false,
          skipLibCheck: true,
          preserveSymlinks: false,
          target: 99 satisfies ScriptTarget.ESNext,
        },
      }),
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

let resolver: ResolverFactory | undefined
export function ResolveDtsPlugin(): Plugin {
  return {
    name: 'resolve-dts',
    buildStart() {
      resolver ||= new ResolverFactory({
        mainFields: ['types'],
        conditionNames: ['types', 'typings', 'import', 'require'],
        extensions: ['.d.ts', '.ts'],
        modules: ['node_modules', 'node_modules/@types'],
      })
    },
    async resolveId(id, importer) {
      if (id[0] === '.' || path.isAbsolute(id)) return
      if (/\0/.test(id)) return

      const directory = importer ? path.dirname(importer) : process.cwd()
      debug('Resolving:', id, 'from:', directory)
      const { path: resolved } = await resolver!.async(directory, id)
      if (!resolved) return
      debug('Resolved:', resolved)

      // try to resolve same-name d.ts
      if (/[cm]?jsx?$/.test(resolved)) {
        const dts = resolved.replace(/\.([cm]?)jsx?$/, '.d.$1ts')
        return (await fsExists(dts)) ? dts : undefined
      }

      return resolved
    },
  }
}
