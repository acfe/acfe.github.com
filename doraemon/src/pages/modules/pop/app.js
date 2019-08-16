/**
 * Created by 001264 on 2017/9/10.
 */
import elementAc from '../ac/element_ac'

const MPop = {
  name: 'MPop',
  data () {
    return {
      randKey: Math.random(),
      maskStyle: {},
      moveParam: {}
    }
  },
  props: ['param', 'isSet', 'setConfig', 'elementRefreshCallback', 'popId', 'acCallback'],
  created () {
    this.setConfig = this.setConfig || {}
    let param = this.param || {}
    param.style = param.style || {}
    let maskStyle = {}
    for (let i in param.style) {
      switch (i) {
        case 'background-image':
          if (param.style[i]) {
            maskStyle[i] = 'url(' + param.style[i] + ')'
            maskStyle['background-size'] = '100% auto'
          }
          break
        case 'opacity':
          if (param.style[i]) {
            maskStyle[i] = parseInt(param.style[i]) / 100
          }
          break
        default:
          if (param.style[i]) {
            maskStyle[i] = param.style[i]
          }
          break
      }
    }
    this.maskStyle = maskStyle
  },
  mounted () {
    if (this.$refs.fcPop && this.isSet) {
      this.$refs.fcPop.addEventListener('mousedown', this.mousedown)
      this.$refs.fcPop.addEventListener('mousemove', this.mousemove)
      this.$refs.fcPop.addEventListener('mouseup', this.mouseup)
    }
  },
  methods: Object.assign({

  }, elementAc)
}

export default MPop
