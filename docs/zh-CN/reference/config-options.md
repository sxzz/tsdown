# Interface: Options

Defined in: [options.ts:50](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L50)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [options.ts:60](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L60)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [options.ts:85](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L85)

Clean directories before build.

Default to output directory.

#### Default

```ts
true
```

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [options.ts:145](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L145)

Config file path

***

### copy?

> `optional` **copy**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [options.ts:223](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L223)

Copy files to another directory.

#### Example

```ts
[
  'src/assets',
  { from: 'src/assets', to: 'dist/assets' },
]
```

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [options.ts:112](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L112)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [options.ts:174](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L174)

Emit TypeScript declaration files (.d.ts).

By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
- If the `types` field is present in `package.json`, declaration file emission is enabled.
- If the `types` field is absent, declaration file emission is disabled by default.

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [options.ts:52](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L52)

***

### env?

> `optional` **env**: `Record`\<`string`, `any`\>

Defined in: [options.ts:206](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L206)

Compile-time env variables.

#### Example

```json
{
  "DEBUG": true,
  "NODE_ENV": "production"
}
```

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [options.ts:53](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L53)

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [options.ts:122](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L122)

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

Defined in: [options.ts:73](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L73)

#### Default

```ts
['es']
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [options.ts:164](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L164)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [options.ts:74](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L74)

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [options.ts:225](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L225)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [options.ts:64](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L64)

***

### minify?

> `optional` **minify**: `boolean` \| `BindingMinifyOptions` \| `"dce-only"`

Defined in: [options.ts:87](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L87)

#### Default

```ts
false
```

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [options.ts:54](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L54)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [options.ts:152](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L152)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [options.ts:76](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L76)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [options.ts:127](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L127)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [options.ts:129](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L129)

***

### platform?

> `optional` **platform**: `"node"` \| `"neutral"` \| `"browser"`

Defined in: [options.ts:63](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L63)

#### Default

```ts
'node'
```

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [options.ts:138](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L138)

***

### ~~publicDir?~~

> `optional` **publicDir**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [options.ts:211](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L211)

#### Deprecated

Alias for `copy`, will be removed in the future.

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [options.ts:188](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L188)

Run publint after bundling.
Requires `publint` to be installed.

#### Default

```ts
false
```

***

### removeNodeProtocol?

> `optional` **removeNodeProtocol**: `boolean`

Defined in: [options.ts:238](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L238)

If enabled, strips the `node:` protocol prefix from import source.

#### Default

```ts
false
```

#### Example

```ts
// With removeNodeProtocol enabled:
import('node:fs'); // becomes import('fs')
```

***

### report?

> `optional` **report**: `boolean` \| `ReportOptions`

Defined in: [options.ts:194](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L194)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [options.ts:114](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L114)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [options.ts:141](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L141)

#### Default

```ts
false
```

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [options.ts:158](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L158)

Skip bundling `node_modules`.

#### Default

```ts
false
```

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [options.ts:78](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L78)

#### Default

```ts
false
```

***

### target?

> `optional` **target**: `string` \| `string`[]

Defined in: [options.ts:110](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L110)

Specifies the compilation target environment(s).

Determines the JavaScript version or runtime(s) for which the code should be compiled.
If not set, defaults to the value of `engines.node` in your project's `package.json`.

Accepts a single target (e.g., `'es2020'`, `'node18'`) or an array of targets.

#### See

[https://tsdown.dev/guide/target#supported-targets](https://tsdown.dev/guide/target#supported-targets) for a list of valid targets and more details.

#### Examples

```jsonc
// Target a single environment
{ "target": "node18" }
```

```jsonc
// Target multiple environments
{ "target": ["node18", "es2020"] }
```

***

### treeshake?

> `optional` **treeshake**: `boolean`

Defined in: [options.ts:137](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L137)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [options.ts:61](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L61)

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [options.ts:181](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L181)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

#### Default

```ts
false
```

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [options.ts:147](https://github.com/rolldown/tsdown/blob/0f71a8dc0229b7ba9c44a19dc9cf6d7c3566fca2/src/options.ts#L147)

#### Default

```ts
false
```
