import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// router
import router from './router'

// vuex
import store from './store/index' 

// 全局样式
import './style/index.scss'


const app = createApp(App) // 创建实例

app.use(router)
app.use(store);


app.mount('#app')
