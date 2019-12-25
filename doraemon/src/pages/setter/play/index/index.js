/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/**
 * Created by 001264 on 2019/8/15.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import { envConfig } from 'src/common/js/env.config'
import ajax from 'fcbox/utils/http/ajax'
import Location from 'fcbox/utils/location'
import Share from 'fcbox/utils/share'
import Animation from 'fcbox/utils/animation'
import FormatFunc from '../../func/format_style'
import FcFramePlayer from 'fcbox/player/frame'
import PlayerStatusBar from 'fcbox/player/player_status_bar'
import FcPreImage from 'fcbox/image/pre'
import FcFitImage from 'fcbox/image/fit'
import MImages from '../../modules/images'
import MMenus from '../../modules/menus'
import MGoods from '../../modules/goods'
import MTab from '../../modules/tab'
import MGroup from '../../modules/group'
import MPop from '../../modules/pop'
import EImage from '../../elements/image'
import EText from '../../elements/text'
import EIcon from '../../elements/icon'
import EBusiness from '../../elements/business'
import FcInput from 'fcbox/form/input'
Vue.use(MImages)
Vue.use(MMenus)
Vue.use(MGoods)
Vue.use(MTab)
Vue.use(MGroup)
Vue.use(MPop)
Vue.use(EImage)
Vue.use(EText)
Vue.use(EIcon)
Vue.use(EBusiness)
Vue.use(FcFramePlayer)
Vue.use(PlayerStatusBar)
Vue.use(FcPreImage)
Vue.use(FcFitImage)
Vue.use(FcInput)

// eslint-disable-next-line one-var
var tag, env = 'test', topic = 'comprehensiveFrontEndLog', fioUrl = 'common-sit1.fcbox.com/cdn/staticResource/commonUtil/fio/fio_v2.0.js'
if (location.host == 'common.fcbox.com' || location.host == 'op.fcbox.com') {
  fioUrl = 'common.fcbox.com/cdn/staticResource/commonUtil/fio/fio_v2.0.js'
  env = 'online'
  topic = 'comprehensiveFrontEndLog'
}
// eslint-disable-next-line no-unused-expressions
!(function (e, t, n, g, i) { e[i] = e[i] || function () { (e[i].q = e[i].q || []).push(arguments) }, n = t.createElement('script'), tag = t.getElementsByTagName('script')[0], n.async = 1, n.src = (document.location.protocol == 'https:' ? 'https://' : 'http://') + g, tag.parentNode.insertBefore(n, tag) }(window, document, 'script', fioUrl, 'fio'))
window.fio('init', {
  fc_project: 'fc_common_page',
  fc_page: 'play_' + (Location.queryParams['id'] || ''),
  fc_pagename: 'play_' + (Location.queryParams['id'] || ''),
  env,
  topic
})

const Index = {
  name: 'Index',
  data () {
    return {
      showToTopBtn: false,
      bodyStyle: {},
      pageStyle: {},
      tabItems: {},
      musicStyle: {},
      musicObj: {
        key: Math.random(),
        autoplay: false,
        play: false,
        src: '',
        icon: '' // http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/455qaccj5gp.png
      },
      toTopBtnStyle: {},
      popKey: Math.random(),
      toTopIconUrl: 'https://common.fcbox.com/cdn/mall/static/images/to-top.png',
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
  },
  mounted () {
    this.scrollEventInit()
  },
  methods: Object.assign({
    musicControl () {
      this.musicObj.play = !this.musicObj.play
      if (this.musicObj.play) {
        this.$refs.music.className = 'music-btn animate'
        this.$refs.audio.play()
      } else {
        this.$refs.music.className = 'music-btn'
        this.$refs.audio.pause()
      }
    },
    scrollEventInit () {
      document.onscroll = () => {
        this.checkScroll()
        window.postMessage({
          ac: 'docScroll'
        }, '*')
      }
    },
    checkScroll () {
      if (this.scrollChecking) {
        return false
      }
      this.scrollChecking = true
      requestAnimationFrame(() => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        if (this.$refs.toTopBtn) {
          if (scrollTop > clientHeight) {
            this.$refs.toTopBtn.style.display = 'block'
          } else {
            this.$refs.toTopBtn.style.display = 'none'
          }
        }
        let moduleLockList = document.getElementsByClassName('moduleLock')
        if (!moduleLockList || !moduleLockList.length) {
          this.scrollChecking = false
          return false
        }
        this.scrollTop = scrollTop
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
              'z-index': 1001
            })
          } else {
            if (scrollTop >= lockTop) {
              moduleLock.style.height = moduleLock.offsetHeight + 'px'
              Object.assign(moduleLock.childNodes[0].style, {
                'position': 'fixed',
                'left': 0,
                'z-index': 2000,
                'top': topHeight + 'px'
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
      if (Location.queryParams['preview']) {
        if (localStorage.getItem('previewData')) {
          Object.assign(this.contentConfig, JSON.parse(localStorage.getItem('previewData')))
          this.setBodyStyle()
          this.pageInit()
        }
      } else if (Location.queryParams['demoId']) {
        this.createJs('demo_data/' + Location.queryParams['demoId'], () => {
          this.$store.state.contentConfig = window.demoData[Location.queryParams['demoId']]
          this.setBodyStyle()
          this.pageInit()
        })
      } else if (Location.queryParams['id']) {
        ajax.get({
          url: envConfig.apiHost,
          colseWithCredentials: true,
          data: {
            id: Location.queryParams['id']
          }
        }).then((res) => {
          res = JSON.parse(res)
          // console.log(res)
          if (res.data && res.data.adviceUrl) {
            document.title = res.data.adviceTitle
            let shareParam = {
              'title': res.data.adviceTitle,
              'icon': res.data.shareImage,
              'desc': res.data.adviceRemark,
              'link': location.href,
              'smsDesc': res.data.adviceRemark
            }
            if (res.data.showType == '首页') {
              shareParam.customer = 1
            }
            Share.appShare(shareParam)
            ajax.get({
              url: res.data.adviceUrl.replace(/http:/i, ''),
              colseWithCredentials: true,
              data: {}
            }).then((res) => {
              Object.assign(this.contentConfig, JSON.parse(res))
              this.setBodyStyle()
              this.pageInit()
            })
          }
        })
      }
    },
    createJs (name, callback) {
      var head = document.getElementsByTagName('head')[0]
      var script = document.createElement('script')
      script.src = envConfig.publicPath + name + '.js'
      head.appendChild(script)
      script.onload = function () {
        callback && callback()
      }
    },
    preloadImages () {
      let str = JSON.stringify(this.contentConfig)
      let reg = /(http|https|\/\/)[^'"]*?(\.(jpg|gif|png|bmp))/ig
      let images = str.match(reg)
      if (images && images.length) {
        let imageArr = [...new Set(images)]
        let total = imageArr.length
        // console.log(imageArr)
        this.doPreload(imageArr, total)
      }
    },
    doPreload (imageArr, total) {
      let src = imageArr.shift()
      const loadedFunc = () => {
        if (!imageArr.length) {
          window.postMessage({
            ac: 'preloadImageFinish',
            loaded: total - imageArr.length,
            percent: ((total - imageArr.length) / total) * 100,
            total
          }, '*')
          this.checkloadedAction()
          // console.log('finish')
        } else {
          // console.log(imageArr.length, total)
          // console.log('percent', ((total - imageArr.length) / total) * 100)
          window.postMessage({
            ac: 'preloadImageHandle',
            loaded: total - imageArr.length,
            total,
            percent: ((total - imageArr.length) / total) * 100
          }, '*')
          this.doPreload(imageArr, total)
        }
      }
      let img = new Image()
      img.onload = () => {
        loadedFunc()
      }
      img.onerror = () => {
        loadedFunc()
      }
      img.src = src
    },
    setBodyStyle () {
      document.title = this.contentConfig.body.title || ''
      this.preloadImages()
      this.bodyStyle = this.formatStyle(this.contentConfig.body.style || {})
      Object.assign(document.body.style, this.bodyStyle)
      if (this.contentConfig.body.toTopIconUrl) {
        this.toTopIconUrl = this.contentConfig.body.toTopIconUrl
      }
      if (this.contentConfig.body.toTopIconWidth) {
        this.toTopBtnStyle.width = parseInt(this.contentConfig.body.toTopIconWidth) / 375 + 'rem'
      }
      if (this.contentConfig.body.toTopIconBottom) {
        this.toTopBtnStyle.bottom = parseInt(this.contentConfig.body.toTopIconBottom) / 375 + 'rem'
      }
      this.showToTopBtn = this.contentConfig.body.showToTopBtn || false
      if (this.contentConfig.body.music) {
        this.musicObj.src = this.contentConfig.body.music
        this.musicObj.icon = this.contentConfig.body.musicIcon
        this.musicObj.autoplay = this.contentConfig.body.autoplay || false
        this.musicStyle = this.formatStyle(this.contentConfig.body.musicStyle || {})
        if (this.musicObj.icon) {
          Object.assign(this.musicStyle, {
            border: 'none',
            'background-image': 'none',
            'background': 'none'
          })
        }
      }
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
        this.checkPageAction(this.showPage)
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
        this.checkPageAction(this.showPage)
        this.setPageStyle()
        this.setShowObj()
        this.$store.state.pageKey = Math.random()
        requestAnimationFrame(() => {
          this.scrollEventInit()
        })
      }
    },
    checkloadedAction () {
      let body = this.contentConfig.body
      if (!body.action) {
        return false
      }
      let acDelay = parseInt(body.acDelay) || 16
      setTimeout(() => {
        this.acCallback(body)
      }, acDelay)
    },
    checkPageAction (page) {
      if (page.acDone && page.isFirstDo) {
        return false
      }
      page.acDelay = parseInt(page.acDelay) || 16
      setTimeout(() => {
        page.action && this.acCallback(page)
        page.acDone = 1
      }, page.acDelay)
    },
    setPopContent (action) {
      const pops = this.contentConfig.pops
      let popId = action.popId
      for (let i in pops) {
        if (pops[i].id == popId) {
          pops[i].show = action.acType == 3
        }
      }
      this.popKey = Math.random()
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
    goToTop () {
      if (this.animating) {
        return false
      }
      const tween = this.Animation.tween.Cubic.easeOut
      const that = this
      this.animating = true
      this.Animation.play({
        aStart: document.documentElement.scrollTop || document.body.scrollTop,
        aEnd: 0,
        tEnd: 24,
        tween,
        handle (num) {
          document.documentElement.scrollTop = parseInt(num)
          document.body.scrollTop = parseInt(num)
        },
        finish () {
          that.animating = false
        }
      })
    },
    acCallback (item) {
      if (window.fc.isMoveUp) {
        return false
      }
      const action = item.action || {}
      if (action.fcEvent) {
        window.fio('send', { fc_type: 'click', fc_event: action.fcEvent })
      }
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
          document.body.scrollTop = 0
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
        case 6: // 跳到顶部
          if (this.animating) {
            return false
          }
          const tween = this.Animation.tween.Cubic.easeOut
          const that = this
          this.animating = true
          this.Animation.play({
            aStart: document.documentElement.scrollTop || document.body.scrollTop,
            aEnd: 0,
            tEnd: 24,
            tween,
            handle (num) {
              document.documentElement.scrollTop = parseInt(num)
              document.body.scrollTop = parseInt(num)
            },
            finish () {
              that.animating = false
            }
          })
          break
        case 7: // 操作tab
          let showPageContent
          let tabId = action.tabId
          let hasLock
          let offsetTop
          let topHeight
          if (document.getElementById('tab' + tabId)) {
            offsetTop = document.getElementById('tab' + tabId).parentNode.parentNode.parentNode.offsetTop
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            topHeight = this.$refs.topContent.offsetHeight
            if (scrollTop > offsetTop - topHeight) {
              let moduleLockList = document.getElementsByClassName('moduleLock')
              for (let i = 0; i < moduleLockList.length; i++) {
                let moduleLock = moduleLockList[i]
                if (moduleLock.childNodes[0].style.position == 'fixed' && moduleLock.childNodes[0].style.zIndex == 2000) {
                  topHeight += moduleLock.offsetHeight
                  hasLock = true
                }
              }
            }
          }
          for (let p in this.contentConfig.pages) {
            showPageContent = this.contentConfig.pages[p].content
            for (let i in showPageContent) {
              if (showPageContent[i].id == tabId && showPageContent[i].singleDatas) {
                showPageContent[i].singleDatas.checkedId = action.tabItemId
                if (this.tabItems[showPageContent[i].id]) {
                  this.tabItems[showPageContent[i].id].refreshTabContent()
                  if (hasLock && offsetTop !== undefined && topHeight !== undefined && !this.contentConfig.pages[p].isTab) {
                    document.documentElement.scrollTop = offsetTop - topHeight
                    document.body.scrollTop = offsetTop - topHeight
                  }
                }
                break
              }
            }
          }
          break
        case 8: // 操作模块
          if (this.$refs.page && this.$refs.page.getElementsByClassName('moduleItem')) {
            let moduleItems = this.$refs.page.getElementsByClassName('moduleItem')
            let acModule
            for (let i = 0; i < moduleItems.length; i++) {
              if (moduleItems[i].getAttribute('data-id') == action.moduleId) {
                acModule = moduleItems[i]
              }
            }
            if (acModule) {
              switch (action.moduleAc) {
                case 'show':
                  acModule.style.display = 'block'
                  break
                case 'hide':
                  acModule.style.display = 'none'
                  break
                case 'sh':
                  if (acModule.style.display == 'block' || !acModule.style.display) {
                    acModule.style.display = 'none'
                  } else {
                    acModule.style.display = 'block'
                  }
                  break
                default:
                  if (this.animating) {
                    return false
                  }
                  const tween = this.Animation.tween.Cubic.easeOut
                  const that = this
                  this.animating = true
                  this.Animation.play({
                    aStart: document.documentElement.scrollTop || document.body.scrollTop,
                    aEnd: acModule.offsetTop || 0,
                    tEnd: 24,
                    tween,
                    handle (num) {
                      document.documentElement.scrollTop = parseInt(num)
                      document.body.scrollTop = parseInt(num)
                    },
                    finish () {
                      that.animating = false
                    }
                  })
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
