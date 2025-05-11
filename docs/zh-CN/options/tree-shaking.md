# 除屑优化（Tree-shaking）

除屑优化是一种从最终打包文件中移除未使用（无效）代码的过程，可以减少文件体积并提升性能。它确保输出中仅包含实际使用的代码。

在 `tsdown` 中，**除屑优化默认启用**，但如果需要，您可以禁用它：

```bash
tsdown --no-treeshake
```

### 示例

以下是输入代码：

::: code-group

```ts [src/index.ts]
import { hello } from './util'

const x = 1

hello(x)
```

```ts [src/util.ts]
export function unused() {
  console.log("I'm unused.")
}

export function hello(x: number) {
  console.log('Hello World')
  console.log(x)
}
```

:::

根据是否启用了除屑优化，输出代码可能如下：

::: code-group

```js [dist/index.mjs (启用除屑优化)]
function hello(x$1) {
  console.log('Hello World')
  console.log(x$1)
}

const x = 1
hello(x)
```

```js [dist/index.mjs (禁用除屑优化)]
function unused() {
  console.log("I'm unused.")
}
function hello(x$1) {
  console.log('Hello World')
  console.log(x$1)
}

const x = 1
hello(x)
```

:::

### 说明

- **启用除屑优化：** `unused` 函数在最终打包文件中被移除，因为它在源代码中没有被调用。
- **禁用除屑优化：** 即使 `unused` 函数未被使用，它仍然会被包含在打包文件中，导致输出文件体积更大。

> [!TIP]
> 除屑优化对于优化库或包含许多未使用导出的大型项目特别有用。然而，如果您需要包含所有代码（例如用于调试或测试），可以通过 `--no-treeshake` 禁用它。
