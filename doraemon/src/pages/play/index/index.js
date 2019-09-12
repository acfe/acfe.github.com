/* eslint-disable no-undef */
/**
 * Created by 001264 on 2019/8/15.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import FcDomPlayer from 'fcbox/player/dom'
import FcLazyImage from 'fcbox/image/lazy'
// modules
import MImages from '../../modules/images'
import MMenus from '../../modules/menus'
import MGoods from '../../modules/goods'
import MTab from '../../modules/tab'
import MPop from '../../modules/pop'
// elements
import EImage from '../../elements/image'
import EIcon from '../../elements/icon'
import EText from '../../elements/text'
import ESearch from '../../elements/search'
import Animation from 'fcbox/utils/animation'
Vue.use(MImages)
Vue.use(MMenus)
Vue.use(MGoods)
Vue.use(MTab)
Vue.use(MPop)
Vue.use(EImage)
Vue.use(EIcon)
Vue.use(EText)
Vue.use(ESearch)
Vue.use(FcDomPlayer)
Vue.use(FcLazyImage)

const Index = {
  name: 'Index',
  data () {
    return {
      tabItems: {},
      bodyStyle: {},
      pageStyle: {},
      setAbsoluteModuleStyle (item) {
        let style = {}
        if (item.moduleHeight) {
          style.height = item.moduleHeight + 'px'
        }
        if (item.moduleTop || item.moduleTop === 0) {
          style.top = item.moduleTop + 'px'
        }
        if (item.moduleBottom || item.moduleBottom === 0) {
          style.bottom = item.moduleBottom + 'px'
        }
        return style
      },
      setRelativeModuleStyle (item) {
        let style = {}
        if (item.moduleHeight && item.lockPosition == 'lock') {
          style.height = item.moduleHeight + 'px'
        }
        return style
      },
      setRelativeBodyModuleStyle (showObj) {
        let style = {}
        if (showObj.topHeight) {
          style['padding-top'] = showObj.topHeight + 'px'
        }
        if (showObj.bottomHeight) {
          style['padding-bottom'] = showObj.bottomHeight + 'px'
        }
        return style
      }
    }
  },
  computed: mapState({
    contentConfig: state => state.contentConfig,
    showPageId: state => state.showPageId,
    showPage: state => state.showPage,
    showPops: state => state.showPops,
    showObj: state => state.showObj,
    pageKey: state => state.pageKey
  }),
  created () {
    this.Animation = new Animation()
    if (localStorage.getItem('previewData')) {
      Object.assign(this.contentConfig, JSON.parse(localStorage.getItem('previewData')))
    }
    if (this.contentConfig.body.content && this.contentConfig.body.content.title) {
      document.title = this.contentConfig.body.content.title
    }
    // 页面默认白底
    Object.assign(document.documentElement.style, { 'background-color': '#ffffff' })
    Object.assign(document.body.style, { 'background-color': '#ffffff' })
    if (this.contentConfig.body.style) {
      this.bodyStyle = this.refreshBodyStyle(this.contentConfig.body.style)
      Object.assign(document.documentElement.style, this.bodyStyle)
      Object.assign(document.body.style, this.bodyStyle)
    }
    this.$store.dispatch('setShowPops')
    this.$store.dispatch('setShowContent', this.$store)
    this.refreshPageStyle()
  },
  mounted () {
    this.setScrollListener()
  },
  methods: {
    setScrollListener () {
      if (this.lockContent.length) {
        document.addEventListener('scroll', this.checkScroll)
      }
    },
    checkScroll () {
      let scrollTop = document.documentElement.scrollTop
      let lockContent = this.lockContent
      for (let i in lockContent) {
        const dom = this.$refs['lock' + lockContent[i].lockId]
        let lockTop = lockContent[i].lockTop
        // 吸附效果实现
        if ((lockContent[i].lockMoveTop || lockContent[i].lockMoveTopEnd) && scrollTop > lockContent[i].lockMoveTop) {
          if (dom && dom[0]) {
            dom[0].style.position = 'fixed'
            dom[0].style.zIndex = '1000'
            dom[0].style.top = lockContent[i].lockMoveTop - scrollTop + this.showObj.topHeight + 'px'
            dom[0].style.background = '#ffffff'
          }
        } else {
          if (scrollTop >= lockTop) {
            if (dom && dom[0]) {
              dom[0].style.position = 'fixed'
              dom[0].style.zIndex = '1000'
              dom[0].style.top = lockContent[i].stopPosition + 'px'
              dom[0].style.background = '#ffffff'
            }
          }
          if (scrollTop < lockTop) {
            if (dom && dom[0]) {
              dom[0].style.position = 'relative'
              dom[0].style.top = 0
              dom[0].style.zIndex = 0
            }
          }
        }
      }
    },
    refreshPageStyle (lockScrollPos) {
      let normalContent = this.showObj.normalContent
      let lockContent = []
      // 吸附参数设定
      for (let i in normalContent) {
        if (normalContent[i].lockPosition == 'lock') {
          normalContent[i].lockId = Math.random()
          normalContent[i].lockTop = normalContent[i].moduleTop - this.showObj.topHeight
          normalContent[i].stopPosition = this.showObj.topHeight
          lockContent.push(normalContent[i])
        }
      }
      if (lockContent.length > 1) {
        for (let i = 0; i < lockContent.length - 1; i++) {
          lockContent[i].lockMoveTop = lockContent[i + 1].lockTop - lockContent[i].moduleHeight
          lockContent[i].lockMoveTopEnd = lockContent[i + 1].lockTop
        }
      }
      this.lockContent = lockContent
      if (this.showPage && this.showPage.style) {
        this.pageStyle = this.refreshBodyStyle(this.showPage.style)
      }
      if (!lockScrollPos) {
        document.documentElement.scrollTop = 0
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
          this.$store.dispatch('setPageContent', action)
          this.refreshPageStyle()
          break
        case 3:
        case 5:
          this.$store.dispatch('setPopContent', action)
          break
        case 4:
          if (action.acFun && window.fc.userActions && window.fc.userActions[action.acFun]) {
            window.fc.userActions[action.acFun](param, this)
          }
          break
        case 6:
          if (this.animating) {
            return false
          }
          const tween = this.Animation.tween.Cubic.easeOut
          const that = this
          this.animating = true
          this.Animation.play({
            aStart: document.documentElement.scrollTop,
            aEnd: 0,
            tEnd: 24,
            tween,
            handle (num) {
              document.documentElement.scrollTop = parseInt(num)
            },
            finish () {
              that.animating = false
            }
          })
          break
        case 7:
          let showPageContent
          let tabId = action.tabId
          for (let p in this.contentConfig.pages) {
            showPageContent = this.contentConfig.pages[p].content
            for (let i in showPageContent) {
              if (showPageContent[i].id == tabId && showPageContent[i].singleDatas) {
                showPageContent[i].singleDatas.checkedId = action.tabItemId
                if (this.tabItems[showPageContent[i].id]) {
                  this.tabItems[showPageContent[i].id].refreshContent()
                }
                setTimeout(() => {
                  this.$store.dispatch('formatContent')
                  this.refreshPageStyle(true)
                }, 100)
                break
              }
            }
          }
          break
      }
    }
  }
}

export default Index
