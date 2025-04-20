import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

import './custom.css'
import 'virtual:group-icons.css'
import 'uno.css'

export default {
  ...DefaultTheme,
  Layout,
}
