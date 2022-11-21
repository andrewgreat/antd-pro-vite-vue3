import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import 'vite-plugin-svg-icons/register';
import i18n from '@/locales'
import bootstrap from '@/core/bootstrap'
import { lazyApp } from '@/core/lazy_use'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'
import './style/global.less' // global style

import permission from './permission'
import router from '@/router'
const vueApp = createApp(App)

console.log('main.ts...')
vueApp.use(router)
vueApp.use(store)
vueApp.use(i18n)
vueApp.use(ProLayout)
vueApp.use(PageContainer)
vueApp.component('page-header-wrapper', PageContainer)
vueApp.use(lazyApp)
vueApp.use(bootstrap)

vueApp.use(permission)

vueApp.mount('#app')
