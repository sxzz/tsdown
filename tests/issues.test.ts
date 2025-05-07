import { exec } from 'tinyexec'
import { beforeEach, expect, test } from 'vitest'
import { fsRemove } from '../src/utils/fs'
import { getTestDir, testBuild } from './utils'

beforeEach(async (context) => {
  const dir = getTestDir(context.task)
  await fsRemove(dir)
})

test('#61', async (context) => {
  await testBuild({
    context,
    files: {
      'index.ts': `
      export * as debug from "debug"
      export * as foo from "~/foo"
      export * as bar from './bar'`,
      'src/foo.ts': `export const foo = 1`,
      'bar.ts': `export const bar = 2`,
      'tsconfig.json': JSON.stringify({
        compilerOptions: {
          paths: { '~/*': ['src/*'] },
        },
      }),
    },
    options: {
      external: ['hono/compress', 'hono', 'hono/pretty-json'],
      skipNodeModulesBundle: true,
      target: 'es2022',
      platform: 'node',
    },
  })
})

test('#206', async (context) => {
  const { outputFiles } = await testBuild({
    context,
    fixtureName: 'shiki-monorepo',
    relativeWorkingDir: 'packages/pkg2',
    options: {
      entry: 'src/index.ts',
      outDir: 'dist',
      dts: true,
    },
    beforeBuild: async () => {
      await exec('pnpm', ['install'])
    },
  })
  expect(outputFiles).toContain('index.d.ts')
  expect(outputFiles).toContain('index.js')
  expect(outputFiles).toHaveLength(2)
})
