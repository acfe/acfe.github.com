/**
 * Created by 001264 on 2017/9/10.
 */
import formatAc from '../../func/format_style'

const FcElement = {
  name: 'FcElement',
  data () {
    return {
      randKey: Math.random(),
      elementStyle: {},
      setConfig: {},
      eid: 0,
      clickCallback: () => {}
    }
  },
  props: ['param', 'isSet', 'zIndex', 'acCallback'],
  created () {
    const param = this.param
    this.eid = this.param.id
    if (this.isSet) {
      this.setConfig = this.$store.state.setConfig
    }
    if (this.acCallback) {
      this.clickCallback = this.acCallback
    }
    this.elementStyle = this.formatStyle(param.elementStyle || {})
    this.elementStyle.zIndex = this.zIndex || 0
    if (param.hide) {
      this.elementStyle.display = 'none'
    }
  },
  mounted () {
    // const param = this.param
  },
  methods: Object.assign({

  }, formatAc)
}

export default FcElement
