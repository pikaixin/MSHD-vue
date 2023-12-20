import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';


import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'

//挂载axios
Vue.prototype.$http = axios
//设置访问根路径
axios.defaults.baseURL = "http://10.129.191.152:9000"
//axios.defaults.baseURL = "http://localhost:9000"

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  axios,
  render: h => h(App),
}).$mount('#app')

