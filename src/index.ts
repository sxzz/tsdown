import process from 'node:process'
import {
  build as rolldownBuild,
  type InputOptions,
  type OutputOptions,
} from 'rolldown'
import { transformPlugin } from 'rolldown/experimental'
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

  const rebuilds = await Promise.all(resolveds.map(buildSingle))
  const cleanCbs: (() => Promise<void>)[] = []

  for (const [i, resolved] of resolveds.entries()) {
    const rebuild = rebuilds[i]
    if (!rebuild) continue

    const watcher = await watchBuild(resolved, rebuild)
    cleanCbs.push(() => watcher.close())
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
export async function buildSingle(
  resolved: ResolvedOptions,
): Promise<(() => Promise<void>) | undefined> {
  const {
    entry,
    external,
    plugins: userPlugins,
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
    define,
    onSuccess,
  } = resolved

  if (clean) await cleanOutDir(outDir, clean)

  const pkg = await readPackageJson(process.cwd())

  await rebuild(true)
  if (watch) {
    return () => rebuild()
  }

  async function rebuild(first?: boolean) {
    const startTime = performance.now()
    const plugins = [
      pkg && ExternalPlugin(pkg, resolved.skipNodeModulesBundle),
      unused && Unused.rolldown(unused === true ? {} : unused),
      dts && IsolatedDecl.rolldown(dts === true ? {} : dts),
      target &&
        transformPlugin({
          target:
            target && (typeof target === 'string' ? target : target.join(',')),
        }),
      userPlugins,
    ].filter((plugin) => !!plugin)

    await Promise.all(
      format.map(async (format) => {
        const inputOptions: InputOptions = {
          input: entry,
          external,
          resolve: { alias },
          treeshake,
          platform,
          define,
          plugins,
          ...resolved.inputOptions,
        }

        const extension = resolveOutputExtension(pkg, format)
        let outputOptions: OutputOptions = {
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
        outputOptions = { ...outputOptions, ...userOutputOptions }

        await rolldownBuild({
          ...inputOptions,
          output: outputOptions,
        })
      }),
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
