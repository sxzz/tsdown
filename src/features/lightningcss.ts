import LightningCSS from 'unplugin-lightningcss/rolldown'
import { esbuildTargetToLightningCSS } from '../utils/lightningcss'

import type { ResolvedOptions } from '../options'
import type { Targets } from 'lightningcss'
import type { Plugin } from 'rolldown'

export function LightningCSSPlugin(
  options: Pick<ResolvedOptions, 'target'>,
): Plugin {
  // Converts the user-provided esbuild-format target into a LightningCSS
  // targets object.
  const targets: Targets | undefined =
    options.target && esbuildTargetToLightningCSS(options.target)

  return LightningCSS({ options: { targets } })
}
