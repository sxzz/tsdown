## index.js

```js

//#region src/utils/types.ts
let str = "hello";

//#endregion
//#region src/utils/shared.ts
let shared = 10;

//#endregion
export { shared, str };
```
## types/index.d.ts

```ts

//#region dist/.tsdown-types-es/utils/types.d.ts
declare let str: string;

//#endregion
//#region dist/.tsdown-types-es/utils/shared.d.ts
declare let shared: number;

//#endregion
export { shared, str };
```