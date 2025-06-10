import { createApp } from 'vue'
import App from './App.vue' // You need this file created (see below)
import router from './router'
import './assets/main.css';

const app = createApp(App)
app.use(router)
app.mount('#app')

