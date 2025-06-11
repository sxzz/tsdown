<!-- prettier-ignore-start -->
# Interface: ExportsOptions

Defined in: [types.ts:65](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L65)

## Properties

### all?

> `optional` **all**: `boolean`

Defined in: [types.ts:76](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L76)

Exports for all files.

***

### customExports()?

> `optional` **customExports**: (`exports`, `context`) => `Awaitable`\<`Record`\<`string`, `any`\>\>

Defined in: [types.ts:78](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L78)

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

Defined in: [types.ts:71](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L71)

Generate exports that link to source code during development.
- string: add as a custom condition.
- true: all conditions point to source files, and add dist exports to `publishConfig`.

<!-- prettier-ignore-end -->
