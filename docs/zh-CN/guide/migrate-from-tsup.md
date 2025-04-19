# 从 tsup 迁移

[tsup](https://tsup.egoist.dev/) 是一个功能强大且广泛使用的打包器，与 `tsdown` 有许多相似之处。虽然 `tsup` 构建于 [esbuild](https://esbuild.github.io/) 之上，`tsdown` 则利用了 [Rolldown](https://rolldown.rs/) 的强大功能，提供了更**快速**且更**强大**的打包体验。

如果您当前正在使用 `tsup` 并希望迁移到 `tsdown`，迁移过程非常简单，因为 `tsdown` 提供了专门的 `migrate` 命令：

```bash
npx tsdown migrate
```

> [!WARNING]
> 在迁移之前，请保存您的更改。迁移过程可能会修改您的配置文件，因此请确保所有更改已提交或备份。

### 迁移选项

`migrate` 命令支持以下选项，用于自定义迁移过程：

- `--cwd <dir>`（或 `-c`）：指定迁移的工作目录。
- `--dry-run`（或 `-d`）：执行预览迁移（dry run），不会进行任何实际更改。

通过这些选项，您可以轻松调整迁移过程以适应您的特定项目设置。

## 致谢

`tsdown` 的诞生离不开开源社区的启发和贡献。我们衷心感谢以下项目和个人：

- **[tsup](https://tsup.egoist.dev/)**：`tsdown` 深受 `tsup` 的启发，甚至部分代码直接来源于 `tsup`。`tsup` 的简洁性和高效性在 `tsdown` 的开发过程中起到了重要的指导作用。
- **[@egoist](https://github.com/egoist)**：`tsup` 的作者，其工作对 JavaScript 和 TypeScript 工具生态系统产生了深远的影响。感谢您对社区的奉献和贡献！
