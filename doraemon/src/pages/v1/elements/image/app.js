/**
 * Created by 001264 on 2017/9/10.
 */
import FcEelement from '../element/app.vue'

const EImage = {
  components: {
    FcEelement
  },
  name: 'EImage',
  data () {
    return {
      randKey: Math.random(),
      imageRadiusStyle: {}
    }
  },
  props: ['param', 'isSet', 'eid', 'setConfig', 'zIndex', 'mid', 'acCallback'],
  created () {
    const param = this.param
    if (param.imageRadius) {
      this.imageRadiusStyle['border-radius'] = param.imageRadius + 'px'
    }
  },
  methods: {

  }
}

export default EImage
