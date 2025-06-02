export function formatBytes(bytes: number): string | undefined {
  if (bytes === Infinity) return undefined
  return `${(bytes / 1000).toFixed(2)} kB`
}
