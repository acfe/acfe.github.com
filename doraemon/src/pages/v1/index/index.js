import Vue from 'vue'
import store from './store'
import routerTemplate from '../../common/router/full.vue'
import VueRouter from 'vue-router'

import Index from './index/index.vue'
// const Index = () => import(/* webpackChunkName: "index_piece" */ './index/index.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/index', component: Index }
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
