import type {
  UserConfig,
  UserConfigFn,
  Workspace,
  WorkspaceFn,
} from './options'

/**
 * Defines the configuration for tsdown.
 */
export function defineConfig(options: UserConfig): UserConfig
export function defineConfig(options: UserConfigFn): UserConfigFn
export function defineConfig(
  options: UserConfig | UserConfigFn,
): UserConfig | UserConfigFn {
  return options
}

/**
 * Defines the workspace configuration for tsdown.
 */
export function defineWorkspace(options: Workspace): Workspace
export function defineWorkspace(options: WorkspaceFn): WorkspaceFn
export function defineWorkspace(
  options: Workspace | WorkspaceFn,
): Workspace | WorkspaceFn {
  return options
}

export type { UserConfig, UserConfigFn, Workspace, WorkspaceFn }
