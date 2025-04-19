import { findUp } from 'find-up-simple'

export async function findTsconfig(
  cwd?: string,
  name: string = 'tsconfig.json',
): Promise<string | false> {
  return (await findUp(name, { cwd })) || false
}
