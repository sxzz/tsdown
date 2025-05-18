## index.cjs

```cjs

//#region index.ts
const url = require("url").pathToFileURL(__filename).href;
const filename = __filename;
const dirname = __dirname;

//#endregion
exports.dirname = dirname;
exports.filename = filename;
exports.url = url;
```