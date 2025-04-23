# Interface: Options

Defined in: [options.ts:42](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L42)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [options.ts:52](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L52)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [options.ts:70](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L70)

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [options.ts:106](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L106)

Config file path

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [options.ts:74](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L74)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [options.ts:129](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L129)

Emit declaration files

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [options.ts:44](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L44)

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [options.ts:45](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L45)

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [options.ts:84](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L84)

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

Defined in: [options.ts:65](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L65)

#### Default

```ts
'es'
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [options.ts:123](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L123)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [options.ts:66](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L66)

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [options.ts:149](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L149)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [options.ts:56](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L56)

***

### minify?

> `optional` **minify**: `boolean`

Defined in: [options.ts:72](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L72)

#### Default

```ts
false
```

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [options.ts:46](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L46)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [options.ts:112](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L112)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [options.ts:68](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L68)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [options.ts:89](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L89)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [options.ts:91](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L91)

***

### platform?

> `optional` **platform**: `"node"` \| `"neutral"` \| `"browser"`

Defined in: [options.ts:55](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L55)

#### Default

```ts
'node'
```

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [options.ts:100](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L100)

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [options.ts:141](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L141)

Run publint after bundling.
Requires `publint` to be installed.

***

### report?

> `optional` **report**: `boolean`

Defined in: [options.ts:147](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L147)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [options.ts:76](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L76)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [options.ts:102](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L102)

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [options.ts:117](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L117)

Skip bundling node_modules.

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [options.ts:69](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L69)

***

### target?

> `optional` **target**: `string` \| `string`[]

Defined in: [options.ts:73](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L73)

***

### treeshake?

> `optional` **treeshake**: `boolean`

Defined in: [options.ts:99](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L99)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [options.ts:53](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L53)

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [options.ts:135](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L135)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [options.ts:107](https://github.com/rolldown/tsdown/blob/8662d4d1063ce13b59b875a592f948831764f601/src/options.ts#L107)
