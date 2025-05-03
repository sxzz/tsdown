import process from 'node:process'
import { debounce, toArray } from '../utils/general'
import { logger } from '../utils/logger'
import type { ResolvedOptions } from '../options'
import type { FSWatcher } from 'chokidar'

const endsWithPackageJson = /[\\/]package\.json$/

export async function watchBuild(
  options: ResolvedOptions,
  configFile: string | undefined,
  rebuild: () => void,
  restart: () => void,
): Promise<FSWatcher> {
  const cwd = process.cwd()
  const files = toArray(
    typeof options.watch === 'boolean' ? cwd : options.watch,
  )
  logger.info(`Watching for changes in ${files.join(', ')}`)
  if (configFile) files.push(configFile)

  const { watch } = await import('chokidar')
  const debouncedRebuild = debounce(rebuild, 100)

  const watcher = watch(files, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored: [/[\\/]\.git[\\/]/, /[\\/]node_modules[\\/]/, options.outDir],
  })

  watcher.on('all', (type: string, file: string) => {
    if (endsWithPackageJson.test(file) || configFile === file) {
      logger.info(`Reload config: ${file}`)
      restart()
      return
    }

    logger.info(`Change detected: ${type} ${file}`)
    debouncedRebuild()
  })

  return watcher
}
