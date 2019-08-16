/* eslint-disable no-undef */
/**
 * Created by 001264 on 2019/7/8.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import FcInput from 'fcbox/form/input'
import FcTextarea from 'fcbox/form/textarea'
import FcButton from 'fcbox/form/button'
import FcPop from 'fcbox/pop/pop'
import FcSlider from 'fcbox/form/slider'
import FcRadioTab from 'fcbox/form/radio_tab'
import FcSingleSelector from 'fcbox/form/selector/single'
import FcSingleUpload from 'fcbox/upload/qq'
import OrderSetter from 'fcbox/order_setter'
import Setter from '../setter'
import FcDomPlayer from 'fcbox/player/dom'
import FcLazyImage from 'fcbox/image/lazy'
// modules
import MImages from '../../modules/images'
import MMenus from '../../modules/menus'
import MGoods from '../../modules/goods'
import MPop from '../../modules/pop'
// elements
import EImage from '../../elements/image'
import EText from '../../elements/text'
Vue.use(MImages)
Vue.use(MMenus)
Vue.use(MGoods)
Vue.use(MPop)
Vue.use(EImage)
Vue.use(EText)
// components
Vue.use(FcInput)
Vue.use(FcPop)
Vue.use(FcSlider)
Vue.use(FcDomPlayer)
Vue.use(FcLazyImage)
Vue.use(FcRadioTab)
Vue.use(FcSingleUpload)
Vue.use(FcSingleSelector)
Vue.use(FcTextarea)
Vue.use(Setter)
Vue.use(FcButton)
Vue.use(OrderSetter)

const Index = {
  name: 'Index',
  data () {
    return {
      previewPopParam: {
        show: false,
        maskClose: true
      },
      popContentKey: Math.random(),
      bodyStyle: {},
      pageStyle: {},
      checkChannelSupport (setConfig) {
        switch (setConfig.editTabParam.value) {
          case 1:
          case 2:
            return true
          case 0:
            if (setConfig.rightTabParam.value == 1 && setConfig.setType == 'module') {
              return true
            }
            break
        }
        return false
      }
    }
  },
  computed: mapState({
    contentKey: state => state.contentKey,
    setConfig: state => state.setConfig,
    contentConfig: state => state.contentConfig
  }),
  created () {
    this.setSetter('page')
  },
  mounted () {
    this.refreshContent()
    this.refreshPageList()
  },
  methods: {
    save () {
      console.log(this.trimObjBlank(this.contentConfig))
    },
    preview () {
      localStorage.setItem('previewData', JSON.stringify(this.trimObjBlank(this.contentConfig)))
      this.previewPopParam.show = true
    },
    closePreviewPop () {
      this.previewPopParam.show = false
    },
    trimObjBlank (obj) {
      if (isBaseDataType(obj)) {
        return obj
      }
      function judgeType (_obj) {
        return _obj === null ? 'null' : _obj instanceof Array ? 'array' : typeof _obj !== 'object' ? typeof _obj : 'object'
      }
      function isBaseDataType (_obj) {
        var types = ['boolean', 'number', 'string', 'function', 'null', 'undefined']
        var type = judgeType(_obj)
        return types.indexOf(type) !== -1
      }
      function _cloneArry (_obj) {
        var res = []
        for (var i = 0, len = _obj.length; i < len; i++) {
          var value = _obj[i]
          if (isBaseDataType(value) && value !== '' && value !== '请选择') {
            res.push(value)
          } else if (judgeType(value) === 'object') {
            res.push(_cloneObj(value))
          } else if (judgeType(value) === 'array') {
            res.push(_cloneArry(value))
          }
        }
        return res
      }
      function _cloneObj (_obj) {
        var res = {}
        for (var attr in _obj) {
          var value = _obj[attr]
          if (isBaseDataType(value) && value !== '' && value !== '请选择') {
            res[attr] = value
          } else if (judgeType(value) === 'object') {
            res[attr] = _cloneObj(value)
          } else if (judgeType(value) === 'array') {
            res[attr] = _cloneArry(value)
          }
        }
        return res
      }
      if (judgeType(obj) === 'array') {
        return _cloneArry(obj)
      } else {
        return _cloneObj(obj)
      }
    },
    changeTabValue (param, key, callback) {
      if (!param || !param.data || !param.data[key]) {
        return false
      }
      param.value = param.data[key].value
      callback && callback()
    },
    changeEditTab () {
      if (this.setConfig.editTabParam.value == 0) {
        if (this.setConfig.leftTabParam.value == 1) {
          this.setSetter('pop')
        } else {
          this.setSetter('page')
        }
        this.refreshContent()
      }
      if (this.setConfig.editTabParam.value == 3) {
        this.setSetter('body')
        this.refreshContent()
      }
      this.refreshSetter()
    },
    changeSetType () {
      if (this.setConfig.leftTabParam.value == 1) {
        this.setConfig.setType = 'pop'
        this.setConfig.editTabParam.data[1].show = false
        this.setConfig.editTabParam.data[2].show = true
        this.setConfig.editTabParam.data[3].show = false
        this.setSetter('pop')
      } else {
        this.setConfig.setType = 'page'
        this.setConfig.editTabParam.data[1].show = true
        this.setConfig.editTabParam.data[3].show = true
        this.refreshPageList()
      }
      this.refreshContent()
    },
    changeSetTab () {
      this.refreshSetter()
    },
    changePage (id) {
      if (id == this.setConfig.setPageId) {
        return false
      }
      this.setConfig.setPageId = id || 0
      this.refreshContent()
    },
    changePop (id) {
      if (id == this.setConfig.setPopId) {
        return false
      }
      this.setConfig.setPopId = id || 0
      this.setSetter('pop', this.setConfig.setPopId)
      this.refreshContent()
    },
    refreshContent () {
      if (this.setConfig.setType == 'pop' || this.setConfig.setType == 'popElement') {
        this.popContentKey = Math.random()
      } else {
        this.setConfig.mainOrderSetterParam.content = this.contentConfig.pages[this.setConfig.setPageId] ? this.contentConfig.pages[this.setConfig.setPageId].content : []
        if (document.getElementById('mainSetter')) {
          this.setConfig.mainOrderSetterParam.scrollTop = document.getElementById('mainSetter').scrollTop
        }
        this.setConfig.mainOrderSetterParam.key = Math.random()
        if (this.setConfig.setType == 'module' || this.setConfig.setType == 'element') {
          setTimeout(() => {
            this.setConfig.mainOrderSetterParam.self.refresh(this.setConfig.setModuleId)
          })
        }
        if (this.setConfig.setType == 'page') {
          this.bodyStyle = this.refreshBodyStyle(this.contentConfig.body.style)
          this.pageStyle = this.refreshBodyStyle(this.contentConfig.pages[this.setConfig.setPageId].style)
        }
        if (this.setConfig.setType == 'body') {
          this.bodyStyle = this.refreshBodyStyle(this.contentConfig.body.style)
        }
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
    refreshPageList () {
      this.setSetter('page')
      this.setConfig.pageListOrderSetterParam.content = this.contentConfig.pages
      if (document.getElementById('pageListOrderSetter')) {
        this.setConfig.pageListOrderSetterParam.scrollTop = document.getElementById('pageListOrderSetter').scrollTop
      }
      this.setConfig.pageListOrderSetterParam.key = Math.random()
      setTimeout(() => {
        this.setConfig.pageListOrderSetterParam.self.refresh(this.setConfig.setPageId)
      })
    },
    addPage () {
      this.contentConfig.pages.unshift({
        name: '页面' + (this.contentConfig.pages.length + 1),
        content: [],
        id: new Date().getTime()
      })
      this.setConfig.setPageId = 0
      this.refreshPageList()
      this.refreshContent()
    },
    addPop () {
      this.contentConfig.pops.unshift({
        name: '弹窗' + (this.contentConfig.pops.length + 1),
        elements: [],
        id: new Date().getTime(),
        show: false
      })
      this.setConfig.setPopId = 0
      this.setSetter('pop', this.setConfig.setPopId)
      this.refreshContent()
    },
    delPop (key) {
      const content = this.contentConfig.pops
      const newContent = []
      for (var i in content) {
        if (i != key) {
          newContent.push(content[i])
        }
      }
      this.contentConfig.pops = newContent
      this.setSetter('pop', this.setConfig.setPopId)
      setTimeout(() => {
        this.setConfig.setPopId = (parseInt(key) - 1) > 0 ? (parseInt(key) - 1) : 0
        this.refreshContent()
      })
    },
    addModule (item) {
      if (this.setConfig.setType == 'page' || this.setConfig.setType == 'module' || this.setConfig.setType == 'element' || this.setConfig.setType == 'body') {
        let key = 0
        if (this.setConfig.setType == 'page' || this.setConfig.setType == 'body' || !this.contentConfig.pages[this.setConfig.setPageId].content.length) {
          this.contentConfig.pages[this.setConfig.setPageId].content.unshift({
            name: item.name,
            tag: item.tag,
            content: [],
            id: new Date().getTime()
          })
        } else {
          key = parseInt(this.setConfig.setModuleId)
          const newArr = []
          const content = JSON.parse(JSON.stringify(this.contentConfig.pages[this.setConfig.setPageId].content))
          for (let i = 0; i <= key; i++) {
            if (content[i]) {
              newArr.push(content[i])
            }
          }
          newArr.push({
            name: item.name,
            tag: item.tag,
            content: [],
            id: new Date().getTime()
          })
          for (let j = key + 1; j < content.length; j++) {
            if (content[j]) {
              newArr.push(content[j])
            }
          }
          this.contentConfig.pages[this.setConfig.setPageId].content = newArr
          key += 1
        }
        setTimeout(() => {
          this.setSetter('module', key)
          this.setConfig.mainOrderSetterParam.self.setSelectModule(key)
          this.refreshContent()
        })
      }
    },
    addElement (item) {
      switch (this.setConfig.setType) {
        case 'module':
        case 'element':
          const content = this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId]
          content.elements = content.elements || []
          content.elements.push({
            name: item.name,
            tag: item.tag
          })
          this.setConfig.setElementId = content.elements.length - 1
          this.setSetter('element', this.setConfig.setModuleId, this.setConfig.setElementId)
          this.refreshSetter()
          this.refreshContent()
          break
      }
    },
    addPopElement (item) {
      switch (this.setConfig.setType) {
        case 'pop':
        case 'popElement':
          const content = this.contentConfig.pops[this.setConfig.setPopId]
          content.elements = content.elements || []
          content.elements.push({
            name: item.name,
            tag: item.tag
          })
          this.setConfig.setElementId = content.elements.length - 1
          this.setSetter('popElement', this.setConfig.setPopId, this.setConfig.setElementId)
          this.refreshSetter()
          this.refreshContent()
          break
      }
    },
    setSetter (type, moduleId, elemenId) {
      this.setConfig.editTabParam.value = 0
      this.setConfig.editTabParam.data[2].show = false
      this.setConfig.rightTabParam.data[2].show = false
      this.setConfig.rightTabParam.value = 0
      this.setConfig.setModuleId = 0
      this.setConfig.setElementId = 'empty'
      this.setConfig.setType = type || 'page'
      this.setConfig.showElementWindow = false
      switch (type) {
        case 'module':
          this.setConfig.setModuleId = moduleId
          this.setConfig.setterParam.imageOrderSetterKey = undefined
          this.setConfig.editTabParam.data[2].show = true
          this.refreshElementWindow()
          break
        case 'element':
          this.setConfig.setModuleId = moduleId
          this.setConfig.setElementId = elemenId || 0
          this.setConfig.rightTabParam.value = 1
          this.setConfig.editTabParam.data[2].show = true
          this.setConfig.rightTabParam.data[2].show = true
          this.refreshElementWindow()
          break
        case 'popElement':
          this.setConfig.setPopId = moduleId
          this.setConfig.setElementId = elemenId || 0
          this.setConfig.rightTabParam.value = 1
          this.setConfig.editTabParam.data[2].show = true
          this.setConfig.rightTabParam.data[2].show = true
          this.refreshPopElementWindow()
          break
        case 'pop':
          this.setConfig.setPopId = moduleId || 0
          if (this.contentConfig.pops[this.setConfig.setPopId]) {
            this.setConfig.editTabParam.data[2].show = true
          }
          this.refreshPopElementWindow()
          break
        case 'body':
          this.setConfig.editTabParam.value = 3
          break
      }
      this.refreshSetter()
    },
    refreshSetter () {
      this.setConfig.setterParam.key = Math.random()
    },
    elementRefreshCallback (elmentKey, moduleId, type) {
      this.setSetter('element', moduleId, elmentKey)
      if (type == 'up' && this.setConfig.mainOrderSetterParam.self.editKey != this.setConfig.setModuleId) {
        this.refreshContent()
      }
    },
    /* orderSetter callback */
    popElementRefreshCallback (elmentKey, moduleId, type) {
      this.setSetter('popElement', this.setConfig.setPopId, elmentKey)
    },
    orderSetterEditContentCallback (selectedKey, target, top) {
      if (selectedKey !== undefined && selectedKey != 'move') {
        this.setSetter('module', selectedKey)
      }
    },
    orderSetterDelContentCallback (key) {
      this.contentConfig.pages[this.setConfig.setPageId].content = this.setConfig.mainOrderSetterParam.content
      key = key - 1 > 0 ? key - 1 : 0
      this.setSetter('module', key)
      this.refreshContent()
    },
    orderSetterMoveCallback (key) {
      this.contentConfig.pages[this.setConfig.setPageId].content = this.setConfig.mainOrderSetterParam.content
      this.refreshContent()
      this.setSetter('module', key)
    },
    // page order setter callback
    pageListOrderSetterEditContentCallback (selectedKey, target, top) {
      if (selectedKey !== undefined && selectedKey != 'move') {
        this.pageListOrderSetterMoveCallback(selectedKey)
      }
    },
    pageListOrderSetterDelContentCallback (key) {
      this.contentConfig.pages = this.setConfig.pageListOrderSetterParam.content
      this.setConfig.setPageId = key - 1 > 0 ? key - 1 : 0
      this.refreshPageList()
      this.setConfig.mainOrderSetterParam.self.editKey = 'empty'
      this.setSetter('page')
      this.refreshContent()
    },
    pageListOrderSetterMoveCallback (key) {
      this.contentConfig.pages = this.setConfig.pageListOrderSetterParam.content
      this.setConfig.setPageId = key || 0
      this.setConfig.mainOrderSetterParam.self.editKey = 'empty'
      this.setSetter('page')
      this.refreshContent()
      this.refreshPageList()
    },
    /* elementSetter callback */
    elementSetterEditContentCallback (selectedKey, target, top) {
      if (selectedKey !== undefined && selectedKey != 'move') {
        this.setConfig.setElementId = selectedKey
        this.refreshContent()
        this.setSetter('element', this.setConfig.setModuleId, selectedKey)
      }
    },
    elementSetterDelContentCallback (key) {
      this.setConfig.setElementId = key - 1 > 0 ? key - 1 : 0
      this.setConfig.elementWindowSetterParam.self.delOrderIcon(key)
      this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId].elements = this.setConfig.elementWindowSetterParam.content
      this.refreshContent()
      this.setSetter('element', this.setConfig.setModuleId, key)
      this.refreshElementWindow()
    },
    elementSetterMoveCallback (key) {
      this.setConfig.setElementId = key
      this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId].elements = this.setConfig.elementWindowSetterParam.content
      this.refreshContent()
      this.setSetter('element', this.setConfig.setModuleId, key)
      this.refreshElementWindow()
    },
    refreshElementWindow () {
      if (!this.contentConfig.pages[this.setConfig.setPageId] || !this.contentConfig.pages[this.setConfig.setPageId].content || !this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId]) {
        this.setConfig.showElementWindow = false
        return false
      }
      let elements = this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId].elements
      if (!elements || !elements.length) {
        this.setConfig.showElementWindow = false
        return false
      }
      this.setConfig.elementWindowSetterParam.editKey = this.setConfig.setElementId
      this.setConfig.elementWindowSetterParam.content = elements
      this.setConfig.showElementWindow = true
      this.setConfig.elementWindowSetterParam.key = Math.random()
    },
    /* pop elementSetter callback */
    popElementSetterEditContentCallback (selectedKey, target, top) {
      if (selectedKey !== undefined && selectedKey != 'move') {
        this.setConfig.setElementId = selectedKey
        this.refreshContent()
        this.setSetter('popElement', this.setConfig.setPopId, selectedKey)
      }
    },
    popElementSetterDelContentCallback (key) {
      this.setConfig.setElementId = key - 1 > 0 ? key - 1 : 0
      this.setConfig.popElementWindowSetterParam.self.delOrderIcon(key)
      this.contentConfig.pops[this.setConfig.setPageId].elements = this.setConfig.popElementWindowSetterParam.content
      this.refreshContent()
      this.setSetter('popElement', this.setConfig.setPopId, key)
      this.refreshPopElementWindow()
    },
    popElementSetterMoveCallback (key) {
      this.setConfig.setElementId = key
      this.contentConfig.pops[this.setConfig.setPageId].elements = this.setConfig.popElementWindowSetterParam.content
      this.refreshContent()
      this.setSetter('popElement', this.setConfig.setPopId, key)
      this.refreshPopElementWindow()
    },
    refreshPopElementWindow () {
      if (!this.contentConfig.pops[this.setConfig.setPopId]) {
        this.setConfig.showElementWindow = false
        return false
      }
      let elements = this.contentConfig.pops[this.setConfig.setPopId].elements
      if (!elements || !elements.length) {
        this.setConfig.showElementWindow = false
        return false
      }
      this.setConfig.popElementWindowSetterParam.editKey = this.setConfig.setElementId
      this.setConfig.popElementWindowSetterParam.content = elements
      this.setConfig.showElementWindow = true
      this.setConfig.popElementWindowSetterParam.key = Math.random()
    },
    emptyAreaClick (e) {
      if (e.target == e.currentTarget) {
        this.setConfig.mainOrderSetterParam.self.editKey = 'empty'
        this.setSetter('page')
        this.refreshContent()
      }
    },
    emptyPopAreaClick (e) {
      if (e.target == e.currentTarget) {
        this.setSetter('pop', this.setConfig.setPopId)
        this.refreshContent()
      }
    }
  }
}

export default Index
