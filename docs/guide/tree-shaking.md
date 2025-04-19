# Tree shaking

Tree shaking is a process that aims to eliminate deadcode from your final bundle, to make it smaller.

It is enabled by default, but can be customized by passing the `--treeshake` option to tsdown:

```bash
npx tsdown --treeshake false
```

### Example

Given this input code :

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

Here are the 2 possible output, with and without tree shaking:

::: code-group

```js [dist/index.mjs (with tree shaking)]
//#region src/util.ts
function hello(x$1) {
  console.log('Hello World')
  console.log(x$1)
}

//#endregion
//#region src/index.ts
const x = 1
hello(x)

//#endregion
```

```js [dist/index.mjs (without tree shaking)]
//#region src/util.ts
function unused() {
  console.log("I'm unused.")
}
function hello(x$1) {
  console.log('Hello World')
  console.log(x$1)
}

//#endregion
//#region src/index.ts
const x = 1
hello(x)

//#endregion
```

:::

As you can see, without tree shaking, the `unused` function was bundled, even though it isn't called in the source code.
