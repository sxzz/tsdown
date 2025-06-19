import { debounce, resolveComma, toArray } from '../utils/general'
import { logger } from '../utils/logger'
import type { ResolvedOptions } from '../options'

const endsWithConfig = /[\\/](?:package\.json|tsdown\.config.*)$/

export async function watchBuild(
  options: ResolvedOptions,
  configFiles: string[],
  rebuild: () => void,
  restart: () => void,
): Promise<AsyncDisposable> {
  const files = resolveComma(
    toArray(typeof options.watch === 'string' ? options.watch : []),
  )
  files.push(...configFiles)
  logger.info(`Watching for changes...`)

  const { watch } = await import('chokidar')
  const debouncedRebuild = debounce(rebuild, 100)

  const watcher = watch(files, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored: [
      /[\\/]\.git[\\/]/,
      /[\\/]node_modules[\\/]/,
      ...toArray(options.ignoreWatch),
    ],
  })

  watcher.on('all', (type: string, file: string) => {
    if (configFiles.includes(file) || endsWithConfig.test(file)) {
      logger.info(`Reload config: ${file}`)
      restart()
      return
    }

    logger.info(`Change detected: ${type} ${file}`)
    debouncedRebuild()
  })

  return {
    [Symbol.asyncDispose]: () => watcher.close(),
  }
}
