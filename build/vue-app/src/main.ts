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
const savedPath = localStorage.getItem('vue-router-redirect')
if (savedPath) {
  localStorage.removeItem('vue-router-redirect')
  // 立即替换 URL，在挂载前完成
  window.history.replaceState(null, '', savedPath)
}

app.mount('#app')