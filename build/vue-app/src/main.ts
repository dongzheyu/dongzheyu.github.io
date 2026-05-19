import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import lazyLoad from './directives/lazyLoad'

const app = createApp(App)

app.use(router)
app.directive('lazy', lazyLoad)

// GitHub Pages SPA fallback: 恢复原始路由
const savedPath = sessionStorage.getItem('vue-router-path')
if (savedPath) {
  sessionStorage.removeItem('vue-router-path')
  // 等待 router 准备好后导航到保存的路径
  router.isReady().then(() => {
    router.replace(savedPath)
  })
}

app.mount('#app')