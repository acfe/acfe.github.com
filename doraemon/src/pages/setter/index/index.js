/* eslint-disable no-undef */
/**
 * Created by 001264 on 2019/9/9.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import { envConfig } from 'src/common/js/env.config'
import Location from 'fcbox/utils/location'
import ajax from 'fcbox/utils/http/ajax'
import COS from 'cos-js-sdk-v5'
import PublicFunc from '../func/public_func'
import FormatFunc from '../func/format_style'
import PopDrag from '../func/pop_drag'
import FcButton from 'fcbox/form/button'
import FcInput from 'fcbox/form/input'
import FcEditor from 'fcbox/form/editor'
import FcSingleSelector from 'fcbox/form/selector/single'
import FcSlider from 'fcbox/form/slider'
import FcSingleUpload from 'fcbox/upload/qq'
import FcTextarea from 'fcbox/form/textarea'
import FcRadioTab from 'fcbox/form/radio_tab'
import OrderSetter from 'fcbox/order_setter'
import ParamSetter from '../param_setter'
import FcDomPlayer from 'fcbox/player/dom'
import PlayerStatusBar from 'fcbox/player/player_status_bar'
import FcPreImage from 'fcbox/image/pre'
import FcPop from 'fcbox/pop/pop'
import { ColorPicker } from 'element-ui'
// modules
import MImages from '../modules/images'
import MMenus from '../modules/menus'
import MGoods from '../modules/goods'
import MTab from '../modules/tab'
import MGroup from '../modules/group'
import MPop from '../modules/pop'
import EImage from '../elements/image'
import EText from '../elements/text'
import EIcon from '../elements/icon'
import EBusiness from '../elements/business'
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
Vue.use(FcButton)
Vue.use(FcInput)
Vue.use(FcEditor)
Vue.use(FcSingleSelector)
Vue.use(FcSlider)
Vue.use(FcSingleUpload)
Vue.use(FcTextarea)
Vue.use(FcRadioTab)
Vue.use(OrderSetter)
Vue.use(ParamSetter)
Vue.use(FcDomPlayer)
Vue.use(PlayerStatusBar)
Vue.use(FcPreImage)
Vue.use(FcPop)
Vue.use(ColorPicker)

const Index = {
  name: 'Index',
  data () {
    return {
      envConfig,
      themeTabValue: 'module', // module -> 模块 page -> 页面
      setContentType: 'page', // page -> 页面 pop -> 弹窗 global -> 全局设置
      popContentType: 'set', // set -> 设置 element -> 元素
      bodyStyle: {},
      pageStyle: {},
      color2: '#ff0000',
      contextmenuParam: {
        show: false,
        style: {},
        setType: ''
      },
      previewPopParam: {
        show: false,
        maskClose: true
      },
      showAhead: false,
      showUndo: false,
      popRandKey: Math.random(),
      getPopTitle () {
        let title
        let setConfig = this.setConfig
        switch (setConfig.setType) {
          case 'module':
            title = '模块设置'
            if (this.popContentType == 'element') {
              title = '插入元素'
            }
            break
          case 'page':
            title = '页面设置'
            break
          case 'pop':
            title = '弹窗设置'
            break
          case 'element':
            title = '元素设置'
            break
        }
        return title
      }
    }
  },
  computed: mapState({
    setConfig: state => state.setConfig,
    contentConfig: state => state.contentConfig
  }),
  created () {

  },
  mounted () {
    if (sessionStorage.getItem('configContentCatch')) {
      this.$store.state.contentConfig = JSON.parse(sessionStorage.getItem('configContentCatch'))
    }
    this.bodyClickEventInit()
    this.refreshPageList()
    this.refreshPopList()
    this.refreshContent()
    this.keyActionInit()
    // 设置弹窗移动
    new PopDrag({
      eDomId: 'setterPopTitle',
      mDomId: 'setterPop'
    })
    new PopDrag({
      eDomId: 'elementPopTitle',
      mDomId: 'elementPop'
    })
  },
  methods: Object.assign({
    preview () {
      localStorage.setItem('previewData', JSON.stringify(this.trimObjBlank(this.contentConfig)))
      this.previewPopParam.show = true
    },
    save () {
      if (!this.contentConfig.body.title) {
        window.fc.Dialog.show({ text: '请填写标题' })
        return false
      }
      let fileName = this.getRandId() + '.json'
      let path = 'advice'
      ajax.get({
        url: this.$store.state.config.api.op.customerServiceCenter.upSign,
        data: {
          fileName,
          directory: path
        }
      }).then((res) => {
        res = JSON.parse(res)
        if (res && res.data) {
          let d = res.data
          let date = new Date()
          let month = date.getMonth() + 1
          month = month < 10 ? '0' + month : month
          let year = date.getFullYear().toString()
          var cos = new COS({
            getAuthorization: (options, callback) => {
              callback(d.sign)
            }
          })
          cos.putObject({
            Bucket: d.bucket + '-' + d.appId,
            Region: d.region,
            Key: path + '/' + year + month + '/' + fileName,
            Body: JSON.stringify(this.trimObjBlank(this.contentConfig))
          }, (err, data) => {
            if (err || !data || data.statusCode != 200) {
              window.fc.Dialog.show({ text: err })
            } else {
              var url = 'http://' + d.bucket + '-' + d.appId + '.file.myqcloud.com/' + path + '/' + year + month + '/' + fileName
              this.saveContent(url)
              // console.log(url)
            }
          })
        }
      })
    },
    saveContent (adviceUrl) {
      let { contentConfig } = this
      let postData = {
        showType: contentConfig.body.showType || '帖子',
        adviceTitle: contentConfig.body.title || '',
        adviceRemark: contentConfig.body.keyword || '',
        shareImage: contentConfig.body.shareImage || '',
        adviceSubheading: contentConfig.body.adviceSubheading || '',
        adviceUrl,
        directionUrl: ''
      }
      let postParam = {
        url: this.$store.state.config.api.op.customerServiceCenter.addAdviceFeedback,
        data: postData
      }
      if (Location.queryParams['id']) {
        postParam.url = this.$store.state.config.api.op.customerServiceCenter.updateAdviceFeedback
        postParam.data.id = Location.queryParams['id']
      }
      ajax.post(postParam).then((res) => {
        res = JSON.parse(res)
        window.fc.Dialog.show({
          text: res.msg,
          confirmCallback: () => {
            history.go(-1)
          }
        })
      })
    },
    // 关闭设置弹窗
    closeSetterPop () {
      this.setConfig.showSetterPop = false
    },
    closeElementPop () {
      this.setConfig.showElementPop = false
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
    changeSetterContentTab (value) {
      this.setConfig.setterParam.setType = value
      this.refreshSetter()
    },
    changeSetterModuleElmentListTab (value) {
      this.setConfig.elementTheme.showList = value
    },
    // 获取模块显示列表
    getModuleThemeList () {
      let setConfig = this.setConfig
      let data = setConfig.moduleTheme.data
      for (let i in data) {
        if (data[i].tag == setConfig.moduleTheme.showList) {
          return data[i].data
        }
      }
      return []
    },
    getElementThemeList () {
      let setConfig = this.setConfig
      let data = setConfig.elementTheme.data
      for (let i in data) {
        if (data[i].tag == setConfig.elementTheme.showList) {
          return data[i].data
        }
      }
      return []
    },
    // 切换右侧导航页面、弹窗、全局设置
    changeSetContentType (value) {
      let setConfig = this.setConfig
      this.setContentType = value
      this.closeSetterPop()
      switch (value) {
        case 'pop':
          this.themeTabValue = 'element'
          break
        default:
          this.themeTabValue = 'module'
          break
      }
      setConfig.showElementPop = false
      setConfig.setModuleId = 'empty'
      setConfig.setElementId = 'empty'
    },
    // 切换模块设置弹窗 设置 元素
    changePopContentType (value) {
      this.popContentType = value
    },
    // 获取设置项
    getSetterParam () {
      let setConfig = this.setConfig
      let data = setConfig.setterParam.data
      for (let i in data) {
        if (data[i].setType == setConfig.setterParam.setType) {
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
    refreshContent (type) {
      let { setConfig, contentConfig } = this
      this.refreshPageStyle()
      switch (this.setContentType) {
        case 'pop':
          this.popRandKey = Math.random()
          break
        default:
          Object.assign(setConfig.mainOrderSetterParam, {
            content: contentConfig.pages[setConfig.setPageId].content,
            editKey: setConfig.setModuleId,
            scrollTop: document.getElementById('mainSetter').scrollTop || 0,
            key: Math.random()
          })
          break
      }
      // history
      window.fc.historyArr = window.fc.historyArr || []
      window.fc.historyKey = window.fc.historyKey || 0
      if (JSON.stringify(contentConfig) != window.fc.historyArr[window.fc.historyKey]) {
        if (type != 'refreshHistory') {
          this.setHistory()
          this.checkHistoryBtnShow()
        }
      }
    },
    refreshPageStyle () {
      let contentConfig = this.contentConfig
      this.bodyStyle = this.formatStyle(contentConfig.body.style || {})
      this.pageStyle = this.formatStyle(contentConfig.pages[this.setConfig.setPageId].style || {})
    },
    // 新增模块
    addModule (item) {
      let { setConfig, contentConfig } = this
      item = JSON.parse(JSON.stringify(item))
      const addModule = item.config.module
      Object.assign(addModule, {
        id: this.getRandId()
      })
      let key = parseInt(setConfig.setModuleId)
      key = setConfig.setModuleId == 'empty' ? contentConfig.pages[setConfig.setPageId].content.length - 1 : key
      key = key < 0 ? 0 : key
      const newArr = []
      const content = JSON.parse(JSON.stringify(contentConfig.pages[setConfig.setPageId].content))
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
      contentConfig.pages[setConfig.setPageId].content = newArr
      key++
      setConfig.setModuleId = key > newArr.length - 1 ? newArr.length - 1 : key
      this.refreshContent()
      setConfig.setType = 'module'
      this.setSetterContent()
      setConfig.showSetterPop = true
      if (item.config.elements) {
        this.addElement(item)
      }
    },
    contextShowElement (popContentType) {
      let setConfig = this.setConfig
      setConfig.setType = 'module'
      this.popContentType = popContentType
      this.setSetterContent()
      setConfig.showSetterPop = true
      this.contextmenuParam.show = false
    },
    contextMoveModule (type) {
      let { setConfig, contentConfig } = this
      let modules = JSON.parse(JSON.stringify(contentConfig.pages[setConfig.setPageId].content))
      setConfig.setModuleId = parseInt(setConfig.setModuleId)
      let blankItem
      switch (type) {
        case 'up':
          if (setConfig.setModuleId > 0) {
            blankItem = modules[setConfig.setModuleId - 1]
            modules[setConfig.setModuleId - 1] = modules[setConfig.setModuleId]
            modules[setConfig.setModuleId] = blankItem
            contentConfig.pages[setConfig.setPageId].content = modules
            setConfig.setModuleId = setConfig.setModuleId - 1
          }
          break
        case 'down':
          if (setConfig.setModuleId < modules.length - 1) {
            blankItem = modules[setConfig.setModuleId + 1]
            modules[setConfig.setModuleId + 1] = modules[setConfig.setModuleId]
            modules[setConfig.setModuleId] = blankItem
            contentConfig.pages[setConfig.setPageId].content = modules
            setConfig.setModuleId = setConfig.setModuleId + 1
          }
          break
        case 'top':
          if (setConfig.setModuleId > 0) {
            let popM = modules.splice(parseInt(setConfig.setModuleId), 1)
            contentConfig.pages[setConfig.setPageId].content = popM.concat(modules)
            setConfig.setModuleId = 0
            document.getElementById('mainSetter').scrollTop = 0
          }
          break
        case 'bottom':
          if (setConfig.setModuleId < modules.length - 1) {
            let popM = modules.splice(parseInt(setConfig.setModuleId), 1)
            contentConfig.pages[setConfig.setPageId].content = modules.concat(popM)
            setConfig.setModuleId = modules.length
            document.getElementById('mainSetter').scrollTop = document.getElementById('mainSetter').scrollHeight
          }
          break
      }
      this.refreshContent()
      setConfig.setType = 'module'
      this.setSetterContent()
      this.contextmenuParam.show = false
    },
    contextDelModule () {
      let setConfig = this.setConfig
      setConfig.mainOrderSetterParam.self.delContent(setConfig.setModuleId)
      this.contextmenuParam.show = false
    },
    contextCopyModule () {
      let setConfig = this.setConfig
      let addModule = this.contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId]
      addModule = JSON.parse(JSON.stringify(addModule))
      if (addModule.elements && addModule.elements.length) {
        for (let i in addModule.elements) {
          addModule.elements[i].id = this.getRandId()
        }
      }
      this.addModule({
        config: {
          module: addModule
        }
      })
      this.contextmenuParam.show = false
    },
    // 新增元素
    addElement (item, isPop) {
      let { setConfig, contentConfig } = this
      let setContent = isPop ? contentConfig.pops[setConfig.setPopId] : contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId]
      setContent.elements = setContent.elements || []
      let itemElements = JSON.parse(JSON.stringify(item)).config.elements
      let id
      for (let i in itemElements) {
        id = this.getRandId()
        setContent.elements.unshift(Object.assign(itemElements[i], {
          id
        }))
      }
      setConfig.setElementId = id
      setConfig.setType = 'element'
      this.refreshContent()
      this.setSetterContent()
      // console.log(setContent.elements)
    },
    contextLockElement (lock) {
      lock = lock || ''
      let setElementObj = this.getSetElementObj()
      setElementObj.elements[setElementObj.eid].lock = lock
      this.contextRefreshElement()
    },
    contextHideElement (hide) {
      hide = hide || ''
      let setElementObj = this.getSetElementObj()
      setElementObj.elements[setElementObj.eid].hide = hide
      this.contextRefreshElement()
    },
    contextCopyElement () {
      let setElementObj = this.getSetElementObj()
      setElementObj.elements.unshift(Object.assign(setElementObj.addElement, {
        id: this.getRandId()
      }))
      this.setConfig.setElementId = setElementObj.addElement.id
      this.contextRefreshElement()
    },
    contextDelElement () {
      let setConfig = this.setConfig
      let setElementObj = this.getSetElementObj()
      setElementObj.elements.splice(setElementObj.eid, 1)
      if (setElementObj.elements[0]) {
        document.getElementById('elementWindowSetter').scrollTop = 0
        this.setConfig.setElementId = setElementObj.elements[0].id
        this.contextRefreshElement()
      } else {
        setConfig.setType = 'page'
        if (this.setContentType == 'pop') {
          setConfig.setType = 'pop'
        }
        setConfig.setModuleId = 'empty'
        setConfig.setElementId = 'empty'
        this.setSetterContent()
        this.refreshContent()
        this.contextmenuParam.show = false
      }
    },
    contextMoveElement (type) {
      let { setConfig, contentConfig } = this
      let setElementObj = this.getSetElementObj()
      let blankItem
      switch (type) {
        case 'down':
          if (setElementObj.eid < setElementObj.elements.length - 1) {
            blankItem = setElementObj.elements[setElementObj.eid + 1]
            setElementObj.elements[setElementObj.eid + 1] = setElementObj.elements[setElementObj.eid]
            setElementObj.elements[setElementObj.eid] = blankItem
          }
          break
        case 'up':
          if (setElementObj.eid > 0) {
            blankItem = setElementObj.elements[setElementObj.eid - 1]
            setElementObj.elements[setElementObj.eid - 1] = setElementObj.elements[setElementObj.eid]
            setElementObj.elements[setElementObj.eid] = blankItem
          }
          break
        case 'bottom':
          if (setElementObj.eid < setElementObj.elements.length - 1) {
            let popM = setElementObj.elements.splice(parseInt(setElementObj.eid), 1)
            let elements = setElementObj.elements.concat(popM)
            if (this.setContentType == 'pop') {
              contentConfig.pops[setConfig.setPopId].elements = elements
            } else {
              contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId].elements = elements
            }
          }
          break
        case 'top':
          if (setElementObj.eid > 0) {
            let popM = setElementObj.elements.splice(parseInt(setElementObj.eid), 1)
            let elements = popM.concat(setElementObj.elements)
            if (this.setContentType == 'pop') {
              contentConfig.pops[setConfig.setPopId].elements = elements
            } else {
              contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId].elements = elements
            }
          }
          break
      }
      this.contextRefreshElement()
    },
    contextRefreshElement () {
      this.setConfig.setType = 'element'
      this.refreshContent()
      this.setSetterContent()
      this.contextmenuParam.show = false
    },
    getSetElementObj () {
      let { setConfig, contentConfig } = this
      let setContent = this.setContentType == 'pop' ? contentConfig.pops[setConfig.setPopId] : contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId]
      setContent.elements = setContent.elements || []
      let elements = setContent.elements
      let addElement
      let eid = 0
      for (let i in elements) {
        if (elements[i].id == setConfig.setElementId) {
          addElement = elements[i]
          eid = parseInt(i)
        }
      }
      if (addElement) {
        addElement = JSON.parse(JSON.stringify(addElement))
      }
      return {
        elements,
        addElement,
        eid
      }
    },
    // 主模块列表返回事件
    orderSetterEditContentCallback (key) {
      let setConfig = this.setConfig
      if (key !== undefined && key != 'move') {
        if (parseInt(key) != setConfig.setModuleId) {
          setConfig.setModuleId = key
        }
        setConfig.setType = 'module'
        this.setSetterContent()
        setConfig.showSetterPop = true
      }
    },
    orderSetterDelContentCallback (key) {
      let { setConfig, contentConfig } = this
      contentConfig.pages[setConfig.setPageId].content = setConfig.mainOrderSetterParam.content
      key = key - 1 > 0 ? key - 1 : 0
      setConfig.setModuleId = key
      this.refreshContent()
      setConfig.setType = 'module'
      if (contentConfig.pages[setConfig.setPageId].content.length <= 0) {
        setConfig.setType = 'page'
      }
      this.setSetterContent()
    },
    orderSetterMoveCallback (key) {
      let { setConfig, contentConfig } = this
      contentConfig.pages[setConfig.setPageId].content = setConfig.mainOrderSetterParam.content
      setConfig.setModuleId = key
      this.refreshContent()
      setConfig.setType = 'module'
      this.setSetterContent()
    },
    // 设置配置内容
    setSetterContent (refreshHistory) {
      let { setConfig, contentConfig } = this
      setConfig.showElementPop = false
      switch (setConfig.setType) {
        case 'module':
          let setModule = contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId]
          let setModuleParams = setConfig.moduleThemeSet[setModule.tag]
          for (let i in setModuleParams) {
            if (setModuleParams[i].theme == setModule.theme) {
              setConfig.setterParam = setModuleParams[i]
            }
          }
          setConfig.setterParam.setType = 'content'
          setConfig.moduleContentSetterKey = 'empty'
          setConfig.setElementId = 'empty'
          setConfig.setterParamValue = setModule
          if (setModule.elements && setModule.elements.length) {
            Object.assign(setConfig.elementWindowSetterParam, {
              content: setModule.elements,
              scrollTop: document.getElementById('elementWindowSetter').scrollTop || 0,
              key: Math.random()
            })
            setConfig.showElementPop = true
          }
          break
        case 'page':
          this.popContentType = 'set'
          setConfig.setterParam = setConfig.pageSetParam
          setConfig.setterParamValue = contentConfig.pages[setConfig.setPageId]
          setConfig.setterParamValue.style = setConfig.setterParamValue.style || {}
          break
        case 'pop':
          this.popContentType = 'set'
          setConfig.setterParam = setConfig.popSetParam
          setConfig.setterParamValue = contentConfig.pops[setConfig.setPopId]
          setConfig.setterParamValue.style = setConfig.setterParamValue.style || {}
          break
        case 'element':
          this.popContentType = 'set'
          let elements
          if (this.setContentType == 'pop') {
            elements = contentConfig.pops[setConfig.setPopId].elements
          } else {
            elements = contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId].elements
          }
          let setElement = {}
          let editKey = 0
          for (let i in elements) {
            if (elements[i].id == setConfig.setElementId) {
              setElement = elements[i]
              editKey = i
            }
          }
          let setElementParams = setConfig.elementThemeSet[setElement.tag]
          for (let i in setElementParams) {
            if (setElementParams[i].theme == setElement.theme) {
              setConfig.setterParam = setElementParams[i]
            }
          }
          setConfig.setterParam.setType = 'style'
          setConfig.setterParamValue = setElement
          // elementwindow
          Object.assign(setConfig.elementWindowSetterParam, {
            content: elements,
            editKey,
            scrollTop: document.getElementById('elementWindowSetter').scrollTop || 0,
            key: Math.random()
          })
          setConfig.showElementPop = true
          break
      }
      this.refreshSetter()
      if (refreshHistory) {
        this.setHistory()
        this.checkHistoryBtnShow()
      }
    },
    // 元素弹窗返回事件
    elementWindowSetterEditContentCallback (key) {
      let setConfig = this.setConfig
      if (key !== undefined && key != 'move') {
        setConfig.elementWindowSetterParam.editKey = key
        setConfig.setElementId = setConfig.elementWindowSetterParam.content[key].id
        setConfig.setType = 'element'
        this.setSetterContent()
        setConfig.showSetterPop = true
      }
    },
    elementWindowSetterDelContentCallback (key) {
      let { setConfig, contentConfig } = this
      if (this.setContentType == 'pop') {
        contentConfig.pops[setConfig.setPopId].elements = setConfig.elementWindowSetterParam.content
      } else {
        contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId].elements = setConfig.elementWindowSetterParam.content
      }
      key = key - 1 > 0 ? key - 1 : 0
      setConfig.setElementId = setConfig.elementWindowSetterParam.content[key].id
      this.refreshContent()
      setConfig.setType = 'element'
      if (setConfig.elementWindowSetterParam.content.length <= 0) {
        setConfig.setType = 'page'
      }
      this.setSetterContent()
    },
    elementWindowSetterMoveCallback (key) {
      let { setConfig, contentConfig } = this
      if (this.setContentType == 'pop') {
        contentConfig.pops[setConfig.setPopId].elements = setConfig.elementWindowSetterParam.content
      } else {
        contentConfig.pages[setConfig.setPageId].content[setConfig.setModuleId].elements = setConfig.elementWindowSetterParam.content
      }
      setConfig.setElementId = setConfig.elementWindowSetterParam.content[key].id
      this.refreshContent()
      setConfig.setType = 'element'
      this.setSetterContent()
    },
    // 新增页面
    addPage () {
      let { setConfig, contentConfig } = this
      let pageId = this.getRandId()
      contentConfig.pages.push({
        name: '页面' + (contentConfig.pages.length + 1),
        content: [],
        id: pageId
      })
      setConfig.setPageId = contentConfig.pages.length - 1
      this.refreshPageList(true)
      this.refreshContent()
      setConfig.setType = 'page'
      this.setSetterContent()
    },
    // 复制页面
    copyPage (item, key) {
      let { setConfig, contentConfig } = this
      let pageId = this.getRandId()
      let copyItem = JSON.parse(JSON.stringify(item))
      const newArr = []
      const content = JSON.parse(JSON.stringify(contentConfig.pages))
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
      contentConfig.pages = newArr
      setConfig.setPageId = key + 1
      this.refreshPageList()
      this.refreshContent()
      setConfig.setType = 'page'
      this.setSetterContent()
    },
    // 删除页面
    delPage (key) {
      let { setConfig } = this
      setConfig.pageListOrderSetterParam.self.delOrderIcon(key)
      setConfig.setType = 'page'
      this.setSetterContent()
    },
    // 显示页面列表菜单
    showPageMenu (item) {
      let { setConfig } = this
      let content = setConfig.pageListOrderSetterParam.content
      for (let i in content) {
        content[i].showMenu = false
      }
      item.showMenu = true
      setConfig.pageMenuShowing = true
    },
    // 刷新页面列表
    refreshPageList (isAdd) {
      let { setConfig, contentConfig } = this
      Object.assign(setConfig.pageListOrderSetterParam, {
        content: contentConfig.pages,
        editKey: setConfig.setPageId,
        scrollTop: isAdd ? document.getElementById('pageListOrderSetter').scrollHeight : document.getElementById('pageListOrderSetter').scrollTop,
        key: Math.random()
      })
    },
    // 页面列表返回事件
    pageListOrderSetterEditContentCallback (key) {
      let { setConfig } = this
      if (key !== undefined && key != 'move') {
        setConfig.setPageId = key
        this.refreshContent()
        setConfig.setType = 'page'
        this.setSetterContent()
        setConfig.showSetterPop = true
      }
    },
    pageListOrderSetterDelContentCallback (key) {
      let { setConfig, contentConfig } = this
      contentConfig.pages = setConfig.pageListOrderSetterParam.content
      setConfig.setPageId = key - 1 > 0 ? key - 1 : 0
      this.refreshPageList()
      this.refreshContent()
      setConfig.setType = 'page'
      this.setSetterContent()
    },
    pageListOrderSetterMoveCallback (key) {
      let { setConfig, contentConfig } = this
      contentConfig.pages = setConfig.pageListOrderSetterParam.content
      setConfig.setPageId = key
      this.refreshPageList()
      this.refreshContent()
      setConfig.setType = 'page'
      this.setSetterContent()
    },
    // 新增弹窗
    addPop () {
      let { setConfig, contentConfig } = this
      let popId = this.getRandId()
      contentConfig.pops.push({
        name: '弹窗' + (contentConfig.pops.length + 1),
        content: [],
        id: popId
      })
      setConfig.setPopId = contentConfig.pops.length - 1
      this.refreshPopList(true)
      this.refreshContent()
      setConfig.setType = 'pop'
      this.setSetterContent()
    },
    // 复制弹窗
    copyPop (item, key) {
      let { setConfig, contentConfig } = this
      let popId = this.getRandId()
      let copyItem = JSON.parse(JSON.stringify(item))
      const newArr = []
      const content = JSON.parse(JSON.stringify(contentConfig.pops))
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
      contentConfig.pops = newArr
      setConfig.setPopId = key + 1
      this.refreshPopList()
      this.refreshContent()
      setConfig.setType = 'pop'
      this.setSetterContent()
    },
    // 设置弹窗模版
    setPopTheme (item) {
      window.fc.Dialog.show({
        text: '使用弹窗模版将覆盖当前弹窗内容，确定使用吗？',
        clearText: '取消',
        confirmCallback: () => {
          let { setConfig, contentConfig } = this
          let pop = contentConfig.pops[setConfig.setPopId]
          // console.log(JSON.stringify(pop))
          let id = pop.id
          let data = JSON.parse(item.data)
          data.id = id
          contentConfig.pops[setConfig.setPopId] = data
          this.refreshContent()
        }
      })
    },
    // 设置页面模版
    setPageTheme (item) {
      window.fc.Dialog.show({
        text: '使用页面模版将会覆盖当前页面设置，确定使用吗？',
        clearText: '取消',
        confirmCallback: () => {
          let data = JSON.parse(item.data)
          this.$store.state.contentConfig.pages[this.setConfig.setPageId] = data.pages[0]
          this.refreshPageList()
          this.refreshContent()
        }
      })
    },
    // 删除弹窗
    delPop (key) {
      this.setConfig.popListOrderSetterParam.self.delOrderIcon(key)
    },
    // 显示弹窗列表菜单
    showPopMenu (item) {
      let { setConfig } = this
      let content = setConfig.popListOrderSetterParam.content
      for (let i in content) {
        content[i].showMenu = false
      }
      item.showMenu = true
      setConfig.popMenuShowing = true
    },
    // 刷新弹窗列表
    refreshPopList (isAdd) {
      let { setConfig, contentConfig } = this
      setConfig.popListOrderSetterParam.content = contentConfig.pops
      if (document.getElementById('popListOrderSetter')) {
        if (isAdd) {
          setConfig.popListOrderSetterParam.scrollTop = document.getElementById('popListOrderSetter').scrollHeight
          document.getElementById('popListOrderSetter').scrollTop = document.getElementById('popListOrderSetter').scrollHeight
        } else {
          setConfig.popListOrderSetterParam.scrollTop = document.getElementById('popListOrderSetter').scrollTop
        }
      }
      setConfig.popListOrderSetterParam.key = Math.random()
      setTimeout(() => {
        setConfig.popListOrderSetterParam.self.refresh(setConfig.setPopId)
      })
    },
    // 弹窗列表返回事件
    popListOrderSetterEditContentCallback (key) {
      let { setConfig } = this
      if (key !== undefined && key != 'move') {
        setConfig.setPopId = key || 0
        this.refreshContent()
        setConfig.setType = 'pop'
        this.setSetterContent()
        setConfig.showSetterPop = true
      }
    },
    popListOrderSetterDelContentCallback (key) {
      let { setConfig, contentConfig } = this
      contentConfig.pops = setConfig.popListOrderSetterParam.content
      setConfig.setPopId = key - 1 > 0 ? key - 1 : 0
      this.refreshPopList()
      this.refreshContent()
      setConfig.setType = 'pop'
      this.setSetterContent()
    },
    popListOrderSetterMoveCallback (key) {
      let { setConfig, contentConfig } = this
      contentConfig.pops = setConfig.popListOrderSetterParam.content
      setConfig.setPopId = key || 0
      this.refreshPopList()
      this.refreshContent()
      setConfig.setType = 'pop'
      this.setSetterContent()
    },
    emptyClick (e) {
      let { setConfig } = this
      if (e.target == e.currentTarget) {
        setConfig.setType = 'page'
        if (this.setContentType == 'pop') {
          setConfig.setType = 'pop'
        }
        setConfig.setModuleId = 'empty'
        setConfig.setElementId = 'empty'
        setConfig.showSetterPop = true
        this.setSetterContent()
        const doms = setConfig.mainOrderSetterParam.self.scroll.getElementsByClassName('selectedBorder')
        if (doms && doms.length) {
          for (let i = 0; i < doms.length; i++) {
            doms[i].style.border = 'none'
          }
        }
      }
    },
    keySetElementSize (type, size) {
      let { setConfig } = this
      let setElement = setConfig.setterParamValue
      if (setConfig.setType != 'element' || !setElement) {
        return false
      }
      setElement.elementStyle.width = parseInt(setElement.elementStyle.width) || 0
      setElement.elementStyle.height = parseInt(setElement.elementStyle.height) || 0
      switch (setConfig.setType) {
        case 'element':
        case 'popElement':
          switch (type) {
            case 'left':
              setElement.elementStyle.width -= size
              break
            case 'right':
              setElement.elementStyle.width += size
              break
            case 'up':
              setElement.elementStyle.height -= size
              break
            case 'down':
              setElement.elementStyle.height += size
              break
          }
          break
      }
      this.refreshContent()
      this.refreshSetter()
    },
    keySetElementPos (type, size) {
      let { setConfig } = this
      let setElement = setConfig.setterParamValue
      if (setConfig.setType != 'element' || !setElement) {
        return false
      }
      setElement.elementStyle.left = parseInt(setElement.elementStyle.left) || 0
      setElement.elementStyle.top = parseInt(setElement.elementStyle.top) || 0
      switch (setConfig.setType) {
        case 'element':
        case 'popElement':
          switch (type) {
            case 'left':
              setElement.elementStyle.left -= size
              break
            case 'right':
              setElement.elementStyle.left += size
              break
            case 'up':
              setElement.elementStyle.top -= size
              break
            case 'down':
              setElement.elementStyle.top += size
              break
          }
          break
      }
      this.refreshContent()
      this.refreshSetter()
    },
    keyActionInit () {
      // 键盘事件
      let keyType = 'pos'
      let keyAddSize = 1
      let keyObj = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      }
      document.onkeydown = (e) => {
        switch (e.keyCode) {
          case 16:
            keyAddSize = 10
            break
          case 17:
            keyType = 'size'
            break
        }
      }
      document.onkeyup = (e) => {
        switch (e.keyCode) {
          case 16:
            keyAddSize = 1
            break
          case 17:
            keyType = 'pos'
            break
          case 37:
          case 38:
          case 39:
          case 40:
            if (keyType == 'size') {
              this.keySetElementSize(keyObj[e.keyCode], keyAddSize)
            } else {
              this.keySetElementPos(keyObj[e.keyCode], keyAddSize)
            }
            break
          case 89:
            if (keyType == 'size') {
              this.historyAhead()
            }
            break
          case 90:
            if (keyType == 'size') {
              this.historyUndo()
            }
            break
        }
      }
    },
    checkHistoryBtnShow () {
      if (window.fc.historyArr.length && window.fc.historyKey) {
        this.showUndo = true
      } else {
        this.showUndo = false
      }
      if (window.fc.historyArr.length && window.fc.historyKey < window.fc.historyArr.length - 1) {
        this.showAhead = true
      } else {
        this.showAhead = false
      }
    },
    setHistory () {
      const contentConfigCatch = JSON.stringify(this.contentConfig)
      window.fc.historyArr.push(contentConfigCatch)
      sessionStorage.setItem('configContentCatch', contentConfigCatch)
      if (window.fc.historyArr.length > 10) {
        window.fc.historyArr.shift()
      }
      window.fc.historyKey = window.fc.historyArr.length - 1
    },
    historyUndo () {
      if (!this.showUndo) {
        return false
      }
      window.fc.historyKey--
      window.fc.historyKey = window.fc.historyKey > 0 ? window.fc.historyKey : 0
      if (window.fc.historyArr[window.fc.historyKey]) {
        this.$store.state.contentConfig = JSON.parse(window.fc.historyArr[window.fc.historyKey])
        this.refreshContent('refreshHistory')
        this.refreshPageList()
        this.refreshSetter()
        this.checkHistoryBtnShow()
      }
    },
    historyAhead () {
      if (!this.showAhead) {
        return false
      }
      window.fc.historyKey++
      window.fc.historyKey = window.fc.historyKey < window.fc.historyArr.length ? window.fc.historyKey : window.fc.historyArr.length - 1
      if (window.fc.historyArr[window.fc.historyKey]) {
        this.$store.state.contentConfig = JSON.parse(window.fc.historyArr[window.fc.historyKey])
        this.refreshContent('refreshHistory')
        this.refreshPageList()
        this.refreshSetter()
        this.checkHistoryBtnShow()
      }
    }
  }, PublicFunc, FormatFunc)
}

export default Index
