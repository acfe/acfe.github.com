/**
 * Created by 001264 on 2017/9/10.
 */
import App from './app.vue'

const Toast = {
  install: function (Vue) {
    Vue.component('Toast', App)
  }
}

export default Toast
