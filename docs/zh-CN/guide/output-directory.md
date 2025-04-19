# 输出目录

默认情况下，`tsdown` 会将打包后的代码输出到当前工作目录下的 `dist` 文件夹中。

如果您想自定义输出目录，可以使用 `--out-dir`（或 `-d`）选项：

```bash
tsdown -d ./custom-output
```

### 示例

```bash
# 默认行为：输出到 ./dist
tsdown

# 自定义输出目录：输出到 ./build
tsdown -d ./build
```

> [!NOTE]
> 如果指定的输出目录不存在，将会自动创建。请确保目录路径与您的项目结构一致，以避免意外覆盖其他文件。
