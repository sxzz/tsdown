# Cleaning

By default, tsdown won't clean the output folder for you, which mean if your bundling process ends up creating different files than a previous one, older files won't be removed.

To tell tsdown to clean the output directory before building, use the `--clean` option:

```bash
tsdown --clean
```
