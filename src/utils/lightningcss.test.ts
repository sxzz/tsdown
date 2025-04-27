import { browserslistToTargets } from 'lightningcss'
import { expect, test } from 'vitest'
import { esbuildTargetToLightningCSS } from './lightningcss'

test('esbuildTargetToLightningCSS', () => {
  const expected = browserslistToTargets([
    'chrome 99',
    'safari 16.2.1',
    'firefox 120.1',
  ])
  const actual = esbuildTargetToLightningCSS([
    'chrome99',
    'safari16.2.1 firefox120.1',
    'node12 es2021',
  ])

  expect(actual).toMatchInlineSnapshot(`
    {
      "chrome": 6488064,
      "firefox": 7864576,
      "safari": 1049089,
    }
  `)
  expect(actual).toEqual(expected)
})
