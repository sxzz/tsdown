# Interface: Options

Defined in: [options.ts:40](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L40)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [options.ts:50](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L50)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [options.ts:68](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L68)

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [options.ts:104](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L104)

Config file path

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [options.ts:72](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L72)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [options.ts:127](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L127)

Emit declaration files

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [options.ts:42](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L42)

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [options.ts:43](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L43)

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [options.ts:82](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L82)

Use a fixed extension for output files.
The extension will always be `.cjs` or `.mjs`.
Otherwise, it will depend on the package type.

#### Default

```ts
false
```

***

### format?

> `optional` **format**: `ModuleFormat` \| `ModuleFormat`[]

Defined in: [options.ts:63](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L63)

#### Default

```ts
'es'
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [options.ts:121](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L121)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [options.ts:64](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L64)

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [options.ts:147](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L147)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [options.ts:54](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L54)

***

### minify?

> `optional` **minify**: `boolean`

Defined in: [options.ts:70](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L70)

#### Default

```ts
false
```

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [options.ts:44](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L44)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [options.ts:110](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L110)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [options.ts:66](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L66)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [options.ts:87](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L87)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [options.ts:89](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L89)

***

### platform?

> `optional` **platform**: `"node"` \| `"neutral"` \| `"browser"`

Defined in: [options.ts:53](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L53)

#### Default

```ts
'node'
```

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [options.ts:98](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L98)

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [options.ts:139](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L139)

Run publint after bundling.
Requires `publint` to be installed.

***

### report?

> `optional` **report**: `boolean`

Defined in: [options.ts:145](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L145)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [options.ts:74](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L74)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [options.ts:100](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L100)

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [options.ts:115](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L115)

Skip bundling node_modules.

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [options.ts:67](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L67)

***

### target?

> `optional` **target**: `string` \| `string`[]

Defined in: [options.ts:71](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L71)

***

### treeshake?

> `optional` **treeshake**: `boolean`

Defined in: [options.ts:97](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L97)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [options.ts:51](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L51)

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [options.ts:133](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L133)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [options.ts:105](https://github.com/rolldown/tsdown/blob/0670093099b5e443b85ec2660d88f1a1967190a2/src/options.ts#L105)
