## index.js

```js
import * as debug from "debug";

//#region rolldown:runtime
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};

//#endregion
//#region src/foo.ts
var foo_exports = {};
__export(foo_exports, { foo: () => foo });
const foo = 1;

//#endregion
//#region bar.ts
var bar_exports = {};
__export(bar_exports, { bar: () => bar });
const bar = 2;

//#endregion
export { bar_exports as bar, debug, foo_exports as foo };
```