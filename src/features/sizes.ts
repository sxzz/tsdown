import fs from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'
import Debug from 'debug'
import { formatBytes } from '../utils/format'
import { logger } from '../utils/logger'

const debug = Debug('tsdown:sizes')

const DTS_EXTENSIONS = ['.d.ts', '.d.mts', '.d.cts']

interface SizeInfo {
  size: number
  gzip: number
}

interface BundleFile {
  file: string
  size: SizeInfo
}

/**
 * Calculate and display the sizes of bundled files
 */
export async function getBundleSizes(outDir: string): Promise<void> {
  debug(`Calculating sizes for files in ${outDir}`)

  try {
    const files = await fs.readdir(outDir)
    const totalSize: SizeInfo = { size: 0, gzip: 0 }
    const typeFiles: string[] = []
    const bundleFiles: BundleFile[] = []

    await Promise.all(
      files.map(async (file) => {
        if (DTS_EXTENSIONS.some((ext) => file.endsWith(ext))) {
          typeFiles.push(file)
          return
        }

        const filePath = path.join(outDir, file)
        const stats = await fs.stat(filePath)

        if (!stats.isFile()) {
          return
        }

        const content = await fs.readFile(filePath)
        const gzipSize = gzipSync(content).length

        totalSize.size += stats.size
        totalSize.gzip += gzipSize

        bundleFiles.push({
          file,
          size: {
            size: stats.size,
            gzip: gzipSize,
          },
        })
      }),
    )

    for (const file of typeFiles) {
      logger.info(`type: ${file}`)
    }

    for (const { file, size } of bundleFiles) {
      logger.info(
        `entry: ${file} | size ${formatBytes(size.size)} | gzip ${formatBytes(size.gzip)}`,
      )
    }

    logger.info(
      `total: size ${formatBytes(totalSize.size)} | gzip ${formatBytes(totalSize.gzip)}`,
    )
  } catch (error) {
    logger.error(error)
  }
}
