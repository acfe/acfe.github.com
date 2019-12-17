/**
 * Created by 001264 on 2017/9/10.
 */
import Vue from 'vue'
import FcModules from '../module/app.vue'

const MTab = {
  components: {
    FcModules
  },
  name: 'MTab',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      tabContent: [],
      showTabId: 0,
      domPlayerParam: {
        loop: true,
        autoPlay: true,
        fitHeight: true,
        autoPlayTime: 5000,
        renderPage: 0,
        drag: false,
        data: []
      },
      playerLoaded: {
        dom: false,
        vertical: false,
        flip: false
      }
    }
  },
  props: ['param', 'tabItems', 'pages', 'dataSource', 'isSet', 'mid', 'acCallback', 'refreshContent', 'setSetterContent'],
  created () {
    const param = this.param
    this.theme = param.theme || 1
    // lock theme in set module
    if (this.isSet) {
      this.theme = 1
    }
    if (this.tabItems) {
      this.tabItems[param.id] = this
    }
    this.refreshTabContent()
    this.loadPiece()
  },
  methods: Object.assign({
    loadPiece () {
      switch (this.theme) {
        case 2:
          const FcDomPlayerLoader = () => import(/* webpackChunkName: "dom_player_piece" */ 'fcbox/player/dom')
          FcDomPlayerLoader().then((data) => {
            Vue.use(data.default)
            this.playerLoaded.dom = true
          })
          break
        case 3:
          const FcVerticalPlayerLoader = () => import(/* webpackChunkName: "vertical_player_piece" */ 'fcbox/player/vertical')
          FcVerticalPlayerLoader().then((data) => {
            Vue.use(data.default)
            this.playerLoaded.vertical = true
          })
          break
        case 4:
          const FcFlipPlayerLoader = () => import(/* webpackChunkName: "flip_player_piece" */ 'fcbox/player/flip')
          FcFlipPlayerLoader().then((data) => {
            Vue.use(data.default)
            this.playerLoaded.flip = true
          })
          break
      }
    },
    refreshTabContent () {
      switch (this.theme) {
        case 1:
          this.setContent()
          this.randKey = Math.random()
          break
        case 2:
          this.setContent2()
          if (this.domPlayerParam.FcDomPlayer) {
            switch (this.param.singleDatas.checkedId) {
              case 'pre':
                this.domPlayerParam.FcDomPlayer.goPre()
                break
              case 'next':
                this.domPlayerParam.FcDomPlayer.goNext()
                break
              default:
                this.domPlayerParam.FcDomPlayer.goto(this.domPlayerParam.renderPage)
                break
            }
          }
          break
        case 3:
          this.setContent2()
          if (this.domPlayerParam.FcVerticalPlayer) {
            switch (this.param.singleDatas.checkedId) {
              case 'pre':
                this.domPlayerParam.FcVerticalPlayer.goPre()
                break
              case 'next':
                this.domPlayerParam.FcVerticalPlayer.goNext()
                break
              default:
                this.domPlayerParam.FcVerticalPlayer.goto(this.domPlayerParam.renderPage)
                break
            }
          }
          break
        case 4:
          this.setContent2()
          this.domPlayerParam.loop = true
          if (this.domPlayerParam.FcFlipPlayer) {
            switch (this.param.singleDatas.checkedId) {
              case 'pre':
                this.domPlayerParam.FcFlipPlayer.goPre()
                break
              case 'next':
                this.domPlayerParam.FcFlipPlayer.goNext()
                break
              default:
                this.domPlayerParam.FcFlipPlayer.goto(this.domPlayerParam.renderPage)
                break
            }
          }
          break
      }
    },
    setContent () {
      const param = this.param
      // 内容设置
      let dataContent = []
      let tabPageId
      let tabContent = []
      if (param.singleDatas && param.singleDatas.data) {
        dataContent = param.singleDatas.data
        for (let i in dataContent) {
          if (dataContent[i].checkedId == param.singleDatas.checkedId) {
            tabPageId = dataContent[i].tabPageId
            this.showTabId = parseInt(i)
          }
        }
        if (param.singleDatas.checkedId == 'next' || param.singleDatas.checkedId == 'pre') {
          if (param.singleDatas.checkedId == 'next') {
            this.showTabId += 1
          }
          if (param.singleDatas.checkedId == 'pre') {
            this.showTabId--
          }
          this.showTabId = this.showTabId > dataContent.length - 1 ? 0 : this.showTabId
          this.showTabId = this.showTabId < 0 ? dataContent.length - 1 : this.showTabId
          tabPageId = dataContent[this.showTabId].tabPageId
        }
      }
      if (tabPageId && this.pages && this.pages.length) {
        for (let i in this.pages) {
          if (this.pages[i].id == tabPageId) {
            tabContent = this.pages[i].content
          }
        }
      }
      this.tabContent = tabContent
    },
    setContent2 () {
      const param = this.param
      let pageObj = {}
      if (this.pages && this.pages.length) {
        for (let i in this.pages) {
          pageObj[this.pages[i].id] = this.pages[i]
        }
      }
      let tabCheckedId = 0
      let dataContent
      let tabContents = []
      if (param.singleDatas && param.singleDatas.data) {
        dataContent = param.singleDatas.data
        for (let i in dataContent) {
          let pageContent = []
          if (pageObj[dataContent[i].tabPageId]) {
            pageContent = pageObj[dataContent[i].tabPageId]
            pageContent.checkedId = dataContent[i].checkedId
          }
          tabContents.push(pageContent)
          if (dataContent[i].checkedId == param.singleDatas.checkedId) {
            tabCheckedId = parseInt(i)
          }
        }
      }
      let data = []
      for (let i in tabContents) {
        data.push({
          slot: 's1',
          checkedId: tabContents[i].checkedId,
          content: tabContents[i].content || []
        })
      }
      this.domPlayerParam.data = data
      this.domPlayerParam.tabId = param.id
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
      this.domPlayerParam.drag = param.drag || false
      if (this.isSet) {
        this.domPlayerParam.autoPlay = false
        this.domPlayerParam.drag = false
      }
      this.domPlayerParam.renderPage = tabCheckedId
      this.domPlayerParam.singleDatas = param.singleDatas
      this.domPlayerParam.moduleHeight = param.moduleHeight
      this.domPlayerParam.heightType = param.heightType
    }
  })
}

export default MTab
