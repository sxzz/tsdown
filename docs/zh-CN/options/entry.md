# 入口文件

`entry` 选项用于指定项目的入口文件。这些文件是打包过程的起点。您可以通过 CLI 或配置文件来定义入口文件。

## 使用 CLI

在使用 CLI 时，可以直接将入口文件作为命令参数指定。例如：

```bash
tsdown src/entry1.ts src/entry2.ts
```

此命令会将 `src/entry1.ts` 和 `src/entry2.ts` 分别打包为独立的入口点。

## 使用配置文件

在配置文件中，`entry` 选项支持多种格式来定义入口文件：

### 单个入口文件

可以将单个入口文件指定为字符串：

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
})
```

### 多个入口文件

可以将多个入口文件指定为字符串数组：

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/entry1.ts', 'src/entry2.ts'],
})
```

### 带别名的入口文件

可以使用对象来定义带别名的入口文件。对象的键表示别名，值表示文件路径：

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    main: 'src/index.ts',
    utils: 'src/utils.ts',
  },
})
```

此配置会生成两个打包文件：`src/index.ts`（输出为 `dist/main.js`）和 `src/utils.ts`（输出为 `dist/utils.js`）。

## 使用 Glob 模式

`entry` 选项支持 [glob 模式](https://code.visualstudio.com/docs/editor/glob-patterns)，可以动态匹配多个文件。例如：

```ts [tsdown.config.ts]
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/**/*.ts',
})
```

此配置会将 `src` 目录及其子目录中的所有 `.ts` 文件作为入口点。

> [!WARNING]
> 需要注意的是，`entry` 选项默认会被视为 glob 模式，这意味着：
>
> - 在 **Windows** 上，必须使用正斜杠（`/`）而不是反斜杠（`\`）来表示文件路径。
> - 无法指定文件系统中不存在的文件。
>
> 如果需要绕过这些限制，可以直接在配置文件中使用 `inputOptions.input` 进行更精确的控制。
