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

export function typeAsserts<T>(value: any): asserts value is T {}
