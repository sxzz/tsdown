// @ts-check

/** @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions} */
export default {
  plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
  out: './docs/reference/api',
  entryPoints: ['./src/index.ts'],
  excludeInternal: true,

  hideBreadcrumbs: true,
  useCodeBlocks: true,
  formatWithPrettier: true,
  flattenOutputFiles: true,

  // @ts-expect-error VitePress config
  docsRoot: './docs/reference',
}
