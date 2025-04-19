import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import {
  build as rolldownBuild,
  type BuildOptions,
  type OutputOptions,
  type PreRenderedChunk,
  type RolldownPluginOption,
} from 'rolldown'
import { transformPlugin } from 'rolldown/experimental'
import { exec } from 'tinyexec'
import { cleanOutDir } from './features/clean'
import { ExternalPlugin } from './features/external'
import { resolveOutputExtension } from './features/output'
import { publint } from './features/publint'
import { getShimsInject } from './features/shims'
import { shortcuts } from './features/shortcuts'
import { watchBuild } from './features/watch'
import {
  mergeUserOptions,
  resolveOptions,
  type NormalizedFormat,
  type Options,
  type ResolvedOptions,
  type UserConfig,
} from './options'
import { debug, logger, setSilent } from './utils/logger'
import { getPackageType, readPackageJson } from './utils/package'
import type { PackageJson } from 'pkg-types'
import type { Options as DtsOptions } from 'rolldown-plugin-dts'

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
  const { outDir, format: formats, clean, dts, watch, onSuccess } = config
  let onSuccessCleanup: (() => any) | undefined

  const pkg = await readPackageJson(process.cwd())

  await rebuild(true)
  if (watch) {
    return () => rebuild()
  }

  async function rebuild(first?: boolean) {
    const startTime = performance.now()

    onSuccessCleanup?.()
    if (clean) await cleanOutDir(outDir, clean)

    let hasErrors = false
    await Promise.all(
      formats.map(async (format) => {
        try {
          await rolldownBuild(await getBuildOptions(config, pkg, format))
          if (format === 'cjs' && dts) {
            await rolldownBuild(
              await getBuildOptions(config, pkg, format, true),
            )
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
  pkg: PackageJson | undefined,
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
    fixedExtension,
    tsconfig,
    outExtensions,
  } = config

  const plugins: RolldownPluginOption = []
  if (pkg || config.skipNodeModulesBundle) {
    plugins.push(ExternalPlugin(config, pkg))
  }
  if (unused && !cjsDts) {
    const { Unused } = await import('unplugin-unused')
    plugins.push(Unused.rolldown(unused === true ? {} : unused))
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
  if (target && !cjsDts) {
    plugins.push(
      transformPlugin({
        target:
          target && (typeof target === 'string' ? target : target.join(',')),
        exclude: /\.d\.[cm]?ts$/,
      }),
    )
  }
  plugins.push(userPlugins)

  const inputOptions = await mergeUserOptions(
    {
      input: entry,
      external,
      resolve: {
        alias,
        tsconfigFilename: tsconfig || undefined,
      },
      treeshake,
      platform,
      define,
      plugins,
      inject: {
        ...(shims && !cjsDts && getShimsInject(format, platform)),
      },
    },
    config.inputOptions,
    [format],
  )

  const packageType = getPackageType(pkg)
  let jsExtension: string | undefined
  let dtsExtension: string | undefined
  if (outExtensions) {
    const { js, dts } = outExtensions({
      options: inputOptions,
      format,
      pkgType: packageType,
    })
    jsExtension = js
    dtsExtension = dts
  }
  jsExtension ||= `.${resolveOutputExtension(packageType, format, fixedExtension)}`

  const outputOptions: OutputOptions = await mergeUserOptions(
    {
      format: cjsDts ? 'es' : format,
      name: config.globalName,
      sourcemap,
      dir: outDir,
      minify,
      entryFileNames: createChunkFilename('[name]', jsExtension, dtsExtension),
      chunkFileNames: createChunkFilename(
        `[name]-[hash]`,
        jsExtension,
        dtsExtension,
      ),
    },
    config.outputOptions,
    [format],
  )

  return {
    ...inputOptions,
    output: outputOptions,
  }
}

function createChunkFilename(
  basename: string,
  jsExtension: string,
  dtsExtension?: string,
): string | ((chunk: PreRenderedChunk) => string) {
  if (!dtsExtension) return `${basename}${jsExtension}`
  return (chunk: PreRenderedChunk) => {
    return `${basename}${chunk.name.endsWith('.d') ? dtsExtension : jsExtension}`
  }
}

export { defineConfig } from './config'
export { logger }
export type { Options, UserConfig }
