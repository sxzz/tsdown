## index.mjs

```mjs

//#region src/utils/types.ts
let str = "hello";

//#endregion
//#region src/utils/shared.ts
let shared = 10;

//#endregion
export { shared, str };
```
## types/index.d.mts

```mts
declare let str: string;

declare let shared: number;

export { shared, str };

```