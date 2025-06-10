<!-- prettier-ignore-start -->
# Interface: Options

Defined in: [src/options/types.ts:118](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L118)

Options for tsdown.

## Properties

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Defined in: [src/options/types.ts:131](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L131)

***

### attw?

> `optional` **attw**: `boolean` \| [`AttwOptions`](attw-options.md)

Defined in: [src/options/types.ts:304](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L304)

Run `arethetypeswrong` after bundling.
Requires `@arethetypeswrong/core` to be installed.

#### Default

```ts
false
```

#### See

https://github.com/arethetypeswrong/arethetypeswrong.github.io

***

### clean?

> `optional` **clean**: `boolean` \| `string`[]

Defined in: [src/options/types.ts:166](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L166)

Clean directories before build.

Default to output directory.

#### Default

```ts
true
```

***

### config?

> `optional` **config**: `string` \| `boolean`

Defined in: [src/options/types.ts:249](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L249)

Config file path

***

### copy?

> `optional` **copy**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [src/options/types.ts:347](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L347)

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

Defined in: [src/options/types.ts:375](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L375)

The working directory of the config file.
- Defaults to `process.cwd()` for root config.
- Defaults to the package directory for workspace config.

***

### define?

> `optional` **define**: `Record`\<`string`, `string`\>

Defined in: [src/options/types.ts:200](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L200)

***

### dts?

> `optional` **dts**: `boolean` \| `Options`

Defined in: [src/options/types.ts:281](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L281)

Emit TypeScript declaration files (.d.ts).

By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
- If the `types` field is present in `package.json`, declaration file emission is enabled.
- If the `types` field is absent, declaration file emission is disabled by default.

***

### entry?

> `optional` **entry**: `InputOption`

Defined in: [src/options/types.ts:123](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L123)

Defaults to `'src/index.ts'` if it exists.

***

### env?

> `optional` **env**: `Record`\<`string`, `any`\>

Defined in: [src/options/types.ts:330](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L330)

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

Defined in: [src/options/types.ts:318](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L318)

**[experimental]** Generate package exports for `package.json`.

This will set the `main`, `module`, `types`, `exports` fields in `package.json`
to point to the generated files.

***

### external?

> `optional` **external**: `ExternalOption`

Defined in: [src/options/types.ts:124](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L124)

***

### filter?

> `optional` **filter**: `string` \| `RegExp` \| `string`[]

Defined in: [src/options/types.ts:385](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L385)

Filter workspace packages. This option is only available in workspace mode.

***

### fixedExtension?

> `optional` **fixedExtension**: `boolean`

Defined in: [src/options/types.ts:216](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L216)

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

Defined in: [src/options/types.ts:154](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L154)

#### Default

```ts
['es']
```

***

### fromVite?

> `optional` **fromVite**: `boolean` \| `"vitest"`

Defined in: [src/options/types.ts:271](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L271)

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

***

### globalName?

> `optional` **globalName**: `string`

Defined in: [src/options/types.ts:155](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L155)

***

### hash?

> `optional` **hash**: `boolean`

Defined in: [src/options/types.ts:368](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L368)

If enabled, appends hash to chunk filenames.

#### Default

```ts
true
```

***

### hooks?

> `optional` **hooks**: `Partial`\<`TsdownHooks`\> \| (`hooks`) => `Awaitable`\<`void`\>

Defined in: [src/options/types.ts:349](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L349)

***

### ignoreWatch?

> `optional` **ignoreWatch**: `string` \| `string`[]

Defined in: [src/options/types.ts:252](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L252)

***

### inputOptions?

> `optional` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

Defined in: [src/options/types.ts:145](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L145)

***

### loader?

> `optional` **loader**: [`ModuleTypes`](./type-aliases/ModuleTypes.md)

Defined in: [src/options/types.ts:242](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L242)

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

Defined in: [src/options/types.ts:168](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L168)

#### Default

```ts
false
```

***

### name?

> `optional` **name**: `string`

Defined in: [src/options/types.ts:208](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L208)

The name to show in CLI output. This is useful for monorepos or workspaces.
Defaults to the package name from `package.json`.

***

### noExternal?

> `optional` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

Defined in: [src/options/types.ts:125](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L125)

***

### onSuccess?

> `optional` **onSuccess**: `string` \| (`config`, `signal`) => `void` \| `Promise`\<`void`\>

Defined in: [src/options/types.ts:257](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L257)

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir?

> `optional` **outDir**: `string`

Defined in: [src/options/types.ts:157](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L157)

#### Default

```ts
'dist'
```

***

### outExtensions?

> `optional` **outExtensions**: `OutExtensionFactory`

Defined in: [src/options/types.ts:221](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L221)

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions?

> `optional` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

Defined in: [src/options/types.ts:223](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L223)

***

### platform?

> `optional` **platform**: `"browser"` \| `"node"` \| `"neutral"`

Defined in: [src/options/types.ts:144](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L144)

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

Defined in: [src/options/types.ts:232](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L232)

***

### ~~publicDir?~~

> `optional` **publicDir**: `CopyOptions` \| `CopyOptionsFn`

Defined in: [src/options/types.ts:335](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L335)

#### Deprecated

Alias for `copy`, will be removed in the future.

***

### publint?

> `optional` **publint**: `boolean` \| `Options`

Defined in: [src/options/types.ts:295](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L295)

Run publint after bundling.
Requires `publint` to be installed.

#### Default

```ts
false
```

***

### removeNodeProtocol?

> `optional` **removeNodeProtocol**: `boolean`

Defined in: [src/options/types.ts:362](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L362)

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

Defined in: [src/options/types.ts:310](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L310)

Enable size reporting after bundling.

#### Default

```ts
true
```

***

### shims?

> `optional` **shims**: `boolean`

Defined in: [src/options/types.ts:202](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L202)

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [src/options/types.ts:245](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L245)

#### Default

```ts
false
```

***

### skipNodeModulesBundle?

> `optional` **skipNodeModulesBundle**: `boolean`

Defined in: [src/options/types.ts:265](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L265)

Skip bundling `node_modules`.

#### Default

```ts
false
```

***

### sourcemap?

> `optional` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

Defined in: [src/options/types.ts:159](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L159)

#### Default

```ts
false
```

***

### target?

> `optional` **target**: `string` \| `false` \| `string`[]

Defined in: [src/options/types.ts:191](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L191)

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

Defined in: [src/options/types.ts:231](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L231)

#### Default

```ts
true
```

***

### tsconfig?

> `optional` **tsconfig**: `string` \| `boolean`

Defined in: [src/options/types.ts:132](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L132)

***

### unbundle?

> `optional` **unbundle**: `boolean`

Defined in: [src/options/types.ts:198](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L198)

Determines whether unbundle mode is enabled.
When set to true, the output files will mirror the input file structure.

#### Default

```ts
false
```

***

### unused?

> `optional` **unused**: `boolean` \| `Options`

Defined in: [src/options/types.ts:288](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L288)

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

#### Default

```ts
false
```

***

### watch?

> `optional` **watch**: `string` \| `boolean` \| `string`[]

Defined in: [src/options/types.ts:251](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L251)

#### Default

```ts
false
```

***

### workspace?

> `optional` **workspace**: `true` \| [`Workspace`](workspace.md) \| `Arrayable`\<`string`\>

Defined in: [src/options/types.ts:381](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L381)

**[experimental]** Enable workspace mode.
This allows you to build multiple packages in a monorepo.

<!-- prettier-ignore-end -->
