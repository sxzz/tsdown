import { shimFile } from '../index'
import type { NormalizedFormat, ResolvedOptions } from '../options'

export function getShimsInject(
  format: NormalizedFormat,
  platform: ResolvedOptions['platform'],
): Record<string, [string, string]> | undefined {
  if (format === 'es' && platform === 'node') {
    return {
      __dirname: [shimFile, '__dirname'],
      __filename: [shimFile, '__filename'],
    }
  }
}
