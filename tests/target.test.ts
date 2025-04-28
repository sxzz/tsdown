import { expect, test } from 'vitest'
import { testBuild } from './utils'

test('js syntax lowering', async (context) => {
  const { snapshot } = await testBuild(
    context,
    { 'index.ts': 'export const foo: number = a?.b?.()' },
    { target: 'es2015' },
  )
  expect(snapshot).not.contain('?.')
})

test('unnecessary js syntax lowering', async (context) => {
  const { snapshot } = await testBuild(
    context,
    { 'index.ts': 'export const foo: number = a?.b?.()' },
    { target: ['chrome120', 'safari16', 'firefox120'] },
  )
  expect(snapshot).contain('?.')
})

test('css syntax lowering', async (context) => {
  const { snapshot } = await testBuild(
    context,
    { 'index.css': '.foo { & .bar { color: red } }' },
    { entry: 'index.css', target: 'chrome108' },
  )
  expect(snapshot).not.contain('&')
})

test('unnecessary css syntax lowering', async (context) => {
  const { snapshot } = await testBuild(
    context,
    { 'index.css': '.foo { & .bar { color: red } }' },
    { entry: 'index.css', target: ['safari18.4'] },
  )
  expect(snapshot).contain('&')
})
