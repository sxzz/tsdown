# Minification

Minification is a process that compresses your code to make it as small and optimized as possible.

It can be enabled using the `--minify` option:

```bash
npx tsdown --minify
```

### Example

Given this input code :

```ts [src/index.ts]
const x = 1

function hello(x: number) {
  console.log('Hello World')
  console.log(x)
}

hello(x)
```

Here are the 2 possible output, with and without minification enabled:

::: code-group

```ts [dist/index.mjs (without --minify)]

//#region src/index.ts
const x = 1
function hello(x$1) {
  console.log('Hello World')
  console.log(x$1)
}
hello(x)

//#endregion
```

```ts [dist/index.mjs (with --minify)]
const e=1;function t(e){console.log(`Hello World`),console.log(e)}t(e);
```

:::
