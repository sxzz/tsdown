import { rm } from 'node:fs/promises'
import path from 'node:path'
import { rollup } from 'rollup'
import DtsPlugin from 'rollup-plugin-dts'
import { typeAsserts } from '../utils/general'
import type { NormalizedFormat, ResolvedOptions } from '../options'
import type { OutputExtension } from './output'
import type { Options as IsolatedDeclOptions } from 'unplugin-isolated-decl'

const TEMP_DTS_DIR = '.tsdown-types'

export function getTempDtsDir(format: NormalizedFormat) {
  return `${TEMP_DTS_DIR}-${format}`
}

export async function bundleDts(
  options: ResolvedOptions,
  jsExtension: OutputExtension,
  format: NormalizedFormat,
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
  const extraOutdir = options.dts.extraOutdir
  if (extraOutdir) {
    outDir = path.resolve(outDir, extraOutdir)
  }

  await build.write({
    dir: outDir,
    format: 'es',
    entryFileNames: `[name].d.${ext}`,
  })
  await rm(dtsOutDir, { recursive: true, force: true }).catch(() => {})
}
