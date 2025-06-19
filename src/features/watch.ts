import { resolveComma, toArray } from '../utils/general'
import { logger, prettyName } from '../utils/logger'
import type { ResolvedOptions } from '../options'
import type { Plugin } from 'rolldown'

const endsWithConfig = /[\\/](?:package\.json|tsdown\.config.*)$/

export function WatchPlugin(
  options: ResolvedOptions,
  configFiles: string[],
  restart: () => void,
): Plugin {
  return {
    name: 'tsdown:watch',
    options: options.ignoreWatch.length
      ? (inputOptions) => {
          inputOptions.watch ||= {}
          inputOptions.watch.exclude = toArray(inputOptions.watch.exclude)
          inputOptions.watch.exclude.push(...toArray(options.ignoreWatch))
        }
      : undefined,
    buildStart() {
      for (const file of configFiles) {
        this.addWatchFile(file)
      }
      if (typeof options.watch !== 'boolean') {
        for (const file of resolveComma(toArray(options.watch))) {
          this.addWatchFile(file)
        }
      }
    },
    watchChange(id, event) {
      if (configFiles.includes(id) || endsWithConfig.test(id)) {
        logger.info(prettyName(options.name), `Reload config: ${id}`)
        restart()
      } else {
        console.info('')
        logger.info(prettyName(options.name), `File ${event.event}d: ${id}`)
      }
    },
  }
}
