import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from "pinia"

let app = createApp(App).use(ElementPlus).use(createPinia());
app.mount('#app')
