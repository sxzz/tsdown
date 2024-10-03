import process from 'node:process'
import { debounce, toArray } from '../utils/general'
import { logger } from '../utils/logger'
import type { ResolvedOptions } from '../options'
import type { FSWatcher } from 'chokidar'

// TODO watch config files
export async function watchBuild(
  options: ResolvedOptions,
  rebuild: () => void,
): Promise<FSWatcher> {
  const { watch } = await import('chokidar')
  const debouncedRebuild = debounce(rebuild, 100)

  const files =
    typeof options.watch === 'boolean' ? process.cwd() : options.watch
  logger.info(`Watching for changes in ${toArray(files).join(', ')}`)

  const watcher = watch(files, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored: (id) => {
      if (id.includes('/.git/') || id.includes('/node_modules/')) return true
      return id.startsWith(options.outDir)
    },
  })

  watcher.on('all', (type, file) => {
    logger.info(`Change detected: ${type} ${file}`)
    debouncedRebuild()
  })

  return watcher
}
