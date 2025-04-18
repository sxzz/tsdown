# Platform

The platform correspond to the target runtime for the bundled JavaScript code.

By default, tsdown bundle for the `node` runtime, but you can customize it using the `--platform` option:

```bash
npx tsdown --platform <platform>
```

Available platforms :
- `browser` : Your typical browser (Chrome, Firefox, ...)
- `neutral` : No specific platform
- `node` : The [Node](https://nodejs.org/) runtime
