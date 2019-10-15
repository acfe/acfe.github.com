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
      hiddenStyle: {},
      tableStyle: {},
      minHeightStyle: {},
      nameStyle: {},
      descriptionStyle: {},
      salePriceStyle: {},
      originPriceStyle: {},
      imageStyle: {},
      contentPaddingStyle: {},
      cellStyle: {},
      priceAlignStyle: {},
      itemStyle: {},
      imageFloatStyle: {},
      theme: 1,
      columNum: 2,
      checkedId: 0,
      checkRightPadding (style, columNum, key) {
        let newStyle = Object.assign({}, style)
        if (key > 0 && (key + 1) % columNum == 0) {
          newStyle['padding-right'] = 0
        }
        return newStyle
      }
    }
  },
  props: ['param', 'dataSource', 'elementRefreshCallback', 'isSet', 'setConfig', 'mid', 'acCallback'],
  created () {
    const param = this.param
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
        let goodsDatas = dataSource.goodsDatas || []
        for (let i in goodsDatas) {
          if (goodsDatas[i].value == param.dataSourceId) {
            dataContent = goodsDatas[i].data
          }
        }
        break
    }
    // 样式设置
    this.minHeightStyle['min-height'] = '34px'
    if (this.isSet) {
      this.hiddenStyle.overflow = 'hidden'
    }
    if (param.theme) {
      this.theme = param.theme
    }
    if (param.nameStyle) {
      this.nameStyle = this.formatStyle(param.nameStyle)
    }
    if (param.descriptionStyle) {
      this.descriptionStyle = this.formatStyle(param.descriptionStyle)
    }
    if (param.salePriceStyle) {
      this.salePriceStyle = this.formatStyle(param.salePriceStyle)
      this.priceAlignStyle['text-align'] = this.salePriceStyle['text-align'] || 'left'
    }
    if (param.originPriceStyle) {
      this.originPriceStyle = this.formatStyle(param.originPriceStyle)
    }
    if (param.imageStyle) {
      this.imageStyle = this.formatStyle(param.imageStyle)
      if (this.imageStyle.float) {
        this.imageFloatStyle.float = this.imageStyle.float
      }
    }
    if (param.itemStyle) {
      this.itemStyle = this.formatStyle(param.itemStyle)
    }
    let mw = 375
    let reduceGroup
    switch (this.theme) {
      case 1:
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
          mw -= parseInt(param.contentPaddingRight) * (this.columNum - 1)
        }
        reduceGroup = [
          {
            setter: param.style,
            setRate: 1
          },
          {
            setter: param.itemStyle,
            setRate: this.columNum
          },
          {
            setter: param.imageStyle,
            setRate: this.columNum
          }
        ]
        for (let i in reduceGroup) {
          if (reduceGroup[i].setter) {
            mw -= (parseInt(reduceGroup[i].setter['padding-left']) || 0) * reduceGroup[i].setRate
            mw -= (parseInt(reduceGroup[i].setter['padding-right']) || 0) * reduceGroup[i].setRate
            mw -= (parseInt(reduceGroup[i].setter['border-left-width']) || 0) * reduceGroup[i].setRate
            mw -= (parseInt(reduceGroup[i].setter['border-right-width']) || 0) * reduceGroup[i].setRate
          }
        }
        mw = parseInt(mw / this.columNum)
        if (!param.imageStyle.width) {
          this.imageStyle.width = mw / 375 + 'rem'
        }
        break
      case 4:
        param.contentPaddingRight = param.contentPaddingRight || 10
        this.columNum = parseFloat(param.columNum, 10) || 2
        for (let c in dataContent) {
          this.content.push(dataContent[c])
        }
        if (dataContent.length < this.columNum) {
          let add = this.columNum - dataContent.length
          for (let i = 0; i < add; i++) {
            this.content.push('')
          }
        }
        let showNum = dataContent.length > this.columNum ? dataContent.length : this.columNum
        let tableWidth = (100 / this.columNum) * showNum
        this.cellStyle.width = 100 / showNum + '%'
        this.tableStyle.width = tableWidth + '%'
        if (param.contentPaddingRight || parseInt(param.contentPaddingRight) === 0) {
          this.contentPaddingStyle['padding-right'] = (parseInt(param.contentPaddingRight)) + 'px'
        }
        break
    }
  },
  methods: Object.assign({

  }, formatAc)
}

export default MGoods
