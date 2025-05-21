# Interface: Workspace

Defined in: [types.ts:46](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L46)

## Properties

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [types.ts:62](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L62)

Path to the workspace configuration file.

***

### exclude?

> `optional` **exclude**: `Arrayable`\<`string`\>

Defined in: [types.ts:57](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L57)

Exclude directories from workspace.
Defaults to all `node_modules`, `dist`, `test`, `tests`, `temp`, and `tmp` directories.

***

### include?

> `optional` **include**: `Arrayable`\<`string`\>

Defined in: [types.ts:52](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L52)

Workspace directories. Glob patterns are supported.
- `auto`: Automatically detect `package.json` files in the workspace.

#### Default

```ts
'auto'
```
