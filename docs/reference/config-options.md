# Interface: Options

Defined in: [options.ts:43](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L43)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [options.ts:53](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L53)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [options.ts:71](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L71)

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [options.ts:107](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L107)

Config file path

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [options.ts:75](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L75)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [options.ts:130](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L130)

Emit declaration files

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [options.ts:45](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L45)

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [options.ts:46](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L46)

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [options.ts:85](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L85)

Use a fixed extension for output files.
The extension will always be `.cjs` or `.mjs`.
Otherwise, it will depend on the package type.

#### Default

```ts
false
```

***

### format?

> `optional` **format**: [`Format`](./type-aliases/Format.md) \| [`Format`](./type-aliases/Format.md)[]

Defined in: [options.ts:66](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L66)

#### Default

```ts
'es'
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [options.ts:124](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L124)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [options.ts:67](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L67)

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [options.ts:150](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L150)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [options.ts:57](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L57)

***

### minify?

> `optional` **minify**: `boolean`

Defined in: [options.ts:73](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L73)

#### Default

```ts
false
```

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [options.ts:47](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L47)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [options.ts:113](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L113)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [options.ts:69](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L69)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [options.ts:90](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L90)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [options.ts:92](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L92)

***

### platform?

> `optional` **platform**: `"node"` \| `"neutral"` \| `"browser"`

Defined in: [options.ts:56](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L56)

#### Default

```ts
'node'
```

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [options.ts:101](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L101)

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [options.ts:142](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L142)

Run publint after bundling.
Requires `publint` to be installed.

***

### report?

> `optional` **report**: `boolean` \| `ReportOptions`

Defined in: [options.ts:148](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L148)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [options.ts:77](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L77)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [options.ts:103](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L103)

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [options.ts:118](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L118)

Skip bundling node_modules.

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [options.ts:70](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L70)

***

### target?

> `optional` **target**: `string` \| `string`[]

Defined in: [options.ts:74](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L74)

***

### treeshake?

> `optional` **treeshake**: `boolean`

Defined in: [options.ts:100](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L100)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [options.ts:54](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L54)

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [options.ts:136](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L136)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [options.ts:108](https://github.com/rolldown/tsdown/blob/4b95e82619cbfac9f7af2b67632779e053e54c4a/src/options.ts#L108)
