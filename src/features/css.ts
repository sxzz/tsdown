import type { InputOption } from 'rolldown'

export function hasCSSInput(input: InputOption): boolean {
  if (typeof input === 'string') {
    return /\.css$/i.test(input)
  }
  if (Array.isArray(input)) {
    return input.some(hasCSSInput)
  }
  if (input && typeof input === 'object') {
    return Object.values(input).some(hasCSSInput)
  }
  return false
}
