/**
 * Converts esbuild target [^1] (which is also used by Rolldown [^2]) to browserslist target [^3].
 *
 * [^1]: https://esbuild.github.io/api/#target
 * [^2]: https://github.com/rolldown/rolldown/blob/v1.0.0-beta.8/packages/rolldown/src/binding.d.ts#L1429-L1431
 * [^3]: https://github.com/browserslist/browserslist
 */
export function esbuildTargetToBrowserslist(target: string[]): string[] {
  const targetString = target.join(' ').toLowerCase()

  const matches = [...targetString.matchAll(TARGET_REGEX)]

  return matches.map((match) => {
    const browser = match[1]
    const version = match[2]
    return `${browser} ${version}`
  })
}

// A list of browser names that can be used in both esbuild and browserslist.
const TARGET_REGEX = /(chrome|edge|firefox|ie|ios|opera|safari)(\S+)/g
