import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

const savedPath = localStorage.getItem('vue-router-redirect')
if (savedPath) {
  localStorage.removeItem('vue-router-redirect')
  window.history.replaceState(null, '', savedPath)
}

app.mount('#app')