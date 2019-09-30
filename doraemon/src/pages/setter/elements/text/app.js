/**
 * Created by 001264 on 2017/9/10.
 */
import FcElement from '../element/app.vue'
import formatAc from '../../func/format_style'

const EText = {
  components: {
    FcElement
  },
  name: 'EText',
  data () {
    return {
      randKey: Math.random(),
      textStyle: {}
    }
  },
  props: ['param', 'isSet', 'zIndex', 'acCallback'],
  created () {
    const param = this.param
    this.textStyle = this.formatStyle(param.textStyle || {})
  },
  methods: Object.assign({

  }, formatAc)
}

export default EText
