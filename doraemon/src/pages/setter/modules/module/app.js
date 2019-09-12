/**
 * Created by 001264 on 2019/9/10.
 */
import formatAc from '../../func/format_style'

const FcModules = {
  name: 'FcModules',
  data () {
    return {
      randKey: Math.random(),
      moudleStyle: {}
    }
  },
  props: ['param', 'isSet'],
  created () {
    const param = this.param
    this.moudleStyle = this.formatStyle(param.moudleStyle || {})
  },
  mounted () {

  },
  methods: Object.assign({

  }, formatAc)
}

export default FcModules
