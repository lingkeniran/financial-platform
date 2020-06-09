import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
// elementUI
import './plugins/element.js'
// Echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
