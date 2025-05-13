export function formatBytes(bytes: number): string | undefined {
  if (bytes === Infinity) return undefined
  const numberFormatter = new Intl.NumberFormat('en', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  return `${numberFormatter.format(bytes / 1000)} kB`
}
