import type { AttwOptions } from '../features/attw'
import type { CopyOptions, CopyOptionsFn } from '../features/copy'
import type { ExportsOptions } from '../features/exports'
import type { TsdownHooks } from '../features/hooks'
import type { OutExtensionFactory } from '../features/output'
import type { ReportOptions } from '../features/report'
import type {
  Arrayable,
  Awaitable,
  MarkPartial,
  Overwrite,
} from '../utils/types'
import type { Hookable } from 'hookable'
import type { PackageJson } from 'pkg-types'
import type { Options as PublintOptions } from 'publint'
import type {
  ExternalOption,
  InputOption,
  InputOptions,
  InternalModuleFormat,
  MinifyOptions,
  ModuleFormat,
  OutputOptions,
} from 'rolldown'
import type { Options as DtsOptions } from 'rolldown-plugin-dts'
import type { Options as UnusedOptions } from 'unplugin-unused'

export type Sourcemap = boolean | 'inline' | 'hidden'
export type Format = ModuleFormat
export type NormalizedFormat = InternalModuleFormat
export type ModuleTypes = Record<
  string,
  | 'js'
  | 'jsx'
  | 'ts'
  | 'tsx'
  | 'json'
  | 'text'
  | 'base64'
  | 'dataurl'
  | 'binary'
  | 'empty'
  | 'css'
  | 'asset'
>

export interface Workspace {
  /**
   * Workspace directories. Glob patterns are supported.
   * - `auto`: Automatically detect `package.json` files in the workspace.
   * @default 'auto'
   */
  include?: Arrayable<string> | 'auto'
  /**
   * Exclude directories from workspace.
   * Defaults to all `node_modules`, `dist`, `test`, `tests`, `temp`, and `tmp` directories.
   */
  exclude?: Arrayable<string>

  /**
   * Path to the workspace configuration file.
   */
  config?: boolean | string
}

/**
 * Options for tsdown.
 */
export interface Options {
  /// build options
  /**
   * Defaults to `'src/index.ts'` if it exists.
   */
  entry?: InputOption
  external?: ExternalOption
  noExternal?:
    | Arrayable<string | RegExp>
    | ((
        id: string,
        importer: string | undefined,
      ) => boolean | null | undefined | void)
  alias?: Record<string, string>
  tsconfig?: string | boolean
  /**
   * Specifies the target runtime platform for the build.
   *
   * - `node`: Node.js and compatible runtimes (e.g., Deno, Bun).
   *   For CJS format, this is always set to `node` and cannot be changed.
   * - `neutral`: A platform-agnostic target with no specific runtime assumptions.
   * - `browser`: Web browsers.
   *
   * @default 'node'
   * @see https://tsdown.dev/options/platform
   */
  platform?: 'node' | 'neutral' | 'browser'
  inputOptions?:
    | InputOptions
    | ((
        options: InputOptions,
        format: NormalizedFormat,
      ) => Awaitable<InputOptions | void | null>)

  /// output options
  /** @default ['es'] */
  format?: Format | Format[]
  globalName?: string
  /** @default 'dist' */
  outDir?: string
  /** @default false */
  sourcemap?: Sourcemap
  /**
   * Clean directories before build.
   *
   * Default to output directory.
   * @default true
   */
  clean?: boolean | string[]
  /** @default false */
  minify?: boolean | 'dce-only' | MinifyOptions
  /**
   * Specifies the compilation target environment(s).
   *
   * Determines the JavaScript version or runtime(s) for which the code should be compiled.
   * If not set, defaults to the value of `engines.node` in your project's `package.json`.
   *
   * Accepts a single target (e.g., `'es2020'`, `'node18'`) or an array of targets.
   *
   * @see {@link https://tsdown.dev/options/target#supported-targets} for a list of valid targets and more details.
   *
   * @example
   * ```jsonc
   * // Target a single environment
   * { "target": "node18" }
   * ```
   *
   * @example
   * ```jsonc
   * // Target multiple environments
   * { "target": ["node18", "es2020"] }
   * ```
   */
  target?: string | string[] | false

  /**
   * Determines whether unbundle mode is enabled.
   * When set to true, the output files will mirror the input file structure.
   * @default false
   */
  unbundle?: boolean

  /**
   * @deprecated Use `unbundle` instead.
   * @default true
   */
  bundle?: boolean

  define?: Record<string, string>
  /** @default false */
  shims?: boolean

  /**
   * The name to show in CLI output. This is useful for monorepos or workspaces.
   * Defaults to the package name from `package.json`.
   */
  name?: string

  /**
   * Use a fixed extension for output files.
   * The extension will always be `.cjs` or `.mjs`.
   * Otherwise, it will depend on the package type.
   * @default false
   */
  fixedExtension?: boolean
  /**
   * Custom extensions for output files.
   * `fixedExtension` will be overridden by this option.
   */
  outExtensions?: OutExtensionFactory

  outputOptions?:
    | OutputOptions
    | ((
        options: OutputOptions,
        format: NormalizedFormat,
      ) => Awaitable<OutputOptions | void | null>)

  /** @default true */
  treeshake?: boolean
  plugins?: InputOptions['plugins']
  /**
   * Sets how input files are processed.
   * For example, use 'js' to treat files as JavaScript or 'base64' for images.
   * Lets you import or require files like images or fonts.
   * @example
   * ```json
   * { '.jpg': 'asset', '.png': 'base64' }
   * ```
   */
  loader?: ModuleTypes

