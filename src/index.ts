import process from 'node:process'
import { rolldown, type InputOptions, type OutputOptions } from 'rolldown'
import { IsolatedDecl } from 'unplugin-isolated-decl'
import { Unused } from 'unplugin-unused'
import { cleanOutDir } from './features/clean'
import { ExternalPlugin } from './features/external'
import { resolveOutputExtension } from './features/output'
import { shortcuts } from './features/shortcuts'
import { watchBuild } from './features/watch'
import {
  resolveOptions,
  type Config,
  type Options,
  type ResolvedOptions,
} from './options'
import { logger } from './utils/logger'
import { readPackageJson } from './utils/package'

/**
 * Build with tsdown.
 */
export async function build(
  userOptions: Omit<Options, 'silent'> = {},
): Promise<void> {
  const resolved = await resolveOptions(userOptions)
  await Promise.all(resolved.map(buildSingle))
}

/**
 * Build a single configuration.
 *
 * @param resolved Resolved options
 */
export async function buildSingle(resolved: ResolvedOptions): Promise<void> {
  const {
    entry,
    external,
    plugins,
    outDir,
    format,
    clean,
    platform,
    alias,
    treeshake,
    sourcemap,
    dts,
    minify,
    watch,
    unused,
    onSuccess,
  } = resolved

  if (clean) await cleanOutDir(outDir, clean)

  const pkg = await readPackageJson(process.cwd())
  let startTime = performance.now()
  const inputOptions: InputOptions = {
    input: entry,
    external,
    resolve: { alias },
    treeshake,
    platform,
    plugins: [
      pkg && ExternalPlugin(pkg),
      dts && IsolatedDecl.rolldown(dts === true ? {} : dts),
      unused && Unused.rolldown(unused === true ? {} : unused),
      ...plugins,
    ].filter((plugin) => !!plugin),
    ...resolved.inputOptions,
  }
  const build = await rolldown(inputOptions)
  const outputOptions: OutputOptions[] = await Promise.all(
    format.map(async (format): Promise<OutputOptions> => {
      const extension = resolveOutputExtension(pkg, format)
      const outputOptions: OutputOptions = {
        format,
        sourcemap,
        dir: outDir,
        minify,
        entryFileNames: `[name].${extension}`,
        chunkFileNames: `[name]-[hash].${extension}`,
      }
      const userOutputOptions =
        typeof resolved.outputOptions === 'function'
          ? await resolved.outputOptions(outputOptions, format)
          : resolved.outputOptions
      return { ...outputOptions, ...userOutputOptions }
    }),
  )

  await writeBundle(true)

  if (watch) {
    const watcher = await watchBuild(resolved, writeBundle)
    shortcuts(watcher, writeBundle)
  } else {
    await build.close()
  }

  async function writeBundle(first?: boolean) {
    if (!first) startTime = performance.now()
    await Promise.all(
      outputOptions.map((outputOptions) => build.write(outputOptions)),
    )
    logger.success(
      `${first ? 'Build' : 'Rebuild'} complete in ${Math.round(
        performance.now() - startTime,
      )}ms`,
    )
    await onSuccess?.()
  }
}

/**
 * Defines the configuration for tsdown.
 */
export function defineConfig(options: Config): Config {
  return options
}

export { logger }
export type { Config, Options }
