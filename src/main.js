import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let app = createApp(App).use(ElementPlus);
app.mount('#app')
