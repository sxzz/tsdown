import { describe, expect, test } from 'vitest'
import { normalizePathFor } from '../src/utils/normalize-path'

describe('utilities', () => {
  test('normalizePathFor', () => {
    expect(normalizePathFor('')).toMatchInlineSnapshot(`""`)
    expect(normalizePathFor('a/b/c')).toMatchInlineSnapshot(`"a/b/c"`)
    expect(normalizePathFor(String.raw`a\b\c`)).toMatchInlineSnapshot(`"a/b/c"`)
    expect(
      normalizePathFor(String.raw`C:\Program Files\my-dir\test.js`),
    ).toMatchInlineSnapshot(`"C:/Program Files/my-dir/test.js"`)
    expect(normalizePathFor(['a/b/c', 'd/e/f'])).toMatchInlineSnapshot(`
      [
        "a/b/c",
        "d/e/f",
      ]
    `)
    expect(
      normalizePathFor([String.raw`packages\foo`, String.raw`packages\bar`]),
    ).toMatchInlineSnapshot(`
      [
        "packages/foo",
        "packages/bar",
      ]
    `)
  })
})
