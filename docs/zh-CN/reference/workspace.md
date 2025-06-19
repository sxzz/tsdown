<!-- prettier-ignore-start -->
# Interface: Workspace

Defined in: [types.ts:47](https://github.com/rolldown/tsdown/blob/0978c68bd505c76d7e3097572cd652f81c23f97e/src/options/types.ts#L47)

## Properties

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [types.ts:63](https://github.com/rolldown/tsdown/blob/0978c68bd505c76d7e3097572cd652f81c23f97e/src/options/types.ts#L63)

Path to the workspace configuration file.

***

### exclude?

> `optional` **exclude**: `Arrayable`\<`string`\>

Defined in: [types.ts:58](https://github.com/rolldown/tsdown/blob/0978c68bd505c76d7e3097572cd652f81c23f97e/src/options/types.ts#L58)

Exclude directories from workspace.
Defaults to all `node_modules`, `dist`, `test`, `tests`, `temp`, and `tmp` directories.

***

### include?

> `optional` **include**: `Arrayable`\<`string`\>

Defined in: [types.ts:53](https://github.com/rolldown/tsdown/blob/0978c68bd505c76d7e3097572cd652f81c23f97e/src/options/types.ts#L53)

Workspace directories. Glob patterns are supported.
- `auto`: Automatically detect `package.json` files in the workspace.

#### Default

```ts
'auto'
```

<!-- prettier-ignore-end -->
