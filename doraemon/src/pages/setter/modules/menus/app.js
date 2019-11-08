/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../../func/format_style'

const MMenus = {
  components: {
    FcModules
  },
  name: 'MMenus',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      checkedId: 0,
      dataContent: [],
      contentList: [],
      contentPaddingStyle: {},
      itemStyle: {},
      nameStyle: {},
      nameCheckedStyle: {},
      imageStyle: {},
      imageFloatStyle: {},
      checkedBarStyle: {},
      checkedBarPosStyle: {},
      hiddenStyle: {},
      mergeCheckedStyle (style, styleChecked, checkedId) {
        if (checkedId == this.checkedId) {
          return Object.assign({}, style, styleChecked)
        }
        return style
      },
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
    const param = this.param
    if (this.isSet) {
      this.hiddenStyle.overflow = 'hidden'
    }
    // 内容设置
    let dataContent = []
    switch (param.dataType) {
      case 0:
        if (param.singleDatas && param.singleDatas.data) {
          dataContent = param.singleDatas.data
          this.checkedId = param.singleDatas.checkedId
        }
        break
      case 1:
        let dataSource = this.dataSource || {}
        let menusDatas = dataSource.menus || []
        for (let i in menusDatas) {
          if (menusDatas[i].value == param.dataSourceId) {
            dataContent = menusDatas[i].data
            this.checkedId = menusDatas[i].checkedId
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
    this.nameCheckedStyle = this.formatStyle(param.nameCheckedStyle || {})
    if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
      this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom)) + 'px'
    }
    if (param.contentPaddingRight || parseInt(param.contentPaddingRight) === 0) {
      this.contentPaddingStyle['padding-right'] = (parseInt(param.contentPaddingRight)) + 'px'
    }
    if (this.imageStyle.float) {
      this.imageFloatStyle.float = this.imageStyle.float
    }
    if (this.imageStyle['text-align']) {
      this.imageFloatStyle['text-align'] = this.imageStyle['text-align']
    }
    switch (this.theme) {
      case 1:
        if ((param.heightType == 'set' || param.heightType == 'screen') && param.moduleHeight) {
          this.itemStyle.height = param.moduleHeight / 375 + 'rem'
        }
        this.checkedBarStyle = this.formatStyle(param.checkedBarStyle || {})
        this.checkedBarPosStyle = this.formatStyle(param.checkedBarPosStyle || {})
        break
    }
    this.setThemeContent()
  },
  methods: Object.assign({
    clickCallback (e) {
      let item = e
      switch (this.theme) {
        case 1:
        case 3:
          e.currentTarget.parentNode.parentNode.parentNode.scrollLeft = e.currentTarget.offsetLeft - e.currentTarget.parentNode.parentNode.clientWidth / 2 + e.currentTarget.clientWidth / 2
          item = this.dataContent[parseInt(e.currentTarget.getAttribute('data-key'))]
          break
      }
      const param = this.param
      if (item.checkedId) {
        this.checkedId = item.checkedId
        if (item.action && item.action.acType != 2) {
          switch (param.dataType) {
            case 0:
              if (param.singleDatas && param.singleDatas.data) {
                param.singleDatas.checkedId = item.checkedId
              }
              break
            case 1:
              let dataSource = this.dataSource || {}
              let menusDatas = dataSource.menus || []
              for (let i in menusDatas) {
                if (menusDatas[i].value == param.dataSourceId) {
                  menusDatas[i].checkedId = item.checkedId
                }
              }
              break
          }
        }
      }
      if (param.lockPosition == 'lock' && document.documentElement.scrollTop > param.moduleTop) {
        document.documentElement.scrollTop = param.moduleTop
      }
      this.acCallback && this.acCallback(item)
    }
  }, formatAc)
}

export default MMenus
