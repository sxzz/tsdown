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
import { SyntaxLoweringPlugin } from './plugins'
import { debug, logger } from './utils/logger'
import { readPackageJson } from './utils/package'

/**
 * Build with tsdown.
 */
export async function build(
  userOptions: Omit<Options, 'silent'> = {},
): Promise<void> {
  debug('Loading config')
  const [resolveds, configFile] = await resolveOptions(userOptions)
  if (configFile) debug('Loaded config:', configFile)
  else debug('No config file found')

  const contexts = await Promise.all(resolveds.map(buildSingle))
  const cleanCbs: (() => Promise<void>)[] = []

  for (const [i, resolved] of resolveds.entries()) {
    const context = contexts[i]
    if (!context) continue

    const watcher = await watchBuild(resolved, context.rebuild)
    cleanCbs.push(async () => {
      await watcher.close()
      await contexts[i]!.close()
    })
  }

  if (cleanCbs.length) {
    shortcuts(async () => {
      for (const clean of cleanCbs) {
        await clean()
      }
      build(userOptions)
    })
  }
}

/**
 * Build a single configuration, without watch and shortcuts features.
 *
 * @param resolved Resolved options
 */
export async function buildSingle(resolved: ResolvedOptions): Promise<
  | {
      rebuild: () => Promise<void>
      close: () => Promise<void>
    }
  | undefined
> {
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
    target,
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
      pkg && ExternalPlugin(pkg, resolved.skipNodeModulesBundle),
      unused && Unused.rolldown(unused === true ? {} : unused),
      dts && IsolatedDecl.rolldown(dts === true ? {} : dts),
      target && SyntaxLoweringPlugin(target),
      plugins,
    ].filter((plugin) => !!plugin),
    ...resolved.inputOptions,
  }
  const build = await rolldown(inputOptions)
  const outputOptions: OutputOptions[] = await Promise.all(
    format.map(async (format): Promise<OutputOptions> => {
      const extension = resolveOutputExtension(pkg, format)
      const outputOptions: OutputOptions = {
        format,
        name: resolved.globalName,
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
    return {
      rebuild: writeBundle,
      close: () => build.close(),
    }
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
