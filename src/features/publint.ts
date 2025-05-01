import process from 'node:process'
import Debug from 'debug'
import { logger } from '../utils/logger'
import type { ResolvedOptions } from '../options'

const debug = Debug('tsdown:publint')

export async function publint(options: ResolvedOptions): Promise<void> {
  if (!options.publint) return
  if (!options.pkg) {
    logger.warn('publint is enabled but package.json is not found')
    return
  }

  debug('Running publint')
  const { publint } = await import('publint')
  const { formatMessage } = await import('publint/utils')
  const { messages } = await publint(
    options.publint === true ? {} : options.publint,
  )
  debug('Found %d issues', messages.length)

  if (!messages.length) {
    logger.success('No publint issues found')
  }
  let hasError = false
  for (const message of messages) {
    hasError ||= message.type === 'error'
    const formattedMessage = formatMessage(message, options.pkg)
    const logType = (
      { error: 'error', warning: 'warn', suggestion: 'info' } as const
    )[message.type]
    logger[logType](formattedMessage)
  }
  if (hasError) {
    debug('Found errors, setting exit code to 1')
    process.exitCode = 1
  }
}
