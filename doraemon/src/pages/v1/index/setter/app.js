/**
 * Created by 001264 on 2019/7/16.
 */
import { mapState } from 'vuex'
import PublicFunc from './public_func'
import ModuleTheme from '../store/config/module_theme_set'
import ElementTheme from '../store/config/element_theme_set'
import pageThemeDatas from '../store/config/page_theme'
import iconDatas from '../store/config/icon_datas'

const Setter = {
  name: 'Setter',
  data () {
    return {
      randKey: Math.random(),
      setList: [],
      pageThemeDatas: pageThemeDatas.datas,
      iconDatas: iconDatas.datas
    }
  },
  props: ['callback'],
  computed: mapState({
    setConfig: state => state.setConfig,
    contentConfig: state => state.contentConfig
  }),
  created () {
    this.initList()
  },
  methods: Object.assign({
    refreshContent () {
      setTimeout(() => {
        this.callback && this.callback()
      })
    },
    refreshSetter (saveSetterScroll) {
      let setterTop
      if (saveSetterScroll && document.getElementById('setterContent') && document.getElementById('setterContent').scrollTop) {
        setterTop = document.getElementById('setterContent').scrollTop
      }
      this.setConfig.setterParam.key = Math.random()
      if (setterTop) {
        setTimeout(() => {
          document.getElementById('setterContent').scrollTop = setterTop
        })
      }
    },
    initList () {
      const { setType, rightTabParam } = this.setConfig
      const setTab = rightTabParam.value
      const { setPageId, setModuleId, setElementId, setPopId } = this.setConfig
      const { pages, pops } = this.contentConfig
      let setModule
      switch (setType) {
        case 'body':
          switch (setTab) {
            case 0: // 内容
              this.setBodyContentList()
              break
            case 1: // 样式
              this.setBodyStyleList()
              break
            case 2: // 事件
              this.setBodyActionList()
              break
          }
          break
        case 'page':
          switch (setTab) {
            case 0: // 内容
              this.setPageContentList()
              break
            case 1: // 样式
              this.setPageStyleList()
              break
            case 2: // 事件
              this.setPageActionList()
              break
          }
          break
        case 'module':
          if (!pages[setPageId] || !pages[setPageId].content || !pages[setPageId].content[setModuleId]) {
            return false
          }
          setModule = pages[setPageId].content[setModuleId]
          switch (setTab) {
            case 0: // 内容
              this.setModuleContentList(setModule)
              break
            case 1: // 样式
              this.setModuleStyleList(setModule)
              break
            case 2: // 事件
              this.setModuleActionList(setModule)
              break
          }
          break
        case 'element':
          if (!pages[setPageId] || !pages[setPageId].content || !pages[setPageId].content[setModuleId] || !pages[setPageId].content[setModuleId].elements || !pages[setPageId].content[setModuleId].elements[setElementId]) {
            return false
          }
          setModule = pages[setPageId].content[setModuleId].elements[setElementId]
          switch (setTab) {
            case 0: // 内容
              this.setElementContentList(setModule)
              break
            case 1: // 样式
              this.setElementStyleList(setModule)
              break
            case 2: // 事件
              this.setElementActionList(setModule)
              break
          }
          break
        case 'popElement':
          if (!pops[setPopId] || !pops[setPopId].elements || !pops[setPopId].elements[setElementId]) {
            return false
          }
          setModule = pops[setPopId].elements[setElementId]
          switch (setTab) {
            case 0: // 内容
              this.setElementContentList(setModule)
              break
            case 1: // 样式
              this.setElementStyleList(setModule)
              break
            case 2: // 事件
              this.setElementActionList(setModule)
              break
          }
          break
        case 'pop':
          if (!pops[setPopId]) {
            return false
          }
          setModule = pops[setPopId]
          switch (setTab) {
            case 0: // 内容
              this.setPopContentList()
              break
            case 1: // 样式
              this.setPopStyleList()
              break
          }
          break
      }
    },
    // body
    setBodyContentList () {
      let setList = []
      let bodyContent = this.contentConfig.body.content
      // 文档标题
      setList.push(this.getTextareaParam(bodyContent, {
        title: '文档标题',
        placeholder: '请输入文档标题',
        tag: 'title',
        static: 1
      }))
      // 文档描述
      setList.push(this.getTextareaParam(bodyContent, {
        title: '文档描述',
        placeholder: '请输入文档描述',
        tag: 'description',
        static: 1
      }))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    setBodyStyleList () {
      const { body } = this.contentConfig
      const setList = []
      const setParam = body.style
      setList.push(this.getBackgroundSetterParam(setParam))
      setList.push(this.getBorderSetterParam(setParam))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    setBodyActionList () {
      let setList = []
      this.setList = setList
    },
    // page
    changePageTheme (param) {
      if (!param) {
        return false
      }
      window.fc.Dialog.show({
        text: '此操作将会重置当前页面内容，确定操作吗？',
        title: '重置页面内容',
        clearText: '取消',
        confirmCallback: () => {
          this.contentConfig.pages[this.setConfig.setPageId] = JSON.parse(param.data)
          let dataSource = this.contentConfig.dataSource
          let themeDataSource = JSON.parse(param.dataSource)
          for (let moduleDatas in themeDataSource) {
            if (dataSource[moduleDatas]) {
              let dataSourceObj = {}
              for (let d in dataSource[moduleDatas]) {
                dataSourceObj[dataSource[moduleDatas][d].value] = true
              }
              for (let t in themeDataSource[moduleDatas]) {
                if (!dataSourceObj[themeDataSource[moduleDatas][t].value]) {
                  dataSource[moduleDatas].push(themeDataSource[moduleDatas][t])
                }
              }
            } else {
              dataSource[moduleDatas] = themeDataSource[moduleDatas]
            }
          }
          this.refreshContent()
          this.refreshSetter()
        }
      })
    },
    setPageContentList () {
      let setList = []
      const { setPageId } = this.setConfig || 0
      const { pages } = this.contentConfig
      let pageContent = pages[setPageId]
      // 页面名称
      setList.push(this.getTextareaParam(pageContent, {
        title: '页面名称',
        placeholder: '请输入页面名称',
        tag: 'name',
        static: 1
      }))
      setList.push(this.getRadioTabParam(pageContent, {
        title: '是否作为Tab页',
        tag: 'isTab',
        defaultValue: 0,
        data: [
          {
            option: '是',
            value: 1
          },
          {
            option: '否',
            value: 0
          }
        ]
      }))
      // 页面风格列表
      setList.push({
        type: 'pageThemeList'
      })
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    setPageStyleList () {
      const setList = []
      const { setPageId } = this.setConfig || 0
      const { pages } = this.contentConfig
      let pageContent = pages[setPageId]
      pageContent.style = pageContent.style || {}
      const setParam = pageContent.style
      setList.push(this.getBackgroundSetterParam(setParam))
      setList.push(this.getBorderSetterParam(setParam))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    setPageActionList () {
      let setList = []
      this.setList = setList
    },
    // pop
    setPopContentList () {
      let setList = []
      const { setPopId } = this.setConfig || 0
      const { pops } = this.contentConfig
      let popContent = pops[setPopId]
      // 弹窗名称
      setList.push(this.getTextareaParam(popContent, {
        title: '弹窗名称',
        placeholder: '请输入弹窗名称',
        tag: 'name',
        static: 1
      }))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    setPopStyleList () {
      let setList = []
      const { setPopId } = this.setConfig || 0
      const { pops } = this.contentConfig
      let popContent = pops[setPopId]
      popContent.style = popContent.style || {}
      let setParam = popContent.style
      setList.push(this.getBackgroundSetterParam(setParam))
      setList.push(this.getSliderParam(setParam, {
        title: '透明度',
        tag: 'opacity'
      }))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    // 模块内容刷新
    refreshModuleContent (setterContent, setSource, setParams) {
      if (!setterContent || !setterContent.length) {
        setSource.data = []
        this.refreshContent()
        return false
      }
      let newModuleContent = []
      for (let i in setterContent) {
        let pushData = {}
        if (setterContent[i].acTypeParam) {
          pushData.action = {
            acType: setterContent[i].acTypeParam.value,
            acUrl: setterContent[i].acUrlParam.param.value,
            acTarget: setterContent[i].acTargetParam.param.value,
            acFun: setterContent[i].acFunParam.param.value,
            pageId: setterContent[i].pagesParam.value,
            popId: setterContent[i].popsParam.value
          }
        }
        for (let s in setParams) {
          switch (setParams[s]) {
            case 'checkedId':
              pushData[setParams[s]] = setterContent[i]['checkedId']
              break
            case 'contentListType':
              pushData[setParams[s]] = setterContent[i]['contentListType']
              break
            default:
              pushData[setParams[s]] = setterContent[i][setParams[s] + 'Param'].param ? setterContent[i][setParams[s] + 'Param'].param.value : setterContent[i][setParams[s] + 'Param'].value
              break
          }
        }
        newModuleContent.push(pushData)
      }
      setSource.data = newModuleContent
      this.refreshContent()
    },
    // 获取内容设置列表设置
    getModuleContentSetterParam (param) {
      let moduleContentSetterParam = {
        title: param.title,
        type: 'contentSetter',
        module: param.tag,
        contentListType: param.setSource.contentListType || 'edit',
        changeContentListType: function (type) {
          param.setSource.contentListType = type
          for (let i in param.setSource.data) {
            param.setSource.data[i].contentListType = type
          }
          this.refreshSetter()
        }.bind(this),
        changeItemContentListType: function (type, key) {
          param.setSource.data[key].contentListType = type
          this.setConfig.setterParam.moduleContentSetterScrollTop = moduleContentSetterParam.orderSetterParam.self.scroll.scrollTop
          this.refreshSetter(true)
        }.bind(this),
        orderSetterParam: {
          key: Math.random(),
          hideAdd: true,
          scrollId: 'contentSetter',
          borderStyle: '1px dashed #64B5F6',
          content: param.moduleEditData,
          editKey: this.setConfig.setterParam.moduleContentSetterKey || this.setConfig.setterParam.moduleContentSetterKey === 0 ? this.setConfig.setterParam.moduleContentSetterKey : 'empty',
          scrollTop: this.setConfig.setterParam.moduleContentSetterScrollTop || 0,
          addContent: function () {
            param.setSource.data.push({})
            this.setConfig.setterParam.moduleContentSetterKey = param.setSource.data.length - 1
            this.setConfig.setterParam.moduleContentSetterScrollTop = moduleContentSetterParam.orderSetterParam.self.scroll.scrollHeight
            this.refreshSetter()
            this.refreshContent()
          }.bind(this),
          orderSetterEditContentCallback: function (selectedKey, target, top) {
            if (selectedKey !== undefined && selectedKey != 'move') {}
          },
          orderSetterDelContentCallback: function (key) {
            key = key - 1 > 0 ? key - 1 : 0
            this.setConfig.setterParam.moduleContentSetterKey = key
            this.refreshModuleContent(moduleContentSetterParam.orderSetterParam.content, param.setSource, param.setParams)
            this.setConfig.setterParam.moduleContentSetterScrollTop = moduleContentSetterParam.orderSetterParam.self.scroll.scrollTop
            this.refreshSetter()
          }.bind(this),
          orderSetterMoveCallback: function (key) {
            this.setConfig.setterParam.moduleContentSetterKey = key
            this.refreshModuleContent(moduleContentSetterParam.orderSetterParam.content, param.setSource, param.setParams)
            this.setConfig.setterParam.moduleContentSetterScrollTop = moduleContentSetterParam.orderSetterParam.self.scroll.scrollTop
            this.refreshSetter()
          }.bind(this)
        }
      }
      if (param.tag == 'menus' || param.tag == 'tab') {
        moduleContentSetterParam.checkedId = param.setSource.checkedId || 0
        moduleContentSetterParam.changeCheckedId = function (checkedId, key) {
          param.setSource.checkedId = checkedId
          this.setConfig.setterParam.moduleContentSetterKey = key
          this.setConfig.setterParam.moduleContentSetterScrollTop = moduleContentSetterParam.orderSetterParam.self.scroll.scrollTop
          this.refreshSetter()
          this.refreshContent()
        }.bind(this)
        moduleContentSetterParam.orderSetterParam.addContent = function () {
          let checkedId = new Date().getTime()
          param.setSource.data.push({
            checkedId
          })
          param.setSource.checkedId = param.setSource.checkedId || checkedId
          this.setConfig.setterParam.moduleContentSetterKey = param.setSource.data.length - 1
          this.setConfig.setterParam.moduleContentSetterScrollTop = moduleContentSetterParam.orderSetterParam.self.scroll.scrollHeight
          this.refreshSetter()
          this.refreshContent()
        }.bind(this)
      }
      return moduleContentSetterParam
    },
    // 设置模块内容
    setModuleContentList (setModule) {
      let setList = []
      let addEmpty = false
      setList.push(this.getTextareaParam(setModule, {
        title: '模块名称',
        tag: 'name'
      }))
      let setSource
      switch (setModule.tag) {
        case 'images':
          setModule['dataType'] = setModule['dataType'] || 0
          setList.push({
            title: '数据类型',
            type: 'radioTab',
            param: {
              value: setModule['dataType'],
              data: [
                {
                  option: '独立数据',
                  value: 0
                },
                {
                  option: '数据源',
                  value: 1
                }
              ]
            },
            callback: function (param) {
              setModule['dataType'] = param.value
              this.refreshSetter()
              this.refreshContent()
            }.bind(this)
          })
          switch (parseInt(setModule['dataType'])) {
            case 0:
              setModule.singleDatas = setModule.singleDatas || { data: [] }
              setSource = setModule.singleDatas
              break
            case 1:
              setList.push(Object.assign(this.getDataSourceParam(setModule, 'imagesDatas'), { title: '图文数据源' }))
              if (setModule.dataSourceId) {
                let dataSource = this.contentConfig.dataSource || {}
                let imagesDatas = dataSource.imagesDatas || []
                for (let i in imagesDatas) {
                  if (imagesDatas[i].value == setModule.dataSourceId) {
                    setSource = imagesDatas[i]
                  }
                }
              } else {
                addEmpty = true
              }
              break
            default:
              addEmpty = true
              break
          }
          if (setSource) {
            let setSourceData = setSource.data
            let moduleEditData = []
            for (let d in setSourceData) {
              moduleEditData.push(Object.assign({
                contentListType: setSource.data[d].contentListType,
                titleParam: this.getTextareaParam(setSource.data[d], {
                  title: '标题',
                  placeholder: '请输入标题',
                  tag: 'title'
                }),
                descriptionParam: this.getTextareaParam(setSource.data[d], {
                  title: '描述',
                  placeholder: '请输入描述',
                  tag: 'description'
                })
              }, this.getImageSetter(setSourceData[d], 'url', '图片地址'), this.getActionSetterParam(setSourceData[d])))
            }
            const setParams = ['url', 'title', 'description', 'contentListType']
            setList.push(this.getModuleContentSetterParam({
              title: '设置图文内容',
              tag: 'images',
              setSource,
              moduleEditData,
              setParams
            }))
          }
          break
        // menus
        case 'menus':
          setModule['dataType'] = setModule['dataType'] || 0
          setList.push({
            title: '数据类型',
            type: 'radioTab',
            param: {
              value: setModule['dataType'],
              data: [
                {
                  option: '独立数据',
                  value: 0
                },
                {
                  option: '数据源',
                  value: 1
                }
              ]
            },
            callback: function (param) {
              setModule['dataType'] = param.value
              this.refreshSetter()
              this.refreshContent()
            }.bind(this)
          })
          switch (parseInt(setModule['dataType'])) {
            case 0:
              setModule.singleDatas = setModule.singleDatas || { data: [] }
              setSource = setModule.singleDatas
              break
            case 1:
              setList.push(Object.assign(this.getDataSourceParam(setModule, 'menusDatas'), { title: '菜单数据源' }))
              if (setModule.dataSourceId) {
                let dataSource = this.contentConfig.dataSource || {}
                let menusDatas = dataSource.menusDatas || []
                for (let i in menusDatas) {
                  if (menusDatas[i].value == setModule.dataSourceId) {
                    setSource = menusDatas[i]
                  }
                }
              } else {
                addEmpty = true
              }
              break
            default:
              addEmpty = true
              break
          }
          if (setSource) {
            let setSourceData = setSource.data
            let moduleEditData = []
            for (let d in setSourceData) {
              moduleEditData.push(Object.assign({
                contentListType: setSource.data[d].contentListType,
                checkedId: setSourceData[d].checkedId,
                nameParam: this.getTextareaParam(setSource.data[d], {
                  title: '菜单名称',
                  placeholder: '请输入名称',
                  tag: 'name'
                })
              }, this.getImageSetter(setSourceData[d], 'url', '图片地址'), this.getActionSetterParam(setSourceData[d])))
            }
            let setParams = ['url', 'name', 'checkedId', 'contentListType']
            setList.push(this.getModuleContentSetterParam({
              title: '设置菜单内容',
              tag: 'menus',
              setSource,
              moduleEditData,
              setParams
            }))
          }
          break
        case 'goods':
          setModule['dataType'] = setModule['dataType'] || 0
          setList.push({
            title: '数据类型',
            type: 'radioTab',
            param: {
              value: setModule['dataType'],
              data: [
                {
                  option: '独立数据',
                  value: 0
                },
                {
                  option: '数据源',
                  value: 1
                }
                // {
                //   option: '选择商品',
                //   value: 2
                // },
                // {
                //   option: '选择商品组',
                //   value: 3
                // }
              ]
            },
            callback: function (param) {
              setModule['dataType'] = param.value
              this.refreshSetter()
              this.refreshContent()
            }.bind(this)
          })
          switch (parseInt(setModule['dataType'])) {
            case 0:
              setModule.singleDatas = setModule.singleDatas || { data: [] }
              setSource = setModule.singleDatas
              break
            case 1:
              setList.push(Object.assign(this.getDataSourceParam(setModule, 'goodsDatas'), { title: '商品数据源' }))
              if (setModule.dataSourceId) {
                let dataSource = this.contentConfig.dataSource || {}
                let goodsDatas = dataSource.goodsDatas || []
                for (let i in goodsDatas) {
                  if (goodsDatas[i].value == setModule.dataSourceId) {
                    setSource = goodsDatas[i]
                  }
                }
              } else {
                addEmpty = true
              }
              break
            default:
              addEmpty = true
              break
          }
          // 数据源配置设置
          if (setSource) {
            let setSourceData = setSource.data
            let moduleEditData = []
            for (let d in setSourceData) {
              moduleEditData.push(Object.assign({
                contentListType: setSource.data[d].contentListType,
                nameParam: this.getTextareaParam(setSource.data[d], {
                  title: '商品名称',
                  placeholder: '请输入名称',
                  tag: 'name'
                }),
                descriptionParam: this.getTextareaParam(setSource.data[d], {
                  title: '商品描述',
                  placeholder: '请输入商品描述',
                  tag: 'description'
                }),
                salePriceParam: this.getTextareaParam(setSource.data[d], {
                  title: '售价',
                  placeholder: '请输入商品售价',
                  tag: 'salePrice'
                }),
                originPriceParam: this.getTextareaParam(setSource.data[d], {
                  title: '原价',
                  placeholder: '请输入商品原价',
                  tag: 'originPrice'
                })
              }, this.getImageSetter(setSourceData[d], 'url', '图片地址'), this.getActionSetterParam(setSourceData[d])))
            }
            let setParams = ['url', 'name', 'description', 'salePrice', 'originPrice', 'contentListType']
            setList.push(this.getModuleContentSetterParam({
              title: '设置商品内容',
              tag: 'goods',
              setSource,
              moduleEditData,
              setParams
            }))
          }
          break
        // tab
        case 'tab':
          setModule.singleDatas = setModule.singleDatas || { data: [] }
          setSource = setModule.singleDatas
          if (setSource) {
            let setSourceData = setSource.data
            let moduleEditData = []
            let pages = this.contentConfig.pages
            let pagesData = []
            let pagesNames = {}
            for (let i in pages) {
              if (pages[i].isTab && pages[i].id) {
                pagesData.push({
                  option: pages[i].name,
                  value: pages[i].id
                })
                pagesNames[pages[i].id] = pages[i].name
              }
            }
            for (let d in setSourceData) {
              moduleEditData.push(Object.assign({
                contentListType: setSource.data[d].contentListType,
                checkedId: setSourceData[d].checkedId,
                nameParam: this.getTextareaParam(setSource.data[d], {
                  title: 'tab名',
                  placeholder: '请输入名称',
                  tag: 'name'
                }),
                tabPageIdParam: this.getSelectorParam(setSource.data[d], {
                  title: '关联页面',
                  tag: 'tabPageId',
                  defaultOption: '请选择',
                  optionObj: pagesNames,
                  data: pagesData
                })
              }))
            }
            let setParams = ['name', 'tabPageId', 'checkedId', 'contentListType']
            setList.push(this.getModuleContentSetterParam({
              title: '设置tab项',
              tag: 'tab',
              setSource,
              moduleEditData,
              setParams
            }))
          }
          break
      }
      if (addEmpty) {
        setList.push({
          type: 'empty'
        })
      }
      this.setList = setList
    },
    // 设置模块样式
    setModuleStyleList (setModule) {
      const setList = []
      let themeList
      if (ModuleTheme[setModule.tag]) {
        themeList = JSON.parse(JSON.stringify(ModuleTheme[setModule.tag]))
      }
      // 模块位置设置
      setModule['lockPosition'] = setModule['lockPosition'] || 'normal'
      if (setModule.tag != 'tab') {
        setList.push(this.getRadioTabParam(setModule, {
          title: '模块位置',
          tag: 'lockPosition',
          data: [
            {
              option: '正常',
              value: 'normal'
            },
            {
              option: '吸顶',
              value: 'top'
            },
            {
              option: '吸底',
              value: 'bottom'
            },
            {
              option: '吸附',
              value: 'lock'
            }
          ]
        }))
      }
      // 初始化属性
      if (!setModule['themeInit']) {
        setModule['themeInit'] = 1
        setModule['theme'] = setModule['theme'] || 1
        this.resetThemeParamsValue(setModule, themeList)
        this.refreshContent()
      }
      // 模块高度设置
      setList.push(this.getHeightSetterParam(setModule))
      // 获取模块排版设置
      // setList.push(this.getThemeSetter(setModule, themeList))
      // 获取模块内容样式配置
      if (this.getModuleContentStyleParam(setModule, themeList).setList) {
        setList.push(this.getModuleContentStyleParam(setModule, themeList))
      }
      switch (setModule.tag) {
        case 'images':
          setList.push(Object.assign(this.getBorderSetterParam(setModule.imageStyle), {
            title: '图片边框设置'
          }))
          setList.push(this.getMarginPaddingSetterParam(setModule.imageStyle, {
            type: 'padding',
            title: '图片间距设置'
          }))
          setList.push(this.getBorderRadiusSetterParam(setModule.imageStyle, {
            title: '图片圆角设置'
          }))
          if (setModule['theme'] != 3) {
            // 文字样式设置
            setList.push(Object.assign(this.getFontStyleSetterParam(setModule.titleStyle), {
              title: '标题文字样式'
            }))
            setList.push(this.getMarginPaddingSetterParam(setModule.titleStyle, {
              type: 'padding',
              title: '标题间距设置'
            }))
            setList.push(Object.assign(this.getFontStyleSetterParam(setModule.descriptionStyle), {
              title: '描述文字样式'
            }))
            setList.push(this.getMarginPaddingSetterParam(setModule.descriptionStyle, {
              type: 'padding',
              title: '描述间距设置'
            }))
            // 列表项样式设置
            setModule.itemStyle = setModule.itemStyle || {}
            setList.push(this.getMarginPaddingSetterParam(setModule.itemStyle, {
              type: 'padding',
              title: '列表项间距设置'
            }))
            setList.push(Object.assign(this.getBorderSetterParam(setModule.itemStyle), {
              title: '列表项边框设置'
            }))
          }
          break
        case 'menus':
          // 设置文字样式 选中样式 选中图标样式
          setList.push(Object.assign(this.getFontStyleSetterParam(setModule.nameStyle), {
            title: '文字样式'
          }))
          setList.push(Object.assign(this.getFontStyleSetterParam(setModule.nameCheckedStyle), {
            title: '选中文字样式'
          }))
          if (setModule['theme'] == 1) {
            setList.push(Object.assign(this.getMenuBarStyleSetterParam(setModule.checkedBarStyle), {
              title: '选中浮标样式'
            }))
          }
          break
        case 'goods':
          setModule.imageStyle = setModule.imageStyle || {}
          // 图片样式设置
          setList.push(Object.assign(this.getBorderSetterParam(setModule.imageStyle), {
            title: '图片边框设置'
          }))
          setList.push(this.getMarginPaddingSetterParam(setModule.imageStyle, {
            type: 'padding',
            title: '图片间距设置'
          }))
          setList.push(this.getBorderRadiusSetterParam(setModule.imageStyle, {
            title: '图片圆角设置'
          }))
          // 获取文字字段样式设置
          let textStyleGroup = [
            {
              tag: 'nameStyle',
              title: '名称样式',
              paddingTitle: '名称间距设置'
            },
            {
              tag: 'descriptionStyle',
              showTag: 'showDescription',
              title: '描述样式',
              showTitle: '是否显示描述',
              paddingTitle: '描述间距设置'
            },
            {
              tag: 'salePriceStyle',
              showTag: 'showSalePrice',
              title: '售价样式',
              showTitle: '是否显示售价',
              paddingTitle: '售价间距设置'
            },
            {
              tag: 'originPriceStyle',
              showTag: 'showOriginPrice',
              title: '原价样式',
              showTitle: '是否显示原价',
              paddingTitle: '原价间距设置'
            }
          ]
          const showData = [
            {
              option: '显示',
              value: 1
            },
            {
              option: '不显示',
              value: 2
            }
          ]
          for (let i in textStyleGroup) {
            const textItem = textStyleGroup[i]
            if (textItem.showTag) {
              setList.push(this.getRadioTabParam(setModule, {
                title: textItem.showTitle,
                tag: textItem.showTag,
                data: showData,
                defaultValue: 1
              }))
            }
            setList.push(Object.assign(this.getFontStyleSetterParam(setModule[textItem.tag]), {
              title: textItem.title
            }))
            if (textItem.paddingTitle) {
              setList.push(this.getMarginPaddingSetterParam(setModule[textItem.tag], {
                type: 'padding',
                title: textItem.paddingTitle
              }))
            }
          }
          // 设置显示原价删除线
          setList.push(this.getRadioTabParam(setModule.originPriceStyle, {
            title: '原价显示删除线',
            tag: 'text-decoration',
            data: [
              {
                option: '不显示',
                value: ''
              },
              {
                option: '显示',
                value: 'line-through'
              }
            ]
          }))
          // 列表项样式设置
          setModule.itemStyle = setModule.itemStyle || {}
          setList.push(this.getMarginPaddingSetterParam(setModule.itemStyle, {
            type: 'padding',
            title: '列表项间距设置'
          }))
          setList.push(Object.assign(this.getBorderSetterParam(setModule.itemStyle), {
            title: '列表项边框设置'
          }))
          setList.push(Object.assign(this.getBackgroundSetterParam(setModule.itemStyle), {
            title: '列表项背景设置'
          }))
          break
      }
      // 模块边距设置
      setList.push(this.getMarginPaddingSetterParam(setModule.style, {
        type: 'padding',
        title: '模块内边距设置'
      }))
      setList.push(this.getMarginPaddingSetterParam(setModule.style, {
        type: 'margin',
        title: '模块外边距设置'
      }))
      // 背景设置
      setList.push(Object.assign(this.getBackgroundSetterParam(setModule.style), {
        title: '模块背景设置'
      }))
      // 边框设置
      setList.push(Object.assign(this.getBorderSetterParam(setModule.style), {
        title: '模块边框设置'
      }))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    // 设置模块事件
    setModuleActionList (setModule) {
      let setList = []
      this.setList = setList
    },
    // 设置元素内容
    setElementContentList (setModule) {
      let setList = []
      setList.push(this.getTextareaParam(setModule, {
        title: '元素名称',
        placeholder: '请输入元素名称',
        tag: 'name',
        static: 1
      }))
      switch (setModule.tag) {
        case 'image':
          setList.push(this.getImageSetter(setModule, 'url', '图片地址'))
          break
        case 'text':
          setList.push(this.getTextareaParam(setModule, {
            richText: true,
            title: '文字内容',
            placeholder: '请输入文字内容',
            tag: 'text'
          }))
          break
        case 'icon':
          setList.push(this.getTextareaParam(setModule, {
            title: 'svg内容',
            placeholder: '请输入svg内容',
            tag: 'svgContent'
          }))
          // 图标列表
          setList.push({
            type: 'iconList'
          })
          break
        case 'search':
          setList.push(this.getRadioTabParam(setModule, {
            title: '搜索内容',
            tag: 'seachContnet',
            defaultValue: setModule['seachContnet'] || 'goods',
            data: [
              {
                option: '商品',
                value: 'goods'
              }
            ]
          }))
          break
      }
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    // 设置元素样式
    setElementStyleList (setModule) {
      let setList = []
      let themeList
      if (ElementTheme[setModule.tag]) {
        themeList = JSON.parse(JSON.stringify(ElementTheme[setModule.tag]))
      }
      // 初始化属性
      if (!setModule['themeInit'] && themeList) {
        setModule['themeInit'] = 1
        setModule['theme'] = setModule['theme'] || 1
        this.resetThemeParamsValue(setModule, themeList)
        this.refreshContent()
      }
      setModule.style = setModule.style || {}
      const setParam = setModule.style
      setList.push(this.getSizePositionSetterParam(setParam))
      setList.push(this.getTextareaParam(setModule, {
        title: '圆角px',
        placeholder: '请输入圆角',
        tag: 'imageRadius'
      }))
      setList.push(this.getSliderParam(setModule.style, {
        title: '旋转角度',
        tag: 'rotateZ',
        max: 360,
        defaultValue: 0
      }))
      setList.push(this.getSliderParam(setModule.style, {
        title: '透明度',
        tag: 'opacity'
      }))
      if (themeList) {
      // 获取元素风格设置
        setList.push(this.getElementThemeSetter(setModule, themeList))
        // 获取元素内容样式配置
        setList.push(Object.assign(this.getModuleContentStyleParam(setModule, themeList), {
          title: '元素内容样式'
        }))
      }
      switch (setModule.tag) {
        case 'text':
          setModule.textStyle = setModule.textStyle || {}
          setList.push(this.getFontStyleSetterParam(setModule.textStyle))
          break
        case 'icon':
          setList.push(this.getTextareaParam(setModule.style, {
            title: '图标颜色',
            placeholder: '请输入颜色',
            tag: 'color',
            defaultValue: '#cdcdcd'
          }))
          break
        case 'search':
          setModule.inputTextStyle = setModule.inputTextStyle || {}
          setList.push(Object.assign(this.getFontStyleSetterParam(setModule.inputTextStyle), {
            title: '输入文字样式'
          }))
          setModule.searchTextStyle = setModule.searchTextStyle || {}
          setList.push(Object.assign(this.getFontStyleSetterParam(setModule.searchTextStyle), {
            title: '按钮文字样式'
          }))
          break
      }
      setList.push(this.getBackgroundSetterParam(setParam))
      // 边距设置
      setList.push(this.getMarginPaddingSetterParam(setParam, {
        type: 'padding',
        title: '内边距设置'
      }))
      setList.push(this.getBorderSetterParam(setParam))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    // 设置元素事件
    setElementActionList (setModule) {
      let setList = []
      setList.push(this.getActionSetterParam(setModule))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    // 切换图标
    changeIcon (param) {
      switch (this.setConfig.setType) {
        case 'pop':
        case 'popElement':
          this.contentConfig.pops[this.setConfig.setPopId].elements[this.setConfig.setElementId].svgContent = param.data
          break
        default:
          this.contentConfig.pages[this.setConfig.setPageId].content[this.setConfig.setModuleId].elements[this.setConfig.setElementId].svgContent = param.data
          break
      }
      this.refreshSetter(true)
      this.refreshContent()
    },
    // 设置模块数据源tab
    getDataSourceParam (setModule, dataKey) {
      let dataSource = this.contentConfig.dataSource || {}
      dataSource[dataKey] = dataSource[dataKey] || []
      let dataSourceParam = {
        title: '数据源',
        type: 'dataSourceGroup',
        param: {
          value: setModule.dataSourceId || '',
          data: dataSource[dataKey],
          callback: function (param) {
            setModule.dataSourceId = param.value
            this.setConfig.setterParam.menuContentSetterKey = 'empty'
            this.refreshSetter()
            this.refreshContent()
          }.bind(this)
        },
        showAdd: false,
        addParam: {
          nameParam: {
            value: '',
            placeholder: '请输入数据源名称'
          },
          saveCallback: function () {
            if (dataSourceParam.addParam.nameParam.value) {
              setModule.dataSourceId = new Date().getTime()
              dataSource[dataKey].push({
                option: dataSourceParam.addParam.nameParam.value,
                value: setModule.dataSourceId,
                data: []
              })
              this.contentConfig.dataSource = dataSource
              this.setConfig.setterParam.menuContentSetterKey = 'empty'
              this.refreshSetter()
              this.refreshContent()
            }
          }.bind(this)
        },
        addCallback () {
          dataSourceParam.showAdd = true
        }
      }
      return dataSourceParam
    },
    // 获取元素尺寸位置配置
    getSizePositionSetterParam (setParam) {
      const Obj = {
        type: 'sizePositionGroup',
        widthParam: this.getTextareaParam(setParam, {
          title: '元素宽度',
          placeholder: '请输入宽度px',
          tag: 'width'
        }),
        heightParam: this.getTextareaParam(setParam, {
          title: '元素高度',
          placeholder: '请输入高度px',
          tag: 'height'
        }),
        leftParam: this.getTextareaParam(setParam, {
          title: '元素左边距',
          placeholder: '请输入左边距px',
          tag: 'left'
        }),
        topParam: this.getTextareaParam(setParam, {
          title: '元素上边距',
          placeholder: '请输入上边距px',
          tag: 'top'
        })
      }
      return Obj
    }
  }, PublicFunc)
}

export default Setter
