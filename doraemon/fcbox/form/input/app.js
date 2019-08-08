/**
 * Created by 001264 on 2017/6/26.
 */

const FcInput = {
  name: 'FcInput',
  data () {
    return {}
  },
  props: ['param', 'callback'],
  created () {

  },
  methods: {
    input (e) {
      const value = e.target.value
      const param = this.param
      param.value = value
      if (this.callback && parseInt(e.keyCode) !== 13) {
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

export default FcInput
