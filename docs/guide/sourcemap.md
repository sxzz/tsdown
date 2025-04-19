# Source map

Source maps bridge the gap between your development code and the optimized code that usually runs in the browser, making debugging significantly easier.

For example, this is what lets you know which line in your React/Vue component threw an error, even though the browser doesn't know about the component source code.

You can tell tsdown to generate source maps by passing the `--sourcemap` option:

```bash
npx tsdown --sourcemap
```
