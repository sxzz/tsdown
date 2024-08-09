import path from 'node:path'
import process from 'node:process'
import { debounce, toArray } from '../utils/general'
import { logger } from '../utils/logger'
import type { ResolvedOptions } from '../options'

// TODO watch config files
export async function watchBuild(
  options: ResolvedOptions,
  rebuild: () => void,
): Promise<void> {
  const { watch } = await import('chokidar')
  const debouncedRebuild = debounce(rebuild, 100)

  const files =
    typeof options.watch === 'boolean' ? process.cwd() : options.watch
  const ignored = ['**/{.git,node_modules}/**', path.resolve(options.outDir)]
  logger.info(`Watching for changes in ${toArray(files).join(', ')}`)

  const watcher = watch(files, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored,
  })

  watcher.on('all', (type, file) => {
    logger.info(`Change detected: ${type} ${file}`)
    debouncedRebuild()
  })
}
