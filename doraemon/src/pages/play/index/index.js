/* eslint-disable no-undef */
/**
 * Created by 001264 on 2018/7/25.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import FcDomPlayer from 'fcbox/player/dom'
import FcLazyImage from 'fcbox/image/lazy'
// modules
import Mimages from '../../modules/images'
import MPop from '../../modules/pop'
// elements
import EImage from '../../elements/image'
import EText from '../../elements/text'
Vue.use(Mimages)
Vue.use(MPop)
Vue.use(EImage)
Vue.use(EText)
Vue.use(FcDomPlayer)
Vue.use(FcLazyImage)

const Index = {
  name: 'Index',
  data () {
    return {
      bodyStyle: {},
      pageStyle: {}
    }
  },
  computed: mapState({
    configContent: state => state.configContent,
    showPageId: state => state.showPageId,
    showPage: state => state.showPage,
    showPops: state => state.showPops,
    pageKey: state => state.pageKey,
    showContent: state => state.showContent
  }),
  created () {
    if (localStorage.getItem('previewData')) {
      Object.assign(this.configContent, JSON.parse(localStorage.getItem('previewData')))
    }
    if (this.configContent.body.content && this.configContent.body.content.title) {
      document.title = this.configContent.body.content.title
    }
    if (this.configContent.body.style) {
      this.bodyStyle = this.refreshBodyStyle(this.configContent.body.style)
    }
    this.$store.commit('setShowPops')
    this.refreshContent()
  },
  mounted () {

  },
  methods: {
    refreshContent () {
      this.$store.commit('setShowContent')
      if (this.showPage && this.showPage.style) {
        this.pageStyle = this.refreshBodyStyle(this.showPage.style)
      }
    },
    refreshBodyStyle (style) {
      let bodyStyle = {}
      if (style) {
        for (let i in style) {
          switch (i) {
            case 'border-top-width':
            case 'border-bottom-width':
            case 'border-left-width':
            case 'border-right-width':
              if (style[i] || parseInt(style[i]) === 0) {
                bodyStyle[i] = (parseInt(style[i])) + 'px'
              }
              break
            case 'background-image':
              if (style[i]) {
                bodyStyle[i] = 'url(' + style[i] + ')'
                bodyStyle['background-size'] = '100% auto'
              }
              break
            default:
              if (style[i]) {
                bodyStyle[i] = style[i]
              }
              break
          }
        }
      }
      return bodyStyle
    },
    acCallback (param) {
      let action = param.action || {}
      switch (parseInt(action.acType)) {
        case 1: // 1跳转链接 2跳转内页 3打开窗口 4执行事件 5关闭窗口
          if (action.acTarget == '_blank' && action.acUrl) {
            window.open(action.acUrl)
          } else if (action.acUrl) {
            location.href = action.acUrl
          }
          break
        case 2:
          this.$store.commit('setPageContent', action)
          break
        case 3:
        case 5:
          this.$store.commit('setPopContent', action)
          break
        case 4:
          if (action.acFun && window.fc.userActions && window.fc.userActions[action.acFun]) {
            window.fc.userActions[action.acFun](this)
          }
          break
      }
    }
  }
}

export default Index
