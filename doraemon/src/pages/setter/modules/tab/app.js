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
      tabContent: []
    }
  },
  props: ['param', 'tabItems', 'pages', 'dataSource', 'isSet', 'mid', 'acCallback'],
  created () {
    const param = this.param
    this.theme = param.theme || 1
    if (this.tabItems) {
      this.tabItems[param.id] = this
    }
    this.setContent()
  },
  methods: Object.assign({
    refreshContent () {
      this.setContent()
      this.randKey = Math.random()
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
    }
  })
}

export default MTab
