/**
 * Created by 001264 on 2017/9/10.
 */

const FcEelement = {
  name: 'FcEelement',
  data () {
    return {
      randKey: Math.random(),
      setterStyle: {},
      clickCallback: () => {}
    }
  },
  props: ['param', 'isSet', 'eid', 'mid', 'setConfig', 'zIndex', 'acCallback'],
  created () {
    if (this.acCallback) {
      this.clickCallback = this.acCallback
    }
    const param = this.param
    this.setConfig = this.setConfig || {}
    const remStandar = 375
    param.style = param.style || {}
    let setterStyle = {}
    let defaultWidth
    switch (param.tag) {
      case 'image':
        defaultWidth = 50
        break
      case 'text':
        defaultWidth = 200
        break
      case 'icon':
        defaultWidth = 50
        break
    }
    param.style.width = parseInt(param.style.width, 10) || defaultWidth
    for (let i in param.style) {
      switch (i) {
        case 'padding-left':
        case 'padding-right':
        case 'padding-top':
        case 'padding-bottom':
          if (param.style[i] || parseInt(param.style[i]) === 0) {
            setterStyle[i] = (parseInt(param.style[i])) + 'px'
          }
          break
        case 'border-top-width':
        case 'border-bottom-width':
        case 'border-left-width':
        case 'border-right-width':
          if (param.style[i] || parseInt(param.style[i]) === 0) {
            setterStyle[i] = (parseInt(param.style[i])) + 'px'
          }
          break
        case 'background-image':
          if (param.style[i]) {
            setterStyle[i] = 'url(' + param.style[i] + ')'
            setterStyle['background-size'] = '100% auto'
          }
          break
        case 'width':
          setterStyle[i] = param.style.width / remStandar + 'rem'
          break
        case 'height':
          let elementHeight = parseInt(param.style.height, 10) || 'auto'
          setterStyle[i] = elementHeight == 'auto' ? 'auto' : elementHeight / remStandar + 'rem'
          break
        case 'top':
          let elementTop = parseInt(param.style.top, 10) || 0
          setterStyle[i] = elementTop / remStandar + 'rem'
          break
        case 'left':
          let elementLeft = parseInt(param.style.left, 10) || 0
          setterStyle[i] = elementLeft / remStandar + 'rem'
          break
        case 'rotateZ':
          let rotateZ = param.style[i]
          Object.assign(setterStyle, {
            transform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            WebkitTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            OTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            MozTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            MsTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)'
          })
          break
        case 'opacity':
          if (param.style[i]) {
            setterStyle[i] = parseInt(param.style[i]) / 100
          }
          break
        default:
          if (param.style[i]) {
            setterStyle[i] = param.style[i]
          }
          break
      }
    }
    if (param.imageRadius) {
      this.setterStyle['border-radius'] = param.imageRadius + 'px'
    }
    this.setterStyle['z-index'] = this.zIndex || 0
    this.setterStyle['z-index'] = this.zIndex || 0
    this.setterStyle = Object.assign({}, this.setterStyle, setterStyle)
  },
  mounted () {

  },
  methods: {

  }
}

export default FcEelement
