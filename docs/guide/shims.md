# Shims

Shims are small pieces of code that provide compatibility between different module systems, such as CommonJS (CJS) and ECMAScript Modules (ESM). In `tsdown`, shims are used to bridge the gap between these systems, ensuring your code runs smoothly across different environments.

## CommonJS Variables in ESM

In CommonJS, `__dirname` and `__filename` are built-in variables that provide the directory and file path of the current module. However, these variables are **not available in ESM** by default.

To improve compatibility, when the `shims` option is enabled, `tsdown` will automatically generate these variables for ESM output. For example:

```js
console.log(__dirname) // Available in ESM when shims are enabled
console.log(__filename) // Available in ESM when shims are enabled
```

### Runtime Overhead

The generated shims for `__dirname` and `__filename` introduce a very small runtime overhead. However, if these variables are not used in your code, they will be automatically removed during the bundling process, ensuring no unnecessary code is included.

## ESM Variables in CommonJS

Even if the `shims` option is **not enabled**, `tsdown` will automatically shim the following ESM-specific variables in CommonJS output:

- `import.meta.url`
- `import.meta.dirname`
- `import.meta.filename`

These variables are provided to ensure compatibility when using ESM-like features in CommonJS environments. For example:

```js
console.log(import.meta.url)
console.log(import.meta.dirname)
console.log(import.meta.filename)
```

This behavior is always enabled for CommonJS output, so you don't need to configure anything to use these variables.

## Enabling Shims

To enable shims for `__dirname` and `__filename` in ESM output, use the `--shims` option in the CLI or set `shims: true` in the configuration file:

### CLI

```bash
tsdown --shims
```

### Config File

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  shims: true,
})
```

## Summary

- **`__dirname` and `__filename` in ESM**: Automatically shimmed when the `shims` option is enabled.
- **`import.meta.url`, `import.meta.dirname`, and `import.meta.filename` in CommonJS**: Always shimmed, even if the `shims` option is disabled.
- **Runtime Overhead**: Minimal, and unused shims are automatically removed during bundling.

Shims provide a convenient way to ensure compatibility between CommonJS and ESM, making it easier to write cross-environment code without worrying about module system differences.
