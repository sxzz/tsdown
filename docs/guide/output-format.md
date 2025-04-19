# Output format

By default, tsdown will output [esm](https://nodejs.org/api/esm.html) JavaScript code, but you can choose the output format using the `--format` option:

```bash
tsdown --format esm # default
tsdown --format esm --format cjs # multiple formats
```

Available formats are:

- [esm](https://nodejs.org/api/esm.html)
- [cjs](https://nodejs.org/api/modules.html)
- [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
