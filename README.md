# tsdown [![npm](https://img.shields.io/npm/v/tsdown.svg)](https://npmjs.com/package/tsdown) [![Unit Test](https://github.com/sxzz/tsdown/actions/workflows/unit-test.yml/badge.svg)](https://github.com/sxzz/tsdown/actions/workflows/unit-test.yml) [![JSR](https://jsr.io/badges/@sxzz/tsdown)](https://jsr.io/@sxzz/tsdown)

⚡️ An even faster bundler powered by [Rolldown](https://github.com/rolldown/rolldown).

## Features

- 🚀 **Blazing fast**: Build and generate `.d.ts` powered by Oxc and Rolldown, incredibly fast!
- ♻️ **Powerful ecosystem**: Support Rollup / Rolldown / Vite / unplugin plugins.
- 📦 **Out-of-box**: Support reusing configurations from Vite or Vitest.
- 🔄 **Seamless migration**: Compatible with tsup's main options and features, ensuring a smooth transition.

## Install

```bash
npm i tsdown
```

## Configuration

```ts
// tsdown.config.ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src'],
  // ...
})
```

## Credits

This project also partially contains code derived or copied from [tsup](https://github.com/egoist/tsup).

- [tsup](https://github.com/egoist/tsup)
- [pkgroll](https://github.com/privatenumber/pkgroll)

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2024-PRESENT [三咲智子 Kevin Deng](https://github.com/sxzz)
