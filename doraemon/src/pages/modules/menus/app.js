/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../ac/format_style'

const MMenus = {
  components: {
    FcModules
  },
  name: 'MMenus',
  data () {
    return {
      randKey: Math.random(),
      content: [],
      minHeightStyle: {},
      imageRadiusStyle: {},
      imageStyle: {},
      hiddenStyle: {},
      tableStyle: {},
      cellStyle: {},
      contentPaddingStyle: {},
      nameStyle: {},
      nameCheckedStyle: {},
      checkedBarStyle: {},
      theme: 1,
      checkedId: 0
    }
  },
  props: ['param', 'dataSource', 'elementRefreshCallback', 'isSet', 'setConfig', 'mid', 'acCallback'],
  created () {
    const param = this.param
    let dataContent = []
    let dataSource = this.dataSource || {}
    let menusDatas = dataSource.menusDatas || []
    for (let i in menusDatas) {
      if (menusDatas[i].value == param.dataSourceId) {
        dataContent = menusDatas[i].data
        this.checkedId = menusDatas[i].checkedId
      }
    }
    if (this.isSet) {
      this.hiddenStyle.overflow = 'hidden'
    }
    if (param.theme) {
      this.theme = param.theme
    } else {
      Object.assign(this.param, {
        contentPaddingRight: 0,
        columNum: 4,
        moduleHeight: 45,
        heightType: 'set',
        nameStyle: {
          'font-size': 14,
          'color': '#666666',
          'text-align': 'center',
          'line-height': 26
        },
        nameCheckedStyle: {
          'color': '#2979FF',
          'text-align': 'center',
          'line-height': 26
        },
        checkedBarStyle: {
          'background': '#2979FF',
          'width': 50,
          'height': 3,
          'top': 36,
          'border-radius': 3,
          'align': 'center'
        },
        style: {}
      })
    }
    if (param.nameStyle) {
      this.nameStyle = this.formatTextStyle(param.nameStyle)
    }
    if (param.nameCheckedStyle) {
      this.nameCheckedStyle = this.formatTextStyle(param.nameCheckedStyle)
    }
    if (param.checkedBarStyle) {
      this.checkedBarStyle = this.formatCheckedBarStyle(param.checkedBarStyle)
    }
    if (param.imageStyle) {
      this.imageStyle = this.formatImageStyle(param.imageStyle)
    }
    this.minHeightStyle['min-height'] = '34px'
    param.imageRadius = param.imageRadius || 0
    switch (this.theme) {
      case 1:
        param.contentPaddingRight = param.contentPaddingRight || 0
        this.columNum = parseFloat(param.columNum, 10) || 4
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
      case 2:
        param.contentPaddingBottom = param.contentPaddingBottom || 0
        param.contentPaddingRight = param.contentPaddingRight || 0
        this.columNum = parseInt(param.columNum, 10) || 5
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
    if (param.imageRadius) {
      this.imageRadiusStyle['border-radius'] = param.imageRadius + 'px'
    }
  },
  methods: Object.assign({

  }, formatAc)
}

export default MMenus
