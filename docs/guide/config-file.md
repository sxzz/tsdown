# Config file

By default, tsdown will load the config from a file named `tsdown.config.ts` in the current directory.

You can specify a different config file using the `--config` (or `-c`) option:

```bash
npx tsdown --config <path>
```

To disable loading the config file, use the `--no-config` option:

```bash
npx tsdown --no-config
```

### Extending Vite or Vitest config

You can extend your Vite or Vitest config using the `--from-vite` option:

```bash
npx tsdown --from-vite
```
