import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { expectFilesSnapshot } from '@sxzz/test-utils'
import { build, type Options } from '../src/index'
import type { RunnerTask, TestContext } from 'vitest'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const tmpDir = path.resolve(dirname, 'temp')
const snapshotsDir = path.resolve(dirname, '__snapshots__')

function getTestFilename(task: RunnerTask) {
  return filenamify(task.name)
}

export function getTestDir(testName: RunnerTask | string): string {
  return path.resolve(
    tmpDir,
    typeof testName === 'string' ? testName : getTestFilename(testName),
  )
}

export async function writeFixtures(
  { task }: TestContext,
  files: Record<string, string>,
): Promise<{ testName: string; testDir: string }> {
  const testName = getTestFilename(task)
  const testDir = getTestDir(testName)
  await mkdir(testDir, { recursive: true })

  for (const [filename, content] of Object.entries(files)) {
    const filepath = path.resolve(testDir, filename)
    await mkdir(path.dirname(filepath), { recursive: true })
    await writeFile(filepath, content, 'utf8')
  }

  return { testName, testDir }
}

export async function testBuild(
  context: TestContext,
  files: Record<string, string>,
  options?: Options,
): Promise<{
  outputFiles: string[]
  outputDir: string
  snapshot: string
}> {
  const { expect } = context
  const { testName, testDir } = await writeFixtures(context, files)

  const cwd = process.cwd()
  process.chdir(testDir)
  const resolvedOptions: Options = {
    entry: 'index.ts',
    config: false,
    outDir: 'dist',
    dts: false,
    silent: true,
    ...options,
  }
  await build(resolvedOptions)
  process.chdir(cwd)

  const outputDir = path.resolve(testDir, resolvedOptions.outDir!)
  const { files: outputFiles, snapshot } = await expectFilesSnapshot(
    outputDir,
    path.resolve(snapshotsDir, `${testName}.snap.md`),
    { expect },
  )

  return {
    outputFiles,
    outputDir,
    snapshot,
  }
}

function filenamify(input: string) {
  return input.replaceAll(/[^\da-z]/gi, '-')
}
