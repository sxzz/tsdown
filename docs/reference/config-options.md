# Interface: Options

Defined in: [types.ts:67](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L67)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [types.ts:77](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L77)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [types.ts:102](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L102)

Clean directories before build.

Default to output directory.

#### Default

```ts
true
```

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [types.ts:178](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L178)

Config file path

***

### copy?

> `optional` **copy**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [types.ts:257](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L257)

Copy files to another directory.

#### Example

```ts
[
  'src/assets',
  { from: 'src/assets', to: 'dist/assets' },
]
```

***

### cwd?

> `optional` **cwd**: `string`

Defined in: [types.ts:285](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L285)

The working directory of the config file.
- Defaults to `process.cwd()` for root config.
- Defaults to the package directory for workspace config.

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [types.ts:129](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L129)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [types.ts:208](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L208)

Emit TypeScript declaration files (.d.ts).

By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
- If the `types` field is present in `package.json`, declaration file emission is enabled.
- If the `types` field is absent, declaration file emission is disabled by default.

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [types.ts:69](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L69)

***

### env?

> `optional` **env**: `Record`\<`string`, `any`\>

Defined in: [types.ts:240](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L240)

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

Defined in: [types.ts:70](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L70)

***

### filter?

> `optional` **filter**: `string` \| `RegExp` \| `string`[]

Defined in: [types.ts:295](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L295)

Filter workspace packages. This option is only available in workspace mode.

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [types.ts:145](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L145)

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

Defined in: [types.ts:90](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L90)

#### Default

```ts
['es']
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [types.ts:198](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L198)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [types.ts:91](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L91)

***

### hash?

> `optional` **hash**: `boolean`

Defined in: [types.ts:278](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L278)

If enabled, appends hash to chunk filenames.

#### Default

```ts
true
```

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [types.ts:259](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L259)

***

### ignoreWatch?

> `optional` **ignoreWatch**: `string` \| `string`[]

Defined in: [types.ts:181](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L181)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [types.ts:81](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L81)

***

### loader?

> `optional` **loader**: [`ModuleTypes`](./type-aliases/ModuleTypes.md)

Defined in: [types.ts:171](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L171)

Sets how input files are processed.
For example, use 'js' to treat files as JavaScript or 'base64' for images.
Lets you import or require files like images or fonts.

#### Example

```json
{ '.jpg': 'asset', '.png': 'base64' }
```

***

### minify?

> `optional` **minify**: `boolean` \| `BindingMinifyOptions` \| `"dce-only"`

Defined in: [types.ts:104](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L104)

#### Default

```ts
false
```

***

### name?

> `optional` **name**: `string`

Defined in: [types.ts:137](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L137)

The name to show in CLI output. This is useful for monorepos or workspaces.
Defaults to the package name from `package.json`.

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [types.ts:71](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L71)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [types.ts:186](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L186)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [types.ts:93](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L93)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [types.ts:150](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L150)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [types.ts:152](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L152)

***

### platform?

> `optional` **platform**: `"node"` \| `"neutral"` \| `"browser"`

Defined in: [types.ts:80](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L80)

#### Default

```ts
'node'
```

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [types.ts:161](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L161)

***

### ~~publicDir?~~

> `optional` **publicDir**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [types.ts:245](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L245)

#### Deprecated

Alias for `copy`, will be removed in the future.

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [types.ts:222](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L222)

Run publint after bundling.
Requires `publint` to be installed.

#### Default

```ts
false
```

***

### removeNodeProtocol?

> `optional` **removeNodeProtocol**: `boolean`

Defined in: [types.ts:272](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L272)

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

Defined in: [types.ts:228](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L228)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [types.ts:131](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L131)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [types.ts:174](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L174)

#### Default

```ts
false
```

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [types.ts:192](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L192)

Skip bundling `node_modules`.

#### Default

```ts
false
```

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [types.ts:95](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L95)

#### Default

```ts
false
```

***

### target?

> `optional` **target**: `string` \| `false` \| `string`[]

Defined in: [types.ts:127](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L127)

Specifies the compilation target environment(s).

Determines the JavaScript version or runtime(s) for which the code should be compiled.
If not set, defaults to the value of `engines.node` in your project's `package.json`.

Accepts a single target (e.g., `'es2020'`, `'node18'`) or an array of targets.

#### See

[https://tsdown.dev/options/target#supported-targets](https://tsdown.dev/options/target#supported-targets) for a list of valid targets and more details.

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

Defined in: [types.ts:160](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L160)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [types.ts:78](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L78)

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [types.ts:215](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L215)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

#### Default

```ts
false
```

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [types.ts:180](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L180)

#### Default

```ts
false
```

***

### workspace?

> `optional` **workspace**: `true` \| [`Workspace`](workspace.md) \| `Arrayable`\<`string`\>

Defined in: [types.ts:291](https://github.com/rolldown/tsdown/blob/8e34537881b28d8afa04a9d1aa70982a6e795f75/src/options/types.ts#L291)

**[experimental]** Enable workspace mode.
This allows you to build multiple packages in a monorepo.
