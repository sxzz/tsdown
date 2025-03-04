import { beforeEach, expect, test } from 'vitest'
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

test('syntax lowering', async (context) => {
  const { snapshot } = await testBuild(
    context,
    { 'index.ts': 'export const foo: number = a?.b?.()' },
    { target: 'es2015' },
  )
  expect(snapshot).not.contain('?.')
})

test('esm shims', async (context) => {
  await testBuild(
    context,
    { 'index.ts': 'export default [__dirname, __filename]' },
    { shims: true },
  )
})

test('cjs shims', async (context) => {
  await testBuild(
    context,
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
    dts: { extraOutdir: 'types' },
    bundleDts: true,
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
      entry: resolve(import.meta.dirname, 'index.ts'),
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
  expect(options.configs).toMatchInlineSnapshot([
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
