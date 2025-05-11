# 插件

`tsdown` 使用 [Rolldown](https://rolldown.rs) 作为其核心引擎，这意味着它可以无缝支持 Rolldown 插件体系。插件机制为扩展和定制打包流程提供了强大能力，可实现诸如代码转换、资源处理等高级功能。

## 支持的插件生态系统

### Rolldown 插件

tsdown 基于 Rolldown 构建，因此全面支持所有 Rolldown 插件生态。您直接使用任何为 Rolldown 设计的各类插件来优化构建流程。

### Unplugin

[Unplugin](https://unplugin.unjs.io/) 是一个现代化的插件框架，支持包括 Rolldown 在内的多个打包器。大多数 Unplugin 插件（通常以 `unplugin-` 为前缀命名）可以无缝地与 `tsdown` 一起使用。

### Rollup 插件

Rolldown 与 Rollup 的插件 API 高度兼容，因此 `tsdown` 可以直接使用大多数 Rollup 插件。这一特性使开发者能够充分利用 Rollup 生态中丰富的现有插件资源。

### Vite 插件

如果 Vite 插件不依赖于 Vite 特定的内部 API 或运行机制，它们可能与 `tsdown` 兼容。但是，严重依赖 Vite 内部机制的插件可能存在兼容性问题。我们计划在未来增强对 Vite 插件的支持。

## 如何使用插件

要在 `tsdown` 中使用插件，您需要将它们添加到配置文件的 `plugins` 数组中。插件**不能**通过 CLI 添加。

以下是使用插件的示例：

```ts [tsdown.config.ts]
import SomePlugin from 'some-plugin'
import { defineConfig } from 'tsdown'

export default defineConfig({
  plugins: [SomePlugin()],
})
```

有关特定插件的使用方法，请参考插件的官方文档。

## 编写自定义插件

如果您想为 `tsdown` 创建自定义插件，可以参考 Rolldown 的插件开发指南。Rolldown 的插件 API 高度灵活，与 Rollup 的 API 类似，便于快速上手。

详细的插件开发说明，请参阅 [Rolldown 插件开发指南](https://rolldown.rs/guide/plugin-development)。

> [!TIP]
> 插件是扩展 `tsdown` 功能的绝佳方式。无论是使用现有插件还是创建自定义插件，它们都可以让您根据项目的具体需求定制打包过程。
