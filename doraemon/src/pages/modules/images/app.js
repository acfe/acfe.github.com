/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../ac/format_style'

const MImages = {
  components: {
    FcModules
  },
  name: 'MImages',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      columNum: 2,
      content: [],
      hiddenStyle: {},
      imageStyle: {},
      cellStyle: {},
      tableStyle: {},
      titleStyle: {},
      descriptionStyle: {},
      minHeightStyle: {},
      contentPaddingStyle: {},
      imageRadiusStyle: {},
      domPlayerParam: {
        loop: true,
        autoPlay: true,
        autoPlayTime: 5000,
        renderPage: 0,
        data: []
      }
    }
  },
  props: ['param', 'dataSource', 'elementRefreshCallback', 'isSet', 'setConfig', 'mid', 'acCallback'],
  created () {
    const param = this.param
    let dataContent = []
    let dataSource = this.dataSource || {}
    let imagesDatas = dataSource.imagesDatas || []
    for (let i in imagesDatas) {
      if (imagesDatas[i].value == param.dataSourceId) {
        dataContent = imagesDatas[i].data
      }
    }
    if (this.isSet) {
      this.hiddenStyle.overflow = 'hidden'
    }
    if (param.theme) {
      this.theme = param.theme
    }
    if (param.titleStyle) {
      this.titleStyle = this.formatTextStyle(param.titleStyle)
    }
    if (param.descriptionStyle) {
      this.descriptionStyle = this.formatTextStyle(param.descriptionStyle)
    }
    if (param.imageStyle) {
      this.imageStyle = this.formatImageStyle(param.imageStyle)
    }
    this.minHeightStyle['min-height'] = '34px'
    param.imageRadius = param.imageRadius || 0
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
        }
        break
      case 3:
        let data = []
        for (let c in dataContent) {
          data.push(Object.assign(dataContent[c], {
            slot: 's1'
          }))
        }
        this.domPlayerParam.data = data
        this.domPlayerParam.loop = !!parseInt(param.loop)
        if (data.length <= 1) {
          this.domPlayerParam.loop = false
        }
        this.domPlayerParam.showGuild = !!parseInt(param.showGuild)
        this.domPlayerParam.autoPlayTime = parseInt(param.autoPlayTime) || 0
        if (!this.domPlayerParam.autoPlayTime) {
          this.domPlayerParam.autoPlay = false
        } else if (this.domPlayerParam.autoPlayTime < 100) {
          this.domPlayerParam.autoPlayTime = 100
        }
        if (this.isSet) {
          this.domPlayerParam.autoPlay = false
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
    if (param.imageRadius) {
      this.imageRadiusStyle['border-radius'] = param.imageRadius + 'px'
    }
  },
  methods: Object.assign({

  }, formatAc)
}

export default MImages
