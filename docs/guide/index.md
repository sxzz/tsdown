# Introduction

**tsdown** is _The Elegant Library Bundler_. Designed with simplicity and speed in mind, it provides a seamless and efficient way to bundle your TypeScript and JavaScript libraries. Whether you're building a small utility or a complex library, `tsdown` empowers you to focus on your code while it handles the bundling process with elegance.

## Why tsdown?

`tsdown` is built on top of [Rolldown](https://rolldown.rs), a cutting-edge bundler written in Rust. While Rolldown is a powerful and general-purpose tool, `tsdown` takes it a step further by tailoring the experience specifically for library authors. It simplifies the configuration, optimizes for common library use cases, and provides a developer-friendly interface.

As an **official project of Rolldown**, `tsdown` is deeply integrated into the Rolldown ecosystem. It is not only a standalone bundler but also serves as the foundation for **Rolldown-Vite Library Mode**, ensuring a unified and robust experience for library developers in the future.

## What Can It Bundle?

`tsdown` is designed to handle all the essentials for modern library development:

- **TypeScript and JavaScript**: Seamlessly bundle `.ts` and `.js` files with support for modern syntax and features.
- **TypeScript Declarations**: Automatically generate `.d.ts` files for your library.
- **Multiple Output Formats**: Generate `esm`, `cjs`, and `iife` bundles to ensure compatibility across different environments.
- **Assets**: Include and process non-code assets like `.json` or `.wasm` files.

With its built-in support for tree shaking, minification, and source maps, `tsdown` ensures your library is optimized for production.

## Fast and Elegant

`tsdown` is built to be **fast**. Leveraging Rolldown's Rust-based performance, it delivers blazing-fast builds even for large projects. At the same time, it is **elegant**—offering a clean and intuitive configuration system that minimizes boilerplate and maximizes productivity.

## Getting Started

Ready to dive in? Check out the [Getting Started](./getting-started.md) guide to set up your first project with `tsdown`.

## Credits

`tsdown` is built on the shoulders of giants. It is powered by [Rolldown](https://rolldown.rs) and inspired by tools like [tsup](https://github.com/egoist/tsup). Special thanks to the open-source community and contributors who make projects like this possible.
