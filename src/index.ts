import path from 'node:path'
import process from 'node:process'
import { green } from 'ansis'
import Debug from 'debug'
import {
  build as rolldownBuild,
  type BuildOptions,
  type OutputOptions,
  type RolldownPluginOption,
} from 'rolldown'
import { transformPlugin } from 'rolldown/experimental'
import { exec } from 'tinyexec'
import { cleanOutDir } from './features/clean'
import { copy } from './features/copy'
import { ExternalPlugin } from './features/external'
import { createHooks } from './features/hooks'
import { LightningCSSPlugin } from './features/lightningcss'
import { NodeProtocolPlugin } from './features/node-protocol'
import { resolveChunkFilename } from './features/output'
import { publint } from './features/publint'
import { ReportPlugin } from './features/report'
import { getShimsInject } from './features/shims'
import { shortcuts } from './features/shortcuts'
import { watchBuild } from './features/watch'
import {
  mergeUserOptions,
  resolveOptions,
  type NormalizedFormat,
  type Options,
  type ResolvedOptions,
} from './options'
import { ShebangPlugin } from './plugins'
import { logger, setSilent } from './utils/logger'
import { prettyFormat } from './utils/package'
import type { Options as DtsOptions } from 'rolldown-plugin-dts'

const debug = Debug('tsdown:main')

/**
 * Build with tsdown.
 */
export async function build(userOptions: Options = {}): Promise<void> {
  if (typeof userOptions.silent === 'boolean') {
    setSilent(userOptions.silent)
  }

  debug('Loading config')
  const { configs, file: configFile } = await resolveOptions(userOptions)
  if (configFile) {
    debug('Loaded config:', configFile)
    configs.forEach((config) => {
      debug('using resolved config: %O', config)
    })
  } else {
    debug('No config file found')
  }

  let cleanPromise: Promise<void> | undefined
  const clean = () => {
    if (cleanPromise) return cleanPromise
    return (cleanPromise = cleanOutDir(configs))
  }

  const rebuilds = await Promise.all(
    configs.map((options) => buildSingle(options, clean)),
  )
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

export const pkgRoot: string = path.resolve(import.meta.dirname, '..')

/**
 * Build a single configuration, without watch and shortcuts features.
 *
 * Internal API, not for public use
 *
 * @private
 * @param config Resolved options
 */
export async function buildSingle(
  config: ResolvedOptions,
  clean: () => Promise<void>,
): Promise<(() => Promise<void>) | undefined> {
  const { format: formats, dts, watch, onSuccess } = config
  let onSuccessCleanup: (() => any) | undefined

  const { hooks, context } = await createHooks(config)

  await rebuild(true)
  if (watch) {
    return () => rebuild()
  }

  async function rebuild(first?: boolean) {
    const startTime = performance.now()

    await hooks.callHook('build:prepare', context)
    onSuccessCleanup?.()

    await clean()

    let hasErrors = false
    await Promise.all(
      formats.map(async (format) => {
        try {
          const formatLabel = prettyFormat(format)
          logger.info(formatLabel, 'Build start')

          const buildOptions = await getBuildOptions(config, format)
          await hooks.callHook('build:before', {
            ...context,
            buildOptions,
          })
          await rolldownBuild(buildOptions)
          if (format === 'cjs' && dts) {
            await rolldownBuild(await getBuildOptions(config, format, true))
          }
        } catch (error) {
          if (watch) {
            logger.error(error)
            hasErrors = true
            return
          }
          throw error
        }
      }),
    )

    if (hasErrors) {
      return
    }

    await publint(config)
    await copy(config)

    await hooks.callHook('build:done', context)

    logger.success(
      `${first ? 'Build' : 'Rebuild'} complete in ${green(`${Math.round(performance.now() - startTime)}ms`)}`,
    )

    if (typeof onSuccess === 'string') {
      const p = exec(onSuccess, [], {
        nodeOptions: { shell: true, stdio: 'inherit' },
      })
      p.then(({ exitCode }) => {
        if (exitCode) {
          process.exitCode = exitCode
        }
      })
      onSuccessCleanup = () => p.kill('SIGTERM')
    } else {
      await onSuccess?.(config)
    }
  }
}

async function getBuildOptions(
  config: ResolvedOptions,
  format: NormalizedFormat,
  cjsDts?: boolean,
): Promise<BuildOptions> {
  const {
    entry,
    external,
    plugins: userPlugins,
    outDir,
    platform,
    alias,
    treeshake,
    sourcemap,
    dts,
    minify,
    unused,
    target,
    define,
    shims,
    tsconfig,
    cwd,
    report,
    env,
    removeNodeProtocol,
  } = config

  const plugins: RolldownPluginOption = []
  if (config.pkg || config.skipNodeModulesBundle) {
    plugins.push(ExternalPlugin(config))
  }

  if (dts) {
    const { dts: dtsPlugin } = await import('rolldown-plugin-dts')
    const options: DtsOptions = { tsconfig, ...dts }

    if (format === 'es') {
      plugins.push(dtsPlugin(options))
    } else if (cjsDts) {
      plugins.push(dtsPlugin({ ...options, emitDtsOnly: true }))
    }
  }
  if (!cjsDts) {
    if (unused) {
      const { Unused } = await import('unplugin-unused')
      plugins.push(Unused.rolldown(unused === true ? {} : unused))
    }
    if (target) {
      plugins.push(
        transformPlugin({
          include: /\.[cm]?[jt]sx?$/,
          exclude: /\.d\.[cm]?ts$/,
          transformOptions: {
            target,
          },
        }),
      )
    }
    plugins.push(ShebangPlugin(cwd))
  }

  if (report && logger.level >= 3) {
    plugins.push(ReportPlugin(report, cwd, cjsDts))
  }

  if (target) {
    plugins.push(
      // Use Lightning CSS to handle CSS input. This is a temporary solution
      // until Rolldown supports CSS syntax lowering natively.
      LightningCSSPlugin({ target }),
    )
  }

  plugins.push(userPlugins)

  if (removeNodeProtocol) {
    plugins.push(NodeProtocolPlugin())
  }

  const inputOptions = await mergeUserOptions(
    {
      input: entry,
      cwd,
      external,
      resolve: {
        alias,
        tsconfigFilename: tsconfig || undefined,
      },
      treeshake,
      platform,
      define: {
        ...define,
        ...Object.keys(env).reduce((acc, key) => {
          const value = JSON.stringify(env[key])
          acc[`process.env.${key}`] = value
          acc[`import.meta.env.${key}`] = value
          return acc
        }, Object.create(null)),
      },
      plugins,
      inject: {
        ...(shims && !cjsDts && getShimsInject(format, platform)),
      },
    },
    config.inputOptions,
    [format],
  )

  const [entryFileNames, chunkFileNames] = resolveChunkFilename(
    config,
    inputOptions,
    format,
  )
  const outputOptions: OutputOptions = await mergeUserOptions(
    {
      format: cjsDts ? 'es' : format,
      name: config.globalName,
      sourcemap,
      dir: outDir,
      minify: minify as any,
      entryFileNames,
      chunkFileNames,
    },
    config.outputOptions,
    [format],
  )

  return {
    ...inputOptions,
    output: outputOptions,
  }
}

export { defineConfig } from './config'
export type { Options, UserConfig } from './options'
export type { BuildContext, TsdownHooks } from './features/hooks'
export { logger }
