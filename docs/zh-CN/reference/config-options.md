# Interface: Options

Defined in: [options.ts:48](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L48)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [options.ts:58](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L58)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [options.ts:81](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L81)

Clean directories before build.

Default to output directory.

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [options.ts:117](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L117)

Config file path

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [options.ts:85](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L85)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [options.ts:144](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L144)

Emit TypeScript declaration files (.d.ts).

By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
- If the `types` field is present in `package.json`, declaration file emission is enabled.
- If the `types` field is absent, declaration file emission is disabled by default.

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [options.ts:50](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L50)

***

### env?

> `optional` **env**: `Record`\<`string`, `any`\>

Defined in: [options.ts:174](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L174)

Compile-time env variables.

#### Example

```ts
{
  "DEBUG": true,
  "NODE_ENV": "production"
}
```

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [options.ts:51](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L51)

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [options.ts:95](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L95)

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

Defined in: [options.ts:71](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L71)

#### Default

```ts
'es'
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [options.ts:134](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L134)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [options.ts:72](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L72)

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [options.ts:176](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L176)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [options.ts:62](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L62)

***

### minify?

> `optional` **minify**: `boolean` \| `BindingMinifyOptions` \| `"dce-only"`

Defined in: [options.ts:83](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L83)

#### Default

```ts
false
```

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [options.ts:52](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L52)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [options.ts:123](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L123)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [options.ts:74](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L74)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [options.ts:100](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L100)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [options.ts:102](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L102)

***

### platform?

> `optional` **platform**: `"node"` \| `"neutral"` \| `"browser"`

Defined in: [options.ts:61](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L61)

#### Default

```ts
'node'
```

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [options.ts:111](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L111)

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [options.ts:156](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L156)

Run publint after bundling.
Requires `publint` to be installed.

***

### report?

> `optional` **report**: `boolean` \| `ReportOptions`

Defined in: [options.ts:162](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L162)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [options.ts:87](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L87)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [options.ts:113](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L113)

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [options.ts:128](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L128)

Skip bundling node_modules.

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [options.ts:75](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L75)

***

### target?

> `optional` **target**: `string` \| `string`[]

Defined in: [options.ts:84](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L84)

***

### treeshake?

> `optional` **treeshake**: `boolean`

Defined in: [options.ts:110](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L110)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [options.ts:59](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L59)

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [options.ts:150](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L150)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [options.ts:118](https://github.com/rolldown/tsdown/blob/d75cd32d9160588e3d3446bf4f6be99024c1b65e/src/options.ts#L118)
