import { expect, test } from 'vitest'
import { esbuildTargetToBrowserslist } from './browserslist'

test('esbuildTargetToBrowserslist', () => {
  expect(esbuildTargetToBrowserslist('chrome108')).toMatchInlineSnapshot(`
    [
      "chrome 108",
    ]
  `)

  expect(esbuildTargetToBrowserslist(['chrome99 node12 es2021', 'Safari16.2']))
    .toMatchInlineSnapshot(`
    [
      "chrome 99",
      "safari 16.2",
    ]
  `)
})
