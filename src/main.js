'use strict';

import { createApp } from 'vue'
import router from './lib/router'

import App from './App.vue'
import './styles/app.css'
import './registerServiceWorker'

/*const theApp = */
createApp(App).use(router).mount('#app')
