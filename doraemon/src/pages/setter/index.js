import Vue from 'vue'
import store from './store'
import routerTemplate from '../../common/router/full.vue'
import VueRouter from 'vue-router'

import Index from './index/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/setter', component: Index }
]

const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(routerTemplate)
})
