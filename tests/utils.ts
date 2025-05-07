import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { expectFilesSnapshot } from '@sxzz/test-utils'
import { glob } from 'tinyglobby'
import { build, type Options } from '../src/index'
import type { RunnerTask, TestContext } from 'vitest'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const tmpDir = path.resolve(dirname, 'temp')
const snapshotsDir = path.resolve(dirname, '__snapshots__')
const fixturesDir = path.resolve(dirname, '__fixtures__')

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
  files?: Record<string, string>,
  fixtureName?: string,
): Promise<{ testName: string; testDir: string }> {
  const testName = getTestFilename(task)
  const testDir = getTestDir(testName)
  await mkdir(testDir, { recursive: true })

  if (files && fixtureName) {
    throw new Error('Cannot provide both `files` and `fixtureName`')
  }

  if (fixtureName) {
    const fixtureDir = path.resolve(fixturesDir, fixtureName)
    const filePaths = await glob('./**/*', {
      cwd: fixtureDir,
      onlyFiles: true,
      absolute: false,
      followSymbolicLinks: false,
    })
    files = Object.fromEntries(
      await Promise.all(
        filePaths.map(async (filePath) => {
          const absoluteFilePath = path.resolve(fixtureDir, filePath)
          const content = await readFile(absoluteFilePath, 'utf8')
          return [filePath, content]
        }),
      ),
    )
  }

  if (!files) {
    throw new Error('Either `files` or `fixtureName` must be provided')
  }

  for (const [filename, content] of Object.entries(files)) {
    const filepath = path.resolve(testDir, filename)
    await mkdir(path.dirname(filepath), { recursive: true })
    await writeFile(filepath, content, 'utf8')
  }

  return { testName, testDir }
}

export async function testBuild({
  context,
  files,
  fixtureName,
  options,
  relativeWorkingDir,
  beforeBuild,
}: {
  context: TestContext

  /**
   * The files to write to the test directory.
   *
   * One of `files` or `fixtureName` must be provided.
   */
  files?: Record<string, string>

  /**
   * The directory name under `tests/__fixtures__` to use as a fixture.
   *
   * One of `files` or `fixtureName` must be provided.
   */
  fixtureName?: string

  /**
   * The options for the build.
   */
  options?: Options

  /**
   * The working directory of the test. It's a relative path to the test directory.
   *
   * @default '.'
   */
  relativeWorkingDir?: string

  /**
   * A function that will be called before the build.
   */
  beforeBuild?: () => Promise<void>
}): Promise<{
  outputFiles: string[]
  outputDir: string
  snapshot: string
}> {
  const { expect } = context
  const { testName, testDir } = await writeFixtures(context, files, fixtureName)

  const workingDirBefore = process.cwd()

  const workingDir = path.join(testDir, relativeWorkingDir || '.')
  process.chdir(workingDir)
  const resolvedOptions: Options = {
    entry: 'index.ts',
    config: false,
    outDir: 'dist',
    dts: false,
    silent: true,
    ...options,
  }
  await beforeBuild?.()
  await build(resolvedOptions)
  process.chdir(workingDirBefore)

  const outputDir = path.resolve(workingDir, resolvedOptions.outDir!)
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
