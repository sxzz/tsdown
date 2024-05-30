// @ts-expect-error missing type
import { type InputOptions, rolldown } from 'rolldown'
import { type Options, normalizeOptions, resolveFormat } from './options'
import { logger, removeFiles } from './utils'

export async function build(userOptions: Options = {}): Promise<void> {
  const { entry, external, plugins, outDir, format, clean } =
    await normalizeOptions(userOptions)

  if (clean) {
    await removeFiles(['**/*', ...clean], outDir)
    logger.info('Cleaning output folder')
  }

  const inputOptions: InputOptions = {
    input: entry,
    external,
    plugins,
  }
  const build = await rolldown(inputOptions)

  await Promise.all(
    format.map((format) =>
      build.write({
        format: resolveFormat(format),
        dir: outDir,
      }),
    ),
  )
  await build.destroy()

  logger.info('Build complete')
}

export function defineConfig(options: Options): Options {
  return options
}
