/**
 * Created by 001264 on 2018/11/12.
 */
import formatAc from 'src/pages/setter/func/format_style'

const PlayerStatusBar = {
  name: 'PlayerStatusBar',
  data () {
    return {
      randKey: Math.random(),
      guildTheme: 0,
      barContainerStyle: {},
      barCheckedStyle: {},
      barStyle: {},
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
  props: ['pageData', 'checkedKey', 'param'],
  created () {
    this.guildTheme = this.param.guildTheme || 0
  },
  mounted () {
    const param = this.param
    this.barContainerStyle = this.formatStyle(param.barContainerStyle || {})
    this.barStyle = this.formatStyle(param.barStyle || {})
    if (this.barStyle.width == 'auto') {
      this.barStyle.width = '5px'
    }
    if (this.barStyle.height == 'auto') {
      this.barStyle.height = '5px'
    }
    this.barCheckedStyle = this.formatStyle(param.barCheckedStyle || {})
    if (this.barCheckedStyle.width == 'auto') {
      this.barCheckedStyle.width = '5px'
    }
    if (this.barCheckedStyle.height == 'auto') {
      this.barCheckedStyle.height = '5px'
    }
  },
  beforeDestroy () {

  },
  methods: Object.assign({

  }, formatAc)
}

export default PlayerStatusBar
