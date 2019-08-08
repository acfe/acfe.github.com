/**
 * Created by 001264 on 2017/9/10.
 */

const Toast = {
  name: 'Toast',
  data () {
    return {
      state: {
        timeOut: 1000,
        show: false
      }
    }
  },
  props: ['param'],
  created () {
    window.fc = window.fc || {}
    window.fc.Toast = this
  },
  methods: {
    hide () {
      if (this.to) {
        clearTimeout(this.to)
      }
      this.state.show = false
    },
    show (param = {}) {
      Object.assign(this.state, param)
      this.state.show = true
      this.state.timeOut = param.timeOut || 1000
      if (this.to) {
        clearTimeout(this.to)
      }
      this.to = setTimeout(() => {
        this.state.show = false
      }, this.state.timeOut)
    }
  }
}

export default Toast
