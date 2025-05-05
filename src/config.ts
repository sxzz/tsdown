import type { UserConfig, UserConfigFn } from './options'

/**
 * Defines the configuration for tsdown.
 */
export function defineConfig(
  options: UserConfig | UserConfigFn,
): UserConfig | UserConfigFn {
  return options
}

export type { UserConfig, UserConfigFn }
