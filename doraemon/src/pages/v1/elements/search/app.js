/**
 * Created by 001264 on 2017/9/10.
 */
import FcEelement from '../element/app.vue'
import formatAc from '../../modules/ac/format_style'

const ESearch = {
  components: {
    FcEelement
  },
  name: 'ESearch',
  data () {
    return {
      randKey: Math.random(),
      svgContent: '<svg t="1566293079644" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3509" width="32" height="32"><path d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z" p-id="3510" fill="#cdcdcd"></path></svg>',
      backSvgContent: '<svg t="1566292182927" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2978" width="32" height="32"><path d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z" p-id="2979" fill="#cdcdcd"></path></svg>',
      inputParam: {
        value: ''
      },
      backIconStyle: {},
      iconCellStyle: {},
      inputTextStyle: {},
      searchTextStyle: {},
      searchIconStyle: {}
    }
  },
  props: ['param', 'isSet', 'eid', 'setConfig', 'zIndex', 'mid', 'acCallback'],
  created () {
    const param = this.param
    param.theme = param.theme || 1
    switch (param.theme) {
      case 1:
        param.svgContent = param.svgContent || this.svgContent
        if (param.svgContent && /<svg.*><\/svg>/.test(param.svgContent)) {
          this.hasIcon = true
          this.svgContent = param.svgContent
        }
        if (param.inputTextStyle) {
          this.inputTextStyle = this.formatTextStyle(param.inputTextStyle)
        }
        if (param.searchTextStyle) {
          this.searchTextStyle = this.formatTextStyle(param.searchTextStyle)
          this.searchTextStyle['padding-left'] = (param.searchInputPadding || 0) / 375 + 'rem'
        }
        this.searchIconStyle['padding-left'] = (param.searchInputPadding || 0) / 375 + 'rem'
        this.iconCellStyle.width = (this.param.iconWidth || 20) / 375 + 'rem'
        this.backIconStyle['padding-right'] = (param.backInputPadding || 0) / 375 + 'rem'
        param.elementStyle = false
        if (param.showType == 2) {
          param.elementStyle = {
            'background-image': 'none',
            'background-color': 'none'
          }
          if (!this.isSet) {
            param.elementStyle['z-index'] = 0
          }
        }
        break
    }
  },
  mounted () {
    if (this.svgContent && this.$refs.svg) {
      this.$refs.svg.innerHTML = this.resetSvg(this.svgContent, this.param.iconWidth || 20, this.param.iconColor || '#cccccc')
    }
    if (this.backSvgContent && this.$refs.backSvg) {
      this.$refs.backSvg.innerHTML = this.resetSvg(this.backSvgContent, this.param.backIconWidth || 20, this.param.backIconColor || '#cccccc')
    }
    if (this.svgContent && this.$refs.searchSvg) {
      this.$refs.searchSvg.innerHTML = this.resetSvg(this.svgContent, this.param.iconWidth || 20, this.param.iconColor || '#cccccc')
    }
  },
  methods: Object.assign({
    resetSvg (svgContent, width, color) {
      svgContent = svgContent.replace(/width=".*?"/, 'width="' + width + '"')
      svgContent = svgContent.replace(/height=".*?"/, 'height="' + width + '"')
      svgContent = svgContent.replace(/fill=".*?"/g, 'fill="' + color + '"')
      return svgContent
    },
    showFull () {
      if (this.isSet) {
        return false
      }
      const param = this.param
      param.showType = 1
      param.elementStyle = false
      this.randKey = Math.random()
      setTimeout(() => {
        if (this.svgContent && this.$refs.svg) {
          this.$refs.svg.innerHTML = this.resetSvg(this.svgContent, this.param.iconWidth || 20, this.param.iconColor || '#cccccc')
        }
        if (this.backSvgContent && this.$refs.backSvg) {
          this.$refs.backSvg.innerHTML = this.resetSvg(this.backSvgContent, this.param.backIconWidth || 20, this.param.backIconColor || '#cccccc')
        }
      })
    },
    hideFull () {
      if (this.isSet) {
        return false
      }
      const param = this.param
      param.showType = 2
      param.elementStyle = {
        'background-image': 'none',
        'background-color': 'none',
        'z-index': '0'
      }
      this.randKey = Math.random()
      setTimeout(() => {
        if (this.svgContent && this.$refs.searchSvg) {
          this.$refs.searchSvg.innerHTML = this.resetSvg(this.svgContent, this.param.iconWidth || 20, this.param.iconColor || '#cccccc')
        }
      })
    }
  }, formatAc)
}

export default ESearch
