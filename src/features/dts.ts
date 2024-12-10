import { rm } from 'node:fs/promises'
import path from 'node:path'
import { rollup } from 'rollup'
import DtsPlugin from 'rollup-plugin-dts'
import type { ResolvedOptions } from '../options'
import type { OutputExtension } from './output'
import type { Options as IsolatedDeclOptions } from 'unplugin-isolated-decl'

export const TEMP_DTS_DIR = '.tsdown-types'

export async function bundleDts(
  options: ResolvedOptions,
  jsExtension: OutputExtension,
): Promise<void> {
  const ext = jsExtension.replace('j', 't')
  const dtsOutDir = path.resolve(options.outDir, TEMP_DTS_DIR)
  const dtsEntry = Object.fromEntries(
    Object.keys(options.entry).map((key) => [
      key,
      path.resolve(dtsOutDir, `${key}.d.${ext}`),
    ]),
  )
  const build = await rollup({
    input: dtsEntry,
    onLog(level, log, defaultHandler) {
      if (log.code !== 'EMPTY_BUNDLE') {
        defaultHandler(level, log)
      }
    },
    plugins: [DtsPlugin()],
  })

  let outDir = options.outDir
  const extraOutdir = (options.dts as IsolatedDeclOptions).extraOutdir
  if (extraOutdir) {
    outDir = path.resolve(outDir, extraOutdir)
  }

  await build.write({
    dir: outDir,
    format: 'es',
    entryFileNames: `[name].d.${ext}`,
  })
  await rm(dtsOutDir, { recursive: true })
}
