/**
 * Created by 001264 on 2017/9/10.
 */

const Loading = {
  name: 'Loading',
  data () {
    return {
      state: {
        timeOut: 20000,
        show: false
      }
    }
  },
  props: ['param'],
  created () {
    window.fc = window.fc || {}
    window.fc.Loading = this
  },
  methods: {
    hide () {
      setTimeout(() => {
        if (this.to) {
          clearTimeout(this.to)
        }
        this.state.show = false
      }, 500)
    },
    show (param = {}) {
      Object.assign(this.state, param)
      this.state.show = true
      if (this.to) {
        clearTimeout(this.to)
      }
      this.to = setTimeout(() => {
        this.state.show = false
      }, this.state.timeOut)
    }
  }
}

export default Loading
