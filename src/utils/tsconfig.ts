import { up as findUp } from 'empathic/find'

export function findTsconfig(
  cwd?: string,
  name: string = 'tsconfig.json',
): string | false {
  return findUp(name, { cwd }) || false
}
