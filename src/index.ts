import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { build as rolldownBuild, type OutputOptions } from 'rolldown'
import { transformPlugin } from 'rolldown/experimental'
import { cleanOutDir } from './features/clean'
import { bundleDts, getTempDtsDir } from './features/dts'
import { ExternalPlugin } from './features/external'
import { resolveOutputExtension } from './features/output'
import { publint } from './features/publint'
import { getShimsInject } from './features/shims'
import { shortcuts } from './features/shortcuts'
import { watchBuild } from './features/watch'
import {
  mergeUserOptions,
  resolveOptions,
  type Options,
  type ResolvedOptions,
  type UserConfig,
} from './options'
import { debug, logger, setSilent } from './utils/logger'
import { readPackageJson } from './utils/package'

/**
 * Build with tsdown.
 */
export async function build(userOptions: Options = {}): Promise<void> {
  if (typeof userOptions.silent === 'boolean') {
    setSilent(userOptions.silent)
  }

  debug('Loading config')
  const { configs, file: configFile } = await resolveOptions(userOptions)
  if (configFile) debug('Loaded config:', configFile)
  else debug('No config file found')

  const rebuilds = await Promise.all(configs.map(buildSingle))
  const cleanCbs: (() => Promise<void>)[] = []

  for (const [i, config] of configs.entries()) {
    const rebuild = rebuilds[i]
    if (!rebuild) continue

    const watcher = await watchBuild(config, configFile, rebuild, restart)
    cleanCbs.push(() => watcher.close())
  }

  if (cleanCbs.length) {
    shortcuts(restart)
  }

  async function restart() {
    for (const clean of cleanCbs) {
      await clean()
    }
    build(userOptions)
  }
}

const dirname = path.dirname(fileURLToPath(import.meta.url))
export const pkgRoot: string = path.resolve(dirname, '..')

/**
 * Build a single configuration, without watch and shortcuts features.
 *
 * @param config Resolved options
 */
export async function buildSingle(
  config: ResolvedOptions,
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
    shims,
    fixedExtension,
    onSuccess,
  } = config

  if (clean) await cleanOutDir(outDir, clean)

  const pkg = await readPackageJson(process.cwd())

  await rebuild(true)
  if (watch) {
    return () => rebuild()
  }

  async function rebuild(first?: boolean) {
    const startTime = performance.now()
    await Promise.all(
      format.map(async (format) => {
        const inputOptions = await mergeUserOptions(
          {
            input: entry,
            external,
            resolve: { alias },
            treeshake,
            platform,
            define,
            plugins: [
              (pkg || config.skipNodeModulesBundle) &&
                ExternalPlugin(config, pkg),
              unused &&
                (await import('unplugin-unused')).Unused.rolldown(
                  unused === true ? {} : unused,
                ),
              dts &&
                (await import('unplugin-isolated-decl')).IsolatedDecl.rolldown({
                  ...dts,
                  extraOutdir: config.bundleDts
                    ? getTempDtsDir(format)
                    : dts.extraOutdir,
                }),
              !!target &&
                transformPlugin({
                  target:
                    target &&
                    (typeof target === 'string' ? target : target.join(',')),
                }),

              userPlugins,
            ],
            inject: {
              ...(shims && getShimsInject(format, platform)),
            },
          },
          config.inputOptions,
          [format],
        )

        const extension = resolveOutputExtension(pkg, format, fixedExtension)
        const outputOptions: OutputOptions = await mergeUserOptions(
          {
            format,
            name: config.globalName,
            sourcemap,
            dir: outDir,
            minify,
            entryFileNames: `[name].${extension}`,
            chunkFileNames: `[name]-[hash].${extension}`,
          },
          config.outputOptions,
          [format],
        )

        await rolldownBuild({
          ...inputOptions,
          output: outputOptions,
        })

        if (config.dts && config.bundleDts) {
          await bundleDts(config, extension, format, pkg)
        }
      }),
    )

    if (config.publint) {
      if (pkg) {
        await publint(pkg)
      } else {
        logger.warn('publint is enabled but package.json is not found')
      }
    }

    logger.success(
      `${first ? 'Build' : 'Rebuild'} complete in ${Math.round(
        performance.now() - startTime,
      )}ms`,
    )
    await onSuccess?.()
  }
}

export { defineConfig } from './config'
export { logger }
export type { Options, UserConfig }
