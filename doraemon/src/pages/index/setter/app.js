/**
 * Created by 001264 on 2019/7/16.
 */
import { mapState } from 'vuex'
import PublicFunc from './public_func'
import ModuleTheme from './module_theme'

const Setter = {
  name: 'Setter',
  data () {
    return {
      randKey: Math.random(),
      setList: []
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
      setList.push({
        title: '文档标题',
        type: 'textarea',
        param: {
          value: bodyContent.title || '',
          placeholder: '请输入文档标题'
        },
        callback: function (param, acType) {
          bodyContent.title = param.value
        }
      })
      // 文档描述
      setList.push({
        title: '文档描述',
        type: 'textarea',
        param: {
          value: bodyContent.description || '',
          placeholder: '请输入文档描述'
        },
        callback: function (param, acType) {
          bodyContent.description = param.value
        }
      })
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
    setPageContentList () {
      let setList = []
      const { setPageId } = this.setConfig || 0
      const { pages } = this.contentConfig
      let pageContent = pages[setPageId]
      // 页面名称
      setList.push({
        title: '页面名称',
        type: 'textarea',
        param: {
          value: pageContent.name || '',
          placeholder: '请输入页面名称'
        },
        callback: function (param, acType) {
          pageContent.name = param.value
        }
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
      setList.push({
        title: '弹窗名称',
        type: 'textarea',
        param: {
          value: popContent.name || '',
          placeholder: '请输入弹窗名称'
        },
        callback: function (param, acType) {
          popContent.name = param.value
        }
      })
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
      let slParam = {
        type: 'sliderGroup',
        title: '背景透明度',
        textParam: {
          param: {
            value: setParam['opacity'] || 100
          },
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['opacity'] = param.value
              this.refreshContent()
              slParam.sliderParam.param.value = param.value
            }
          }.bind(this)
        },
        sliderParam: {
          param: {
            min: 0,
            max: 100,
            value: parseInt(setParam['opacity']) || 100
          },
          callback: function (param, tpye) {
            setParam['opacity'] = param.value
            slParam.textParam.param.value = param.value
            this.refreshContent()
          }.bind(this)
        }
      }
      setList.push(slParam)
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    // 设置模块内容
    setModuleContentList (setModule) {
      let setList = []
      let addEmpty = false
      setList.push(this.getTextareaParam(setModule, {
        title: '模块名称',
        tag: 'name'
      }))
      switch (setModule.tag) {
        case 'images':
          setList.push(Object.assign(this.getDataSourceParam(setModule, 'imagesDatas'), { title: '图文数据源' }))
          if (setModule.dataSourceId) {
            let dataSource = this.contentConfig.dataSource || {}
            let imagesDatas = dataSource.imagesDatas || []
            let setSource
            for (let i in imagesDatas) {
              if (imagesDatas[i].value == setModule.dataSourceId) {
                setSource = imagesDatas[i]
              }
            }
            const refreshImagesContent = (setterContent) => {
              if (!setterContent || !setterContent.length) {
                setSource.data = []
                this.refreshContent()
                return false
              }
              let newImagesContent = []
              for (let i in setterContent) {
                newImagesContent.push({
                  url: setterContent[i].urlParam.param.value,
                  title: setterContent[i].titleParam.value,
                  description: setterContent[i].descriptionParam.value,
                  action: {
                    acType: setterContent[i].acTypeParam.param.value,
                    acUrl: setterContent[i].acUrlParam.param.value,
                    acTarget: setterContent[i].acTargetParam.param.value,
                    acFun: setterContent[i].acFunParam.param.value,
                    pageName: setterContent[i].pagesParam.param.option,
                    pageId: setterContent[i].pagesParam.param.value,
                    popName: setterContent[i].popsParam.param.option,
                    popId: setterContent[i].popsParam.param.value
                  }
                })
              }
              setSource.data = newImagesContent
              this.refreshContent()
            }
            if (setSource) {
              let setSourceData = setSource.data
              let menuEditData = []
              for (let d in setSourceData) {
                menuEditData.push(Object.assign({
                  titleParam: {
                    title: '标题',
                    value: setSourceData[d].title || '',
                    placeholder: '请输入标题',
                    callback: function (param, acType) {
                      if (acType == 'focusout') {
                        setSource.data[d].title = param.value
                        this.refreshContent()
                      }
                    }.bind(this)
                  },
                  descriptionParam: {
                    title: '描述',
                    value: setSourceData[d].description || '',
                    placeholder: '请输入描述',
                    callback: function (param, acType) {
                      if (acType == 'focusout') {
                        setSource.data[d].description = param.value
                        this.refreshContent()
                      }
                    }.bind(this)
                  }
                }, this.getImageSetter(setSourceData[d], 'url', '图片地址'), this.getActionSetterParam(setSourceData[d], () => {
                  refreshImagesContent(imagesContentSetterParam.orderSetterParam.content)
                })))
              }
              let imagesContentSetterParam = {
                title: '设置图文内容',
                type: 'contentSetter',
                module: 'images',
                orderSetterParam: {
                  key: Math.random(),
                  hideAdd: true,
                  scrollId: 'contentSetter',
                  borderStyle: '1px dashed #64B5F6',
                  content: menuEditData,
                  editKey: this.setConfig.setterParam.imagesContentSetterKey,
                  scrollTop: this.setConfig.setterParam.imageContentSetterScrollTop || 0,
                  addContent: function () {
                    setSourceData.unshift({})
                    this.setConfig.setterParam.imagesContentSetterKey = 0
                    this.refreshSetter()
                    this.refreshContent()
                  }.bind(this),
                  orderSetterEditContentCallback: function (selectedKey, target, top) {
                    if (selectedKey !== undefined && selectedKey != 'move') {
                      // refreshImagesContent(imagesContentSetterParam.orderSetterParam.content)
                    }
                  },
                  orderSetterDelContentCallback: function (key) {
                    key = key - 1 > 0 ? key - 1 : 0
                    this.setConfig.setterParam.imagesContentSetterKey = key
                    refreshImagesContent(imagesContentSetterParam.orderSetterParam.content)
                    this.setConfig.setterParam.imageContentSetterScrollTop = imagesContentSetterParam.orderSetterParam.self.scroll.scrollTop
                    this.refreshSetter()
                  }.bind(this),
                  orderSetterMoveCallback: function (key) {
                    this.setConfig.setterParam.imagesContentSetterKey = key
                    refreshImagesContent(imagesContentSetterParam.orderSetterParam.content)
                    this.setConfig.setterParam.imageContentSetterScrollTop = imagesContentSetterParam.orderSetterParam.self.scroll.scrollTop
                    this.refreshSetter()
                  }.bind(this)
                }
              }
              setList.push(imagesContentSetterParam)
            }
          } else {
            addEmpty = true
          }
          break
          // menus
        case 'menus':
          setList.push(Object.assign(this.getDataSourceParam(setModule, 'menusDatas'), { title: '菜单数据源' }))
          if (setModule.dataSourceId) {
            let dataSource = this.contentConfig.dataSource || {}
            let menusDatas = dataSource.menusDatas || []
            let setSource
            for (let i in menusDatas) {
              if (menusDatas[i].value == setModule.dataSourceId) {
                setSource = menusDatas[i]
              }
            }
            const refreshMenusContent = (setterContent) => {
              if (!setterContent || !setterContent.length) {
                setSource.data = []
                this.refreshContent()
                return false
              }
              let newMenusContent = []
              for (let i in setterContent) {
                newMenusContent.push({
                  url: setterContent[i].urlParam.param.value,
                  name: setterContent[i].nameParam.value,
                  checkedId: setterContent[i].checkedId,
                  action: {
                    acType: setterContent[i].acTypeParam.param.value,
                    acUrl: setterContent[i].acUrlParam.param.value,
                    acTarget: setterContent[i].acTargetParam.param.value,
                    acFun: setterContent[i].acFunParam.param.value,
                    pageName: setterContent[i].pagesParam.param.option,
                    pageId: setterContent[i].pagesParam.param.value,
                    popName: setterContent[i].popsParam.param.option,
                    popId: setterContent[i].popsParam.param.value
                  }
                })
              }
              setSource.data = newMenusContent
              this.refreshContent()
            }
            if (setSource) {
              let setSourceData = setSource.data
              let menuEditData = []
              for (let d in setSourceData) {
                menuEditData.push(Object.assign({
                  checkedId: setSourceData[d].checkedId,
                  nameParam: {
                    title: '菜单名称',
                    value: setSourceData[d].name || '',
                    placeholder: '请输入名称',
                    callback: function (param, acType) {
                      if (acType == 'focusout') {
                        setSource.data[d].name = param.value
                        this.refreshContent()
                      }
                    }.bind(this)
                  }
                }, this.getImageSetter(setSourceData[d], 'url', '图片地址'), this.getActionSetterParam(setSourceData[d], () => {
                  refreshMenusContent(menusContentSetterParam.orderSetterParam.content)
                })))
              }
              let menusContentSetterParam = {
                title: '设置菜单内容',
                type: 'contentSetter',
                module: 'menus',
                checkedId: setSource.checkedId || 0,
                changeCheckedId: function (checkedId) {
                  setSource.checkedId = checkedId
                  this.setConfig.setterParam.menuContentSetterScrollTop = menusContentSetterParam.orderSetterParam.self.scroll.scrollTop
                  this.refreshSetter()
                }.bind(this),
                orderSetterParam: {
                  key: Math.random(),
                  hideAdd: true,
                  scrollId: 'contentSetter',
                  borderStyle: '1px dashed #64B5F6',
                  content: menuEditData,
                  editKey: this.setConfig.setterParam.menuContentSetterKey,
                  scrollTop: this.setConfig.setterParam.menuContentSetterScrollTop || 0,
                  addContent: function () {
                    setSourceData.push({
                      checkedId: new Date().getTime()
                    })
                    this.setConfig.setterParam.menuContentSetterKey = setSourceData.length - 1
                    this.refreshSetter()
                    this.refreshContent()
                  }.bind(this),
                  orderSetterEditContentCallback: function (selectedKey, target, top) {
                    if (selectedKey !== undefined && selectedKey != 'move') {
                      // refreshMenusContent(menusContentSetterParam.orderSetterParam.content)
                    }
                  },
                  orderSetterDelContentCallback: function (key) {
                    key = key - 1 > 0 ? key - 1 : 0
                    this.setConfig.setterParam.menuContentSetterKey = key
                    refreshMenusContent(menusContentSetterParam.orderSetterParam.content)
                    this.setConfig.setterParam.menuContentSetterScrollTop = menusContentSetterParam.orderSetterParam.self.scroll.scrollTop
                    this.refreshSetter()
                  }.bind(this),
                  orderSetterMoveCallback: function (key) {
                    this.setConfig.setterParam.menuContentSetterKey = key
                    refreshMenusContent(menusContentSetterParam.orderSetterParam.content)
                    this.setConfig.setterParam.menuContentSetterScrollTop = menusContentSetterParam.orderSetterParam.self.scroll.scrollTop
                    this.refreshSetter()
                  }.bind(this)
                }
              }
              setList.push(menusContentSetterParam)
            }
          } else {
            addEmpty = true
          }
          break
        case 'goods':
          setModule['dataType'] = setModule['dataType'] || 1
          setList.push({
            title: '内容类型',
            type: 'radioTab',
            param: {
              value: setModule['dataType'],
              data: [
                {
                  option: '自定义',
                  value: 1
                },
                {
                  option: '选择商品',
                  value: 2
                },
                {
                  option: '选择商品组',
                  value: 3
                }
              ]
            },
            callback: function (param) {
              setModule['dataType'] = param.value
              this.refreshSetter()
            }.bind(this)
          })
          switch (parseInt(setModule['dataType'])) {
            case 1:
              setList.push(Object.assign(this.getDataSourceParam(setModule, 'goodsDatas'), { title: '商品数据源' }))
              if (setModule.dataSourceId) {
                let dataSource = this.contentConfig.dataSource || {}
                let goodsDatas = dataSource.goodsDatas || []
                let setSource
                for (let i in goodsDatas) {
                  if (goodsDatas[i].value == setModule.dataSourceId) {
                    setSource = goodsDatas[i]
                  }
                }
                const refreshGoodsContent = (setterContent) => {
                  if (!setterContent || !setterContent.length) {
                    setSource.data = []
                    this.refreshContent()
                    return false
                  }
                  let newGoodsContent = []
                  for (let i in setterContent) {
                    newGoodsContent.push({
                      url: setterContent[i].urlParam.param.value,
                      name: setterContent[i].nameParam.value,
                      description: setterContent[i].descriptionParam.value,
                      salePrice: setterContent[i].salePriceParam.value,
                      originPrice: setterContent[i].originPriceParam.value,
                      action: {
                        acType: setterContent[i].acTypeParam.param.value,
                        acUrl: setterContent[i].acUrlParam.param.value,
                        acTarget: setterContent[i].acTargetParam.param.value,
                        acFun: setterContent[i].acFunParam.param.value,
                        pageName: setterContent[i].pagesParam.param.option,
                        pageId: setterContent[i].pagesParam.param.value,
                        popName: setterContent[i].popsParam.param.option,
                        popId: setterContent[i].popsParam.param.value
                      }
                    })
                  }
                  setSource.data = newGoodsContent
                  this.refreshContent()
                }
                if (setSource) {
                  let setSourceData = setSource.data
                  let goodsEditData = []
                  for (let d in setSourceData) {
                    goodsEditData.push(Object.assign({
                      nameParam: {
                        title: '商品名称',
                        value: setSourceData[d].name || '',
                        placeholder: '请输入名称',
                        callback: function (param, acType) {
                          if (acType == 'focusout') {
                            setSource.data[d].name = param.value
                            this.refreshContent()
                          }
                        }.bind(this)
                      },
                      descriptionParam: {
                        title: '商品描述',
                        value: setSourceData[d].description || '',
                        placeholder: '请输入商品描述',
                        callback: function (param, acType) {
                          if (acType == 'focusout') {
                            setSource.data[d].description = param.value
                            this.refreshContent()
                          }
                        }.bind(this)
                      },
                      salePriceParam: {
                        title: '售价',
                        value: setSourceData[d].salePrice || '',
                        placeholder: '请输入商品售价',
                        callback: function (param, acType) {
                          if (acType == 'focusout') {
                            setSource.data[d].salePrice = param.value
                            this.refreshContent()
                          }
                        }.bind(this)
                      },
                      originPriceParam: {
                        title: '原价',
                        value: setSourceData[d].originPrice || '',
                        placeholder: '请输入商品原价',
                        callback: function (param, acType) {
                          if (acType == 'focusout') {
                            setSource.data[d].originPrice = param.value
                            this.refreshContent()
                          }
                        }.bind(this)
                      }
                    }, this.getImageSetter(setSourceData[d], 'url', '图片地址'), this.getActionSetterParam(setSourceData[d], () => {
                      refreshGoodsContent(goodsContentSetterParam.orderSetterParam.content)
                    })))
                  }
                  let goodsContentSetterParam = {
                    title: '设置商品内容',
                    type: 'contentSetter',
                    module: 'goods',
                    orderSetterParam: {
                      key: Math.random(),
                      hideAdd: true,
                      scrollId: 'contentSetter',
                      borderStyle: '1px dashed #64B5F6',
                      content: goodsEditData,
                      editKey: this.setConfig.setterParam.goodsContentSetterKey,
                      scrollTop: this.setConfig.setterParam.goodsContentSetterScrollTop || 0,
                      addContent: function () {
                        setSourceData.push({})
                        this.setConfig.setterParam.goodsContentSetterKey = setSourceData.length - 1
                        this.refreshSetter()
                        this.refreshContent()
                      }.bind(this),
                      orderSetterEditContentCallback: function (selectedKey, target, top) {
                        if (selectedKey !== undefined && selectedKey != 'move') {
                          // refreshGoodsContent(goodsContentSetterParam.orderSetterParam.content)
                        }
                      },
                      orderSetterDelContentCallback: function (key) {
                        key = key - 1 > 0 ? key - 1 : 0
                        this.setConfig.setterParam.goodsContentSetterKey = key
                        refreshGoodsContent(goodsContentSetterParam.orderSetterParam.content)
                        this.setConfig.setterParam.goodsContentSetterScrollTop = goodsContentSetterParam.orderSetterParam.self.scroll.scrollTop
                        this.refreshSetter()
                      }.bind(this),
                      orderSetterMoveCallback: function (key) {
                        this.setConfig.setterParam.goodsContentSetterKey = key
                        refreshGoodsContent(goodsContentSetterParam.orderSetterParam.content)
                        this.setConfig.setterParam.goodsContentSetterScrollTop = goodsContentSetterParam.orderSetterParam.self.scroll.scrollTop
                        this.refreshSetter()
                      }.bind(this)
                    }
                  }
                  setList.push(goodsContentSetterParam)
                }
              } else {
                addEmpty = true
              }
              break
            default:
              addEmpty = true
              break
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
      let themeList = ModuleTheme[setModule.tag]
      // 模块位置设置
      setModule['lockPosition'] = setModule['lockPosition'] || 'normal'
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
      // 初始化属性
      if (!setModule['themeInit']) {
        setModule['themeInit'] = 1
        setModule['theme'] = setModule['theme'] || 1
        this.resetThemeParamsValue(setModule, themeList)
      }
      // 获取模块排版设置
      setList.push(this.getThemeSetter(setModule, themeList))
      // 获取模块内容样式配置
      setList.push(this.getModuleContentStyleParam(setModule, themeList))
      switch (setModule.tag) {
        case 'images':
          // 文字样式设置
          if (setModule['theme'] != 3) {
            setList.push(Object.assign(this.getFontStyleSetterParam(setModule.titleStyle), {
              title: '标题文字样式'
            }))
            setList.push(Object.assign(this.getFontStyleSetterParam(setModule.descriptionStyle), {
              title: '描述文字样式'
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
          // 获取文字字段样式设置
          let textStyleGroup = [
            {
              tag: 'nameStyle',
              title: '名称样式'
            },
            {
              tag: 'descriptionStyle',
              showTag: 'showDescription',
              title: '描述样式',
              showTitle: '是否显示描述'
            },
            {
              tag: 'salePriceStyle',
              showTag: 'showSalePrice',
              title: '售价样式',
              showTitle: '是否显示售价'
            },
            {
              tag: 'originPriceStyle',
              showTag: 'showOriginPrice',
              title: '原价样式',
              showTitle: '是否显示原价'
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
          break
      }
      // 模块高度设置
      setList.push(this.getHeightSetterParam(setModule))
      // 边距设置
      setList.push(this.getMarginPaddingSetterParam(setModule.style, {
        type: 'padding',
        title: '内边距设置'
      }))
      setList.push(this.getMarginPaddingSetterParam(setModule.style, {
        type: 'margin',
        title: '外边距设置'
      }))
      // 背景设置
      setList.push(this.getBackgroundSetterParam(setModule.style))
      // 边框设置
      setList.push(this.getBorderSetterParam(setModule.style))
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
    // element setter
    setElementContentList (setModule) {
      let setList = []
      switch (setModule.tag) {
        case 'image':
          setList.push({
            title: '元素名称',
            type: 'textarea',
            param: {
              value: setModule.name || '',
              placeholder: '请输入元素名称'
            },
            callback: function (param, acType) {
              setModule.name = param.value
            }
          })
          setList.push(this.getImageSetter(setModule, 'url', '图片地址'))
          break
        case 'text':
          setList.push({
            title: '元素名称',
            type: 'textarea',
            param: {
              value: setModule.name || '',
              placeholder: '请输入元素名称'
            },
            callback: function (param, acType) {
              setModule.name = param.value
            }
          })
          setList.push({
            title: '文字内容',
            type: 'textarea',
            param: {
              value: setModule.text || '',
              placeholder: '请输入文字内容'
            },
            callback: function (param, acType) {
              setModule.text = param.value
              this.refreshContent()
            }.bind(this)
          })
          break
      }
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    setElementStyleList (setModule) {
      let defaultWidth = 50
      switch (setModule.tag) {
        case 'text':
          defaultWidth = 200
          break
      }
      let setList = []
      setModule.style = setModule.style || {}
      setModule.textStyle = setModule.textStyle || {}
      const setParam = setModule.style
      setList.push(this.getSizePositionSetterParam(setParam, defaultWidth))
      setList.push({
        type: 'textarea',
        title: '圆角px',
        param: {
          value: setModule['imageRadius'] || '',
          placeholder: '请输入圆角'
        },
        callback: function (param, acType) {
          if (acType == 'focusout') {
            setModule['imageRadius'] = param.value
            this.refreshContent()
          }
        }.bind(this)
      })
      let slParam = {
        type: 'sliderGroup',
        title: '旋转角度',
        textParam: {
          param: {
            value: setModule.style['rotateZ'] || 0
          },
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setModule.style['rotateZ'] = param.value
              this.refreshContent()
              slParam.sliderParam.param.value = param.value
            }
          }.bind(this)
        },
        sliderParam: {
          param: {
            min: 0,
            max: 360,
            value: parseInt(setModule.style['rotateZ']) || 0
          },
          callback: function (param, tpye) {
            setModule.style['rotateZ'] = param.value
            slParam.textParam.param.value = param.value
            this.refreshContent()
          }.bind(this)
        }
      }
      setList.push(slParam)
      let opParam = {
        type: 'sliderGroup',
        title: '透明度',
        textParam: {
          param: {
            value: setModule.style['opacity'] || 100
          },
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setModule.style['opacity'] = param.value
              this.refreshContent()
              opParam.sliderParam.param.value = param.value
            }
          }.bind(this)
        },
        sliderParam: {
          param: {
            min: 0,
            max: 100,
            value: parseInt(setModule.style['opacity']) || 100
          },
          callback: function (param, tpye) {
            setModule.style['opacity'] = param.value
            opParam.textParam.param.value = param.value
            this.refreshContent()
          }.bind(this)
        }
      }
      setList.push(opParam)
      switch (setModule.tag) {
        case 'text':
          setList.push(this.getFontStyleSetterParam(setModule.textStyle))
          break
      }
      setList.push(this.getBackgroundSetterParam(setParam))
      setList.push(this.getBorderSetterParam(setParam))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    setElementActionList (setModule) {
      let setList = []
      setList.push(this.getActionSetterParam(setModule))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
    // setThemeDefaultFun
    setThemeDefaultFun (setModule, themeList, name, defaultValue = '') {
      for (let i in themeList) {
        if (themeList[i].value == setModule['theme'] && themeList[i][name]) {
          setModule[name] = themeList[i][name]
        }
      }
      if (!setModule[name] && defaultValue) {
        setModule[name] = defaultValue
      }
    },
    // getDataSourceParam
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
    getSizePositionSetterParam (setParam, defaultWidth = 50) {
      const Obj = {
        type: 'sizePositionGroup',
        widthParam: {
          title: '元素宽度',
          value: setParam['width'] || defaultWidth,
          placeholder: '请输入宽度px',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['width'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        },
        heightParam: {
          title: '元素高度',
          value: setParam['height'] || '',
          placeholder: '请输入高度px',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['height'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        },
        leftParam: {
          title: '元素左边距',
          value: setParam['left'] || '',
          placeholder: '请输入左边距px',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['left'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        },
        topParam: {
          title: '元素上边距',
          value: setParam['top'] || '',
          placeholder: '请输入上边距px',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['top'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }
      }
      return Obj
    }
  }, PublicFunc)
}

export default Setter
