const langs = [() => import('my-langs/css'), () => import('my-langs/html')]

export const codeToHtml = async (code) => {
  return String(langs) + code
}
