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
    fixture: 'issue-206',
    cwd: 'packages/pkg2',
    options: {
      entry: 'src/index.ts',
      outDir: 'dist',
      dts: true,
    },
    beforeBuild: async () => {
      await exec('pnpm', ['install'], {
        nodeOptions: {
          stdio: ['ignore', 'ignore', 'inherit'],
        },
      })
    },
  })
  expect(outputFiles.sort()).toEqual(['index.d.ts', 'index.js'])
})
