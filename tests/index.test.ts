import { rm } from 'node:fs/promises'
import { beforeEach, expect, test } from 'vitest'
import { getTestDir, testBuild } from './utils'

beforeEach(async () => {
  const dir = getTestDir()
  await rm(dir, { recursive: true }).catch(() => {})
})

test('basic', async () => {
  const content = `console.log("Hello, world!")`
  const { snapshot } = await testBuild({
    'index.ts': content,
  })
  expect(snapshot).contain(content)
})

{
  const files = {
    'index.ts': "export { foo } from './foo'",
    'foo.ts': 'export const foo = 1',
  }
  test('esm import', async () => {
    await testBuild(files)
  })

  test('cjs import', async () => {
    await testBuild(files, {
      format: 'cjs',
    })
  })
}

test('syntax lowering', async () => {
  const { snapshot } = await testBuild(
    { 'index.ts': 'export const foo: number = a?.b?.()' },
    { target: 'es2015' },
  )
  expect(snapshot).not.contain('?.')
})

test('esm shims', async () => {
  await testBuild(
    { 'index.ts': 'export default [__dirname, __filename]' },
    { shims: true },
  )
})

test('cjs shims', async () => {
  await testBuild(
    {
      'index.ts': `
      import.meta.url === require("url").pathToFileURL(__filename).href
      import.meta.filename === __filename
      import.meta.dirname === __dirname`,
    },
    {
      shims: true,
      format: 'cjs',
    },
  )
})

test('entry structure', async () => {
  const files = {
    'src/index.ts': '',
    'src/utils/index.ts': '',
  }
  await testBuild(files, {
    entry: Object.keys(files),
  })
})
