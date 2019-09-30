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
      contentPaddingStyle: {},
      itemStyle: {},
      nameStyle: {},
      nameCheckedStyle: {},
      imageStyle: {},
      checkedBarStyle: {},
      checkedBarPosStyle: {},
      hiddenStyle: {},
      mergeCheckedStyle (style, styleChecked, checkedId) {
        if (checkedId == this.checkedId) {
          return Object.assign({}, style, styleChecked)
        }
        return style
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
        let imagesDatas = dataSource.images || []
        for (let i in imagesDatas) {
          if (imagesDatas[i].value == param.dataSourceId) {
            dataContent = imagesDatas[i].data
            this.checkedId = imagesDatas[i].checkedId
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
    switch (this.theme) {
      case 1:
        if ((param.heightType == 'set' || param.heightType == 'screen') && param.moduleHeight) {
          this.itemStyle.height = param.moduleHeight / 375 + 'rem'
        }
        this.checkedBarStyle = this.formatStyle(param.checkedBarStyle || {})
        this.checkedBarPosStyle = this.formatStyle(param.checkedBarPosStyle || {})
        break
    }
  },
  methods: Object.assign({
    clickCallback (e) {
      e.currentTarget.parentNode.parentNode.parentNode.scrollLeft = e.currentTarget.offsetLeft - e.currentTarget.parentNode.parentNode.clientWidth / 2 + e.currentTarget.clientWidth / 2
      let item = this.dataContent[parseInt(e.currentTarget.getAttribute('data-key'))]
      const param = this.param
      if (item.checkedId) {
        this.checkedId = item.checkedId
        switch (param.dataType) {
          case 0:
            param.singleDatas.checkedId = item.checkedId
            break
          case 1:
            let dataSource = this.dataSource || {}
            let menusDatas = dataSource.menusDatas || []
            for (let i in menusDatas) {
              if (menusDatas[i].value == param.dataSourceId) {
                menusDatas[i].checkedId = item.checkedId
              }
            }
            break
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
