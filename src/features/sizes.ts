import fs from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'
import { formatBytes } from '../utils/format'
import { logger } from '../utils/logger'

export async function getSizes(outDir: string): Promise<void> {
  try {
    const files = await fs.readdir(outDir)
    const totalSize: { size: number; gzip: number } = { size: 0, gzip: 0 }

    for (const file of files) {
      if (
        file.endsWith('.d.ts') ||
        file.endsWith('.d.mts') ||
        file.endsWith('.d.cts')
      ) {
        logger.info(`type: ${file}`)
        continue
      }

      const filePath = path.join(outDir, file)
      const stats = await fs.stat(filePath)
      const fileSizeFormat = formatBytes(stats.size)

      const content = await fs.readFile(filePath)
      const gzipSize = gzipSync(content).length
      const fileGzipSizeFormat = formatBytes(gzipSize)

      totalSize.size += stats.size
      totalSize.gzip += gzipSize

      logger.info(
        `entry: ${file} | size ${fileSizeFormat} | gzip ${fileGzipSizeFormat}`,
      )
    }

    logger.info(
      `total: size ${formatBytes(totalSize.size)} | gzip ${formatBytes(totalSize.gzip)}`,
    )
  } catch (error) {
    logger.error(error)
  }
}
