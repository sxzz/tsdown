import type { UserConfig, UserConfigFn } from './options'

/**
 * Defines the configuration for tsdown.
 */
export function defineConfig<const T extends UserConfig | UserConfigFn>(
  options: T,
): T {
  return options
}

export type { UserConfig, UserConfigFn }
