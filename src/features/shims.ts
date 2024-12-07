import path from 'node:path'
import { assetsDir } from '../index'
import type { NormalizedFormat, ResolvedOptions } from '../options'

export function getShimsInject(
  format: NormalizedFormat,
  platform: ResolvedOptions['platform'],
): Record<string, [string, string]> | undefined {
  if (format === 'es' && platform === 'node') {
    const shimFile = path.resolve(assetsDir, 'esm-shims.js')
    return {
      __dirname: [shimFile, '__dirname'],
      __filename: [shimFile, '__filename'],
    }
  }
}
