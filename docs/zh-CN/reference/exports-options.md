<!-- prettier-ignore-start -->
# Interface: ExportsOptions

Defined in: [src/options/types.ts:66](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L66)

## Properties

### all?

> `optional` **all**: `boolean`

Defined in: [src/options/types.ts:77](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L77)

Exports for all files.

***

### customExports()?

> `optional` **customExports**: (`exports`, `context`) => `Awaitable`\<`Record`\<`string`, `any`\>\>

Defined in: [src/options/types.ts:79](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L79)

#### Parameters

##### exports

`Record`\<`string`, `any`\>

##### context

###### chunks

`TsdownChunks`

###### isPublish

`boolean`

###### outDir

`string`

###### pkg

`PackageJson`

#### Returns

`Awaitable`\<`Record`\<`string`, `any`\>\>

***

### devExports?

> `optional` **devExports**: `string` \| `boolean`

Defined in: [src/options/types.ts:72](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L72)

Generate exports that link to source code during development.
- string: add as a custom condition.
- true: all conditions point to source files, and add dist exports to `publishConfig`.

<!-- prettier-ignore-end -->
