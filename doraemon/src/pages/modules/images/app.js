/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'

const Mimages = {
  components: {
    FcModules
  },
  name: 'Mimages',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      columNum: 2,
      content: [],
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
  props: ['param', 'elementRefreshCallback', 'isSet', 'setConfig', 'mid', 'acCallback'],
  created () {
    const param = this.param
    if (param.theme) {
      this.theme = param.theme
    }
    if (param.titleStyle) {
      this.titleStyle = this.formatTextStyle(param.titleStyle)
    }
    if (param.descriptionStyle) {
      this.descriptionStyle = this.formatTextStyle(param.descriptionStyle)
    }
    this.minHeightStyle['min-height'] = '34px'
    const remStandar = 375
    param.imageRadius = param.imageRadius || 0
    switch (this.theme) {
      case 1:
        param.contentPaddingBottom = param.contentPaddingBottom || 10
        if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
          this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom) / remStandar) + 'rem'
        }
        break
      case 2:
        param.contentPaddingBottom = param.contentPaddingBottom || 10
        param.contentPaddingRight = param.contentPaddingRight || 10
        this.columNum = parseInt(param.columNum, 10) || 2
        for (let c in param.content) {
          this.content.push(param.content[c])
        }
        if (param.content.length < this.columNum) {
          let add = this.columNum - param.content.length
          for (let i = 0; i < add; i++) {
            this.content.push('')
          }
        }
        this.cellStyle.width = 100 / this.columNum + '%'
        if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
          this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom) / remStandar) + 'rem'
        }
        if (param.contentPaddingRight || parseInt(param.contentPaddingRight) === 0) {
          this.contentPaddingStyle['padding-right'] = (parseInt(param.contentPaddingRight) / remStandar) + 'rem'
        }
        break
      case 3:
        let data = []
        for (let c in param.content) {
          data.push(Object.assign(param.content[c], {
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
        for (let c in param.content) {
          this.content.push(param.content[c])
        }
        if (param.content.length < this.columNum) {
          let add = this.columNum - param.content.length
          for (let i = 0; i < add; i++) {
            this.content.push('')
          }
        }
        let showNum = param.content.length > this.columNum ? param.content.length : this.columNum
        let tableWidth = (100 / this.columNum) * showNum
        this.cellStyle.width = 100 / showNum + '%'
        this.tableStyle.width = tableWidth + '%'
        if (param.contentPaddingRight || parseInt(param.contentPaddingRight) === 0) {
          this.contentPaddingStyle['padding-right'] = (parseInt(param.contentPaddingRight) / remStandar) + 'rem'
        }
        break
    }
    if (param.imageRadius) {
      this.imageRadiusStyle['border-radius'] = param.imageRadius + 'px'
    }
  },
  methods: {
    formatTextStyle (style) {
      let newStyle = {}
      const remStandar = 375
      for (let i in style) {
        switch (i) {
          case 'font-size':
          case 'line-height':
            if (style[i] || parseInt(style[i]) === 0) {
              newStyle[i] = (parseInt(style[i]) / remStandar) + 'rem'
            }
            break
          default:
            if (style[i]) {
              newStyle[i] = style[i]
            }
            break
        }
      }
      return newStyle
    }
  }
}

export default Mimages
