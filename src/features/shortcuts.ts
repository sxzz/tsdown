import process from 'node:process'
import readline from 'node:readline'
import pc from 'picocolors'
import { logger } from '../utils/logger'
import type { FSWatcher } from 'chokidar'

export interface Shortcut {
  key: string
  description: string
  action: () => void | Promise<void>
}

export function shortcuts(watcher: FSWatcher, rebuild: () => void): void {
  let actionRunning = false
  async function onInput(input: string) {
    if (actionRunning) return
    const SHORTCUTS: Shortcut[] = [
      {
        key: 'r',
        description: 'rebuild',
        action() {
          rebuild()
        },
      },
      {
        key: 'c',
        description: 'clear console',
        action() {
          // eslint-disable-next-line no-console
          console.clear()
        },
      },
      {
        key: 'q',
        description: 'quit',
        action() {
          rl.close()
          return watcher.close()
        },
      },
    ]

    if (input === 'h') {
      const loggedKeys = new Set<string>()
      logger.info('  Shortcuts')

      for (const shortcut of SHORTCUTS) {
        if (loggedKeys.has(shortcut.key)) continue
        loggedKeys.add(shortcut.key)

        if (shortcut.action == null) continue

        logger.info(
          pc.dim('  press ') +
            pc.bold(`${shortcut.key} + enter`) +
            pc.dim(` to ${shortcut.description}`),
        )
      }

      return
    }

    const shortcut = SHORTCUTS.find((shortcut) => shortcut.key === input)
    if (!shortcut) return

    actionRunning = true
    await shortcut.action()
    actionRunning = false
  }

  const rl = readline.createInterface({
    input: process.stdin,
  })
  rl.on('line', onInput)
}
