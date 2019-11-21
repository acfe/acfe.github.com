/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../../func/format_style'

const MImages = {
  components: {
    FcModules
  },
  name: 'MImages',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      dataContent: [],
      contentList: [],
      hiddenStyle: {},
      contentPaddingStyle: {},
      itemStyle: {},
      imageFloatStyle: {},
      imageStyle: {},
      titleStyle: {},
      descriptionStyle: {},
      domPlayerParam: {
        loop: true,
        autoPlay: true,
        autoPlayTime: 5000,
        renderPage: 0,
        data: []
      },
      clickCallback: () => {},
      getContentPaddingStyle (contentPaddingStyle, key) {
        if (key == this.dataContent.length - 1) {
          return Object.assign({}, contentPaddingStyle, { 'padding-right': 0 })
        }
        return contentPaddingStyle
      },
      inTheme (theme, list) {
        let inList = false
        for (let i in list) {
          if (list[i] == theme) {
            inList = true
          }
        }
        return inList
      }
    }
  },
  props: ['param', 'dataSource', 'isSet', 'refreshContent', 'setSetterContent', 'mid', 'acCallback'],
  created () {
    if (this.isSet) {
      this.hiddenStyle.overflow = 'hidden'
    }
    const param = this.param
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
    this.dataContent = dataContent
    // 样式设置
    this.itemStyle = this.formatStyle(param.itemStyle || {})
    this.imageStyle = this.formatStyle(param.imageStyle || {})
    this.titleStyle = this.formatStyle(param.titleStyle || {})
    this.descriptionStyle = this.formatStyle(param.descriptionStyle || {})
    if (this.imageStyle.float) {
      this.imageFloatStyle.float = this.imageStyle.float
    }
    if (this.imageStyle['text-align']) {
      this.imageFloatStyle['text-align'] = this.imageStyle['text-align']
    }
    if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
      this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom) / 375) + 'rem'
    }
    if (param.contentPaddingRight || parseInt(param.contentPaddingRight) === 0) {
      this.contentPaddingStyle['padding-right'] = (parseInt(param.contentPaddingRight) / 375) + 'rem'
    }
    this.setThemeContent()
  },
  methods: Object.assign({
    stopTouchstart (e) {
      e.stopPropagation()
    }
  }, formatAc)
}

export default MImages
