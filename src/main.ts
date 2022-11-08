import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { store, key } from './store'
require('@/assets/styles/index.scss')

createApp(App).use(store, key).mount('#app')
