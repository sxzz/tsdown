<!-- prettier-ignore-start -->
# Interface: Options

Defined in: [types.ts:92](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L92)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [types.ts:105](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L105)

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [types.ts:140](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L140)

Clean directories before build.

Default to output directory.

#### Default

```ts
true
```

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [types.ts:223](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L223)

Config file path

***

### copy?

> `optional` **copy**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [types.ts:310](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L310)

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

Defined in: [types.ts:338](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L338)

The working directory of the config file.
- Defaults to `process.cwd()` for root config.
- Defaults to the package directory for workspace config.

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [types.ts:174](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L174)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [types.ts:253](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L253)

Emit TypeScript declaration files (.d.ts).

By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
- If the `types` field is present in `package.json`, declaration file emission is enabled.
- If the `types` field is absent, declaration file emission is disabled by default.

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [types.ts:97](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L97)

Defaults to `'src/index.ts'` if it exists.

***

### env?

> `optional` **env**: `Record`\<`string`, `any`\>

Defined in: [types.ts:293](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L293)

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

Defined in: [types.ts:281](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L281)

**[experimental]** Generate package exports for `package.json`.

This will set the `main`, `module`, `types`, `exports` fields in `package.json`
to point to the generated files.

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [types.ts:98](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L98)

***

### filter?

> `optional` **filter**: `string` \| `RegExp` \| `string`[]

Defined in: [types.ts:348](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L348)

Filter workspace packages. This option is only available in workspace mode.

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [types.ts:190](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L190)

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

Defined in: [types.ts:128](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L128)

#### Default

```ts
['es']
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [types.ts:243](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L243)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [types.ts:129](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L129)

***

### hash?

> `optional` **hash**: `boolean`

Defined in: [types.ts:331](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L331)

If enabled, appends hash to chunk filenames.

#### Default

```ts
true
```

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [types.ts:312](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L312)

***

### ignoreWatch?

> `optional` **ignoreWatch**: `string` \| `string`[]

Defined in: [types.ts:226](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L226)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [types.ts:119](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L119)

***

### loader?

> `optional` **loader**: [`ModuleTypes`](./type-aliases/ModuleTypes.md)

Defined in: [types.ts:216](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L216)

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

Defined in: [types.ts:142](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L142)

#### Default

```ts
false
```

***

### name?

> `optional` **name**: `string`

Defined in: [types.ts:182](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L182)

The name to show in CLI output. This is useful for monorepos or workspaces.
Defaults to the package name from `package.json`.

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [types.ts:99](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L99)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

Defined in: [types.ts:231](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L231)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [types.ts:131](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L131)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [types.ts:195](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L195)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [types.ts:197](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L197)

***

### platform?

> `optional` **platform**: `"browser"` \| `"node"` \| `"neutral"`

Defined in: [types.ts:118](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L118)

Specifies the target runtime platform for the build.

- `node`: Node.js and compatible runtimes (e.g., Deno, Bun).
  For CJS format, this is always set to `node` and cannot be changed.
- `neutral`: A platform-agnostic target with no specific runtime assumptions.
- `browser`: Web browsers.

#### Default

```ts
'node'
```

#### See

https://tsdown.dev/options/platform

***

### plugins?

> `optional` **plugins**: `RolldownPluginOption`\<`any`\>

Defined in: [types.ts:206](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L206)

***

### ~~publicDir?~~

> `optional` **publicDir**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [types.ts:298](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L298)

#### Deprecated

Alias for `copy`, will be removed in the future.

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [types.ts:267](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L267)

Run publint after bundling.
Requires `publint` to be installed.

#### Default

```ts
false
```

***

### removeNodeProtocol?

> `optional` **removeNodeProtocol**: `boolean`

Defined in: [types.ts:325](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L325)

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

Defined in: [types.ts:273](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L273)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [types.ts:176](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L176)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [types.ts:219](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L219)

#### Default

```ts
false
```

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [types.ts:237](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L237)

Skip bundling `node_modules`.

#### Default

```ts
false
```

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [types.ts:133](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L133)

#### Default

```ts
false
```

***

### target?

> `optional` **target**: `string` \| `false` \| `string`[]

Defined in: [types.ts:165](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L165)

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

Defined in: [types.ts:205](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L205)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [types.ts:106](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L106)

***

### unbundle?

> `optional` **unbundle**: `boolean`

Defined in: [types.ts:172](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L172)

Determines whether unbundle mode is enabled.
When set to true, the output files will mirror the input file structure.

#### Default

```ts
false
```

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [types.ts:260](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L260)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

#### Default

```ts
false
```

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [types.ts:225](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L225)

#### Default

```ts
false
```

***

### workspace?

> `optional` **workspace**: `true` \| [`Workspace`](workspace.md) \| `Arrayable`\<`string`\>

Defined in: [types.ts:344](https://github.com/rolldown/tsdown/blob/96c38d9d1821d84b8a238b5a77ff1b157ea1f11f/src/options/types.ts#L344)

**[experimental]** Enable workspace mode.
This allows you to build multiple packages in a monorepo.

<!-- prettier-ignore-end -->
