//Noah Brosseau - Setup
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)


pinia.use(piniaPersist)
app.use(pinia)
app.use(router)

app.mount('#app')