  /** @default false */
  silent?: boolean
  /**
   * Config file path
   */
  config?: boolean | string
  /** @default false */
  watch?: boolean | Arrayable<string>
  ignoreWatch?: Arrayable<string | RegExp>

  /**
   * You can specify command to be executed after a successful build, specially useful for Watch mode
   */
  onSuccess?:
    | string
    | ((config: ResolvedOptions, signal: AbortSignal) => void | Promise<void>)

  /**
   * Skip bundling `node_modules`.
   * @default false
   */
  skipNodeModulesBundle?: boolean

  /**
   * Reuse config from Vite or Vitest (experimental)
   * @default false
   */
  fromVite?: boolean | 'vitest'

  /// addons
  /**
   * Emit TypeScript declaration files (.d.ts).
   *
   * By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
   * - If the `types` field is present in `package.json`, declaration file emission is enabled.
   * - If the `types` field is absent, declaration file emission is disabled by default.
   */
  dts?: boolean | DtsOptions

  /**
   * Enable unused dependencies check with `unplugin-unused`
   * Requires `unplugin-unused` to be installed.
   * @default false
   */
  unused?: boolean | UnusedOptions

  /**
   * Run publint after bundling.
   * Requires `publint` to be installed.
   * @default false
   */
  publint?: boolean | PublintOptions

  /**
   * Run `arethetypeswrong` after bundling.
   * Requires `@arethetypeswrong/core` to be installed.
   *
   * @default false
   * @see https://github.com/arethetypeswrong/arethetypeswrong.github.io
   */
  attw?: boolean | AttwOptions

  /**
   * Enable size reporting after bundling.
   * @default true
   */
  report?: boolean | ReportOptions

  /**
   * **[experimental]** Generate package exports for `package.json`.
   *
   * This will set the `main`, `module`, `types`, `exports` fields in `package.json`
   * to point to the generated files.
   */
  exports?: boolean | ExportsOptions

  /**
   * Compile-time env variables.
   * @example
   * ```json
   * {
   *   "DEBUG": true,
   *   "NODE_ENV": "production"
   * }
   * ```
   */
  env?: Record<string, any>

  /**
   * @deprecated Alias for `copy`, will be removed in the future.
   */
  publicDir?: CopyOptions | CopyOptionsFn

  /**
   * Copy files to another directory.
   * @example
   * ```ts
   * [
   *   'src/assets',
   *   { from: 'src/assets', to: 'dist/assets' },
   * ]
   * ```
   */
  copy?: CopyOptions | CopyOptionsFn

  hooks?:
    | Partial<TsdownHooks>
    | ((hooks: Hookable<TsdownHooks>) => Awaitable<void>)

  /**
   * If enabled, strips the `node:` protocol prefix from import source.
   *
   * @default false
   * @deprecated Use `nodeProtocol: 'strip'` instead.
   *
   * @example
   * // With removeNodeProtocol enabled:
   * import('node:fs'); // becomes import('fs')
   */
  removeNodeProtocol?: boolean

  /**
   * - If true, add `node:` prefix to built-in modules.
   * - If 'strip', strips the `node:` protocol prefix from import source.
   * - If false, does not modify the import source.
   *
   * @default false
   *
   * @example
   * // With nodeProtocol enabled:
   * import('fs'); // becomes import('node:fs')
   * // With nodeProtocol set to 'strip':
   * import('node:fs'); // becomes import('fs')
   * // With nodeProtocol set to false:
   * import('node:fs'); // remains import('node:fs')
   *
   */
  nodeProtocol?: 'strip' | boolean

  /**
   * If enabled, appends hash to chunk filenames.
   * @default true
   */
  hash?: boolean

  /**
   * The working directory of the config file.
   * - Defaults to `process.cwd()` for root config.
   * - Defaults to the package directory for workspace config.
   */
  cwd?: string

  /**
   * **[experimental]** Enable workspace mode.
   * This allows you to build multiple packages in a monorepo.
   */
  workspace?: Workspace | Arrayable<string> | true
  /**
   * Filter workspace packages. This option is only available in workspace mode.
   */
  filter?: RegExp | string | string[]
}

/**
 * Options without specifying config file path.
 */
export type UserConfig = Arrayable<Omit<Options, 'config' | 'filter'>>
export type UserConfigFn = (cliOptions: Options) => Awaitable<UserConfig>
export type NormalizedUserConfig = Exclude<UserConfig, any[]>

export type ResolvedOptions = Omit<
  Overwrite<
    MarkPartial<
      Omit<Options, 'publicDir' | 'workspace' | 'filter'>,
      | 'globalName'
      | 'inputOptions'
      | 'outputOptions'
      | 'minify'
      | 'define'
      | 'alias'
      | 'external'
      | 'noExternal'
      | 'onSuccess'
      | 'fixedExtension'
      | 'outExtensions'
      | 'hooks'
      | 'removeNodeProtocol'
      | 'copy'
      | 'loader'
      | 'name'
      | 'bundle'
    >,
    {
      format: NormalizedFormat[]
      target?: string[]
      clean: string[]
      dts: false | DtsOptions
      report: false | ReportOptions
      tsconfig: string | false
      pkg?: PackageJson
      exports: false | ExportsOptions
      nodeProtocol: 'strip' | boolean
      ignoreWatch: (string | RegExp)[]
    }
  >,
  'config' | 'fromVite'
>
