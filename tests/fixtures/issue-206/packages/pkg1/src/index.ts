import { codeToHtml } from 'my-shiki'

export const func1 = async (code: string): Promise<string> => {
  return codeToHtml(code)
}
