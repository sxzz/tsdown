import process from 'node:process'
import { rolldown, type InputOptions, type OutputOptions } from 'rolldown'
import { IsolatedDecl } from 'unplugin-isolated-decl'
import { Unused } from 'unplugin-unused'
import { cleanOutDir } from './features/clean'
import { ExternalPlugin } from './features/external'
import { resolveOutputExtension } from './features/output'
import { watchBuild } from './features/watch'
import {
  normalizeOptions,
  type Options,
  type OptionsWithoutConfig,
} from './options'
import { logger } from './utils/logger'
import { readPackageJson } from './utils/package'

/**
 * Build with tsdown.
 */
export async function build(
  userOptions: Omit<Options, 'silent'> = {},
): Promise<void> {
  const resolved = await normalizeOptions(userOptions)
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
      ExternalPlugin(pkg, platform),
      dts && IsolatedDecl.rolldown(dts === true ? {} : dts),
      unused && Unused.rolldown(unused === true ? {} : unused),
      ...plugins,
    ].filter((plugin) => !!plugin),
    ...resolved.inputOptions,
  }
  const build = await rolldown(inputOptions)
  await writeBundle(true)

  if (watch) {
    await watchBuild(resolved, writeBundle)
  } else {
    await build.close()
  }

  async function writeBundle(first?: boolean) {
    if (!first) startTime = performance.now()
    await Promise.all(
      format.map(async (format) => {
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

        return await build.write({
          ...outputOptions,
          ...userOutputOptions,
        })
      }),
    )
    logger.success(
      `${first ? 'Build' : 'Rebuild'} complete in ${Math.round(
        performance.now() - startTime,
      )}ms`,
    )
  }
}

/**
 * Defines the configuration for tsdown.
 */
export function defineConfig(
  options: OptionsWithoutConfig,
): OptionsWithoutConfig {
  return options
}

export { logger }
export type { Options, OptionsWithoutConfig }
