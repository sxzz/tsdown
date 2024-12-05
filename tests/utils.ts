import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fdir } from 'fdir'
import { x } from 'tinyexec'
import { expect } from 'vitest'
import { toArray } from '../src/utils/general'

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
    entry?: string | string[]
    config?: boolean
    outDir?: string
  } = {},
): Promise<{
  outputFiles: string[]
  outputDir: string
  snapshot: string
}> {
  const testDir = getTestDir()
  await mkdir(testDir, { recursive: true })

  for (const [filename, content] of Object.entries(files)) {
    const filepath = path.resolve(testDir, filename)
    await mkdir(path.dirname(filepath), { recursive: true })
    await writeFile(filepath, content, 'utf8')
  }

  await x(
    tsx,
    [
      run,
      ...toArray(entry),
      config ? '' : '--no-config',
      '-d',
      outDir,
      ...args,
    ].filter(Boolean),
    {
      nodeOptions: {
        cwd: testDir,
        env: { CONSOLA_LEVEL: '0' },
        stdio: 'inherit',
      },
    },
  )

  const outputDir = path.resolve(testDir, outDir)
  const outputFiles = await new fdir()
    .withRelativePaths()
    .crawl(outputDir)
    .withPromise()

  const snapshot = (
    await Promise.all(
      outputFiles.map(
        async (filename) =>
          `## ${filename}\n${await readFile(path.resolve(outputDir, filename), 'utf8')}`,
      ),
    )
  ).join('\n')
  expect(snapshot).toMatchSnapshot()

  return {
    outputFiles,
    outputDir,
    snapshot,
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
