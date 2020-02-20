import Vue from 'vue'
import App from './App.vue'
import './quasar'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
window.axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
