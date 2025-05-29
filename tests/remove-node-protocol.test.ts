import { describe, expect, test } from 'vitest'
import { testBuild } from './utils'

describe('remove node protocol', () => {
  test('basic', async (context) => {
    const files = {
      'index.ts': `
    import fs from 'node:fs'
    import { join } from 'node:path'
    const promise = import('node:fs/promises')

    export { fs, join, promise }
    `,
    }
    const { snapshot } = await testBuild({
      context,
      files,
      options: {
        removeNodeProtocol: true,
      },
    })
    expect(snapshot).not.contains('node:')
  })

  test('w/ require polyfill', async (context) => {
    const files = {
      'index.ts': `export const fn = require.resolve`,
    }
    const { snapshot } = await testBuild({
      context,
      files,
      options: {
        removeNodeProtocol: true,
      },
    })
    expect(snapshot).not.contains('node:')
  })
})
