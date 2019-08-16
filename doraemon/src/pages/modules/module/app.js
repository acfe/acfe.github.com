/**
 * Created by 001264 on 2017/9/10.
 */
import elementAc from '../ac/element_ac'

const FcModules = {
  name: 'FcModules',
  data () {
    return {
      randKey: Math.random(),
      moudleStyle: {}
    }
  },
  props: ['param', 'isSet', 'elementRefreshCallback', 'setConfig', 'mid', 'acCallback'],
  created () {
    const param = this.param
    this.moveParam = {}
    let moudleStyle = {}
    switch (param.tag) {
      case 'images':
        param.theme = param.theme || 1
        switch (param.theme) {
          case 2:
          case 4:
            param.style = param.style || {
              'padding-left': 10
            }
            break
        }
        break
    }
    if (param && param.style) {
      for (let i in param.style) {
        switch (i) {
          case 'margin-left':
          case 'margin-right':
          case 'margin-top':
          case 'margin-bottom':
          case 'padding-left':
          case 'padding-right':
          case 'padding-top':
          case 'padding-bottom':
            if (param.style[i] || parseInt(param.style[i]) === 0) {
              moudleStyle[i] = (parseInt(param.style[i])) + 'px'
            }
            break
          case 'border-top-width':
          case 'border-bottom-width':
          case 'border-left-width':
          case 'border-right-width':
            if (param.style[i] || parseInt(param.style[i]) === 0) {
              moudleStyle[i] = (parseInt(param.style[i])) + 'px'
            }
            break
          case 'background-image':
            if (param.style[i]) {
              moudleStyle[i] = 'url(' + param.style[i] + ')'
              moudleStyle['background-size'] = '100% auto'
            }
            break
          default:
            if (param.style[i]) {
              moudleStyle[i] = param.style[i]
            }
            break
        }
      }
      if (param.heightType == 'set' && param.moduleHeight) {
        moudleStyle['height'] = param.moduleHeight / 375 + 'rem'
      } else if (param.heightType == 'screen') {
        let mh = this.isSet ? 667 : document.body.clientHeight
        moudleStyle['height'] = mh + 'px'
      }
      if (param.overflow) {
        moudleStyle['overflow'] = param.overflow
      }
      this.moudleStyle = moudleStyle
    }
  },
  mounted () {
    if (this.isSet) {
      this.$refs.fcModule.addEventListener('mousedown', this.mousedown)
      this.$refs.fcModule.addEventListener('mousemove', this.mousemove)
      this.$refs.fcModule.addEventListener('mouseup', this.mouseup)
      setTimeout(() => {
        if (this.$refs.fcModule) {
          this.param.moduleHeight = this.$refs.fcModule.clientHeight
        }
      }, 500)
    }
  },
  methods: Object.assign({

  }, elementAc)
}

export default FcModules
