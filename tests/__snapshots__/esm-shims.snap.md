## index.js

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'

//#region ../../../esm-shims.js
const getFilename = () => fileURLToPath(import.meta.url)
const getDirname = () => path.dirname(getFilename())
const __dirname = /* @__PURE__ */ getDirname()
const __filename = /* @__PURE__ */ getFilename()

//#endregion
//#region index.ts
var esm_shims_default = [__dirname, __filename]

//#endregion
export { esm_shims_default as default }
```
