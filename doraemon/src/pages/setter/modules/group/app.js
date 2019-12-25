/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../../func/format_style'

const MGroup = {
  components: {
    FcModules
  },
  name: 'MGroup',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      dataContent: [],
      contentList: [],
      titleStyle: {},
      imageFloatStyle: {},
      imageStyle: {},
      descriptionStyle: {},
      contentPaddingStyle: {},
      itemStyle: {},
      iconStyle: {},
      clickCallback: () => {},
      svgContent: '<svg t="1566294106551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9903" width="32" height="32"><path d="M966.4 323.2c-9.6-9.6-25.6-9.6-35.2 0l-416 416-425.6-416c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l441.6 432c9.6 9.6 25.6 9.6 35.2 0l435.2-432C976 345.6 976 332.8 966.4 323.2z" p-id="9904" fill="#cdcdcd"></path></svg>',
      iconContent: ''
    }
  },
  props: ['param', 'tabItems', 'dataSource', 'isSet', 'refreshContent', 'setSetterContent', 'mid', 'acCallback'],
  created () {
    const param = this.param
    this.pages = this.$store.state.contentConfig.pages
    this.clickCallback = this.acCallback || this.clickCallback
    // 内容设置
    let dataContent = []
    switch (param.dataType) {
      case 0:
        if (param.singleDatas && param.singleDatas.data) {
          dataContent = param.singleDatas.data
        }
        break
      case 1:
        let dataSource = this.dataSource || {}
        let imagesDatas = dataSource.images || []
        for (let i in imagesDatas) {
          if (imagesDatas[i].value == param.dataSourceId) {
            dataContent = imagesDatas[i].data
          }
        }
        break
    }
    this.theme = param.theme || 1
    switch (this.theme) {
      case 1001:
        this.setContent(dataContent)
        break
      default:
        this.dataContent = dataContent
        break
    }
    // 样式设置
    this.itemStyle = this.formatStyle(param.itemStyle || {})
    this.titleStyle = this.formatStyle(param.titleStyle || {})
    this.descriptionStyle = this.formatStyle(param.descriptionStyle || {})
    this.imageStyle = this.formatStyle(param.imageStyle || {})
    if (this.imageStyle.float) {
      this.imageFloatStyle.float = this.imageStyle.float
    }
    if (this.imageStyle['text-align']) {
      this.imageFloatStyle['text-align'] = this.imageStyle['text-align']
    }
    if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
      this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom) / 375) + 'rem'
    }
    if (param.iconWidth) {
      this.iconStyle = Object.assign(this.iconStyle, {
        width: param.iconWidth + 'px',
        height: param.iconWidth + 'px',
        'margin-top': -parseInt(param.iconWidth) / 2 + 'px'
      })
    }
    if (param.iconRight) {
      this.iconStyle = Object.assign(this.iconStyle, {
        right: param.iconRight + 'px'
      })
    }
    this.iconContent = this.resetSvg(this.svgContent, this.param.iconWidth || 12, this.param.iconColor || '#cdcdcd')
  },
  methods: Object.assign({
    setContent (dataContent) {
      let pages = this.pages
      let pagesObj = {}
      if (pages && pages.length) {
        for (let i in pages) {
          pagesObj[pages[i].id] = pages[i]
        }
      }
      if (dataContent && dataContent.length) {
        for (let i in dataContent) {
          if (pagesObj[dataContent[i].tabPageId]) {
            dataContent[i].content = pagesObj[dataContent[i].tabPageId].content
          }
        }
      }
      this.dataContent = dataContent
    },
    switchControl (item) {
      item.open = !item.open
      if (!this.$refs['c' + item.tabPageId] || !this.$refs['i' + item.tabPageId]) {
        return false
      }
      if (item.open && item.tabPageId) {
        this.$refs['i' + item.tabPageId][0].className = 'switch-icon switch-icon-open'
        this.$refs['c' + item.tabPageId][0].style.height = this.$refs['c' + item.tabPageId][0].scrollHeight + 'px'
      } else {
        this.$refs['i' + item.tabPageId][0].className = 'switch-icon'
        this.$refs['c' + item.tabPageId][0].style.height = 0
      }
    },
    resetSvg (svgContent, width, color) {
      svgContent = svgContent.replace(/width=".*?"/, 'width="' + width + '"')
      svgContent = svgContent.replace(/height=".*?"/, 'height="' + width + '"')
      svgContent = svgContent.replace(/fill=".*?"/g, 'fill="' + color + '"')
      return svgContent
    }
  }, formatAc)
}

export default MGroup
