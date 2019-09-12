/**
 * Created by 001264 on 2017/9/10.
 */
import FcEelement from '../element/app.vue'

const EText = {
  components: {
    FcEelement
  },
  name: 'EText',
  data () {
    return {
      randKey: Math.random(),
      imageRadiusStyle: {},
      textStyle: {}
    }
  },
  props: ['param', 'isSet', 'eid', 'setConfig', 'zIndex', 'mid', 'acCallback'],
  created () {
    const param = this.param
    if (param.imageRadius) {
      this.imageRadiusStyle['border-radius'] = param.imageRadius + 'px'
    }
    this.textStyle = this.formatTextStyle(param.textStyle)
    let elementHeight = parseInt(param.style.height, 10) || 'auto'
    this.textStyle.height = elementHeight == 'auto' ? 'auto' : elementHeight / 375 + 'rem'
  },
  methods: {
    formatTextStyle (style) {
      let newStyle = {}
      const remStandar = 375
      for (let i in style) {
        switch (i) {
          case 'font-size':
          case 'line-height':
            if (style[i] || parseInt(style[i]) === 0) {
              newStyle[i] = (parseInt(style[i]) / remStandar) + 'rem'
            }
            break
          default:
            if (style[i]) {
              newStyle[i] = style[i]
            }
            break
        }
      }
      return newStyle
    }
  }
}

export default EText
