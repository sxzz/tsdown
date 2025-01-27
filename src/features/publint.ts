import process from 'node:process'
import { publint as _publint } from 'publint'
import { formatMessage } from 'publint/utils'
import { logger } from '../utils/logger'
import type { PackageJson } from 'pkg-types'

export async function publint(pkg: PackageJson): Promise<void> {
  const { messages } = await _publint()
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
    process.exitCode = 1
  }
}
