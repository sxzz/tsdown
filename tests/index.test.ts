import { rm } from 'node:fs/promises'
import { beforeEach, expect, test } from 'vitest'
import { getTestDir, testBuild } from './utils'

beforeEach(async () => {
  const dir = getTestDir()
  await rm(dir, { recursive: true }).catch(() => {})
})

test('basic', async () => {
  const content = `console.log('Hello, world!')`
  const { outputContent } = await testBuild({
    'index.ts': content,
  })
  const out = await outputContent()
  expect(out).matchSnapshot()
  expect(out).contain(content)
})

{
  const files = {
    'index.ts': "export { foo } from './foo'",
    'foo.ts': 'export const foo = 1',
  }
  test('esm import', async () => {
    const { outputContent } = await testBuild(files)
    const out = await outputContent()
    expect(out).matchSnapshot()
  })

  test('cjs import', async () => {
    const { getContent } = await testBuild(files, { args: ['--format', 'cjs'] })
    const out = await getContent('index.js')
    expect(out).matchSnapshot()
  })
}
