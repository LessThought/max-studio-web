import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus)

app.config.globalProperties.$axios = Axios

app.mount('#app')
