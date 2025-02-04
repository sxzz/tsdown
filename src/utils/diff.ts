import { diffLines } from 'diff'
import pc from 'picocolors'

export function diff(original: string, updated: string): string {
  let text = ''
  const diff = diffLines(original, updated, {
    ignoreWhitespace: true,
    ignoreNewlineAtEof: true,
  })
  for (const line of diff) {
    const { value } = line
    text += line.added
      ? pc.green(value)
      : line.removed
        ? pc.red(value)
        : pc.gray(line.value)
  }
  return text
}
