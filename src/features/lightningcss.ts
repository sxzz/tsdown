import LightningCSS from 'unplugin-lightningcss/rolldown'
import { esbuildTargetToLightningCSS } from '../utils/lightningcss'
import type { ResolvedOptions } from '../options'
import type { Plugin } from 'rolldown'

export function LightningCSSPlugin(
  options: Pick<ResolvedOptions, 'target'>,
): Plugin | undefined {
  // Converts the user-provided esbuild-format target into a LightningCSS
  // targets object.
  const targets = options.target && esbuildTargetToLightningCSS(options.target)
  if (!targets) return

  return LightningCSS({ options: { targets } })
}
