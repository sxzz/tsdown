import { gray, green, red } from 'ansis'
import { diffLines } from 'diff'

export function diff(original: string, updated: string): string {
  let text = ''
  const diff = diffLines(original, updated, {
    ignoreWhitespace: true,
    ignoreNewlineAtEof: true,
  })
  for (const line of diff) {
    const { value } = line
    text += line.added
      ? green(value)
      : line.removed
        ? red(value)
        : gray(line.value)
  }
  return text
}
