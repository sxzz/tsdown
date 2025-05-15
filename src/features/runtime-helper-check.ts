import { logger } from '../utils/logger'
import type { Plugin } from 'rolldown'

let hasWarned = false

export function RuntimeHelperCheckPlugin(target: string[]): Plugin {
  return {
    name: 'tsdown:runtime-helper-check',
    resolveId: {
      filter: { id: /^@oxc-project\/runtime/ },
      handler(id) {
        if (hasWarned) return { id, external: true }
        try {
          import.meta.resolve?.(id) || require.resolve(id)
        } catch {
          hasWarned = true
          const targets = target.join(', ')
          logger.warn(
            `[tsdown] Target environment (${targets}) requires runtime helpers from "@oxc-project/runtime".\n` +
              `Please install it to include all necessary polyfills \n` +
              `see https://tsdown.dev/options/target#runtime-helpers`,
          )
          return { id, external: true }
        }
      },
    },
  }
}
