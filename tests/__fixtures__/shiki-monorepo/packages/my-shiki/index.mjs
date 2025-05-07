const langs = [() => import('my-langs/css'), () => import('my-langs/elixir')]

export const codeToHtml = async (code) => {
  return String(langs) + code
}
