/**
 * Created by 001264 on 2017/9/10.
 */

const FcTextarea = {
  name: 'FcTextarea',
  data () {
    return {
      randKey: Math.random()
    }
  },
  props: ['param', 'callback'],
  methods: {
    input (e) {
      const value = e.target.value
      const param = this.param
      param.value = value
      this.randKey = Math.random()
      if (this.callback) {
        this.callback(this.param, 'input')
      }
    },
    focus (e) {
      const param = this.param
      param.showTip = false
      if (this.callback) {
        this.callback(this.param, 'focus')
      }
    },
    focusout (e) {
      const value = e.target.value
      const param = this.param
      if (value && param.reg && !param.reg.test(value)) {
        param.showTip = true
      } else {
        param.showTip = false
      }
      if (this.callback) {
        this.callback(this.param, 'focusout')
      }
    },
    keyup (e) {
      const value = e.target.value
      const param = this.param
      if (value && param.reg && !param.reg.test(value)) {
        param.showTip = true
      } else {
        param.showTip = false
      }
      if (this.callback && parseInt(e.keyCode) === 13) {
        this.callback(this.param, 'keyup')
      }
    }
  }
}

export default FcTextarea
