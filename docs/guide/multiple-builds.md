# TODO : Multiple builds in the same config

You can also specify multiple configurations as an array, and Rolldown will bundle them in parallel.

```js [rolldown.config.js]
import { defineConfig } from 'rolldown'

export default defineConfig([
  {
    input: 'src/main.js',
    output: {
      format: 'esm',
    },
  },
  {
    input: 'src/worker.js',
    output: {
      format: 'iife',
      dir: 'dist/worker',
    },
  },
])
```
