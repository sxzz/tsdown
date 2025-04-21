# 接口: Options

定义于: [options.ts:38](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L38)

tsdown 的配置选项。

## 属性

### alias?

> `可选` **alias**: `Record`\<`string`, `string`\>

定义于: [options.ts:48](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L48)

***

### clean?

> `可选` **clean**: `boolean` \| `string`[]

定义于: [options.ts:66](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L66)

***

### config?

> `可选` **config**: `string` \| `boolean`

定义于: [options.ts:102](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L102)

配置文件路径。

***

### define?

> `可选` **define**: `Record`\<`string`, `string`\>

定义于: [options.ts:70](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L70)

***

### dts?

> `可选` **dts**: `boolean` \| `Options`

定义于: [options.ts:125](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L125)

生成声明文件。

***

### entry?

> `optional` **entry**: `InputOption`

定义于: [options.ts:40](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L40)

***

### external?

> `可选` **external**: `ExternalOption`

定义于: [options.ts:41](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L41)

***

### fixedExtension?

> `可选` **fixedExtension**: `boolean`

定义于: [options.ts:80](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L80)

为输出文件使用固定扩展名，
扩展名始终为 .cjs 或 .mjs，
否则将取决于包类型。

#### 默认值

```ts
false
```

***

### format?

> `可选` **format**: `ModuleFormat` \| `ModuleFormat`[]

定义于: [options.ts:61](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L61)

#### 默认值

```ts
'es'
```

***

### fromVite?

> `可选` **fromVite**: `boolean` \| `"vitest"`

定义于: [options.ts:119](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L119)

复用 Vite 或 Vitest 的配置（实验性功能）。

#### 默认值

```ts
false
```

***

### globalName?

> `可选` **globalName**: `string`

定义于: [options.ts:62](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L62)

***

### inputOptions?

> `可选` **inputOptions**: `InputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `InputOptions`\>

定义于: [options.ts:52](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L52)

***

### minify?

> `可选` **minify**: `boolean`

定义于: [options.ts:68](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L68)

#### 默认值

```ts
false
```

***

### noExternal?

> `可选` **noExternal**: `Arrayable`\<`string` \| `RegExp`\> \| (`id`, `importer`) => `undefined` \| `null` \| `boolean` \| `void`

定义于: [options.ts:42](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L42)

***

### onSuccess?

> `可选` **onSuccess**: `string` \| (`config`) => `void` \| `Promise`\<`void`\>

定义于: [options.ts:108](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L108)

指定构建成功后执行的命令，在监视模式下特别有用。

***

### outDir?

> `可选` **outDir**: `string`

定义于: [options.ts:64](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L64)

#### 默认值

```ts
'dist'
```

***

### outExtensions?

> `可选` **outExtensions**: `OutExtensionFactory`

定义于: [options.ts:85](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L85)

自定义输出文件扩展名，
此选项将覆盖 fixedExtension 的设置。

***

### outputOptions?

> `可选` **outputOptions**: `OutputOptions` \| (`options`, `format`) => `Awaitable`\<`null` \| `void` \| `OutputOptions`\>

定义于: [options.ts:87](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L87)

***

### platform?

> `可选` **platform**: `"node"` \| `"neutral"` \| `"browser"`

定义于: [options.ts:51](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L51)

#### 默认值

```ts
'node'
```

***

### plugins?

> `可选` **plugins**: `RolldownPluginOption`

定义于: [options.ts:96](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L96)

***

### publint?

> `可选` **publint**: `boolean` \| `Options`

定义于: [options.ts:137](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L137)

构建完成后运行 publint 检查，
需要安装 publint 依赖。

***

### shims?

> `可选` **shims**: `boolean`

定义于: [options.ts:72](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L72)

#### 默认值

```ts
false
```

***

### silent?

> `可选` **silent**: `boolean`

定义于: [options.ts:98](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L98)

***

### skipNodeModulesBundle?

> `可选` **skipNodeModulesBundle**: `boolean`

定义于: [options.ts:113](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L113)

跳过 node_modules 的打包。

***

### sourcemap?

> `可选` **sourcemap**: [`Sourcemap`](./type-aliases/Sourcemap.md)

定义于: [options.ts:65](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L65)

***

### target?

> `可选` **target**: `string` \| `string`[]

定义于: [options.ts:69](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L69)

***

### treeshake?

> `可选` **treeshake**: `boolean`

定义于: [options.ts:95](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L95)

#### 默认值

```ts
true
```

***

### tsconfig?

> `可选` **tsconfig**: `string` \| `boolean`

定义于: [options.ts:49](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L49)

***

### unused?

> `可选` **unused**: `boolean` \| `Options`

定义于: [options.ts:131](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L131)

启用 `unplugin-unused` 进行未使用依赖检查，
需要安装 `unplugin-unused` 依赖。

***

### watch?

> `可选` **watch**: `string` \| `boolean` \| `string`[]

定义于: [options.ts:103](https://github.com/rolldown/tsdown/blob/406082dcbc73c28bfb0e981b5dc39a0675d54c3d/src/options.ts#L103)
