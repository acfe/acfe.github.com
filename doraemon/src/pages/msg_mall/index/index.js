/* eslint-disable no-undef */
/**
 * Created by 001264 on 2019/9/9.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import ajax from 'fcbox/utils/http/ajax'
import PublicFunc from '../func/public_func'
import PopDrag from '../func/pop_drag'
import FcButton from 'fcbox/form/button'
import FcInput from 'fcbox/form/input'
import FcSingleSelector from 'fcbox/form/selector/single'
import FcSingleUpload from 'fcbox/upload/qq'
import FcTextarea from 'fcbox/form/textarea'
import FcRadioTab from 'fcbox/form/radio_tab'
import FcDomPlayer from 'fcbox/player/dom'
import FcPop from 'fcbox/pop/pop'
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
Vue.use(FcDomPlayer)
Vue.use(FcPop)

const Index = {
  name: 'Index',
  data () {
    return {
      previewPopParam: {
        show: false,
        maskClose: true
      },
      previewNoticContent: [],
      previewContent: [],
      themeTabValue: 'module', // module -> 模块 page -> 页面
      setContentType: 'page', // page -> 页面 pop -> 弹窗 global -> 全局设置
      checkLink (link) {
        let result
        if (link && /index\/\d+$/.test(link)) {
          result = true
        }
        return result
      }
    }
  },
  computed: mapState({
    setConfig: state => state.setConfig,
    contentConfig: state => state.contentConfig
  }),
  created () {
    this.getTemplateData()
  },
  mounted () {
    this.bodyClickEventInit()
    this.refreshContent()
    // 设置弹窗移动
    new PopDrag({
      eDomId: 'setterPopTitle',
      mDomId: 'setterPop'
    })
  },
  methods: Object.assign({
    preview () {
      let content = this.contentConfig.pages[this.setConfig.setPageId].content
      const previewNoticContent = []
      const previewContent = []
      for (let i in content) {
        if (content[i].templateType == 'noticeBoard') {
          previewNoticContent.push(content[i])
        } else {
          previewContent.push(content[i])
        }
      }
      this.previewNoticContent = previewNoticContent
      this.previewContent = previewContent
      this.previewPopParam.show = true
    },
    checkSave () {
      let hasObj = {}
      let content = this.contentConfig.pages[this.setConfig.setPageId].content
      for (let i in content) {
        if (hasObj[content[i].templateType]) {
          hasObj[content[i].templateType]++
        } else {
          hasObj[content[i].templateType] = 1
        }
      }
      if (hasObj.goods > 1) {
        window.fc.Dialog.show({
          text: '只能配置一个商品模块'
        })
        return false
      }
      if (hasObj.goodsSubtitle > 1) {
        window.fc.Dialog.show({
          text: '只能配置一个商品Tab模块'
        })
        return false
      }
      if (hasObj.goods && hasObj.goodsSubtitle) {
        window.fc.Dialog.show({
          text: '只能配置一个商品模块或者一个商品Tab模块'
        })
        return false
      }
      let hasBadLink
      for (let i in content) {
        if (content[i].templateType == 'goods') {
          for (let g in content[i].templateData) {
            if (!content[i].templateData[g].goodsLink || !this.checkLink(content[i].templateData[g].goodsLink)) {
              hasBadLink = true
            }
          }
        }
        if (content[i].templateType == 'goodsSubtitle') {
          for (let g in content[i].templateData) {
            if (content[i].templateData[g].goods) {
              for (let gs in content[i].templateData[g].goods) {
                if (!content[i].templateData[g].goods[gs].goodsLink || !this.checkLink(content[i].templateData[g].goods[gs].goodsLink)) {
                  hasBadLink = true
                }
              }
            }
          }
        }
      }
      if (hasBadLink) {
        window.fc.Dialog.show({
          text: '所有商品必须设置链接地址'
        })
        return false
      }
      this.save()
    },
    save () {
      if (this.adding) {
        return false
      }
      this.adding = true
      // console.log(JSON.stringify(this.trimObjBlank(this.contentConfig.pages[this.setConfig.setPageId].content)))
      const content = JSON.stringify(this.trimObjBlank(this.contentConfig.pages[this.setConfig.setPageId].content))
      ajax.post({
        url: this.$store.state.config.api.op.addConfigTemplate,
        data: {
          content
        }
      }).then((res) => {
        res = JSON.parse(res)
        this.adding = false
        if (res.success) {
          res.msg = '操作成功'
        }
        if (res.msg) {
          window.fc.Dialog.show({
            text: res.msg
          })
        }
        if (res.success) {
          this.getTemplateData()
        }
      }).catch(() => {
        location.href = '/'
      })
    },
    getTemplateData () {
      ajax.get({
        url: this.$store.state.config.api.op.findConfigTemplate,
        data: {}
      }).then((res) => {
        res = JSON.parse(res)
        if (res.data) {
          this.contentConfig.pages[0].content = JSON.parse(res.data)
          this.refreshContent()
        }
      }).catch(() => {
        location.href = '/'
      })
    },
    closeGoodsPop () {
      this.setConfig.showGoodsPop = false
      this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId].checkedId = this.setConfig.goodsSetParamValue.checkedId
      this.refreshContent()
    },
    hideGoodsPop () {
      this.setConfig.showGoodsPop = false
    },
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
      if (this.setConfig.showGoodsPop) {
        this.setConfig.goodsContentSetterScrollTop = document.getElementById('goodsContentSetter').scrollTop
        this.setConfig.goodsPopKey = Math.random()
        return false
      }
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
      key = this.setConfig.setModuleId == 'empty' ? this.contentConfig.pages[this.setConfig.setPageId].content.length - 1 : key
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
      this.setConfig.setType = 'module'
      this.setConfig.showSetterPop = true
      this.setSetterContent()
    },
    // 主模块列表返回事件
    orderSetterEditContentCallback (key) {
      if (key !== undefined && key != 'move') {
        if (parseInt(key) != this.setConfig.setModuleId) {
          this.setConfig.setModuleId = key
        }
        this.setConfig.setType = 'module'
        this.setConfig.showSetterPop = true
        this.setSetterContent()
      }
    },
    orderSetterDelContentCallback (key) {
      this.contentConfig.pages[this.setConfig.setPageId].content = this.setConfig.mainOrderSetterParam.content
      key = key - 1 > 0 ? key - 1 : 0
      this.setConfig.setModuleId = key
      this.refreshContent()
      this.setSetterContent()
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
    emptyClick (e) {
      if (e.target == e.currentTarget) {
        this.setConfig.setModuleId = 'empty'
        this.closeSetterPop()
        this.refreshContent()
      }
    }
  }, PublicFunc)
}

export default Index
