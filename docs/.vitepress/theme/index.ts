import DefaultTheme from 'vitepress/theme-without-components'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('HomePage', () => import('./components/HomePage.vue'))
  },
} satisfies Theme
