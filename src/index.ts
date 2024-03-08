import { rolldown } from '@rolldown/node'
import { consola } from 'consola'
import { PrettyError } from './error'
import { type Options, normalizeOptions } from './options'
import { removeFiles } from './utils'

const logger = consola.withTag('tsdown')

export async function build(userOptions: Options = {}) {
  const options = normalizeOptions(userOptions)

  const { input } = options
  if (!input || Object.keys(input).length === 0) {
    throw new PrettyError(`No input files, try "tsdown <your-file>" instead`)
  }

  if (options.clean) {
    const extraPatterns = Array.isArray(options.clean) ? options.clean : []
    await removeFiles(['**/*', ...extraPatterns], options.outDir)
    logger.info('Cleaning output folder')
  }

  const build = await rolldown({
    input: options.input,
    plugins: options.plugins,
    external: options.external,
  })

  await Promise.all(
    options.format.map((format) =>
      build.write({
        format,
        dir: options.outDir,
      }),
    ),
  )

  logger.info('Build complete')
}
