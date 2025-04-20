# 快速上手

:::warning 🚧 Beta 软件  
[Rolldown](https://rolldown.rs) 当前处于测试版状态。虽然它已经可以处理大多数生产环境的使用场景，但可能仍然存在一些漏洞和不完善之处。特别是，内置的压缩功能仍在开发中。  
:::

## 安装

使用您喜欢的包管理器将 `tsdown` 安装为开发依赖：

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

## 使用 CLI

要验证 `tsdown` 是否正确安装，请在项目目录中运行以下命令：

```sh
./node_modules/.bin/tsdown --version
```

您还可以通过以下命令查看可用的 CLI 选项和示例：

```sh
./node_modules/.bin/tsdown --help
```

### 创建您的第一个打包

首先，创建两个源 TypeScript 文件：

```ts [src/index.ts]
import { hello } from './hello.ts'

hello()
```

```ts [src/hello.ts]
export function hello() {
  console.log('Hello tsdown!')
}
```

接下来，初始化 `tsdown` 配置文件：

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src'],
})
```

现在，运行以下命令来打包您的代码：

```sh
./node_modules/.bin/tsdown
```

您应该会看到打包后的输出文件写入到 `dist/index.mjs`。为了验证它是否正常工作，运行输出文件：

```sh
node dist/index.mjs
```

您应该会在控制台中看到消息 `Hello tsdown!`。

### 在 npm 脚本中使用 CLI

为了简化命令，您可以将其添加到 `package.json` 的脚本中：

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

现在，您可以通过以下命令构建项目：

```sh
npm run build
```

## 使用配置文件

虽然可以直接使用 CLI，但对于更复杂的项目，推荐使用配置文件。这可以让您以集中且可复用的方式定义和管理构建设置。

有关更多详细信息，请参阅 [配置文件](./config-file.md) 文档。

## 使用插件

`tsdown` 支持通过插件扩展其功能。您可以无缝使用 Rolldown 插件、Unplugin 插件以及大多数 Rollup 插件。要使用插件，请将它们添加到配置文件的 `plugins` 数组中。例如：

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'
import SomePlugin from 'some-plugin'

export default defineConfig({
  plugins: [SomePlugin()],
})
```

有关更多详细信息，请参阅 [插件](./plugins.md) 文档。

## 使用监听模式

您可以启用监听模式，在文件更改时自动重新构建项目。这在开发过程中非常有用，可以简化您的工作流程。使用 `--watch`（或 `-w`）选项：

```bash
tsdown --watch
```

有关更多详细信息，请参阅 [监听模式](./watch-mode.md) 文档。
