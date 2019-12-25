/**
 * Created by 001264 on 2019/9/10.
 */
import formatAc from '../../func/format_style'
import ElementAc from '../../func/element_ac'

const FcModules = {
  name: 'FcModules',
  data () {
    return {
      randKey: Math.random(),
      moduleStyle: {},
      moreTextStyle: {},
      moreIconStyle: {},
      baseZindex: 0,
      isShowMore: false,
      moreSvgContent: '<svg t="1566294106551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9903" width="32" height="32"><path d="M966.4 323.2c-9.6-9.6-25.6-9.6-35.2 0l-416 416-425.6-416c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l441.6 432c9.6 9.6 25.6 9.6 35.2 0l435.2-432C976 345.6 976 332.8 966.4 323.2z" p-id="9904" fill="#cdcdcd"></path></svg>',
      moreIconContent: ''
    }
  },
  props: ['param', 'isSet', 'refreshContent', 'setSetterContent', 'mid', 'acCallback'],
  created () {
    const param = this.param
    if (param.tag == 'tab') {
      this.baseZindex = 1000
    }
    this.moveParam = {}
    this.sizeMoveParam = {}
    this.moduleStyle = this.formatStyle(param.moduleStyle || {})
    this.moreTextStyle = this.formatStyle(param.moreTextStyle || {})
    if (param.heightType == 'set' && param.moduleHeight) {
      this.moduleStyle['height'] = param.moduleHeight / 375 + 'rem'
      this.moduleStyle['min-height'] = 0
    } else if (param.heightType == 'screen') {
      let mh = this.isSet ? 667 : document.body.clientHeight
      this.moduleStyle['height'] = mh + 'px'
      this.param.moduleHeight = mh
    } else {
      this.param.heightType = 'auto'
    }
    // console.log(this.param)
    if (!this.isSet) {
      this.moduleStyle['overflow-x'] = 'hidden'
    }
    this.moreIconContent = this.resetSvg(this.moreSvgContent, this.param.moreIconWidth || 12, this.param.moreIconColor || '#cdcdcd')
    if (this.param.moreIconLineHeight) {
      this.moreIconStyle['line-height'] = parseInt(this.param.moreIconLineHeight) / 375 + 'rem'
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.fcModule && this.param.heightType == 'auto') {
        this.param.moduleHeight = this.$refs.fcModule.offsetHeight
      }
      if (this.$refs.fcModule.scrollHeight > this.$refs.fcModule.offsetHeight) {
        this.isShowMore = true
      }
    }, 100)
    if (this.isSet) {
      this.$refs.fcModule.addEventListener('mousedown', this.mousedown)
      this.$refs.fcModule.addEventListener('mousemove', this.mousemove)
      this.$refs.fcModule.addEventListener('mouseup', this.mouseup)
    }
  },
  methods: Object.assign({
    showMore () {
      this.isShowMore = false
      this.$refs.fcModule.style.height = this.$refs.fcModule.scrollHeight + 'px'
    },
    resetSvg (svgContent, width, color) {
      svgContent = svgContent.replace(/width=".*?"/, 'width="' + width + '"')
      svgContent = svgContent.replace(/height=".*?"/, 'height="' + width + '"')
      svgContent = svgContent.replace(/fill=".*?"/g, 'fill="' + color + '"')
      return svgContent
    }
  }, formatAc, ElementAc)
}

export default FcModules
