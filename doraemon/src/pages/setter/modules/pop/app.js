/**
 * Created by 001264 on 2017/9/10.
 */
import elementAc from '../../func/element_ac'
import formatStyle from '../../func/format_style'

const MPop = {
  name: 'MPop',
  data () {
    return {
      randKey: Math.random(),
      maskStyle: {},
      moveParam: {},
      sizeMoveParam: {},
      setPopId: 0
    }
  },
  props: ['param', 'isSet', 'refreshContent', 'setSetterContent', 'popId', 'acCallback'],
  created () {
    if (this.isSet) {
      this.setPopId = this.$store.state.setConfig.setPopId
    }
    let param = this.param || {}
    this.maskStyle = this.formatStyle(param.style || {})
  },
  mounted () {
    if (this.$refs.fcPop && this.isSet) {
      this.$refs.fcPop.addEventListener('mousedown', this.mousedown)
      this.$refs.fcPop.addEventListener('mousemove', this.mousemove)
      this.$refs.fcPop.addEventListener('mouseup', this.mouseup)
    }
  },
  methods: Object.assign({
    touchstart (e) {
      e.preventDefault()
    }
  }, elementAc, formatStyle)
}

export default MPop
