import path from 'node:path'
import process from 'node:process'
import Debug from 'debug'
import { ResolverFactory } from 'oxc-resolver'
import { build, type Plugin } from 'rolldown'
import { dts as DtsPlugin } from 'rolldown-plugin-dts'
import { fsExists, fsRemove } from '../utils/fs'
import { typeAsserts } from '../utils/general'
import type {
  BundleDtsOptions,
  NormalizedFormat,
  ResolvedOptions,
} from '../options'
import type { OutputExtension } from './output'
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
): Promise<void> {
  debug('Bundle dts for %s', format)
  const { dts, bundleDts } = options
  typeAsserts<IsolatedDeclOptions>(dts)
  typeAsserts<BundleDtsOptions>(bundleDts)

  const ext = jsExtension.replace('j', 't')
  const dtsOutDir = path.resolve(options.outDir, getTempDtsDir(format))
  const dtsEntry = Object.fromEntries(
    Object.keys(options.entry).map((key) => [
      key,
      path.resolve(dtsOutDir, `${key}.d.${ext}`),
    ]),
  )

  let outDir = options.outDir
  if (dts.extraOutdir) {
    outDir = path.resolve(outDir, dts.extraOutdir)
  }

  await build({
    input: dtsEntry,
    onLog(level, log, defaultHandler) {
      if (log.code !== 'EMPTY_BUNDLE' && log.code !== 'UNRESOLVED_IMPORT') {
        defaultHandler(level, log)
      }
    },
    plugins: [
      bundleDts.resolve &&
        ResolveDtsPlugin(
          bundleDts.resolve !== true ? bundleDts.resolve : undefined,
        ),
      DtsPlugin(),
    ],
    output: {
      dir: outDir,
      entryFileNames: `[name].d.${ext}`,
      chunkFileNames: `[name]-[hash].d.${ext}`,
    },
  })

  await fsRemove(dtsOutDir)

  debug('Bundle dts done for %s', format)
}

let resolver: ResolverFactory | undefined
export function ResolveDtsPlugin(resolveOnly?: Array<string | RegExp>): Plugin {
  return {
    name: 'resolve-dts',
    buildStart() {
      resolver ||= new ResolverFactory({
        mainFields: ['types'],
        conditionNames: ['types', 'typings', 'import', 'require'],
        extensions: ['.d.ts', '.d.mts', '.d.cts', '.ts', '.mts', '.cts'],
        modules: ['node_modules', 'node_modules/@types'],
      })
    },
    async resolveId(id, importer) {
      if (id[0] === '.' || path.isAbsolute(id)) return
      if (/\0/.test(id)) return

      if (resolveOnly) {
        const shouldResolve = resolveOnly.some((value) => {
          if (typeof value === 'string') return value === id
          return value.test(id)
        })
        if (!shouldResolve) {
          debug('skipped by matching resolveOnly: %s', id)
          return
        }
      }

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
