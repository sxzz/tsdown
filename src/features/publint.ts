import process from 'node:process'
import Debug from 'debug'
import { logger } from '../utils/logger'
import type { PackageJson } from 'pkg-types'
import type { Options } from 'publint'

const debug = Debug('tsdown:publint')

export async function publint(
  pkg: PackageJson,
  options?: Options,
): Promise<void> {
  debug('Running publint')
  const { publint } = await import('publint')
  const { formatMessage } = await import('publint/utils')
  const { messages } = await publint(options)
  debug('Found %d issues', messages.length)

  if (!messages.length) {
    logger.success('No publint issues found')
  }
  let hasError = false
  for (const message of messages) {
    hasError ||= message.type === 'error'
    const formattedMessage = formatMessage(message, pkg)
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
