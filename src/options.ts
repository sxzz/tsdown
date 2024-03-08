import type { InputOptions, OutputOptions } from '@rolldown/node'

export type Format = NonNullable<OutputOptions['format']>

export interface Options {
  input?: InputOptions['input']
  format?: Format | Format[]
  plugins?: InputOptions['plugins']
  external?: InputOptions['external']
  outDir?: string
  clean?: boolean | string[]
}

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U

export type ResolvedOptions = Overwrite<
  Required<Options>,
  {
    format: Format[]
  }
>

export function normalizeOptions(options: Options): ResolvedOptions {
  let { input = [], format = ['esm'], plugins = [], external = [] } = options

  if (!Array.isArray(format)) format = [format]
  if (format.length === 0) format = ['esm']

  return {
    input,
    plugins,
    external,
    format,
    outDir: options.outDir || 'dist',
    clean: options.clean ?? false,
  }
}
