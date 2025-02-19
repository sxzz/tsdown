import process from 'node:process'
import Debug from 'debug'
import { logger } from '../utils/logger'
import type { PackageJson } from 'pkg-types'

const debug = Debug('tsdown:publint')

export async function publint(pkg: PackageJson): Promise<void> {
  const { publint } = await import('publint')
  const { formatMessage } = await import('publint/utils')

  debug('Running publint')
  const { messages } = await publint()
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
