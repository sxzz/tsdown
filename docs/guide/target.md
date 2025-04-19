# Target

The target setting changes which JS features are downleveled and which are left intact. For example, an arrow function `() => this` will be turned into an equivalent `function` expression if target is ES5 or lower.

See [TypeScript's documentation](https://www.typescriptlang.org/tsconfig/#target) for more information.

You can use the `--target` option to customize the output target :

```bash
npx tsdown --target <target>
```

### Example

Given this input code :

```ts [src/index.ts]
const x = 1

const hello = (x: number) => {
  console.log('Hello World')
  console.log(x)
}

hello(x)
```

Here are the 2 possible output, with target ES5 and ES6:

::: code-group

```js [dist/index.mjs (ES5)]
//#region src/index.ts
const x = 1
const hello = function (x$1) {
  console.log('Hello World')
  console.log(x$1)
}
hello(x)

//#endregion
```

```js [dist/index.mjs (ES6)]
//#region src/index.ts
const x = 1
const hello = (x$1) => {
  console.log('Hello World')
  console.log(x$1)
}
hello(x)

//#endregion
```

:::

<!-- TODO: warn only syntax downgrade, not for runtime -->
