/* eslint-disable no-undef */
/**
 * Created by 001264 on 2019/8/15.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import Animation from 'fcbox/utils/animation'
import FormatFunc from '../../func/format_style'
import FcDomPlayer from 'fcbox/player/dom'
import MImages from '../../modules/images'
import MMenus from '../../modules/menus'
import MGoods from '../../modules/goods'
import MTab from '../../modules/tab'
import MGroup from '../../modules/group'
import MPop from '../../modules/pop'
import EImage from '../../elements/image'
import EText from '../../elements/text'
import EIcon from '../../elements/icon'
Vue.use(MImages)
Vue.use(MMenus)
Vue.use(MGoods)
Vue.use(MTab)
Vue.use(MGroup)
Vue.use(MPop)
Vue.use(EImage)
Vue.use(EText)
Vue.use(EIcon)
Vue.use(FcDomPlayer)

const Index = {
  name: 'Index',
  data () {
    return {
      bodyStyle: {},
      pageStyle: {},
      tabItems: {},
      setNormalContentPadding () {
        return {
          'padding-top': (this.showObj.topHeight || 0) / 375 + 'rem',
          'padding-bottom': (this.showObj.bottomHeight || 0) / 375 + 'rem'
        }
      }
    }
  },
  computed: mapState({
    contentConfig: state => state.contentConfig,
    showObj: state => state.showObj,
    showPops: state => state.showPops,
    pageKey: state => state.pageKey
  }),
  created () {
    this.Animation = new Animation()
    this.dataInit()
    this.setBodyStyle()
    this.pageInit()
  },
  mounted () {
    this.scrollEventInit()
  },
  methods: Object.assign({
    scrollEventInit () {
      document.onscroll = () => {
        this.checkScroll()
      }
    },
    checkScroll () {
      if (this.scrollChecking) {
        return false
      }
      this.scrollChecking = true
      requestAnimationFrame(() => {
        let moduleLockList = document.getElementsByClassName('moduleLock')
        if (!moduleLockList || !moduleLockList.length) {
          return false
        }
        let scrollTop = document.documentElement.scrollTop
        let topHeight = this.$refs.topContent.offsetHeight
        for (let i = 0; i < moduleLockList.length; i++) {
          moduleLockList[i].lockTop = moduleLockList[i].offsetTop - topHeight
        }
        if (moduleLockList.length > 1) {
          for (let i = 0; i < moduleLockList.length - 1; i++) {
            moduleLockList[i].lockMoveTop = moduleLockList[i + 1].lockTop - moduleLockList[i].offsetHeight
            moduleLockList[i].lockMoveTopEnd = moduleLockList[i + 1].lockTop
          }
        }
        for (let i = 0; i < moduleLockList.length; i++) {
          let moduleLock = moduleLockList[i]
          let lockTop = moduleLock.lockTop
          if ((moduleLock.lockMoveTop || moduleLock.lockMoveTopEnd) && scrollTop > moduleLock.lockMoveTop) {
            moduleLock.style.height = moduleLock.offsetHeight + 'px'
            Object.assign(moduleLock.childNodes[0].style, {
              'position': 'fixed',
              'left': 0,
              'top': moduleLock.lockMoveTop - scrollTop + topHeight + 'px',
              'z-index': 1
            })
          } else {
            if (scrollTop >= lockTop) {
              moduleLock.style.height = moduleLock.offsetHeight + 'px'
              Object.assign(moduleLock.childNodes[0].style, {
                'position': 'fixed',
                'left': 0,
                'top': topHeight + 'px',
                'z-index': 2
              })
            } else {
              moduleLockList[i].style.height = 'auto'
              Object.assign(moduleLockList[i].childNodes[0].style, {
                'position': 'relative',
                'left': 0,
                'top': 0
              })
            }
          }
        }
        this.scrollChecking = false
      })
    },
    dataInit () {
      if (localStorage.getItem('previewData')) {
        Object.assign(this.contentConfig, JSON.parse(localStorage.getItem('previewData')))
      }
    },
    setBodyStyle () {
      this.bodyStyle = this.formatStyle(this.contentConfig.body.style || {})
    },
    setPageStyle () {
      this.pageStyle = this.formatStyle(this.showPage.style || {})
    },
    pageInit () {
      const pages = this.contentConfig.pages
      let showPageId = 0
      let hashArr = location.hash.substr(1).split('/')
      if (hashArr && hashArr[2]) {
        showPageId = parseInt(hashArr[2]) - 1
      }
      if (pages && pages[showPageId]) {
        this.showPage = pages[showPageId]
      }
      this.setPageStyle()
      this.setShowObj()
    },
    setPageContent (action) {
      let pageId = action.pageId
      const pages = this.contentConfig.pages
      let showPage
      for (let i in pages) {
        if (pages[i].id == pageId) {
          showPage = pages[i]
        }
      }
      if (showPage) {
        this.showPage = showPage
        this.setPageStyle()
        this.setShowObj()
        this.$store.state.pageKey = Math.random()
        this.scrollEventInit()
      }
    },
    setPopContent (action) {
      const pops = this.contentConfig.pops
      let popId = action.popId
      for (let i in pops) {
        if (pops[i].id == popId) {
          pops[i].show = action.acType == 3
        }
      }
      this.$store.state.pageKey = Math.random()
    },
    setShowObj () {
      let showObj = {}
      let totalHeight = 0
      let topHeight = 0
      let bottomHeight = 0
      let topContent = []
      let normalContent = []
      let bottomContent = []
      const modules = this.showPage.content
      if (modules && modules.length) {
        for (let i in modules) {
          let moduleItem = modules[i]
          let moduleHeight = moduleItem.moduleHeight
          totalHeight += moduleHeight
          switch (moduleItem.lockPosition) {
            case 'top':
              topHeight += moduleHeight
              topContent.push(moduleItem)
              break
            case 'bottom':
              bottomHeight += moduleHeight
              bottomContent.push(moduleItem)
              break
            default:
              normalContent.push(moduleItem)
              break
          }
        }
      }
      Object.assign(showObj, {
        totalHeight,
        topHeight,
        bottomHeight,
        topContent,
        normalContent,
        bottomContent
      })
      this.$store.state.showObj = showObj
    },
    acCallback (item) {
      const action = item.action || {}
      switch (parseInt(action.acType)) {
        case 1: // 1跳转链接 2跳转内页 3打开窗口 4执行事件 5关闭窗口
          if (action.acTarget == '_blank' && action.acUrl) {
            window.open(action.acUrl)
          } else if (action.acUrl) {
            location.href = action.acUrl
          }
          break
        case 2:
          document.documentElement.scrollTop = 0
          setTimeout(() => {
            this.setPageContent(action)
          }, 16)
          break
        case 3:
        case 5:
          this.setPopContent(action)
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
          if (document.getElementById('tab' + tabId)) {
            let offsetTop = document.getElementById('tab' + tabId).parentNode.parentNode.parentNode.offsetTop
            let scrollTop = document.documentElement.scrollTop
            let topHeight = this.$refs.topContent.offsetHeight
            if (scrollTop > offsetTop - topHeight) {
              let moduleLockList = document.getElementsByClassName('moduleLock')
              for (let i = 0; i < moduleLockList.length; i++) {
                let moduleLock = moduleLockList[i]
                if (moduleLock.childNodes[0].style.position == 'fixed' && moduleLock.childNodes[0].style.zIndex == 2) {
                  topHeight += moduleLock.offsetHeight
                }
              }
              document.documentElement.scrollTop = offsetTop - topHeight
            }
          }
          for (let p in this.contentConfig.pages) {
            showPageContent = this.contentConfig.pages[p].content
            for (let i in showPageContent) {
              if (showPageContent[i].id == tabId && showPageContent[i].singleDatas) {
                showPageContent[i].singleDatas.checkedId = action.tabItemId
                if (this.tabItems[showPageContent[i].id]) {
                  this.tabItems[showPageContent[i].id].refreshTabContent()
                }
                break
              }
            }
          }
          break
      }
    }
  }, FormatFunc)
}

export default Index
