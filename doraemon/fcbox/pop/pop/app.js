/**
 * Created by 001264 on 2017/9/10.
 */

const FcPop = {
  name: 'FcPop',
  data () {
    return {}
  },
  props: ['param'],
  methods: {
    hide (e) {
      if (this.param.maskClose && e.target == e.currentTarget) {
        this.param.show = false
      }
    },
    show (param = {}) {
      this.param.show = true
    }
  }
}

export default FcPop
