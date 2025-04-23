# 构建目标（Target）

`target` 设置决定了哪些 JavaScript 特性会被降级（转换为旧语法），哪些会在输出中保持原样。这使您可以控制打包代码与特定环境或 JavaScript 版本的兼容性。

例如，如果目标是 `es5` 或更低版本，箭头函数 `() => this` 将被转换为等效的 `function` 表达式。

> [!WARNING] 仅限语法降级  
> `target` 选项仅影响语法转换。它不包括针对目标环境中可能不存在的 API 的运行时 polyfill 或 shim。例如，如果您的代码使用了 `Promise`，但目标环境不支持原生 `Promise`，则不会自动添加 polyfill。

### 自定义目标

您可以使用 `--target` 选项指定目标：

```bash
tsdown --target <target>
```

### 支持的目标

`tsdown` 支持多种目标，包括：

- **ECMAScript 版本：** `es5`、`es2015`、`es2020`、`esnext` 等。
- **浏览器版本：** `chrome100`、`safari18`、`firefox110` 等。
- **Node.js 版本：** `node20.18`、`node16` 等。

### 示例

```bash
tsdown --target es2020
```

您还可以传递**多个目标**以确保兼容多个环境。例如：

```bash
tsdown --target chrome100 --target node20.18
```

### 运行时帮助函数

在降级某些现代 JavaScript 特性时，`tsdown` 可能需要由 `@oxc-project/runtime` 包提供的运行时帮助函数。例如：

- 将 `await` 表达式转换为旧语法时，需要使用帮助函数 `@oxc-project/runtime/helpers/asyncToGenerator`。

如果您的目标环境包含需要这些帮助函数的特性，您可能需要在项目中安装 `@oxc-project/runtime` 包：

```bash
npm install @oxc-project/runtime
```
