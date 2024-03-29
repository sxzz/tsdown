import { rolldown } from '@rolldown/node'
import { type Options, normalizeOptions } from './options'
import { logger, removeFiles } from './utils'

export async function build(userOptions: Options = {}) {
  const { entry, external, plugins, outDir, format, clean } =
    await normalizeOptions(userOptions)

  if (clean) {
    await removeFiles(['**/*', ...clean], outDir)
    logger.info('Cleaning output folder')
  }

  const build = await rolldown({
    input: entry,
    external,
    plugins,
  })

  await Promise.all(
    format.map((format) =>
      build.write({
        format,
        dir: outDir,
      }),
    ),
  )

  logger.info('Build complete')
}

export function defineConfig(options: Options) {
  return options
}
