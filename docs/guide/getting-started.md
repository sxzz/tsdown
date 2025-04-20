# Getting Started

:::warning 🚧 Beta Software  
[Rolldown](https://rolldown.rs) is currently in beta status. While it can already handle most production use cases, there may still be bugs and rough edges. Most notably, the built-in minification feature is still a work in progress.  
:::

## Installation

Install `tsdown` as a development dependency using your preferred package manager:

::: code-group

```sh [npm]
npm install -D tsdown
```

```sh [pnpm]
pnpm add -D tsdown
```

```sh [yarn]
yarn add -D tsdown
```

```sh [bun]
bun add -D tsdown
```

:::

## Starter Template

To get started even faster, you can use the [ts-starter](https://github.com/sxzz/ts-starter) template. This starter project is pre-configured for TypeScript library development with `tsdown`, allowing you to hit the ground running.

Clone the repository:

```bash
git clone https://github.com/sxzz/ts-starter my-library
cd my-library
pnpm install
```

This template includes a ready-to-use configuration and best practices for building TypeScript libraries.

## Using the CLI

To verify that `tsdown` is installed correctly, run the following command in your project directory:

```sh
./node_modules/.bin/tsdown --version
```

You can also explore the available CLI options and examples with:

```sh
./node_modules/.bin/tsdown --help
```

### Your First Bundle

Let's create two source TypeScript files:

```ts [src/index.ts]
import { hello } from './hello.ts'

hello()
```

```ts [src/hello.ts]
export function hello() {
  console.log('Hello tsdown!')
}
```

Next, initialize the `tsdown` configuration file:

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src'],
})
```

Now, run the following command to bundle your code:

```sh
./node_modules/.bin/tsdown
```

You should see the bundled output written to `dist/index.mjs`. To verify it works, run the output file:

```sh
node dist/index.mjs
```

You should see the message `Hello tsdown!` printed to the console.

### Using the CLI in npm Scripts

To simplify the command, you can add it to your `package.json` scripts:

```json{5} [package.json]
{
  "name": "my-tsdown-project",
  "type": "module",
  "scripts": {
    "build": "tsdown"
  },
  "devDependencies": {
    "tsdown": "^0.9.0"
  }
}
```

Now, you can build your project with:

```sh
npm run build
```

## Using the Config File

While you can use the CLI directly, it's recommended to use a configuration file for more complex projects. This allows you to define and manage your build settings in a centralized and reusable way.

For more details, refer to the [Config File](./config-file.md) documentation.

## Using Plugins

`tsdown` supports plugins to extend its functionality. You can use Rolldown plugins, Unplugin plugins, and most Rollup plugins seamlessly. To use plugins, add them to the `plugins` array in your configuration file. For example:

```ts [tsdown.config.ts]
import SomePlugin from 'some-plugin'
import { defineConfig } from 'tsdown'

export default defineConfig({
  plugins: [SomePlugin()],
})
```

For more details, refer to the [Plugins](./plugins.md) documentation.

## Using Watch Mode

You can enable watch mode to automatically rebuild your project whenever files change. This is particularly useful during development to streamline your workflow. Use the `--watch` (or `-w`) option:

```bash
tsdown --watch
```

For more details, refer to the [Watch Mode](./watch-mode.md) documentation.
