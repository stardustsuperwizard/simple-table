import Vue from 'vue'
import App from './App.vue'
import EasyHTTP from './easyhttp.js'

Vue.config.productionTip = false

let http = new EasyHTTP()
Vue.prototype.$http = http

new Vue({
  render: h => h(App),
}).$mount('#app')
