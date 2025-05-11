# 常见问题

<!--
TODO
## What is the difference between tsdown and Rolldown?

## Why should I use tsdown instead of other bundlers (like tsup, unbuild, ...)? -->

## tsdown 会支持 stub 模式吗？（类似 unbuild） {#stub-mode}

目前，`tsdown` **不支持** stub 模式，并且近期也没有添加该功能的计划。在当前的生态环境下，我们认为简单的 stub 模式对于大多数库开发流程来说实际价值有限。我们推荐使用 [监听模式](../options/watch-mode.md) 来获得快速高效的开发体验。关于这一决策的详细说明，请参阅 [这条 GitHub 评论](https://github.com/rolldown/tsdown/pull/164#issuecomment-2849720617)。

虽然目前不支持 stub 模式，但如果未来生态发生变化且需求变得更加迫切，我们可能会重新考虑这一决定。
