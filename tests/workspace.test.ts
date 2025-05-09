import { beforeEach, expect, test } from 'vitest'
import { loadConfigFile } from '../src/options'
import { fsRemove } from '../src/utils/fs'
import { getTestDir, writeFixtures } from './utils'

beforeEach(async (context) => {
  const dir = getTestDir(context.task)
  await fsRemove(dir)
})

test('load workspace config file', async (context) => {
  const files = {
    'tsdown-workspace.config.ts': `export default {
      packages: ['packages/*'],
    }`,
  }
  const { testDir } = await writeFixtures(context, files)
  process.chdir(testDir)
  const loadResult = await loadConfigFile({})
  const { file, cwd } = loadResult
  expect(file).contains('tsdown-workspace.config.ts')
  expect(cwd).equals(testDir)
  console.log(loadResult)
  expect(loadResult).toMatchObject({
    file: expect.stringContaining('tsdown-workspace.config.ts'),
    cwd: testDir,
    workspace: { packages: ['packages/*'] },
  })
})
