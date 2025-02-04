import process from 'node:process'
import { cac } from 'cac'
import pc from 'picocolors'
import { VERSION as rolldownVersion } from 'rolldown'
import { version } from '../package.json'
import { logger, setSilent } from './utils/logger'
import type { Options } from './options'

const cli = cac('tsdown')
cli.help().version(version)

cli
  .command('[...files]', 'Bundle files', {
    ignoreOptionDefaultValue: true,
  })
  .option('-c, --config <filename>', 'Use a custom config file')
  .option('--no-config', 'Disable config file')
  .option('--format <format>', 'Bundle format: esm, cjs, iife', {
    default: 'esm',
  })
  .option('--clean', 'Clean output directory')
  .option('--minify', 'Minify output')
  .option('--target <target>', 'Bundle target, e.g "es2015", "esnext"')
  .option('--silent', 'Suppress non-error logs')
  .option('-d, --out-dir <dir>', 'Output directory', { default: 'dist' })
  .option('--treeshake', 'Tree-shake bundle', { default: true })
  .option('--sourcemap', 'Generate source map', { default: false })
  .option('--shims', 'Enable cjs and esm shims ', { default: false })
  .option('--platform <platform>', 'Target platform', {
    default: 'node',
  })
  .option('-w, --watch [path]', 'Watch mode')
  .action(async (input: string[], flags: Options) => {
    setSilent(!!flags.silent)
    logger.info(
      `tsdown ${pc.dim(`v${version}`)} powered by rolldown ${pc.dim(`v${rolldownVersion}`)}`,
    )
    const { build } = await import('./index')
    if (input.length > 0) flags.entry = input
    await build(flags)
  })

cli
  .command('migrate', 'Migrate from tsup to tsdown')
  .option('-c, --cwd <dir>', 'Working directory')
  .option('-d, --dry-run', 'Dry run')
  .action(async (args) => {
    const { migrate } = await import('./migrate')
    await migrate(args)
  })

export async function runCLI(): Promise<void> {
  cli.parse(process.argv, { run: false })

  try {
    await cli.runMatchedCommand()
  } catch (error) {
    logger.fatal(error)
    process.exit(1)
  }
}
