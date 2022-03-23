import { createApp } from 'vue'
import "bootstrap/scss/bootstrap.scss";
import "./scss/main.scss";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
