/* eslint-disable no-undef */
/**
 * Created by 001264 on 2019/9/9.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import PublicFunc from '../func/public_func'
import PopDrag from '../func/pop_drag'
import FcButton from 'fcbox/form/button'
import FcInput from 'fcbox/form/input'
import FcSingleSelector from 'fcbox/form/selector/single'
import FcSingleUpload from 'fcbox/upload/qq'
import FcTextarea from 'fcbox/form/textarea'
import FcRadioTab from 'fcbox/form/radio_tab'
import OrderSetter from 'fcbox/order_setter'
import ParamSetter from '../param_setter'
// modules
import MImages from '../modules/images'
Vue.use(MImages)
Vue.use(FcButton)
Vue.use(FcInput)
Vue.use(FcSingleSelector)
Vue.use(FcSingleUpload)
Vue.use(FcTextarea)
Vue.use(FcRadioTab)
Vue.use(OrderSetter)
Vue.use(ParamSetter)

const Index = {
  name: 'Index',
  data () {
    return {
      themeTabValue: 'module', // module -> 模块 page -> 页面
      setContentType: 'page' // page -> 页面 pop -> 弹窗 global -> 全局设置
    }
  },
  computed: mapState({
    setConfig: state => state.setConfig,
    contentConfig: state => state.contentConfig
  }),
  created () {

  },
  mounted () {
    this.bodyClickEventInit()
    this.refreshPageList()
    this.refreshPopList()
    this.refreshContent()
    // 设置弹窗移动
    new PopDrag({
      eDomId: 'setterPopTitle',
      mDomId: 'setterPop'
    })
  },
  methods: Object.assign({
    // 关闭设置弹窗
    closeSetterPop () {
      this.setConfig.showSetterPop = false
    },
    // 切换模块、页面模版视图
    changeThemeTab (value) {
      this.themeTabValue = value
    },
    // 模块列表切换
    changeModuleThemeTab (value) {
      this.setConfig.moduleTheme.showList = value
    },
    // 切换设置弹窗设置项 内容、样式、事件
    changeModuleParamTab (value) {
      this.setConfig.setterParam.setType = value
      this.refreshSetter()
    },
    // 获取模块显示列表
    getModuleThemeList () {
      let data = this.setConfig.moduleTheme.data
      for (let i in data) {
        if (data[i].tag == this.setConfig.moduleTheme.showList) {
          return data[i].data
        }
      }
      return []
    },
    // 切换右侧导航页面、弹窗、全局设置
    changeSetContentType (value) {
      this.setContentType = value
    },
    // 获取设置项
    getSetterParam () {
      let data = this.setConfig.setterParam.data
      for (let i in data) {
        if (data[i].setType == this.setConfig.setterParam.setType) {
          return data[i].setList
        }
      }
      return []
    },
    // 刷新设置弹窗
    refreshSetter () {
      this.setConfig.setterKey = Math.random()
    },
    // 刷新内容
    refreshContent () {
      switch (this.setContentType) {
        case 'pop':
          break
        default:
          Object.assign(this.setConfig.mainOrderSetterParam, {
            content: this.contentConfig.pages[this.setConfig.setPageId].content,
            editKey: this.setConfig.setModuleId,
            scrollTop: document.getElementById('mainSetter').scrollTop || 0,
            key: Math.random()
          })
          break
      }
    },
    // 新增模块
    addModule (item) {
      item = JSON.parse(JSON.stringify(item))
      const addModule = item.config.module
      Object.assign(addModule, {
        id: this.getRandId()
      })
      let key = parseInt(this.setConfig.setModuleId)
      key = key == 'empty' ? this.contentConfig.pages[this.setConfig.setPageId].content.length - 1 : key
      key = key < 0 ? 0 : key
      const newArr = []
      const content = JSON.parse(JSON.stringify(this.contentConfig.pages[this.setConfig.setPageId].content))
      for (let i = 0; i <= key; i++) {
        if (content[i]) {
          newArr.push(content[i])
        }
      }
      newArr.push(addModule)
      for (let j = key + 1; j < content.length; j++) {
        if (content[j]) {
          newArr.push(content[j])
        }
      }
      this.contentConfig.pages[this.setConfig.setPageId].content = newArr
      key++
      this.setConfig.setModuleId = key > newArr.length - 1 ? newArr.length - 1 : key
      this.refreshContent()
    },
    // 主模块列表返回事件
    orderSetterEditContentCallback (key) {
      if (key !== undefined && key != 'move') {
        if (parseInt(key) != this.setConfig.setModuleId) {
          this.orderSetterMoveCallback(key)
        }
        this.setConfig.setType = 'module'
        this.setSetterContent()
        this.setConfig.showSetterPop = true
      }
    },
    orderSetterDelContentCallback (key) {
      this.contentConfig.pages[this.setConfig.setPageId].content = this.setConfig.mainOrderSetterParam.content
      key = key - 1 > 0 ? key - 1 : 0
      this.setConfig.setModuleId = key
      this.refreshContent()
    },
    orderSetterMoveCallback (key) {
      this.contentConfig.pages[this.setConfig.setPageId].content = this.setConfig.mainOrderSetterParam.content
      this.setConfig.setModuleId = key
      this.refreshContent()
    },
    // 设置配置内容
    setSetterContent () {
      switch (this.setConfig.setType) {
        case 'module':
          let setModule = this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId]
          let setModuleParams = this.setConfig.moduleThemeSet[setModule.tag]
          for (let i in setModuleParams) {
            if (setModuleParams[i].theme == setModule.theme) {
              this.setConfig.setterParam = setModuleParams[i]
            }
          }
          this.setConfig.setterParam.setType = 'content'
          this.setConfig.moduleContentSetterKey = 'empty'
          this.setConfig.setterParamValue = setModule
          break
      }
      this.refreshSetter()
    },
    // 新增页面
    addPage () {
      let pageId = this.getRandId()
      this.contentConfig.pages.push({
        name: '页面' + (this.contentConfig.pages.length + 1),
        content: [],
        id: pageId
      })
      this.setConfig.setPageId = this.contentConfig.pages.length - 1
      this.refreshPageList(true)
      this.refreshContent()
    },
    // 复制页面
    copyPage (item, key) {
      let pageId = this.getRandId()
      let copyItem = JSON.parse(JSON.stringify(item))
      const newArr = []
      const content = JSON.parse(JSON.stringify(this.contentConfig.pages))
      for (let i = 0; i <= key; i++) {
        if (content[i]) {
          newArr.push(content[i])
        }
      }
      newArr.push(Object.assign(copyItem, {
        id: pageId
      }))
      for (let j = key + 1; j < content.length; j++) {
        if (content[j]) {
          newArr.push(content[j])
        }
      }
      this.contentConfig.pages = newArr
      this.setConfig.setPageId = key + 1
      this.refreshPageList()
      this.refreshContent()
    },
    // 删除页面
    delPage (key) {
      this.setConfig.pageListOrderSetterParam.self.delOrderIcon(key)
    },
    // 显示页面列表菜单
    showPageMenu (item) {
      let content = this.setConfig.pageListOrderSetterParam.content
      for (let i in content) {
        content[i].showMenu = false
      }
      item.showMenu = true
      this.setConfig.pageMenuShowing = true
    },
    // 刷新页面列表
    refreshPageList (isAdd) {
      Object.assign(this.setConfig.pageListOrderSetterParam, {
        content: this.contentConfig.pages,
        editKey: this.setConfig.setPageId,
        scrollTop: isAdd ? document.getElementById('pageListOrderSetter').scrollHeight : document.getElementById('pageListOrderSetter').scrollTop,
        key: Math.random()
      })
    },
    // 页面列表返回事件
    pageListOrderSetterEditContentCallback (key) {
      if (key !== undefined && key != 'move') {
        this.pageListOrderSetterMoveCallback(key)
      }
    },
    pageListOrderSetterDelContentCallback (key) {
      this.contentConfig.pages = this.setConfig.pageListOrderSetterParam.content
      this.setConfig.setPageId = key - 1 > 0 ? key - 1 : 0
      this.refreshPageList()
      this.refreshContent()
    },
    pageListOrderSetterMoveCallback (key) {
      this.contentConfig.pages = this.setConfig.pageListOrderSetterParam.content
      this.setConfig.setPageId = key
      this.refreshPageList()
      this.refreshContent()
    },
    // 新增弹窗
    addPop () {
      let popId = this.getRandId()
      this.contentConfig.pops.push({
        name: '弹窗' + (this.contentConfig.pops.length + 1),
        content: [],
        id: popId
      })
      this.setConfig.setPopId = this.contentConfig.pops.length - 1
      this.refreshPopList(true)
    },
    // 复制弹窗
    copyPop (item, key) {
      let popId = this.getRandId()
      let copyItem = JSON.parse(JSON.stringify(item))
      const newArr = []
      const content = JSON.parse(JSON.stringify(this.contentConfig.pops))
      for (let i = 0; i <= key; i++) {
        if (content[i]) {
          newArr.push(content[i])
        }
      }
      newArr.push(Object.assign(copyItem, {
        id: popId
      }))
      for (let j = key + 1; j < content.length; j++) {
        if (content[j]) {
          newArr.push(content[j])
        }
      }
      this.contentConfig.pops = newArr
      this.setConfig.setPopId = key + 1
      this.refreshPopList()
    },
    // 删除弹窗
    delPop (key) {
      this.setConfig.popListOrderSetterParam.self.delOrderIcon(key)
    },
    // 显示弹窗列表菜单
    showPopMenu (item) {
      let content = this.setConfig.popListOrderSetterParam.content
      for (let i in content) {
        content[i].showMenu = false
      }
      item.showMenu = true
      this.setConfig.popMenuShowing = true
    },
    // 刷新弹窗列表
    refreshPopList (isAdd) {
      this.setConfig.popListOrderSetterParam.content = this.contentConfig.pops
      if (document.getElementById('popListOrderSetter')) {
        if (isAdd) {
          this.setConfig.popListOrderSetterParam.scrollTop = document.getElementById('popListOrderSetter').scrollHeight
          document.getElementById('popListOrderSetter').scrollTop = document.getElementById('popListOrderSetter').scrollHeight
        } else {
          this.setConfig.popListOrderSetterParam.scrollTop = document.getElementById('popListOrderSetter').scrollTop
        }
      }
      this.setConfig.popListOrderSetterParam.key = Math.random()
      setTimeout(() => {
        this.setConfig.popListOrderSetterParam.self.refresh(this.setConfig.setPopId)
      })
    },
    // 弹窗列表返回事件
    popListOrderSetterEditContentCallback (key) {
      if (key !== undefined && key != 'move') {
        this.popListOrderSetterMoveCallback(key)
      }
    },
    popListOrderSetterDelContentCallback (key) {
      this.contentConfig.pops = this.setConfig.popListOrderSetterParam.content
      this.setConfig.setPopId = key - 1 > 0 ? key - 1 : 0
      this.refreshPopList()
    },
    popListOrderSetterMoveCallback (key) {
      this.contentConfig.pops = this.setConfig.popListOrderSetterParam.content
      this.setConfig.setPopId = key || 0
      this.refreshPopList()
    }
  }, PublicFunc)
}

export default Index
