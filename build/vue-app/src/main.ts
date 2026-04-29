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

app.mount('#app')