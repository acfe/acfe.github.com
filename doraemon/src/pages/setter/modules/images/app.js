/**
 * Created by 001264 on 2017/9/10.
 */
import Vue from 'vue'
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
      imageFloatStyle: {
        overflow: 'hidden'
      },
      imageStyle: {},
      titleStyle: {},
      descriptionStyle: {},
      fContentStyle: {},
      fTitleStyle: {},
      fDescriptionStyle: {},
      fTagStyle: {},
      textMaskStyle: {},
      domPlayerParam: {
        loaded: false,
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
    this.fTitleStyle = this.formatStyle(param.fTitleStyle || {})
    this.fDescriptionStyle = this.formatStyle(param.fDescriptionStyle || {})
    this.fTagStyle = this.formatStyle(param.fTagStyle || {})
    if (param.fContentStyle) {
      if (param.fContentStyle.bottom) {
        this.fContentStyle = {
          top: 'none',
          bottom: parseInt(param.fContentStyle.bottom) / 375 + 'rem'
        }
      } else if (param.fContentStyle.top) {
        this.fContentStyle = {
          bottom: 'none',
          top: parseInt(param.fContentStyle.top) / 375 + 'rem'
        }
      }
      this.fContentStyle['text-align'] = this.fTagStyle['text-align'] || 'center'
    }
    if (param.textMaskImage) {
      this.textMaskStyle = {
        'background-image': 'url(' + param.textMaskImage + ')'
      }
    }
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
    this.loadPiece()
  },
  methods: Object.assign({
    loadPiece () {
      switch (this.theme) {
        case 4:
        case 16:
          const FcDomPlayerLoader = () => import(/* webpackChunkName: "dom_player_piece" */ 'fcbox/player/dom')
          FcDomPlayerLoader().then((data) => {
            Vue.use(data.default)
            this.domPlayerParam.loaded = true
          })
          break
      }
    },
    stopTouchstart (e) {
      e.stopPropagation()
    }
  }, formatAc)
}

export default MImages
