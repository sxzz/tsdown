export type Overwrite<T, U> = Omit<T, keyof U> & U
export type MaybePromise<T> = T | Promise<T>
export type MarkPartial<T, K extends keyof T> = Omit<Required<T>, K> &
  Partial<Pick<T, K>>
export type Arrayable<T> = T | T[]
