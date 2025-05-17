# Interface: Workspace

Defined in: [types.ts:45](https://github.com/rolldown/tsdown/blob/0c2b2976625e4e2e616654f385e20a07b90006ab/src/options/types.ts#L45)

## Properties

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [types.ts:61](https://github.com/rolldown/tsdown/blob/0c2b2976625e4e2e616654f385e20a07b90006ab/src/options/types.ts#L61)

Path to the workspace configuration file.

***

### exclude?

> `optional` **exclude**: `Arrayable`\<`string`\>

Defined in: [types.ts:56](https://github.com/rolldown/tsdown/blob/0c2b2976625e4e2e616654f385e20a07b90006ab/src/options/types.ts#L56)

Exclude directories from workspace.
Defaults to all `node_modules`, `dist`, `test`, `tests`, `temp`, and `tmp` directories.

***

### include?

> `optional` **include**: `Arrayable`\<`string`\>

Defined in: [types.ts:51](https://github.com/rolldown/tsdown/blob/0c2b2976625e4e2e616654f385e20a07b90006ab/src/options/types.ts#L51)

Workspace directories. Glob patterns are supported.
- `auto`: Automatically detect `package.json` files in the workspace.

#### Default

```ts
'auto'
```
