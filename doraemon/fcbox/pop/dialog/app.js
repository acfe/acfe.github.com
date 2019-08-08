/**
 * Created by 001264 on 2017/9/10.
 */
import Vue from 'vue'
import FcPop from 'fcbox/pop/pop'
import FcButton from 'fcbox/form/button'
Vue.use(FcPop)
Vue.use(FcButton)

const Dialog = {
  name: 'Dialog',
  data () {
    return {
      state: {
        show: false,
        text: '',
        title: '',
        clearText: '',
        clearCallback: () => {},
        confirmText: '',
        confirmCallback: () => {},
        showClose: false,
        theme: 1
      }
    }
  },
  created () {
    window.fc = window.fc || {}
    window.fc.Dialog = this
  },
  methods: {
    hide () {
      this.state.show = false
    },
    clear () {
      this.state.clearCallback && this.state.clearCallback()
      this.hide()
    },
    confirm () {
      this.state.confirmCallback && this.state.confirmCallback()
      this.hide()
    },
    show (param = {}) {
      Object.assign(this.state, param)
      this.state.text = param.text || ''
      this.state.showClose = param.showClose || false
      this.state.theme = param.theme || 1
      this.state.title = param.title || '提示'
      this.state.clearText = param.clearText || ''
      this.state.confirmText = param.confirmText || '确定'
      this.state.confirmCallback = param.confirmCallback || (() => {})
      this.state.clearCallback = param.clearCallback || (() => {})
      this.state.show = true
    }
  }
}

export default Dialog
