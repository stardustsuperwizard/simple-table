import Vue from 'vue'
import App from './App.vue'
import EasyHTTP from './easyhttp.js'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let http = new EasyHTTP()
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
