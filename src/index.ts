import process from 'node:process'
import { type InputOptions, rolldown } from 'rolldown'
import {
  type Options,
  type OptionsWithoutConfig,
  normalizeOptions,
} from './options'
import { logger } from './utils/logger'
import { cleanOutDir } from './features/clean'
import { readPackageJson } from './utils/package'
import { resolveOutputExtension } from './features/output'

export async function build(userOptions: Options = {}): Promise<void> {
  const { entry, external, plugins, outDir, format, clean } =
    await normalizeOptions(userOptions)

  if (clean) await cleanOutDir(outDir, clean)

  const pkg = await readPackageJson(process.cwd())

  const inputOptions: InputOptions = {
    input: entry,
    external,
    plugins,
    resolve: {
      alias: userOptions.alias,
    },
    treeshake: userOptions.treeshake,
  }
  const build = await rolldown(inputOptions)

  await Promise.all(
    format.map((format) => {
      const extension = resolveOutputExtension(pkg, format)
      return build.write({
        format,
        dir: outDir,
        entryFileNames: `[name].${extension}`,
        chunkFileNames: `[name]-[hash].${extension}`,
      })
    }),
  )
  await build.destroy()

  logger.info('Build complete')
  process.exit(0)
}

export function defineConfig(
  options: OptionsWithoutConfig,
): OptionsWithoutConfig {
  return options
}
