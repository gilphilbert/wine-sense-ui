import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Dashboard from './components/Dashboard.vue'
import Sensors from './components/Sensors.vue'
import Account from './components/Account.vue'

Vue.use(VueRouter)
Vue.use(require('vue-chartist'))
Vue.use(require('chartist-plugin-legend'))

Vue.prototype.bluetooth = window.navigator.bluetooth;

const routes = [
  { path: '/', component: Dashboard },
  { path: '/sensors', component: Sensors },
  { path: '/account', component: Account },
  { path: '/logout', component: Dashboard }
]
const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')