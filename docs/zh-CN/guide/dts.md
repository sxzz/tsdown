# 声明文件 (dts)

声明文件（`.d.ts`）是 TypeScript 库的重要组成部分，它提供了类型定义，使您的库的使用者能够享受 TypeScript 的类型检查和智能提示功能。

`tsdown` 让生成和打包声明文件变得简单，为您的用户提供无缝的开发体验。

## tsdown 中的 dts 工作原理

`tsdown` 内部使用 [rolldown-plugin-dts](https://github.com/sxzz/rolldown-plugin-dts) 来生成和打包 `.d.ts` 文件。该插件专为高效处理声明文件生成而设计，并与 `tsdown` 无缝集成。

如果您在 `.d.ts` 生成过程中遇到任何问题，请直接在 [rolldown-plugin-dts 仓库](https://github.com/sxzz/rolldown-plugin-dts/issues)中报告。

## 启用 dts 生成

如果您的 `package.json` 中包含 `types` 或 `typings` 字段，`tsdown` 将**默认启用**声明文件的生成。

您还可以通过 CLI 中的 `--dts` 选项或在配置文件中设置 `dts: true` 来显式启用 `.d.ts` 文件的生成。

### CLI

```bash
tsdown --dts
```

### 配置文件

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
})
```

## 性能注意事项

`.d.ts` 生成的性能取决于您的 `tsconfig.json` 配置：

### 启用 `isolatedDeclarations`

如果您的 `tsconfig.json` 中启用了 `isolatedDeclarations` 选项，`tsdown` 将使用 **oxc-transform** 进行 `.d.ts` 生成。这种方法**非常快**，并且强烈推荐以获得最佳性能。

```json [tsconfig.json]
{
  "compilerOptions": {
    "isolatedDeclarations": true
  }
}
```

### 未启用 `isolatedDeclarations`

如果未启用 `isolatedDeclarations`，`tsdown` 将回退使用 TypeScript 编译器生成 `.d.ts` 文件。虽然这种方法可靠，但与 `oxc-transform` 相比速度较慢。

> [!TIP]
> 如果速度对您的工作流程至关重要，请考虑在 `tsconfig.json` 中启用 `isolatedDeclarations`。

## dts 的构建过程

- **对于 ESM 输出**：`.js` 和 `.d.ts` 文件在**同一个构建过程中**生成。如果您遇到兼容性问题，请报告相关问题。
- **对于 CJS 输出**：使用**单独的构建过程**专门生成 `.d.ts` 文件，以确保兼容性。

## 高级选项

`rolldown-plugin-dts` 提供了多个高级选项，用于自定义 `.d.ts` 文件的生成。有关这些选项的详细说明，请参阅 [插件文档](https://github.com/sxzz/rolldown-plugin-dts#options)。
