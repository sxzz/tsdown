import fs from 'node:fs/promises'
import path from 'node:path'
import { brotliCompressSync, gzipSync } from 'node:zlib'
import Debug from 'debug'
import { formatBytes } from '../utils/format'
import { logger } from '../utils/logger'

const debug = Debug('tsdown:sizes')

const DTS_EXTENSIONS = ['.d.ts', '.d.mts', '.d.cts']

interface SizeInfo {
  raw: number
  gzip: number
  brotli: number
}

interface BundleFile {
  filaName: string
  size: SizeInfo
}

/**
 * Calculate and display the sizes of bundled files
 */
export async function getBundleSizes(outDir: string): Promise<void> {
  debug(`Calculating sizes for files in ${outDir}`)

  try {
    const files = await fs.readdir(outDir)
    const totalSize: SizeInfo = { raw: 0, gzip: 0, brotli: 0 }
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
        const brotliSize = brotliCompressSync(content).length

        totalSize.raw += stats.size
        totalSize.gzip += gzipSize
        totalSize.brotli += brotliSize

        bundleFiles.push({
          filaName: file,
          size: {
            raw: stats.size,
            gzip: gzipSize,
            brotli: brotliSize,
          },
        })
      }),
    )

    for (const file of typeFiles) {
      logger.info(`type: ${file}`)
    }

    for (const file of bundleFiles) {
      const name = file.filaName
      const raw = formatBytes(file.size.raw)
      const gzip = formatBytes(file.size.gzip)
      const brotli = formatBytes(file.size.brotli)

      logger.info(
        `entry: ${name} | size ${raw} | gzip ${gzip} | brotli ${brotli}`,
      )
    }

    const raw = formatBytes(totalSize.raw)
    const gzip = formatBytes(totalSize.gzip)
    const brotli = formatBytes(totalSize.brotli)

    logger.info(`total: size ${raw} | gzip ${gzip} | brotli ${brotli}`)
  } catch (error) {
    logger.error(error)
  }
}
