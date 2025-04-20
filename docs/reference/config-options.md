# Configuring tsdown

References for the available options in the [configuration file of `tsdown`](/guide/config-file).

### alias

- **Type:** `Record<string, string>`
- **Default:** 

***

### clean

- **Type:** `boolean | string[]`
- **Default:** `false`

***

### config

- **Type:** `boolean | string`
- **Default:** 

Config file path

***

### define

- **Type:** `Record<string, string>`
- **Default:** 

***

### dts

- **Type:** `boolean | DtsOptions`
- **Default:** `false`

Emit declaration files

***

### entry

- **Type:** `InputOption`
- **Default:** 

***

### external

- **Type:** `ExternalOption`
- **Default:** 

***

### fixedExtension

- **Type:** `boolean`
- **Default:** `false`

Use a fixed extension for output files.
The extension will always be `.cjs` or `.mjs`.
Otherwise, it will depend on the package type.

***

### format

- **Type:** `ModuleFormat | ModuleFormat[]`
- **Default:** `'esm'`

***

### fromVite

- **Type:** `boolean | 'vitest'`
- **Default:** `false`

Reuse config from Vite or Vitest (experimental)

***

### globalName

- **Type:** `string`
- **Default:** 

***

### inputOptions

- **Type:** `InputOptions | ((options: InputOptions, format: NormalizedFormat) => Awaitable<InputOptions | void | null>)`
- **Default:** 

***

### minify

- **Type:** `boolean`
- **Default:** `false`

***

### noExternal

- **Type:** `Arrayable<string | RegExp> | ((id: string, importer: string | undefined) => boolean | null | undefined | void)`
- **Default:** 

***

### onSuccess

- **Type:** `string | ((config: ResolvedOptions) => void | Promise<void>)`
- **Default:** 

You can specify command to be executed after a successful build, specially useful for Watch mode

***

### outDir

- **Type:** `string`
- **Default:** `'dist'`

***

### outExtensions

- **Type:** `OutExtensionFactory`
- **Default:** 

Custom extensions for output files.
`fixedExtension` will be overridden by this option.

***

### outputOptions

- **Type:** `OutputOptions | ((options: OutputOptions, format: NormalizedFormat) => Awaitable<OutputOptions | void | null>)`
- **Default:** 

***

### platform

- **Type:** `'node' | 'neutral' | 'browser'`
- **Default:** `'node'`

***

### plugins

- **Type:** `InputOptions['plugins']`
- **Default:** `[]`

***

### publint

- **Type:** `boolean | PublintOptions`
- **Default:** `false`

Run publint after bundling.
Requires `publint` to be installed.

***

### shims

- **Type:** `boolean`
- **Default:** `false`

***

### silent

- **Type:** `boolean`
- **Default:** `false`

***

### skipNodeModulesBundle

- **Type:** `boolean`
- **Default:** `false`

Skip bundling `node_modules`.

***

### sourcemap

- **Type:** [`Sourcemap`](./type-aliases/Sourcemap.md)
- **Default:** `false`

***

### target

- **Type:** `string | string[]`
- **Default:** 

***

### treeshake

- **Type:** `boolean`
- **Default:** `true`

***

### tsconfig

- **Type:** `string | boolean`
- **Default:** 

***

### unused

- **Type:** `boolean | UnusedOptions`
- **Default:** `false`

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

***

### watch

- **Type:** `boolean | string | string[]`
- **Default:** `false`
