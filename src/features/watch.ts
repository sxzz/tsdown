import { logger } from '../utils/logger'
import type { Plugin } from 'rolldown'

const endsWithConfig = /[\\/](?:package\.json|tsdown\.config.*)$/

export function WatchPlugin(
  configFiles: string[],
  restart: () => void,
): Plugin {
  return {
    name: 'tsdown:watch',
    buildStart() {
      for (const file of configFiles) {
        this.addWatchFile(file)
      }
    },
    watchChange(id, event) {
      if (configFiles.includes(id) || endsWithConfig.test(id)) {
        logger.info(`Reload config: ${id}`)
        restart()
      } else {
        console.info('')
        logger.info(`File ${event.event}d: ${id}`)
      }
    },
  }
}
