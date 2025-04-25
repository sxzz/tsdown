import process from 'node:process'
import { consola, type ConsolaInstance } from 'consola'

/**
 * Logger instance
 */
export const logger: ConsolaInstance = consola.withTag('tsdown')

export function setSilent(silent: boolean): void {
  if (!('CONSOLA_LEVEL' in process.env)) {
    logger.level = silent
      ? 0 // Fatal and Error
      : 3 // Informational logs, success, fail, ready, start, ...
  }
}
