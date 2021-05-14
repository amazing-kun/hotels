import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI);


import axios from "axios";

//配置 请求的 根路径
axios.defaults.baseURL = 'http://127.0.0.1:8082/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
