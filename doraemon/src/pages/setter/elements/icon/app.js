/**
 * Created by 001264 on 2017/9/10.
 */
import FcEelement from '../element/app.vue'

const EIcon = {
  components: {
    FcEelement
  },
  name: 'EIcon',
  data () {
    return {
      randKey: Math.random(),
      imageRadiusStyle: {},
      hasIcon: false,
      svgContent: ''
    }
  },
  props: ['param', 'isSet', 'zIndex', 'acCallback', 'entry'],
  created () {
    const param = this.param
    if (param.svgContent && /<svg.*><\/svg>/.test(param.svgContent)) {
      this.hasIcon = true
      this.svgContent = param.svgContent
    }
  },
  mounted () {
    if (this.svgContent && this.$refs.svg) {
      this.$refs.svg.innerHTML = this.resetSvg(this.svgContent, this.param.elementStyle.width || 32, this.param.iconColor || '#cdcdcd')
    }
  },
  methods: {
    resetSvg (svgContent, width, color) {
      svgContent = svgContent.replace(/width=".*?"/, 'width="' + width + '"')
      svgContent = svgContent.replace(/height=".*?"/, 'height="' + width + '"')
      svgContent = svgContent.replace(/fill=".*?"/g, 'fill="' + color + '"')
      return svgContent
    }
  }
}

export default EIcon
