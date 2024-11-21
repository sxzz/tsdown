import { consola, type ConsolaInstance } from 'consola'
import Debug from 'debug'

/**
 * Logger instance
 */
export const logger: ConsolaInstance = consola.withTag('tsdown')
export const debug: Debug.Debugger = Debug('tsdown')
