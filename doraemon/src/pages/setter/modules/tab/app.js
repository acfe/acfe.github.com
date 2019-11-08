/**
 * Created by 001264 on 2017/9/10.
 */
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
      domPlayerParam: {
        loop: true,
        autoPlay: true,
        fitHeight: true,
        autoPlayTime: 5000,
        renderPage: 0,
        drag: false,
        data: []
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
  },
  methods: Object.assign({
    refreshTabContent () {
      switch (this.theme) {
        case 1:
          this.setContent()
          this.randKey = Math.random()
          break
        case 2:
          this.setContent2()
          if (this.domPlayerParam.FcDomPlayer) {
            this.domPlayerParam.FcDomPlayer.goto(this.domPlayerParam.renderPage)
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
          }
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
          content: tabContents[i].content || []
        })
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
      this.domPlayerParam.drag = param.drag || false
      if (this.isSet) {
        this.domPlayerParam.autoPlay = false
        this.domPlayerParam.drag = false
      }
      this.domPlayerParam.renderPage = tabCheckedId
    }
  })
}

export default MTab
