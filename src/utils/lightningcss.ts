import type { Targets } from 'lightningcss'

/**
 * Converts esbuild target [^1] (which is also used by Rolldown [^2]) to Lightning CSS targets [^3].
 *
 * [^1]: https://esbuild.github.io/api/#target
 * [^2]: https://github.com/rolldown/rolldown/blob/v1.0.0-beta.8/packages/rolldown/src/binding.d.ts#L1429-L1431
 * [^3]: https://lightningcss.dev/transpilation.html
 */
export function esbuildTargetToLightningCSS(
  target: string[],
): Targets | undefined {
  let targets: Targets | undefined

  const targetString = target.join(' ').toLowerCase()
  const matches = [...targetString.matchAll(TARGET_REGEX)]

  for (const match of matches) {
    // The name in the esbuild target format.
    const name = match[1]
    // The browser name in Lightning CSS targets format.
    const browser = ESBUILD_LIGHTNINGCSS_MAPPING[name]
    if (!browser) {
      continue
    }

    // The version string.
    const version = match[2]
    // An integer representing the major, minor, and patch version numbers in
    // Lightning CSS targets format.
    const versionInt = parseVersion(version)
    if (versionInt == null) {
      continue
    }

    targets = targets || {}
    targets[browser] = versionInt
  }

  return targets
}

const TARGET_REGEX = /([a-z]+)(\d+(?:\.\d+)*)/g

// A mapping from the name in the esbuild target format to the browser name in
// Lightning CSS targets format.
const ESBUILD_LIGHTNINGCSS_MAPPING: Record<string, keyof Targets> = {
  chrome: 'chrome',
  edge: 'edge',
  firefox: 'firefox',
  ie: 'ie',
  ios: 'ios_saf',
  opera: 'opera',
  safari: 'safari',
}

// Copied from https://github.com/parcel-bundler/lightningcss/blob/v1.29.3/node/browserslistToTargets.js#L35-L46
function parseVersion(version: string): number | null {
  const [major, minor = 0, patch = 0] = version
    .split('-')[0]
    .split('.')
    .map((v) => Number.parseInt(v, 10))

  if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) {
    return null
  }

  return (major << 16) | (minor << 8) | patch
}
