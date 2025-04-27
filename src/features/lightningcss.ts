import browserslist from 'browserslist'
import { browserslistToTargets, type Targets } from 'lightningcss'
import LightningCSS from 'unplugin-lightningcss/rolldown'

import { esbuildTargetToBrowserslist } from '../utils/browserslist'
import type { Plugin } from 'rolldown'

export function LightningCSSPlugin(options: { target?: string[] }): Plugin {
  // Converts the user-provided esbuild-format target into a LightningCSS
  // targets object.
  const targets: Targets | undefined =
    options.target &&
    browserslistToTargets(
      browserslist(esbuildTargetToBrowserslist(options.target)),
    )

  return LightningCSS({ options: { targets } })
}
