# 命令行接口

所有 CLI 参数也可以在配置文件中设置，以便在复杂项目中实现更好的复用性和可维护性。有关更多详细信息，请参阅 [配置文件](../guide/config-file.md) 文档。

## `[...files]`

通过命令参数指定入口文件。这等同于在配置文件中设置 `entry` 选项。例如：

```bash
tsdown src/index.ts src/util.ts
```

这将把 `src/index.ts` 和 `src/util.ts` 作为独立的入口点进行打包。有关更多详细信息，请参阅 [入口文件](../guide/entry.md) 文档。

## `-c, --config <filename>`

指定自定义配置文件。使用此选项定义要使用的配置文件路径。

另请参阅 [配置文件](../guide/config-file.md)。

## `--no-config`

禁用加载配置文件。如果您希望仅依赖命令行选项或默认设置，此选项非常有用。

## `--format <format>`

定义打包格式。支持的格式包括：

- `esm`（ECMAScript 模块）
- `cjs`（CommonJS）
- `iife`（立即调用函数表达式）

另请参阅 [输出格式](../guide/output-format.md)。

## `--clean`

在构建之前清理输出目录。这会删除输出目录中的所有文件，以确保干净的构建。

另请参阅 [清理](../guide/cleaning.md)。

## `--minify`

启用输出包的压缩以减少文件大小。压缩会移除不必要的字符并优化代码以用于生产环境。

另请参阅 [压缩](../guide/minification.md)。

## `--target <target>`

指定打包的 JavaScript 目标版本。例如：

- `es2015`
- `esnext`

另请参阅 [构建目标](../guide/target.md)。

## `--silent`

在构建过程中屏蔽非错误日志。仅显示错误消息，使您更专注于关键问题。

另请参阅 [静默模式](../guide/silent-mode.md)。

## `-d, --out-dir <dir>`

指定打包文件的输出目录。使用此选项自定义输出文件的存放位置。

另请参阅 [输出目录](../guide/output-directory.md)。

## `--treeshake`, `--no-treeshake`

启用或禁用除屑优化。除屑优化会从最终包中移除未使用的代码，减少文件大小并提升性能。

另请参阅 [除屑优化](../guide/tree-shaking.md)。

## `--sourcemap`

为打包文件生成源映射。源映射通过将输出代码映射回原始源文件，帮助调试。

另请参阅 [源映射](../guide/sourcemap.md)。

## `--shims`

启用 CommonJS (CJS) 和 ECMAScript 模块 (ESM) 的 shim。这确保了不同模块系统之间的兼容性。

## `--platform <platform>`

指定打包的目标平台。支持的平台包括：

- `node`（Node.js）
- `browser`（Web 浏览器）
- `neutral`（与平台无关）

另请参阅 [运行平台](../guide/platform.md)。

## `--dts`

为打包代码生成 TypeScript 声明文件（`.d.ts`）。这对于需要提供类型定义的库非常有用。

## `--publint`

启用 `publint` 以验证您的包是否适合发布。此功能检查包配置中的常见问题，确保符合最佳实践。

## `--unused`

启用未使用依赖项检查。这有助于识别项目中未使用的依赖项，方便清理 `package.json`。

## `-w, --watch [path]`

启用监听模式，在文件更改时自动重新构建项目。您还可以选择指定一个路径以监听更改。

另请参阅 [监听模式](../guide/watch-mode.md)。

## `--from-vite [vitest]`

重用 Vite 或 Vitest 的配置。这允许您无缝扩展或集成现有的 Vite 或 Vitest 配置。

另请参阅 [扩展 Vite 或 Vitest 配置](../guide/config-file.md#extending-vite-or-vitest-config-experimental)。
