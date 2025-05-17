# Interface: Workspace

Defined in: [types.ts:45](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L45)

## Properties

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [types.ts:61](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L61)

Path to the workspace configuration file.

***

### exclude?

> `optional` **exclude**: `Arrayable`\<`string`\>

Defined in: [types.ts:56](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L56)

Exclude directories from workspace.
Defaults to all `node_modules`, `dist`, `test`, `tests`, `temp`, and `tmp` directories.

***

### include?

> `optional` **include**: `Arrayable`\<`string`\>

Defined in: [types.ts:51](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L51)

Workspace directories. Glob patterns are supported.
- `auto`: Automatically detect `package.json` files in the workspace.

#### Default

```ts
'auto'
```
