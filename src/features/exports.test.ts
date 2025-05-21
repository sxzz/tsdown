import path from 'node:path'
import process from 'node:process'
import { describe } from 'node:test'
import { expect, test } from 'vitest'
import { generateExports } from './exports'
import type { OutputChunk } from 'rolldown'

const cwd = process.cwd()
const FAKE_PACKAGE_JSON = {
  packageJsonPath: path.join(cwd, 'package.json'),
}

describe('generateExports', () => {
  test('no entries', () => {
    const results = generateExports(FAKE_PACKAGE_JSON, cwd, {})
    expect(results).toMatchInlineSnapshot(`
      {
        "exports": {
          "./package.json": "./package.json",
        },
        "main": undefined,
        "module": undefined,
        "types": undefined,
      }
    `)
  })

  test('only one entry', () => {
    const results = generateExports(FAKE_PACKAGE_JSON, cwd, {
      es: [genChunk('main.js')],
    })
    expect(results).toMatchInlineSnapshot(`
      {
        "exports": {
          ".": "./main.js",
          "./package.json": "./package.json",
        },
        "main": "./main.js",
        "module": "./main.js",
        "types": undefined,
      }
    `)
  })

  test('index entry', () => {
    const results = generateExports(FAKE_PACKAGE_JSON, cwd, {
      es: [genChunk('index.js'), genChunk('foo.js')],
    })
    expect(results).toMatchInlineSnapshot(`
      {
        "exports": {
          ".": "./index.js",
          "./foo": "./foo.js",
          "./package.json": "./package.json",
        },
        "main": "./index.js",
        "module": "./index.js",
        "types": undefined,
      }
    `)
  })

  test('multiple entries', () => {
    const results = generateExports(FAKE_PACKAGE_JSON, cwd, {
      es: [genChunk('foo.js'), genChunk('bar.js')],
    })
    expect(results).toMatchInlineSnapshot(`
      {
        "exports": {
          "./bar": "./bar.js",
          "./foo": "./foo.js",
          "./package.json": "./package.json",
        },
        "main": undefined,
        "module": undefined,
        "types": undefined,
      }
    `)
  })

  test('dual formats', () => {
    const results = generateExports(FAKE_PACKAGE_JSON, cwd, {
      es: [genChunk('foo.js')],
      cjs: [genChunk('foo.cjs')],
    })
    expect(results).toMatchInlineSnapshot(`
      {
        "exports": {
          ".": {
            "import": "./foo.js",
            "require": "./foo.cjs",
          },
          "./package.json": "./package.json",
        },
        "main": "./foo.cjs",
        "module": "./foo.js",
        "types": undefined,
      }
    `)
  })

  test('dts', () => {
    const results = generateExports(FAKE_PACKAGE_JSON, cwd, {
      es: [genChunk('foo.js'), genChunk('foo.d.ts')],
      cjs: [genChunk('foo.cjs'), genChunk('foo.d.cts')],
    })
    expect(results).toMatchInlineSnapshot(`
      {
        "exports": {
          ".": {
            "import": "./foo.js",
            "require": "./foo.cjs",
          },
          "./package.json": "./package.json",
        },
        "main": "./foo.cjs",
        "module": "./foo.js",
        "types": "./foo.d.cts",
      }
    `)
  })

  test('fixed extension', () => {
    const results = generateExports(FAKE_PACKAGE_JSON, cwd, {
      es: [genChunk('index.mjs'), genChunk('index.d.mts')],
      cjs: [genChunk('index.cjs'), genChunk('index.d.cts')],
    })
    expect(results).toMatchInlineSnapshot(`
      {
        "exports": {
          ".": {
            "import": "./index.mjs",
            "require": "./index.cjs",
          },
          "./package.json": "./package.json",
        },
        "main": "./index.cjs",
        "module": "./index.mjs",
        "types": "./index.d.cts",
      }
    `)
  })
})

function genChunk(fileName: string) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return { type: 'chunk', fileName, isEntry: true } as OutputChunk
}
