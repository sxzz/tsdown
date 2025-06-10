<!-- prettier-ignore-start -->
# Interface: AttwOptions

Defined in: [src/options/types.ts:89](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L89)

Options for the "Are the types wrong?" (`attw`) integration in tsdown.

The `attw` option enables checking your package for TypeScript type issues using the [@arethetypeswrong/core](https://github.com/arethetypeswrong/arethetypeswrong.github.io) library. This helps identify problems with your package's TypeScript types, particularly ESM-related module resolution issues.

## Properties

### profile?

> `optional` **profile**: `"strict"` \| `"node16"` \| `"esmOnly"`

Defined in: [src/options/types.ts:100](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L100)

Profiles select a set of resolution modes to require/ignore. All are evaluated but failures outside of those required are ignored.

The available profiles are:
- `strict`: requires all resolutions
- `node16`: ignores node10 resolution failures
- `esmOnly`: ignores CJS resolution failures

#### Default

```ts
'strict'
```

***

### level?

> `optional` **level**: `"error"` \| `"warn"`

Defined in: [src/options/types.ts:110](https://github.com/rolldown/tsdown/blob/7f1dc291202c80e452396a792c1bce4fe3085aa1/src/options/types.ts#L110)

The level of the check.

The available levels are:
- `error`: fails the build
- `warn`: warns the build

#### Default

```ts
'warn'
```

<!-- prettier-ignore-end -->
