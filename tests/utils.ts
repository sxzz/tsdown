import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { expectFilesSnapshot } from '@sxzz/test-utils'
import { expect } from 'vitest'
import { build, type Options } from '../src/index'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const tmpDir = path.resolve(dirname, 'temp')
const snapshotsDir = path.resolve(dirname, '__snapshots__')

function getTestFilename() {
  const testName = getTestName()
  return filenamify(testName)
}

export function getTestDir(testName: string = getTestFilename()): string {
  return path.resolve(tmpDir, testName)
}

export async function testBuild(
  files: Record<string, string>,
  options?: Options,
): Promise<{
  outputFiles: string[]
  outputDir: string
  snapshot: string
}> {
  const testName = getTestFilename()
  const testDir = getTestDir(testName)
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
  const { files: outputFiles, snapshot } = await expectFilesSnapshot(
    outputDir,
    path.resolve(snapshotsDir, `${testName}.snap.md`),
  )

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
