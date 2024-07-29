import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import { fdir } from 'fdir'
import { expect } from 'vitest'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const tmpDir = path.resolve(dirname, 'temp')

const tsx = require.resolve('tsx/cli')
const run = path.resolve(dirname, '../src/run.ts')

export function getTestDir(): string {
  const testName = getTestName()
  return path.resolve(tmpDir, filenamify(testName))
}

export async function testBuild(
  files: Record<string, string>,
  {
    args = [],
    entry = 'index.ts',
    config = false,
    outDir = 'dist',
  }: {
    args?: string[]
    entry?: string
    config?: boolean
    outDir?: string
  } = {},
): Promise<{
  outputFiles: string[]
  outputDir: string
  getContent: (filename: string) => Promise<string>
  outputContent: () => Promise<string>
}> {
  const testDir = getTestDir()
  await mkdir(testDir, { recursive: true })

  for (const [filename, content] of Object.entries(files)) {
    await writeFile(path.resolve(testDir, filename), content, 'utf8')
  }

  await execa({
    cwd: testDir,
    env: { CONSOLA_LEVEL: '3' },
  })`${tsx} ${run} ${entry} ${config ? '' : '--no-config'} -d ${outDir} ${args}`.catch()

  const outputDir = path.resolve(testDir, outDir)
  const outputFiles = await new fdir()
    .withRelativePaths()
    .crawl(outputDir)
    .withPromise()

  const getContent = async (filename: string) =>
    (await readFile(path.resolve(outputDir, filename), 'utf8')).trim()

  return {
    outputFiles,
    outputDir,
    getContent,
    outputContent: () => getContent('index.mjs'),
  }
}

function getTestName(): string {
  const name = expect.getState().currentTestName
  if (!name) {
    throw new Error('No test name')
  }
  return name
}

function filenamify(input: string) {
  return input.replaceAll(/[^\da-z]/gi, '-')
}
