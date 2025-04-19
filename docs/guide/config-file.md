# Config file

By default, tsdown will load the config from a file named `tsdown.config.ts` in the current directory.

You can specify a different config file using the `--config` (or `-c`) option:

```bash
tsdown --config ./path/to/config
```

To disable loading the config file, use the `--no-config` option:

```bash
tsdown --no-config
```

### Extending Vite or Vitest config

You can extend your Vite or Vitest config using the `--from-vite` option:

```bash
tsdown --from-vite        # load   vite.config.*
tsdown --from-vite vitest # load vitest.config.*
```
