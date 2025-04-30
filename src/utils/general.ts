export function toArray<T>(
  val: T | T[] | null | undefined,
  defaultValue?: T,
): T[] {
  if (Array.isArray(val)) {
    return val
  } else if (val == null) {
    if (defaultValue) return [defaultValue]
    return []
  } else {
    return [val]
  }
}
export function slash(path: string): string {
  const isExtendedLengthPath = path.startsWith('\\\\?\\')

  if (isExtendedLengthPath) {
    return path
  }
  return path.replace(/\\/g, '/')
}

export function resolveComma<T extends string>(arr: T[]): T[] {
  return arr.flatMap((format) => format.split(',') as T[])
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): T {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return function (this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = undefined
      fn.apply(this, args)
    }, wait)
  } as T
}

export const noop = <T>(v: T): T => v
