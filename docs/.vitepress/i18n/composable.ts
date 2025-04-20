import { useData } from 'vitepress'
import { t } from './utils'

export function useTranslate(lang?: string) {
  const { lang: vpLang } = useData()
  return (key: string) => t(key, lang || vpLang.value)
}
