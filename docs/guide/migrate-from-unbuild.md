# Migrate from unbuild

[unbuild](https://github.com/unjs/unbuild) is a popular unified JavaScript build system from the unjs ecosystem. If you're currently using `unbuild` and want to migrate to `tsdown`, the process is straightforward thanks to the dedicated `migrate` command with the `--from unbuild` option:

```bash
npx tsdown migrate --from unbuild
```

> [!WARNING]
> Please save your changes before migration. The migration process may modify your configuration files, so it's important to ensure all your changes are committed or backed up beforehand.

## What Gets Migrated

The migration process handles:

1. **Package.json** changes:
   - Dependencies: Updates `unbuild` dependencies to `tsdown`
   - Scripts: Updates any scripts using `unbuild` to use `tsdown` instead
   - Configuration: Migrates any `unbuild` configuration in package.json to `tsdown` format

2. **Config Files**:
   - Converts `build.config.*` files to `tsdown.config.*` files
   - Updates imports from `unbuild` to `tsdown`
   - Transforms `defineBuildConfig` to `defineConfig`
   - Adapts build configuration options to match tsdown equivalents

## Migration Options

The `migrate` command supports the following options to customize the migration process:

- `--cwd <dir>` (or `-c`): Specify the working directory for the migration.
- `--dry-run` (or `-d`): Perform a dry run to preview the migration without making any changes.
- `--from <source>`: Specify the source bundler to migrate from (defaults to `tsup`, use `unbuild` for unbuild migration).

With these options, you can easily tailor the migration process to fit your specific project setup.

## Differences from unbuild

While `tsdown` aims to provide a smooth migration experience from `unbuild`, there are some notable differences to be aware of:

1. **Configuration Format**: tsdown uses a slightly different configuration format. The migration script handles most common options, but you may need to manually adjust some advanced configurations.

2. **Builders**: unbuild's `mkdist` builder is mapped to tsdown's `dts` builder, but there might be slight differences in behavior.

3. **Rollup vs Rolldown**: unbuild uses Rollup, whereas tsdown uses [Rolldown](https://rolldown.rs/), a Rust-based bundler that's faster and more efficient.

After migration, it's recommended to review your configuration and build output to ensure everything is working as expected.
