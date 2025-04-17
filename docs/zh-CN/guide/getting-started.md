# Getting Started

:::warning 🚧 Beta Software
[Rolldown](https://rolldown.rs) is currently in beta status. While it can already handle most production use cases, there may still be bugs and rough edges. Most notably, the built-in minification feature is still in early work-in-progress status.
:::

## Installation

::: code-group

```sh [npm]
$ npm install -D tsdown
```

```sh [pnpm]
$ pnpm add -D tsdown
```

```sh [yarn]
$ yarn add -D tsdown
```

```sh [bun]
$ bun add -D tsdown
```

:::

## Using the CLI

To verify Rolldown is installed correctly, run the following in the directory where you installed it:

```sh
$ ./node_modules/.bin/tsdown --version
```

You can also check out the CLI options and examples with:

```sh
$ ./node_modules/.bin/tsdown --help
```

### Your first bundle

Let's create two source Typescript files:

```ts [src/index.ts]
import { hello } from './hello.ts'

hello()
```

```ts [src/hello.ts]
export function hello() {
  console.log('Hello tsdown!')
}
```

Initialize the tsdown configuration:

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src'],
})
```

Then run the following in the command line:

```sh
$ ./node_modules/.bin/tsdown
```

You should see the content written to `dist/index.mjs`. Let's run it to verify it's working:

```sh
$ node dist/index.mjs
```

You should see `Hello tsdown!` printed.

### Using the CLI in npm scripts

To avoid typing the long command, we can move it inside an npm script:

```json{5} [package.json]
{
  "name": "my-tsdown-project",
  "type": "module",
  "scripts": {
    "build": "tsdown"
  },
  "devDependencies": {
    "tsdown": "^0.6.10"
  }
}
```

Now we can run the build with just:

```sh
$ npm run build
```

## Using the Config File

Although you can use the CLI directly, it's recommended to use a config file for more complex projects. The config file is a TypeScript file that exports a configuration object.

See [Rolldown's config options](https://rolldown.rs/reference/config-options) for a full list of available options.

Rolldown supports most of the [Rollup config options](https://rollupjs.org/configuration-options), with some [notable additional features](./features.md).

## TODO : Using Plugins

Rolldown's plugin API is identical to that of Rollup's, so you can reuse most of the existing Rollup plugins when using Rolldown. That said, Rolldown provides many [built-in features](./features.md) that make it unnecessary to use plugins.

## Using the Watcher

You can use the `--watch` (or `-w`) option to enable the watcher, which will automatically rebuild your project when files change.

```bash
$ ./node_modules/.bin/tsdown --watch
```
