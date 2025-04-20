# Command Line Interface

All CLI flags can also be set in the configuration file for better reusability and maintainability in complex projects. Refer to the [Config File](../guide/config-file.md) documentation for more details.

## `[...files]`

Specify entry files as command arguments. This is equivalent to setting the `entry` option in the configuration file. For example:

```bash
tsdown src/index.ts src/util.ts
```

This will bundle `src/index.ts` and `src/util.ts` as separate entry points. See the [Entry](../guide/entry.md) documentation for more details.

## `-c, --config <filename>`

Specify a custom configuration file. Use this option to define the path to the configuration file you want to use.

See also [Config File](../guide/config-file.md).

## `--no-config`

Disable loading a configuration file. This is useful if you want to rely solely on command-line options or default settings.

See also [Disabling the Config File](../guide/config-file.md#disabling-the-config-file).

## `--format <format>`

Define the bundle format. Supported formats include:

- `esm` (ECMAScript Modules)
- `cjs` (CommonJS)
- `iife` (Immediately Invoked Function Expression)

See also [Output Format](../guide/output-format.md).

## `--clean`

Clean the output directory before building. This removes all files in the output directory to ensure a fresh build.

See also [Cleaning](../guide/cleaning.md).

## `--minify`

Enable minification of the output bundle to reduce file size. Minification removes unnecessary characters and optimizes the code for production.

See also [Minification](../guide/minification.md).

## `--target <target>`

Specify the JavaScript target version for the bundle. Examples include:

- `es2015`
- `esnext`

See also [Target](../guide/target.md).

## `--silent`

Suppress non-error logs during the build process. Only error messages will be displayed, making it easier to focus on critical issues.

See also [Silent Mode](../guide/silent-mode.md).

## `-d, --out-dir <dir>`

Specify the output directory for the bundled files. Use this option to customize where the output files are written.

See also [Output Directory](../guide/output-directory.md).

## `--treeshake`, `--no-treeshake`

Enable or disable tree shaking. Tree shaking removes unused code from the final bundle, reducing its size and improving performance.

See also [Tree Shaking](../guide/tree-shaking.md).

## `--sourcemap`

Generate source maps for the bundled files. Source maps help with debugging by mapping the output code back to the original source files.

See also [Source Maps](../guide/sourcemap.md).

## `--shims`

Enable CommonJS (CJS) and ECMAScript Module (ESM) shims. This ensures compatibility between different module systems.

See also [Shims](../guide/shims.md).

## `--platform <platform>`

Specify the target platform for the bundle. Supported platforms include:

- `node` (Node.js)
- `browser` (Web browsers)
- `neutral` (Platform-agnostic)

See also [Platform](../guide/platform.md).

## `--dts`

Generate TypeScript declaration (`.d.ts`) files for the bundled code. This is useful for libraries that need to provide type definitions.

See also [Declaration Files](../guide/dts.md).

## `--publint`

Enable `publint` to validate your package for publishing. This checks for common issues in your package configuration, ensuring it meets best practices.

## `--unused`

Enable unused dependencies checking. This helps identify dependencies in your project that are not being used, allowing you to clean up your `package.json`.

## `-w, --watch [path]`

Enable watch mode to automatically rebuild your project when files change. Optionally, specify a path to watch for changes.

See also [Watch Mode](../guide/watch-mode.md).

## `--from-vite [vitest]`

Reuse configuration from Vite or Vitest. This allows you to extend or integrate with existing Vite or Vitest configurations seamlessly.

See also [Extending Vite or Vitest Config](../guide/config-file.md#extending-vite-or-vitest-config-experimental).
