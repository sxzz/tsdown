# Introduction

**tsdown** is _The Elegant Library Bundler_. Designed with simplicity and speed in mind, it provides a seamless and efficient way to bundle your TypeScript and JavaScript libraries. Whether you're building a small utility or a complex library, `tsdown` empowers you to focus on your code while it handles the bundling process with elegance.

## Why tsdown?

`tsdown` is built on top of [Rolldown](https://rolldown.rs), a cutting-edge bundler written in Rust. While Rolldown is a powerful and general-purpose tool, `tsdown` takes it a step further by providing a **complete out-of-the-box solution** for library authors.

### Key Differences Between tsdown and Rolldown

- **Simplified Configuration**: `tsdown` minimizes the need for complex configurations by offering sensible defaults tailored for library development. It provides a streamlined experience, so you can focus on your code rather than the bundling process.
- **Library-Specific Features**: Unlike Rolldown, which is designed as a general-purpose bundler, `tsdown` is optimized specifically for building libraries. It includes features like automatic TypeScript declaration generation and multiple output formats.
- **Future-Ready**: As an **official project of Rolldown**, `tsdown` is deeply integrated into its ecosystem and will continue to evolve alongside it. By leveraging Rolldown's latest advancements, `tsdown` aims to explore new possibilities for library development. Furthermore, `tsdown` is positioned to become the **foundation for [Rolldown Vite](https://github.com/vitejs/rolldown-vite)'s Library Mode**, ensuring a cohesive and robust experience for library authors in the long term.

## Plugin Ecosystem

`tsdown` supports the entire Rolldown plugin ecosystem, making it easy to extend and customize your build process. Additionally, it is compatible with most Rollup plugins, giving you access to a vast library of existing tools.

For more details, refer to the [Plugins](./plugins.md) documentation.

## What Can It Bundle?

`tsdown` is designed to handle all the essentials for modern library development:

- **TypeScript and JavaScript**: Seamlessly bundle `.ts` and `.js` files with support for modern syntax and features.
- **TypeScript Declarations**: Automatically generate declaration files (`.d.ts`) for your library.
- **Multiple Output Formats**: Generate `esm`, `cjs`, and `iife` bundles to ensure compatibility across different environments.
- **Assets**: Include and process non-code assets like `.json` or `.wasm` files.

With its built-in support for [tree shaking](./tree-shaking.md), [minification](./minification.md), and [source maps](./sourcemap.md), `tsdown` ensures your library is optimized for production.

## Fast and Elegant

`tsdown` is built to be **fast**. Leveraging Rolldown's Rust-based performance, it delivers blazing-fast builds even for large projects. At the same time, it is **elegant**—offering a clean and intuitive configuration system that minimizes boilerplate and maximizes productivity.

## Getting Started

Ready to dive in? Check out the [Getting Started](./getting-started.md) guide to set up your first project with `tsdown`.

## Credits

`tsdown` is built on the shoulders of giants. It is powered by [Rolldown](https://rolldown.rs) and inspired by tools like [tsup](https://github.com/egoist/tsup). Special thanks to the open-source community and contributors who make projects like this possible.
