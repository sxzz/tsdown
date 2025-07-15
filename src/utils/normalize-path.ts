export function normalizePathFor<
  T extends string | RegExp | string[] | undefined = string,
>(arg: T): T {
  if (arg === undefined) {
    return arg
  }

  return Array.isArray(arg)
    ? (arg.map(normalizePathFor) as T)
    : (arg.toString().replaceAll('\\', '/') as T)
}
