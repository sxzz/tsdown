<!-- prettier-ignore-start -->
# Interface: Workspace

Defined in: [src/options/types.ts:47](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L47)

## Properties

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [src/options/types.ts:63](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L63)

Path to the workspace configuration file.

***

### exclude?

> `optional` **exclude**: `Arrayable`\<`string`\>

Defined in: [src/options/types.ts:58](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L58)

Exclude directories from workspace.
Defaults to all `node_modules`, `dist`, `test`, `tests`, `temp`, and `tmp` directories.

***

### include?

> `optional` **include**: `Arrayable`\<`string`\>

Defined in: [src/options/types.ts:53](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L53)

Workspace directories. Glob patterns are supported.
- `auto`: Automatically detect `package.json` files in the workspace.

#### Default

```ts
'auto'
```

<!-- prettier-ignore-end -->
