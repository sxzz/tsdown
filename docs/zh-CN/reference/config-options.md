# Interface: Options

Defined in: [types.ts:92](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L92)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [types.ts:102](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L102)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [types.ts:127](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L127)

Clean directories before build.

Default to output directory.

#### Default

```ts
true
```

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [types.ts:203](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L203)

Config file path

***

### copy?

> `optional` **copy**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [types.ts:290](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L290)

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

Defined in: [types.ts:318](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L318)

The working directory of the config file.
- Defaults to `process.cwd()` for root config.
- Defaults to the package directory for workspace config.

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [types.ts:154](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L154)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [types.ts:233](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L233)

Emit TypeScript declaration files (.d.ts).

By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
- If the `types` field is present in `package.json`, declaration file emission is enabled.
- If the `types` field is absent, declaration file emission is disabled by default.

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [types.ts:94](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L94)

***

### env?

> `optional` **env**: `Record`\<`string`, `any`\>

Defined in: [types.ts:273](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L273)

Compile-time env variables.

#### Example

```json
{
  "DEBUG": true,
  "NODE_ENV": "production"
}
```

***

### exports?

> `optional` **exports**: `boolean` \| [`ExportsOptions`](exports-options.md)

Defined in: [types.ts:261](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L261)

**[experimental]** Generate package exports for `package.json`.

This will set the `main`, `module`, `types`, `exports` fields in `package.json`
to point to the generated files.

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [types.ts:95](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L95)

***

### filter?

> `optional` **filter**: `string` \| `RegExp` \| `string`[]

Defined in: [types.ts:328](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L328)

Filter workspace packages. This option is only available in workspace mode.

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [types.ts:170](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L170)

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

Defined in: [types.ts:115](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L115)

#### Default

```ts
['es']
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [types.ts:223](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L223)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [types.ts:116](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L116)

***

### hash?

> `optional` **hash**: `boolean`

Defined in: [types.ts:311](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L311)

If enabled, appends hash to chunk filenames.

#### Default

```ts
true
```

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [types.ts:292](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L292)

***

### ignoreWatch?

> `optional` **ignoreWatch**: `string` \| `string`[]

Defined in: [types.ts:206](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L206)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [types.ts:106](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L106)

***

### loader?

> `optional` **loader**: [`ModuleTypes`](./type-aliases/ModuleTypes.md)

Defined in: [types.ts:196](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L196)

Sets how input files are processed.
For example, use 'js' to treat files as JavaScript or 'base64' for images.
Lets you import or require files like images or fonts.

#### Example

```json
{ '.jpg': 'asset', '.png': 'base64' }
```

***

### minify?

> `optional` **minify**: `boolean` \| `"dce-only"` \| `BindingMinifyOptions`

Defined in: [types.ts:129](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L129)

#### Default

```ts
false
```

***

### name?

> `optional` **name**: `string`

Defined in: [types.ts:162](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L162)

The name to show in CLI output. This is useful for monorepos or workspaces.
Defaults to the package name from `package.json`.

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [types.ts:96](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L96)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [types.ts:211](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L211)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [types.ts:118](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L118)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [types.ts:175](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L175)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [types.ts:177](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L177)

***

### platform?

> `optional` **platform**: `"browser"` \| `"node"` \| `"neutral"`

Defined in: [types.ts:105](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L105)

#### Default

```ts
'node'
```

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [types.ts:186](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L186)

***

### ~~publicDir?~~

> `optional` **publicDir**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [types.ts:278](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L278)

#### Deprecated

Alias for `copy`, will be removed in the future.

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [types.ts:247](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L247)

Run publint after bundling.
Requires `publint` to be installed.

#### Default

```ts
false
```

***

### removeNodeProtocol?

> `optional` **removeNodeProtocol**: `boolean`

Defined in: [types.ts:305](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L305)

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

Defined in: [types.ts:253](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L253)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [types.ts:156](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L156)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [types.ts:199](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L199)

#### Default

```ts
false
```

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [types.ts:217](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L217)

Skip bundling `node_modules`.

#### Default

```ts
false
```

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [types.ts:120](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L120)

#### Default

```ts
false
```

***

### target?

> `optional` **target**: `string` \| `false` \| `string`[]

Defined in: [types.ts:152](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L152)

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

Defined in: [types.ts:185](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L185)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [types.ts:103](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L103)

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [types.ts:240](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L240)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

#### Default

```ts
false
```

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [types.ts:205](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L205)

#### Default

```ts
false
```

***

### workspace?

> `optional` **workspace**: `true` \| [`Workspace`](workspace.md) \| `Arrayable`\<`string`\>

Defined in: [types.ts:324](https://github.com/rolldown/tsdown/blob/a3947963053f5e4edcfa56a84454370df143e046/src/options/types.ts#L324)

**[experimental]** Enable workspace mode.
This allows you to build multiple packages in a monorepo.
