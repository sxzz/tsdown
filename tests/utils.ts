import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { fdir } from 'fdir'
import { expect } from 'vitest'
import { build, type Options } from '../src/index'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const tmpDir = path.resolve(dirname, 'temp')

export function getTestDir(): string {
  const testName = getTestName()
  return path.resolve(tmpDir, filenamify(testName))
}

export async function testBuild(
  files: Record<string, string>,
  options?: Options,
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

  const cwd = process.cwd()
  process.chdir(testDir)
  const resolvedOptions: Options = {
    entry: 'index.ts',
    config: false,
    outDir: 'dist',
    ...options,
  }
  await build(resolvedOptions)
  process.chdir(cwd)

  const outputDir = path.resolve(testDir, resolvedOptions.outDir!)
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
