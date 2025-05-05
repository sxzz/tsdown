import { beforeEach, expect, test, vi } from 'vitest'
import { resolveOptions } from '../src/options'
import { fsRemove } from '../src/utils/fs'
import { getTestDir, testBuild, writeFixtures } from './utils'

beforeEach(async (context) => {
  const dir = getTestDir(context.task)
  await fsRemove(dir)
})

test('basic', async (context) => {
  const content = `console.log("Hello, world!")`
  const { snapshot } = await testBuild(context, {
    'index.ts': content,
  })
  expect(snapshot).contain(content)
})

{
  const files = {
    'index.ts': "export { foo } from './foo'",
    'foo.ts': 'export const foo = 1',
  }
  test('esm import', async (context) => {
    await testBuild(context, files)
  })

  test('cjs import', async (context) => {
    await testBuild(context, files, {
      format: 'cjs',
    })
  })
}

test('esm shims', async (context) => {
  await testBuild(
    context,
    { 'index.ts': 'export default [__dirname, __filename]' },
    { shims: true },
  )
})

test('cjs shims', async (context) => {
  const { snapshot } = await testBuild(
    context,
    {
      'index.ts': `
        export const url = import.meta.url
        export const filename = import.meta.filename
        export const dirname = import.meta.dirname`,
    },
    {
      shims: true,
      format: 'cjs',
    },
  )
  expect(snapshot).contain('require("url").pathToFileURL(__filename).href')
  expect(snapshot).contain('__filename')
  expect(snapshot).contain('__dirname')
})

test('entry structure', async (context) => {
  const files = {
    'src/index.ts': '',
    'src/utils/index.ts': '',
  }
  await testBuild(context, files, {
    entry: Object.keys(files),
  })
})

test('bundle dts', async (context) => {
  const files = {
    'src/index.ts': `
      export { str } from './utils/types';
      export { shared } from './utils/shared';
      `,
    'src/utils/types.ts': 'export let str = "hello"',
    'src/utils/shared.ts': 'export let shared = 10',
  }
  await testBuild(context, files, {
    entry: ['src/index.ts'],
    dts: true,
  })
})

test('cjs interop', async (context) => {
  const files = {
    'index.ts': `
    export default {}
    export type Foo = string
    `,
  }
  await testBuild(context, files, {
    format: ['esm', 'cjs'],
  })
})

test('fixed extension', async (context) => {
  const files = {
    'index.ts': `export default 10`,
  }
  await testBuild(context, files, {
    format: ['esm', 'cjs'],
    fixedExtension: true,
    dts: true,
  })
})

test('custom extension', async (context) => {
  const files = {
    'index.ts': `export default 10`,
  }
  const { outputFiles } = await testBuild(context, files, {
    dts: true,
    outExtensions: () => ({ js: '.some.mjs', dts: '.some.d.mts' }),
  })
  expect(outputFiles).toMatchInlineSnapshot(`
    [
      "index.d.some.d.mts",
      "index.some.mjs",
    ]
  `)
})

test('noExternal', async (context) => {
  const files = {
    'index.ts': `export * from 'cac'`,
  }
  await testBuild(context, files, {
    noExternal: ['cac'],
    plugins: [
      {
        name: 'remove-code',
        load(id) {
          if (id.replaceAll('\\', '/').includes('/node_modules/cac')) {
            return 'export const cac = "[CAC CODE]"'
          }
        },
      },
    ],
  })
})

test('fromVite', async (context) => {
  const files = {
    'index.ts': `export default 10`,
    'tsdown.config.ts': `
    import { resolve } from 'node:path'
    export default {
      entry: resolve(import.meta.dirname, 'index.ts').replaceAll('\\\\', '/'),
      fromVite: true,
    }`,
    'vite.config.ts': `
    export default {
      resolve: { alias: { '~': '/' } },
      plugins: [{ name: 'expected' }],
    }
    `,
  }
  const { testDir } = await writeFixtures(context, files)
  const options = await resolveOptions({
    config: testDir,
  })
  expect(options.configs).toMatchObject([
    {
      fromVite: true,
      alias: {
        '~': '/',
      },
      plugins: [
        [
          {
            name: 'expected',
          },
        ],
        [],
      ],
    },
  ])
})

test('resolve dependency for dts', async (context) => {
  const files = {
    'index.ts': `export type { GlobOptions } from 'tinyglobby'
    export type * from 'unconfig'`,
  }
  const { snapshot } = await testBuild(context, files, {
    dts: { resolve: ['tinyglobby'] },
  })
  expect(snapshot).contain(`export * from "unconfig"`)
})

test('resolve paths in tsconfig', async (context) => {
  const files = {
    'index.ts': `export * from '@/mod'`,
    'mod.ts': `export const mod = 42`,
    '../tsconfig.build.json': JSON.stringify({
      compilerOptions: {
        paths: { '@/*': ['./resolve-paths-in-tsconfig/*'] },
      },
    }),
  }
  await testBuild(context, files, {
    dts: { isolatedDeclarations: true },
    tsconfig: 'tsconfig.build.json',
  })
})

test('hooks', async (context) => {
  const fn = vi.fn()
  const files = {
    'index.ts': `export default 10`,
  }
  await testBuild(context, files, {
    hooks: {
      'build:prepare': fn,
      'build:before': fn,
      'build:done': fn,
    },
  })
  expect(fn).toBeCalledTimes(3)
})

test('env flag', async (context) => {
  const files = {
    'index.ts': `export const env = process.env.NODE_ENV
    export const meta = import.meta.env.NODE_ENV
    export const custom = import.meta.env.CUSTOM
    export const debug = import.meta.env.DEBUG
    `,
  }
  const { snapshot } = await testBuild(context, files, {
    env: {
      NODE_ENV: 'production',
      CUSTOM: 'tsdown',
      DEBUG: true,
    },
  })
  expect(snapshot).contains('const env = "production"')
  expect(snapshot).contains('const meta = "production"')
  expect(snapshot).contains('const custom = "tsdown"')
  expect(snapshot).contains('const debug = true')
})

test('minify', async (context) => {
  const files = { 'index.ts': `export const foo = true` }
  const { snapshot } = await testBuild(context, files, {
    minify: {
      mangle: true,
      compress: true,
      removeWhitespace: false,
    },
  })
  expect(snapshot).contains('!0')
  expect(snapshot).not.contains('true')
  expect(snapshot).not.contains('const foo')
})

test('stub', async (context) => {
  // Default entry
  const files = {
    'index.ts': `export const foo = 42`,
    'index-two.ts': `export const bar = 42`,
  }
  const { snapshot } = await testBuild(context, files, {
    entry: ['index.ts', 'index-two.ts'],
    stub: true,
  })
  expect(snapshot).contains('export * from "[CWD]/tests/temp/stub/index.ts"')
})

test('iife and umd', async (context) => {
  const files = { 'index.ts': `export const foo = true` }
  const { outputFiles } = await testBuild(context, files, {
    format: ['iife', 'umd'],
    globalName: 'Lib',
  })
  expect(outputFiles).toMatchInlineSnapshot(`
    [
      "index.iife.js",
      "index.umd.js",
    ]
  `)
})

test('remove node protocol', async (context) => {
  const files = {
    'index.ts': `
    import fs from 'node:fs'
    import { join } from 'node:path'
    const promise = import('node:fs/promises')

    export { fs, join, promise }
    `,
  }
  const { snapshot } = await testBuild(context, files, {
    removeNodeProtocol: true,
  })
  expect(snapshot).not.contains('node:')
})
