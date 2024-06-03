import process from 'node:process'
import { cac } from 'cac'
import { version } from '../package.json'
import { logger } from './utils'
import type { Options } from './options'

export async function runCLI(): Promise<void> {
  const cli = cac('tsdown')

  cli
    .command('[...files]', 'Bundle files', {
      ignoreOptionDefaultValue: true,
    })
    .option('--config <filename>', 'Use a custom config file')
    .option('--clean', 'Clean output directory')
    .option('-d, --out-dir <dir>', 'Output directory', { default: 'dist' })
    .action(async (input: string[], flags: Options) => {
      logger.info(`tsdown v${version}`)
      const { build } = await import('./index')
      if (input.length > 0) flags.entry = input
      await build(flags)
    })

  cli.help()
  cli.version(version)
  cli.parse(process.argv, { run: false })

  await cli.runMatchedCommand()
}
