/**
 * Created by 001264 on 2017/9/10.
 */
import FcElement from '../element/app.vue'
import formatAc from '../../func/format_style'

const EImage = {
  components: {
    FcElement
  },
  name: 'EImage',
  data () {
    return {
      randKey: Math.random(),
      imageStyle: {}
    }
  },
  props: ['param', 'isSet', 'zIndex', 'acCallback', 'entry'],
  created () {
    const param = this.param
    this.imageStyle = this.formatStyle(param.imageStyle || {})
    if (param.url) {
      this.imageStyle['background-image'] = 'url(' + param.url + ')'
    }
    if (param.elementStyle.height > param.elementStyle.width) {
      this.imageStyle['background-size'] = 'auto 100%'
    }
  },
  methods: Object.assign({

  }, formatAc)
}

export default EImage
