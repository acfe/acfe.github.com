/**
 * Created by 001264 on 2019/7/16.
 */
import { mapState } from 'vuex'

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
  methods: {
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
    // module
    setModuleContentList (setModule) {
      let setList = []
      switch (setModule.tag) {
        case 'images':
          setList.push(this.getModuleNameSetterParam(setModule))
          const listOrderSetterKey = 1
          let imagesListEditContent = []
          let imagesListContent = setModule.content
          if (imagesListContent && imagesListContent.length) {
            for (let i in imagesListContent) {
              let contentObj = {
                urlParam: {
                  title: '图片地址',
                  param: {
                    value: imagesListContent[i].url || '',
                    placeholder: '请输入图片地址',
                    callback: function (param, acType) {
                      if (acType == 'focusout') {
                        imagesListContent[i].url = param.value
                        this.refreshContent()
                        this.setConfig.setterParam.imageOrderSetterKey = this.setList[listOrderSetterKey].orderSetterParam.self.editKey
                        this.setConfig.setterParam.imageOrderSetterScrollTop = this.setList[listOrderSetterKey].orderSetterParam.self.scroll.scrollTop
                        contentObj.uploadParam.value = param.value
                      }
                    }.bind(this)
                  }
                },
                titleParam: {
                  title: '标题',
                  param: {
                    value: imagesListContent[i].title || '',
                    placeholder: '请输入标题',
                    callback: function (param, acType) {
                      if (acType == 'focusout') {
                        imagesListContent[i].title = param.value
                        this.refreshContent()
                      }
                    }.bind(this)
                  }
                },
                descriptionParam: {
                  title: '描述',
                  param: {
                    value: imagesListContent[i].description || '',
                    placeholder: '请输入描述',
                    callback: function (param, acType) {
                      if (acType == 'focusout') {
                        imagesListContent[i].description = param.value
                        this.refreshContent()
                      }
                    }.bind(this)
                  }
                },
                linkParam: {
                  title: '链接',
                  param: {
                    value: imagesListContent[i].link || '',
                    placeholder: '请输入链接',
                    callback: function (param, acType) {
                      if (acType == 'focusout') {
                        imagesListContent[i].link = param.value
                        this.refreshContent()
                      }
                    }.bind(this)
                  }
                },
                uploadParam: {
                  value: imagesListContent[i].url || '',
                  del: true,
                  callback: function (type, param) {
                    imagesListContent[i].url = param.value
                    this.refreshContent()
                    this.setConfig.setterParam.imageOrderSetterKey = this.setList[listOrderSetterKey].orderSetterParam.self.editKey
                    this.setConfig.setterParam.imageOrderSetterScrollTop = this.setList[listOrderSetterKey].orderSetterParam.self.scroll.scrollTop
                    contentObj.urlParam.param.value = param.value
                  }.bind(this),
                  delCallback: function (type, param) {
                    imagesListContent[i].url = param.value
                    this.refreshContent()
                    this.setConfig.setterParam.imageOrderSetterKey = this.setList[listOrderSetterKey].orderSetterParam.self.editKey
                    this.setConfig.setterParam.imageOrderSetterScrollTop = this.setList[listOrderSetterKey].orderSetterParam.self.scroll.scrollTop
                    contentObj.urlParam.param.value = param.value
                  }.bind(this)
                }
              }
              imagesListEditContent.push(contentObj)
            }
          }
          const refreshImagesListContent = (setterContent) => {
            if (!setterContent || !setterContent.length) {
              setModule.content = []
              return false
            }
            let newImagesListContent = []
            for (let i in setterContent) {
              newImagesListContent.push({
                url: setterContent[i].urlParam.param.value,
                title: setterContent[i].titleParam.param.value,
                description: setterContent[i].descriptionParam.param.value,
                link: setterContent[i].linkParam.param.value
              })
            }
            setModule.content = newImagesListContent
            this.refreshContent()
          }
          setList.push({
            title: '图文内容',
            type: 'imagesModuleContent',
            orderSetterParam: {
              key: Math.random(),
              hideAdd: true,
              scrollId: 'imageSetterContent',
              borderStyle: '1px dashed #64B5F6',
              content: imagesListEditContent,
              editKey: this.setConfig.setterParam.imageOrderSetterKey,
              scrollTop: this.setConfig.setterParam.imageOrderSetterScrollTop || 0,
              addContent: function () {
                imagesListContent.unshift({})
                this.refreshSetter()
                this.refreshContent()
              }.bind(this),
              orderSetterEditContentCallback: function (selectedKey, target, top) {
                if (selectedKey !== undefined && selectedKey != 'move') {
                  refreshImagesListContent(this.setList[listOrderSetterKey].orderSetterParam.content)
                }
              }.bind(this),
              orderSetterDelContentCallback: function (key) {
                key = key - 1 > 0 ? key - 1 : 0
                refreshImagesListContent(this.setList[listOrderSetterKey].orderSetterParam.content)
                this.setConfig.setterParam.imageOrderSetterKey = key
              }.bind(this),
              orderSetterMoveCallback: function (key) {
                refreshImagesListContent(this.setList[listOrderSetterKey].orderSetterParam.content)
                this.setConfig.setterParam.imageOrderSetterKey = key
              }.bind(this)
            }
          })
          break
      }
      this.setList = setList
    },
    setModuleStyleList (setModule) {
      const setList = []
      let themeList
      // lockPosition
      setList.push(this.getModuleLockPositionParam(setModule))
      switch (setModule.tag) {
        case 'images':
          themeList = [
            {
              option: '单图排版',
              value: 1,
              support: ['h5', 'wx', 'alipay'],
              titleStyle: {
                'font-size': 14,
                'color': '#666666'
              },
              descriptionStyle: {
                'font-size': 12,
                'color': '#cccccc'
              },
              contentPaddingBottom: 10,
              setEnabel: {
                contentPaddingBottom: true
              }
            },
            {
              option: '多列排版',
              value: 2,
              support: ['h5', 'wx', 'alipay'],
              contentPaddingBottom: 10,
              contentPaddingRight: 10,
              columNum: 2,
              setEnabel: {
                contentPaddingBottom: true,
                contentPaddingRight: true,
                columNum: true
              },
              style: {
                'padding-left': 10
              }
            },
            {
              option: '轮播图',
              value: 3,
              support: ['h5', 'wx', 'alipay'],
              loop: 1,
              autoPlayTime: 5000,
              showGuild: 1,
              setEnabel: {
                loop: true,
                autoPlayTime: true,
                showGuild: true
              }
            },
            {
              option: '横向滚动',
              value: 4,
              support: ['h5', 'wx', 'alipay'],
              contentPaddingRight: 10,
              columNum: 3,
              setEnabel: {
                contentPaddingRight: true,
                columNum: true
              },
              style: {
                'padding-left': 10
              }
            }
          ]
          setModule['theme'] = setModule['theme'] || 1
          // theme setter
          setList.push(this.getThemeSetterParam(setModule, themeList))
          // contentStyleSetter
          this.setThemeDefaultFun(setModule, themeList, 'contentPaddingBottom')
          this.setThemeDefaultFun(setModule, themeList, 'contentPaddingRight')
          this.setThemeDefaultFun(setModule, themeList, 'columNum')
          this.setThemeDefaultFun(setModule, themeList, 'loop')
          this.setThemeDefaultFun(setModule, themeList, 'autoPlayTime')
          this.setThemeDefaultFun(setModule, themeList, 'showGuild')
          this.setThemeDefaultFun(setModule, themeList, 'imageRadius')
          setList.push(this.getContentStyleSetterParam(setModule, themeList))
          // titleStyle
          this.setThemeDefaultFun(setModule, themeList, 'titleStyle', {})
          setList.push(Object.assign(this.getFontStyleSetterParam(setModule.titleStyle), {
            title: '标题文字样式'
          }))
          // descriptionStyle
          this.setThemeDefaultFun(setModule, themeList, 'descriptionStyle', {})
          setList.push(Object.assign(this.getFontStyleSetterParam(setModule.descriptionStyle), {
            title: '描述文字样式'
          }))
          break
      }
      // height
      this.setThemeDefaultFun(setModule, themeList, 'heightType')
      this.setThemeDefaultFun(setModule, themeList, 'moduleHeight')
      setList.push(this.getHeightSetterParam(setModule))
      this.setThemeDefaultFun(setModule, themeList, 'style', (setModule.style || {}))
      const setParam = setModule.style
      setList.push(this.getPaddingSetterParam(setParam))
      setList.push(this.getMarginSetterParam(setParam))
      setList.push(this.getBackgroundSetterParam(setParam))
      setList.push(this.getBorderSetterParam(setParam))
      setList.push({
        type: 'empty'
      })
      this.setList = setList
    },
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
      if (!setModule[name]) {
        for (let i in themeList) {
          if (themeList[i].value == setModule['theme'] && themeList[i][name]) {
            setModule[name] = themeList[i][name]
          }
        }
        if (!setModule[name]) {
          setModule[name] = defaultValue
        }
      }
    },
    // get imageSetter
    getImageSetter (setModule, tag, title) {
      let Obj = {
        type: 'image',
        title: title || '图片地址',
        urlParam: {
          value: setModule[tag] || '',
          placeholder: '请输入' + (title || '请输入图片地址'),
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setModule[tag] = param.value
              this.refreshContent()
              Obj.uploadParam.value = param.value
            }
          }.bind(this)
        },
        uploadParam: {
          value: setModule[tag] || '',
          del: true,
          callback: function (type, param) {
            setModule[tag] = param.value
            this.refreshContent()
            Obj.urlParam.value = param.value
          }.bind(this),
          delCallback: function (type, param) {
            setModule[tag] = param.value
            this.refreshContent()
            Obj.urlParam.value = param.value
          }.bind(this)
        }
      }
      return Obj
    },
    // getActionSetterParam
    getActionSetterParam (setModule) {
      setModule.action = setModule.action || {}
      const acTypeData = [
        {
          option: '请选择',
          value: 0
        },
        {
          option: '跳转链接',
          value: 1
        },
        {
          option: '跳转内页',
          value: 2
        },
        {
          option: '打开窗口',
          value: 3
        },
        {
          option: '执行事件',
          value: 4
        },
        {
          option: '关闭弹窗',
          value: 5
        }
      ]
      const acTypeObj = {
        0: '请选择',
        1: '跳转链接',
        2: '跳转内页',
        3: '打开窗口',
        4: '执行事件',
        5: '关闭弹窗'
      }
      let pages = this.contentConfig.pages
      let pops = this.contentConfig.pops
      let pagesData = []
      for (let i in pages) {
        pagesData.push({
          option: pages[i].name,
          value: pages[i].id
        })
      }
      let popsData = []
      for (let i in pops) {
        popsData.push({
          option: pops[i].name,
          value: pops[i].id
        })
      }
      return {
        type: 'actionGroup',
        pagesParam: {
          title: '选择页面',
          param: {
            option: setModule.action['pageName'] || '请选择',
            value: setModule.action['pageId'] || '',
            data: pagesData,
            callback: function (param) {
              setModule.action['pageName'] = param.option
              setModule.action['pageId'] = param.value
            }
          }
        },
        popsParam: {
          title: '选择弹窗',
          param: {
            option: setModule.action['popName'] || '请选择',
            value: setModule.action['popId'] || '',
            data: popsData,
            callback: function (param) {
              setModule.action['popName'] = param.option
              setModule.action['popId'] = param.value
            }
          }
        },
        acTypeParam: {
          title: '事件类型',
          type: 'singleSelector',
          param: {
            option: acTypeObj[setModule.action['acType']] || '请选择',
            value: setModule.action['acType'] || 0,
            data: acTypeData,
            callback: function (param) {
              setModule.action['acType'] = param.value
            }
          }
        },
        acUrlParam: {
          title: '链接地址',
          param: {
            value: setModule.action['acUrl'] || '',
            placeholder: '请输入链接地址',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setModule.action['acUrl'] = param.value
              }
            }
          }
        },
        acTargetParam: {
          title: '打开方式',
          param: {
            value: setModule.action['acTarget'] || '_self',
            data: [
              {
                option: '本窗口',
                value: '_self'
              },
              {
                option: '新窗口',
                value: '_blank'
              }
            ],
            callback: function (param) {
              setModule.action['acTarget'] = param.value
            }
          }
        },
        acFunParam: {
          title: '事件名称',
          param: {
            value: setModule.action['acFun'] || '',
            placeholder: '请输入事件名称',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setModule.action['acFun'] = param.value
              }
            }
          }
        }
      }
    },
    // getModuleNameSetterParam
    getModuleNameSetterParam (setModule) {
      return {
        title: '模块名称',
        type: 'textarea',
        param: {
          value: setModule.name || '',
          placeholder: '请输入模块名称'
        },
        callback: function (param, acType) {
          setModule.name = param.value
        }
      }
    },
    // 获取风格列表
    getThemeSetterParam (setModule, themeList) {
      let Obj = {
        title: '模块排版',
        type: 'themeSelector',
        param: {
          value: setModule['theme'],
          data: themeList
        },
        callback: function (param) {
          setModule['theme'] = param.value
          Obj.param.value = param.value
          this.refreshContent()
          setModule.style = param.style || {}
          setModule.titleStyle = param.titleStyle || {}
          setModule.descriptionStyle = param.descriptionStyle || {}
          setModule.contentPaddingBottom = param.contentPaddingBottom || ''
          setModule.contentPaddingRight = param.contentPaddingRight || ''
          setModule.loop = param.loop || 1
          setModule.autoPlayTime = param.autoPlayTime || 5000
          setModule.showGuild = param.showGuild || 0
          setModule.columNum = param.columNum || 0
          setModule.imageRadius = param.imageRadius || ''
          setModule.moduleHeight = param.moduleHeight || ''
          setModule.heightType = param.heightType || ''
          this.refreshSetter(true)
        }.bind(this)
      }
      return Obj
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
    },
    // 获取内容间距 内容图片圆角设置
    getContentStyleSetterParam (setParam, themeList) {
      const Obj = {
        title: '内容设置',
        type: 'contentStyle',
        imageRadiusParam: {
          value: setParam['imageRadius'] || '',
          placeholder: '请输入图片圆角',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['imageRadius'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }
      }
      let setEnabel
      for (let i in themeList) {
        if (themeList[i].value == setParam['theme'] && themeList[i]['setEnabel']) {
          setEnabel = themeList[i]['setEnabel']
        }
      }
      if (setEnabel && setEnabel['contentPaddingBottom']) {
        Obj.contentPaddingBottomParam = {
          value: setParam['contentPaddingBottom'] || '',
          placeholder: '请输入间距',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['contentPaddingBottom'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }
      }
      if (setEnabel && setEnabel['contentPaddingRight']) {
        Obj.contentPaddingRightParam = {
          value: setParam['contentPaddingRight'] || '',
          placeholder: '请输入间距',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['contentPaddingRight'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }
      }
      if (setEnabel && setEnabel['columNum']) {
        Obj.columNumParam = {
          value: setParam['columNum'] || '',
          placeholder: '每行显示数量',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['columNum'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }
      }
      if (setEnabel && setEnabel['autoPlayTime']) {
        Obj.autoPlayTimeParam = {
          value: setParam['autoPlayTime'] || '',
          placeholder: '请输入毫秒数',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['autoPlayTime'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }
      }
      if (setEnabel && setEnabel['loop']) {
        Obj.loopParam = {
          value: setParam['loop'] || 1,
          data: [
            {
              option: '循环',
              value: 1
            },
            {
              option: '不循环',
              value: 0
            }
          ],
          callback: function (param) {
            setParam['loop'] = param.value
            this.refreshContent()
          }.bind(this)
        }
      }
      if (setEnabel && setEnabel['showGuild']) {
        Obj.showGuildParam = {
          value: setParam['showGuild'] || 1,
          data: [
            {
              option: '显示',
              value: 1
            },
            {
              option: '不显示',
              value: 0
            }
          ],
          callback: function (param) {
            setParam['showGuild'] = param.value
            this.refreshContent()
          }.bind(this)
        }
      }
      return Obj
    },
    // 获取模块高度设置
    getHeightSetterParam (setParam) {
      return {
        title: '模块高度',
        type: 'heightGroup',
        typeParam: {
          value: setParam['heightType'] || 'auto',
          data: [
            {
              option: '自动',
              value: 'auto'
            },
            {
              option: '定高',
              value: 'set'
            },
            {
              option: '一屏',
              value: 'screen'
            }
          ],
          callback: function (param) {
            setParam['heightType'] = param.value
            this.refreshContent()
          }.bind(this)
        },
        overflowParam: {
          value: setParam['overflow'] || '',
          data: [
            {
              option: '滚动',
              value: 'auto'
            },
            {
              option: '不滚动',
              value: ''
            }
          ],
          callback: function (param) {
            setParam['overflow'] = param.value
            this.refreshContent()
          }.bind(this)
        },
        valueParam: {
          value: setParam['moduleHeight'] || '',
          placeholder: '请输入高度',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['moduleHeight'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }

      }
    },
    // 获取模块位置设置
    getModuleLockPositionParam (setParam) {
      return {
        title: '模块位置',
        type: 'radioTab',
        param: {
          value: setParam['lockPosition'] || 'normal',
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
            }
          ]
        },
        callback: function (param) {
          setParam['lockPosition'] = param.value
          this.refreshContent()
        }.bind(this)
      }
    },
    // 获取文本样式设置
    getFontStyleSetterParam (setParam) {
      let fontWeightObj = {
        normal: '正常',
        bold: '粗体',
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900
      }
      let fontWeightData = [
        {
          option: '正常',
          value: 'normal'
        },
        {
          option: '粗体',
          value: 'bold'
        },
        {
          option: '100',
          value: 100
        },
        {
          option: '200',
          value: 200
        },
        {
          option: '300',
          value: 300
        },
        {
          option: '400',
          value: 400
        },
        {
          option: '500',
          value: 500
        },
        {
          option: '600',
          value: 600
        },
        {
          option: '700',
          value: 700
        },
        {
          option: '800',
          value: 800
        },
        {
          option: '900',
          value: 900
        }
      ]
      return {
        title: '文字样式',
        type: 'textStyle',
        sizeParam: {
          value: setParam['font-size'] || '',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['font-size'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        },
        colorParam: {
          value: setParam['color'] || '',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['color'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        },
        weightParam: {
          hideSelectedIcon: true,
          value: setParam['font-weight'] || 'normal',
          option: fontWeightObj[setParam['font-weight']] || '正常',
          data: fontWeightData,
          callback: function (param) {
            setParam['font-weight'] = param.value
            this.refreshContent()
          }.bind(this)
        },
        textAlignParam: {
          value: setParam['text-align'] || 'left',
          data: [
            {
              option: '靠左',
              value: 'left'
            },
            {
              option: '居中',
              value: 'center'
            },
            {
              option: '靠右',
              value: 'right'
            }
          ],
          callback: function (param) {
            setParam['text-align'] = param.value
            this.refreshContent()
          }.bind(this)
        },
        lineHeightParam: {
          value: setParam['line-height'] || '',
          placeholder: '请输入行高px',
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['line-height'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        }
      }
    },
    // 获取外边距配置
    getMarginSetterParam (setParam) {
      return {
        title: '外边距设置',
        type: 'marginGroup',
        top: {
          title: '上',
          param: {
            value: setParam['margin-top'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['margin-top'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        },
        bottom: {
          title: '下',
          param: {
            value: setParam['margin-bottom'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['margin-bottom'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        },
        left: {
          title: '左',
          param: {
            value: setParam['margin-left'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['margin-left'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        },
        right: {
          title: '右',
          param: {
            value: setParam['margin-right'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['margin-right'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        }
      }
    },
    // 获取内边距配置
    getPaddingSetterParam (setParam) {
      return {
        title: '内边距设置',
        type: 'paddingGroup',
        top: {
          title: '上',
          param: {
            value: setParam['padding-top'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['padding-top'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        },
        bottom: {
          title: '下',
          param: {
            value: setParam['padding-bottom'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['padding-bottom'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        },
        left: {
          title: '左',
          param: {
            value: setParam['padding-left'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['padding-left'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        },
        right: {
          title: '右',
          param: {
            value: setParam['padding-right'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['padding-right'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          }
        }
      }
    },
    // 取边框设置配置
    getBorderSetterParam (setParam) {
      const borderStyleData = [
        {
          option: '请选择',
          value: ''
        },
        {
          option: '实线',
          value: 'solid'
        },
        {
          option: '虚线',
          value: 'dashed'
        },
        {
          option: '点',
          value: 'dotted'
        }
      ]
      const borderStyleObj = {
        solid: '实线',
        dashed: '虚线',
        dotted: '点'
      }
      return {
        title: '边框设置',
        type: 'borderGroup',
        top: {
          title: '上',
          sizeParam: {
            value: setParam['border-top-width'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-top-width'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          colorParam: {
            value: setParam['border-top-color'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-top-color'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          styleParam: {
            hideSelectedIcon: true,
            value: setParam['border-top-style'] || '',
            option: borderStyleObj[setParam['border-top-style']] || '请选择',
            data: borderStyleData,
            callback: function (param) {
              setParam['border-top-style'] = param.value
              this.refreshContent()
            }.bind(this)
          }
        },
        bottom: {
          title: '下',
          sizeParam: {
            value: setParam['border-bottom-width'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-bottom-width'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          colorParam: {
            value: setParam['border-bottom-color'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-bottom-color'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          styleParam: {
            hideSelectedIcon: true,
            value: setParam['border-bottom-style'] || '',
            option: borderStyleObj[setParam['border-bottom-style']] || '请选择',
            data: borderStyleData,
            callback: function (param) {
              setParam['border-bottom-style'] = param.value
              this.refreshContent()
            }.bind(this)
          }
        },
        left: {
          title: '左',
          sizeParam: {
            value: setParam['border-left-width'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-left-width'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          colorParam: {
            value: setParam['border-left-color'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-left-color'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          styleParam: {
            hideSelectedIcon: true,
            value: setParam['border-left-style'] || '',
            option: borderStyleObj[setParam['border-left-style']] || '请选择',
            data: borderStyleData,
            callback: function (param) {
              setParam['border-left-style'] = param.value
              this.refreshContent()
            }.bind(this)
          }
        },
        right: {
          title: '右',
          sizeParam: {
            value: setParam['border-right-width'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-right-width'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          colorParam: {
            value: setParam['border-right-color'] || '',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['border-right-color'] = param.value
                this.refreshContent()
              }
            }.bind(this)
          },
          styleParam: {
            hideSelectedIcon: true,
            value: setParam['border-right-style'] || '',
            option: borderStyleObj[setParam['border-right-style']] || '请选择',
            data: borderStyleData,
            callback: function (param) {
              setParam['border-right-style'] = param.value
              this.refreshContent()
            }.bind(this)
          }
        }
      }
    },
    // 取背景设置配置
    getBackgroundSetterParam (setParam) {
      let Obj = {
        title: '背景设置',
        type: 'backgroundGroup',
        backgroundColorParam: {
          title: '背景颜色',
          param: {
            value: setParam['background-color'] || '',
            placeholder: '请输入背景颜色'
          },
          callback: function (param, acType) {
            if (acType == 'focusout') {
              setParam['background-color'] = param.value
              this.refreshContent()
            }
          }.bind(this)
        },
        backgroundImageParam: {
          title: '背景图地址',
          urlParam: {
            value: setParam['background-image'] || '',
            placeholder: '请输入图片地址',
            callback: function (param, acType) {
              if (acType == 'focusout') {
                setParam['background-image'] = param.value
                this.refreshContent()
                Obj.backgroundImageParam.uploadParam.value = param.value
              }
            }.bind(this)
          },
          uploadParam: {
            value: setParam['background-image'] || '',
            del: true,
            callback: function (type, param) {
              setParam['background-image'] = param.value
              this.refreshContent()
              Obj.backgroundImageParam.urlParam.value = param.value
            }.bind(this),
            delCallback: function (type, param) {
              setParam['background-image'] = param.value
              this.refreshContent()
              Obj.backgroundImageParam.urlParam.value = param.value
            }.bind(this)
          }
        },
        backgroundPositionParam: {
          title: '背景位置',
          param: {
            value: setParam['background-position'] || 'top',
            data: [
              {
                option: '居中',
                value: 'center'
              },
              {
                option: '顶部',
                value: 'top'
              },
              {
                option: '底部',
                value: 'bottom'
              }
            ]
          },
          callback: function (param) {
            setParam['background-position'] = param.value
            this.refreshContent()
          }.bind(this)
        },
        backgroundRepeatParam: {
          title: '背景重复',
          param: {
            value: setParam['background-repeat'] || 'repeat',
            data: [
              {
                option: '不重复',
                value: 'no-repeat'
              },
              {
                option: '重复',
                value: 'repeat'
              },
              {
                option: '横向重复',
                value: 'repeat-x'
              },
              {
                option: '纵向重复',
                value: 'repeat-y'
              }
            ]
          },
          callback: function (param) {
            setParam['background-repeat'] = param.value
            this.refreshContent()
          }.bind(this)
        }
      }
      return Obj
    }
  }
}

export default Setter
