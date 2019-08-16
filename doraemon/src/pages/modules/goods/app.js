/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../ac/format_style'

const MGoods = {
  components: {
    FcModules
  },
  name: 'MGoods',
  data () {
    return {
      randKey: Math.random(),
      content: [],
      minHeightStyle: {},
      nameStyle: {},
      descriptionStyle: {},
      salePriceStyle: {},
      originPriceStyle: {},
      imageStyle: {},
      contentPaddingStyle: {},
      cellStyle: {},
      priceAlignStyle: {},
      theme: 1,
      columNum: 2,
      checkedId: 0
    }
  },
  props: ['param', 'dataSource', 'elementRefreshCallback', 'isSet', 'setConfig', 'mid', 'acCallback'],
  created () {
    this.minHeightStyle['min-height'] = '34px'
    const param = this.param
    if (param.theme) {
      this.theme = param.theme
    }
    if (param.nameStyle) {
      this.nameStyle = this.formatTextStyle(param.nameStyle)
    }
    if (param.descriptionStyle) {
      this.descriptionStyle = this.formatTextStyle(param.descriptionStyle)
    }
    if (param.salePriceStyle) {
      this.salePriceStyle = this.formatTextStyle(param.salePriceStyle)
      this.priceAlignStyle['text-align'] = this.salePriceStyle['text-align'] || 'left'
    }
    if (param.originPriceStyle) {
      this.originPriceStyle = this.formatTextStyle(param.originPriceStyle)
    }
    if (param.imageStyle) {
      this.imageStyle = this.formatImageStyle(param.imageStyle)
    }
    switch (param.dataType) {
      case 1:
        let dataContent = []
        let dataSource = this.dataSource || {}
        let goodsDatas = dataSource.goodsDatas || []
        for (let i in goodsDatas) {
          if (goodsDatas[i].value == param.dataSourceId) {
            dataContent = goodsDatas[i].data
          }
        }
        switch (this.theme) {
          case 1:
            if (param.imageRadius) {
              this.imageStyle['border-radius'] = param.imageRadius + 'px'
            }
            if (param.imageWidth) {
              this.imageStyle['width'] = parseInt(param.imageWidth) / 375 + 'rem'
            }
            param.contentPaddingBottom = param.contentPaddingBottom || 10
            if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
              this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom)) + 'px'
            }
            this.content = dataContent
            break
          case 2:
            param.contentPaddingBottom = param.contentPaddingBottom || 10
            param.contentPaddingRight = param.contentPaddingRight || 10
            this.columNum = parseInt(param.columNum, 10) || 2
            for (let c in dataContent) {
              this.content.push(dataContent[c])
            }
            if (dataContent.length < this.columNum) {
              let add = this.columNum - dataContent.length
              for (let i = 0; i < add; i++) {
                this.content.push('')
              }
            }
            this.cellStyle.width = 100 / this.columNum + '%'
            if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
              this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom)) + 'px'
            }
            if (param.contentPaddingRight || parseInt(param.contentPaddingRight) === 0) {
              this.contentPaddingStyle['padding-right'] = (parseInt(param.contentPaddingRight)) + 'px'
            }
            break
        }
        break
    }
  },
  methods: Object.assign({

  }, formatAc)
}

export default MGoods
