# 压缩

压缩是通过移除不必要的字符（如空格、注释和未使用的代码）来减少代码体积并提升性能的过程。

您可以通过在 `tsdown` 中使用 `--minify` 选项来启用代码压缩：

```bash
tsdown --minify
```

> [!WARNING]  
> 压缩功能目前为 **实验性功能**。虽然可以使用，但可能无法完美处理所有边缘情况。请谨慎使用，并在生产环境中对输出进行充分测试。

### 示例

以下是输入代码：

```ts [src/index.ts]
const x = 1

function hello(x: number) {
  console.log('Hello World')
  console.log(x)
}

hello(x)
```

根据是否启用了压缩，输出代码可能如下：

::: code-group

```js [dist/index.mjs (未使用 --minify)]
//#region src/index.ts
const x = 1
function hello(x$1) {
  console.log('Hello World')
  console.log(x$1)
}
hello(x)

//#endregion
```

<!-- prettier-ignore -->
```js [dist/index.mjs (使用 --minify)]
const e=1;function t(e){console.log(`Hello World`),console.log(e)}t(e);
```

:::
