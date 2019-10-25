/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../../func/format_style'

const MGoods = {
  components: {
    FcModules
  },
  name: 'MGoods',
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
      nameStyle: {},
      descriptionStyle: {},
      salePriceStyle: {},
      originPriceStyle: {},
      salePriceTagStyle: {},
      originPriceTagStyle: {},
      cartIconStyle: {},
      clickCallback: () => {},
      getContentPaddingStyle (contentPaddingStyle, key) {
        if (key == this.dataContent.length - 1) {
          return Object.assign({}, contentPaddingStyle, { 'padding-right': 0 })
        }
        return contentPaddingStyle
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
        let goodsDatas = dataSource.goods || []
        for (let i in goodsDatas) {
          if (goodsDatas[i].value == param.dataSourceId) {
            dataContent = goodsDatas[i].data
          }
        }
        break
    }
    this.theme = param.theme || 1
    this.dataContent = dataContent
    // 样式设置
    this.itemStyle = this.formatStyle(param.itemStyle || {})
    this.imageStyle = this.formatStyle(param.imageStyle || {})
    this.nameStyle = this.formatStyle(param.nameStyle || {})
    this.descriptionStyle = this.formatStyle(param.descriptionStyle || {})
    this.salePriceStyle = this.formatStyle(param.salePriceStyle || {})
    this.originPriceStyle = this.formatStyle(param.originPriceStyle || {})
    this.salePriceTagStyle = this.formatStyle(param.salePriceTagStyle || {})
    this.originPriceTagStyle = this.formatStyle(param.originPriceTagStyle || {})
    this.cartIconStyle = this.formatStyle(param.cartIconStyle || {})
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

  }, formatAc)
}

export default MGoods
