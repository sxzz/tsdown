import process from 'node:process'
import { cac } from 'cac'
import { version } from '../package.json'
import { logger } from './utils'
import type { Options } from './options'

export async function main() {
  const cli = cac('tsdown')

  cli
    .command('[...files]', 'Bundle files', {
      ignoreOptionDefaultValue: true,
    })
    .option('--clean', 'Clean output directory')
    .option('-d, --out-dir <dir>', 'Output directory', { default: 'dist' })
    .action(async (input: string[], flags: Options) => {
      logger.info(`tsdown v${version}`)
      const { build } = await import('./index')
      await build({
        entry: input,
        ...flags,
      })
    })

  cli.help()
  cli.version(version)
  cli.parse(process.argv, { run: false })

  await cli.runMatchedCommand()
}
