# Migrate from tsup

[tsup](https://tsup.egoist.dev/) is a very similar tool to tsdown, but is based on [Rollup](https://rollupjs.org/) instead of [Rolldown](https://rolldown.rs/).

You can easily migrate to tsdown using the dedicated `migrate` command:

```bash
npx tsdown migrate
```

A few options can be passed:

- `--cwd <dir>` (or `-c`) to customize the working directory
- `--dry-run` (or `-d`) to do a dry run
