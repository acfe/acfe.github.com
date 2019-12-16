import PublicFunc from './public_func'

const getTextParam = (tag, setterParam, setterParamValue, that) => {
  return {
    param: {
      value: setterParamValue[tag] || (setterParam.defaultValue || '')
    },
    callback: function (acParam, acType) {
      if (acType == 'focusout') {
        setterParamValue[tag] = acParam.value || (setterParam.defaultValue || '')
        if (!setterParam.static) {
          that.refreshContent()
        }
        setterParam.callback && setterParam.callback(acParam)
      }
    }
  }
}

const getSelectorParam = (param, setterParam, setterParamValue, that) => {
  let Obj = {
    title: setterParam.title,
    param: {
      hideSelectedIcon: true,
      value: setterParamValue[param.tag] || (setterParam.defaultValue || ''),
      option: param.optionObj[setterParamValue[param.tag]] || (setterParam.defaultOption || '请选择'),
      data: param.data
    },
    callback: function (acParam) {
      setterParamValue[param.tag] = acParam.value
      that.refreshContent()
      param.callback && param.callback(acParam)
    }
  }
  return Obj
}

const ParamFunc = {
  // inputGroup textareaGroup editorGroup
  getInputGroupParam (setterParam, setterParamValue) {
    this.setParamDefaultValue(setterParam, setterParamValue)
    const Obj = {
      title: setterParam.title,
      type: setterParam.type,
      param: Object.assign({}, setterParam.param, {
        value: setterParamValue[setterParam.tag]
      }),
      callback: function (acParam, acType) {
        if (acType == 'focusout') {
          setterParamValue[setterParam.tag] = acParam.value || setterParam.defaultValue
          if (!setterParam.static) {
            this.refreshContent()
          }
          setterParam.callback && setterParam.callback(acParam)
        }
      }.bind(this)
    }
    return Obj
  },
  // colorGroup
  getColorGroupParam (setterParam, setterParamValue) {
    this.setParamDefaultValue(setterParam, setterParamValue)
    const Obj = {
      title: setterParam.title,
      type: setterParam.type,
      param: Object.assign({}, setterParam.param, {
        value: setterParamValue[setterParam.tag]
      }),
      callback: function (acParam) {
        setterParamValue[setterParam.tag] = acParam || setterParam.defaultValue
        if (!setterParam.static) {
          this.refreshContent()
        }
      }.bind(this)
    }
    return Obj
  },
  // radioTabGroup
  getRadioTabGroupParam (setterParam, setterParamValue) {
    this.setParamDefaultValue(setterParam, setterParamValue)
    let Obj = {
      title: setterParam.title,
      type: setterParam.type,
      param: {
        value: setterParamValue[setterParam.tag],
        data: setterParam.data
      },
      callback: function (acParam) {
        setterParamValue[setterParam.tag] = acParam.value || setterParam.defaultValue
        this.refreshContent()
        setterParam.callback && setterParam.callback(setterParamValue)
      }.bind(this)
    }
    return Obj
  },
  // selectorGroup
  getSelectorGroupParam (setterParam, setterParamValue) {
    if (setterParam.dataSource == 'tabPage') {
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
      setterParam.optionObj = pagesNames
      setterParam.data = pagesData
    }
    this.setParamDefaultValue(setterParam, setterParamValue)
    let Obj = {
      title: setterParam.title,
      type: setterParam.type,
      param: {
        hideSelectedIcon: true,
        value: setterParamValue[setterParam.tag] || setterParam.defaultValue,
        option: setterParam.optionObj[setterParamValue[setterParam.tag]] || setterParam.defaultOption,
        data: setterParam.data
      },
      callback: function (acParam) {
        setterParamValue[setterParam.tag] = acParam.value || setterParam.defaultValue
        this.refreshContent()
        setterParam.callback && setterParam.callback(acParam)
      }.bind(this)
    }
    return Obj
  },
  // 获取滑块组件设置
  getSliderGroupParam (setterParam, setterParamValue) {
    let defaultValue = (setterParam.defaultValue || setterParam.defaultValue === 0 ? setterParam.defaultValue : 100)
    let slParam = {
      type: setterParam.type,
      title: setterParam.title,
      textParam: {
        param: {
          value: setterParamValue[setterParam.tag] || defaultValue
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue[setterParam.tag] = acParam.value
            slParam.sliderParam.param.value = acParam.value
            this.refreshContent()
          }
        }.bind(this)
      },
      sliderParam: {
        param: {
          min: setterParam.min || 0,
          max: setterParam.max || 100,
          value: parseInt(setterParamValue[setterParam.tag]) || defaultValue
        },
        callback: function (acParam) {
          setterParamValue[setterParam.tag] = acParam.value
          slParam.textParam.param.value = acParam.value
          this.refreshContent()
        }.bind(this)
      }
    }
    return slParam
  },
  // fitImageGroup
  getFitImageGroupParam (setterParam, setterParamValue) {
    setterParamValue.imageStyle = setterParamValue.imageStyle || {}
    let alignData = [
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
    ]
    let Obj = {
      type: setterParam.type,
      hideHeight: setterParam.hideHeight,
      heightParam: {
        title: '高度(px)',
        param: {
          placeholder: '请输入高度',
          value: setterParamValue.imageStyle['height'] || ''
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue.imageStyle['height'] = acParam.value || ''
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      fitTypeParam: {
        title: '适配方式',
        param: {
          value: setterParamValue.imageStyle['fitType'] || 3,
          data: [
            {
              option: '适配高度',
              value: 2
            },
            {
              option: '自适应',
              value: 3
            },
            {
              option: '拉伸',
              value: 4
            }
          ]
        },
        callback: function (acParam) {
          setterParamValue.imageStyle['fitType'] = acParam.value || 3
          this.refreshContent()
          setterParam.callback && setterParam.callback(acParam)
        }.bind(this)
      },
      alignParam: {
        title: '对齐',
        param: {
          value: setterParamValue.imageStyle['align'] || 'center',
          data: alignData
        },
        callback: function (acParam) {
          setterParamValue.imageStyle['align'] = acParam.value || 'center'
          this.refreshContent()
          setterParam.callback && setterParam.callback(acParam)
        }.bind(this)
      },
      vAlignParam: {
        title: '垂直对齐',
        param: {
          value: setterParamValue.imageStyle['vAlign'] || 'center',
          data: [
            {
              option: '顶部',
              value: 'top'
            },
            {
              option: '居中',
              value: 'center'
            },
            {
              option: '底部',
              value: 'bottom'
            }
          ]
        },
        callback: function (acParam) {
          setterParamValue.imageStyle['vAlign'] = acParam.value || 'center'
          this.refreshContent()
          setterParam.callback && setterParam.callback(acParam)
        }.bind(this)
      },
      hAlignParam: {
        title: '水平对齐',
        param: {
          value: setterParamValue.imageStyle['hAlign'] || 'center',
          data: alignData
        },
        callback: function (acParam) {
          setterParamValue.imageStyle['hAlign'] = acParam.value || 'center'
          this.refreshContent()
          setterParam.callback && setterParam.callback(acParam)
        }.bind(this)
      }
    }
    return Obj
  },
  // actionGroup
  getActionGroupParam (setterParam, setterParamValue) {
    setterParamValue.action = setterParamValue.action || {}
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
        option: '关闭弹窗',
        value: 5
      },
      {
        option: 'tab切换',
        value: 7
      },
      // {
      //   option: '返回顶部',
      //   value: 6
      // },
      {
        option: '执行事件',
        value: 4
      },
      {
        option: '操作模块',
        value: 8
      }
    ]
    const acTypeObj = {
      0: '请选择',
      1: '跳转链接',
      2: '跳转内页',
      3: '打开窗口',
      4: '执行事件',
      5: '关闭弹窗',
      6: '返回顶部',
      7: 'tab切换',
      8: '操作模块'
    }
    let pages = this.contentConfig.pages
    let pops = this.contentConfig.pops
    let pagesData = []
    let pagesNames = {}
    for (let i in pages) {
      if (!pages[i].isTab) {
        pagesData.push({
          option: pages[i].name,
          value: pages[i].id
        })
        pagesNames[pages[i].id] = pages[i].name
      }
    }
    let popsData = []
    let popsNames = {}
    for (let i in pops) {
      popsData.push({
        option: pops[i].name,
        value: pops[i].id
      })
      popsNames[pops[i].id] = pops[i].name
    }
    let modulePageContent = pages[this.setConfig.setPageId].content
    const moudleData = [{
      option: '请选择',
      value: 0
    }]
    const moudleDataObj = {}
    if (modulePageContent && modulePageContent.length) {
      for (let i in modulePageContent) {
        moudleData.push({
          option: modulePageContent[i].name,
          value: modulePageContent[i].id
        })
        moudleDataObj[modulePageContent[i].id] = modulePageContent[i].name
      }
    }
    // tabs
    const getTabData = () => {
      let tabsData = []
      let tabNames = {}
      let tabContent = []
      let showPageContent
      for (let p in this.contentConfig.pages) {
        showPageContent = this.contentConfig.pages[p].content
        for (let i in showPageContent) {
          if (showPageContent[i].tag == 'tab') {
            tabsData.push({
              option: showPageContent[i].name,
              value: showPageContent[i].id
            })
            tabNames[showPageContent[i].id] = showPageContent[i].name
          }
        }
        let tabId = setterParamValue.action.tabId
        if (tabsData.length && !tabId) {
          tabId = tabsData[0].value
          setterParamValue.action.tabId = tabId
        }
        for (let i in showPageContent) {
          if (showPageContent[i].tag == 'tab' && showPageContent[i].id == tabId && showPageContent[i].singleDatas) {
            tabContent = showPageContent[i].singleDatas.data
          }
        }
      }
      let tabItemData = [
        {
          option: '下一页',
          value: 'next'
        },
        {
          option: '上一页',
          value: 'pre'
        }
      ]
      let tabItemNames = {
        'pre': '上一页',
        'next': '下一页'
      }
      if (tabContent && tabContent.length) {
        for (let i in tabContent) {
          tabItemData.push({
            option: tabContent[i].name || '第' + (parseInt(i) + 1) + '项',
            value: tabContent[i].checkedId
          })
          tabItemNames[tabContent[i].checkedId] = tabContent[i].name || '第' + (parseInt(i) + 1) + '项'
        }
      }
      return {
        tabNames,
        tabsData,
        tabItemData,
        tabItemNames
      }
    }
    let tabData = getTabData()
    let Obj = {
      type: setterParam.type,
      pagesParam: getSelectorParam({
        tag: 'pageId',
        defaultOption: '请选择',
        optionObj: pagesNames,
        data: pagesData
      }, Object.assign({}, setterParam, {
        title: '选择页面'
      }), setterParamValue.action, this),
      popsParam: getSelectorParam({
        tag: 'popId',
        defaultOption: '请选择',
        optionObj: popsNames,
        data: popsData
      }, Object.assign({}, setterParam, {
        title: '选择弹窗'
      }), setterParamValue.action, this),
      acTypeParam: getSelectorParam({
        tag: 'acType',
        defaultOption: '请选择',
        optionObj: acTypeObj,
        data: acTypeData
      }, Object.assign({}, setterParam, {
        title: setterParam.acTitle || '点击触发'
      }), setterParamValue.action, this),
      acUrlParam: {
        title: '链接地址',
        param: {
          placeholder: '请输入链接地址',
          value: setterParamValue.action['acUrl'] || ''
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue.action['acUrl'] = acParam.value || ''
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      moduleAcParam: {
        title: '操作模块',
        param: {
          value: setterParamValue.action['moduleAc'] || 'goto',
          data: [
            {
              option: '跳转到',
              value: 'goto'
            },
            {
              option: '隐藏',
              value: 'hide'
            },
            {
              option: '显示',
              value: 'show'
            },
            {
              option: '显隐',
              value: 'sh'
            }
          ]
        },
        callback: function (acParam) {
          setterParamValue.action['moduleAc'] = acParam.value || 'goto'
          this.refreshContent()
        }.bind(this)
      },
      moduleIdParam: getSelectorParam({
        tag: 'moduleId',
        defaultOption: '请选择',
        optionObj: moudleDataObj,
        data: moudleData
      }, Object.assign({}, setterParam, {
        title: '选择模块'
      }), setterParamValue.action, this),
      acTargetParam: {
        title: '打开方式',
        param: {
          value: setterParamValue.action['acTarget'] || '_self',
          data: [
            {
              option: '本窗口',
              value: '_self'
            },
            {
              option: '新窗口',
              value: '_blank'
            }
          ]
        },
        callback: function (acParam) {
          setterParamValue.action['acTarget'] = acParam.value || '_self'
          this.refreshContent()
        }.bind(this)
      },
      acFunParam: {
        title: '事件名称',
        param: {
          placeholder: '请输入事件名称',
          value: setterParamValue.action['acFun'] || ''
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue.action['acFun'] = acParam.value || ''
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      fioParam: {
        title: '埋点标识',
        param: {
          placeholder: '请输入埋点标识',
          value: setterParamValue.action['fcEvent'] || ''
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue.action['fcEvent'] = acParam.value || ''
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      tabParam: getSelectorParam({
        tag: 'tabId',
        defaultOption: '请选择tab',
        optionObj: tabData.tabNames,
        data: tabData.tabsData,
        callback: () => {
          let newTabData = getTabData()
          Obj.tabItemParam = getSelectorParam({
            tag: 'tabItemId',
            defaultOption: '请选择tab项',
            optionObj: newTabData.tabItemNames,
            data: newTabData.tabItemData
          }, Object.assign({}, setterParam, {
            title: '选择tab项'
          }), setterParamValue.action, this)
        }
      }, Object.assign({}, setterParam, {
        title: '选择tab'
      }), setterParamValue.action, this)
    }
    if (tabData.tabItemData.length) {
      Obj.tabItemParam = getSelectorParam({
        tag: 'tabItemId',
        defaultOption: '请选择tab项',
        optionObj: tabData.tabItemNames,
        data: tabData.tabItemData
      }, Object.assign({}, setterParam, {
        title: '选择tab项'
      }), setterParamValue.action, this)
    }
    return Obj
  },
  // setGroup
  getSetGroupParam (setterParam) {
    let Obj = {
      title: setterParam.title,
      type: setterParam.type,
      isSub: setterParam.isSub,
      open: setterParam.open,
      setList: setterParam.setList,
      setOpen: function () {
        Obj.open = !Obj.open
        setterParam.open = Obj.open
      }
    }
    return Obj
  },
  // paddingGroup
  getPaddingGroupParam (setterParam, setterParamValue) {
    let Obj = {
      type: setterParam.type
    }
    let setParams = ['padding-left', 'padding-right', 'padding-top', 'padding-bottom']
    for (let i in setParams) {
      Obj[setParams[i]] = getTextParam(setParams[i], setterParam, setterParamValue, this)
    }
    return Obj
  },
  // radiusGroup
  getRadiusGroupParam (setterParam, setterParamValue) {
    let Obj = {
      type: setterParam.type
    }
    let setParams = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius']
    for (let i in setParams) {
      Obj[setParams[i]] = getTextParam(setParams[i], setterParam, setterParamValue, this)
    }
    return Obj
  },
  // borderGroup
  getBorderGroupParam (setterParam, setterParamValue) {
    let Obj = {
      type: setterParam.type
    }
    let setGroup = [
      {
        title: '上',
        key: 'top'
      },
      {
        title: '下',
        key: 'bottom'
      },
      {
        title: '左',
        key: 'left'
      },
      {
        title: '右',
        key: 'right'
      }
    ]
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
      },
      {
        option: '双线',
        value: 'double'
      }
    ]
    const borderStyleObj = {
      solid: '实线',
      dashed: '虚线',
      dotted: '点',
      double: '双线'
    }
    for (let i in setGroup) {
      Obj[setGroup[i].key] = {
        title: setGroup[i].title,
        sizeParam: getTextParam('border-' + setGroup[i].key + '-width', setterParam, setterParamValue, this),
        // colorParam: getTextParam('border-' + setGroup[i].key + '-color', setterParam, setterParamValue, this),
        colorParam: {
          param: {
            value: setterParamValue['border-' + setGroup[i].key + '-color']
          },
          callback: function (acParam) {
            setterParamValue['border-' + setGroup[i].key + '-color'] = acParam || ''
            if (!setterParam.static) {
              this.refreshContent()
            }
          }.bind(this)
        },
        styleParam: getSelectorParam({
          tag: 'border-' + setGroup[i].key + '-style',
          data: borderStyleData,
          optionObj: borderStyleObj
        }, setterParam, setterParamValue, this)
      }
    }
    return Obj
  },
  // imageGroup
  getHeightGroupParam (setterParam, setterParamValue) {
    const Obj = {
      title: setterParam.title,
      type: setterParam.type,
      heightTypeParam: {
        title: '模块高度',
        param: {
          value: setterParamValue['heightType'] || 'auto',
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
          ]
        },
        callback: function (acParam) {
          setterParamValue['heightType'] = acParam.value || 'auto'
          this.refreshContent()
          setterParam.callback && setterParam.callback(acParam)
        }.bind(this)
      },
      heightParam: {
        title: '模块高度(px)',
        param: {
          value: setterParamValue['moduleHeight'] || '',
          placeholder: '请输入模块高度'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue['moduleHeight'] = acParam.value || ''
            if (!setterParam.static) {
              this.refreshContent()
            }
            setterParam.callback && setterParam.callback(acParam)
          }
        }.bind(this)
      },
      overflowParam: {
        title: '模块内容溢出时',
        param: {
          value: setterParamValue.moduleStyle['overflow'] || '',
          data: [
            {
              option: '不滚动',
              value: ''
            },
            {
              option: '滚动',
              value: 'auto'
            }
          ]
        },
        callback: function (acParam) {
          setterParamValue.moduleStyle['overflow'] = acParam.value || ''
          this.refreshContent()
          setterParam.callback && setterParam.callback(acParam)
        }.bind(this)
      }
    }
    return Obj
  },
  // imageGroup
  getImageGroupParam (setterParam, setterParamValue) {
    let Obj = {
      type: setterParam.type,
      title: setterParam.title,
      showTitle: setterParam.showTitle,
      urlParam: {
        title: setterParam.title,
        param: {
          value: setterParamValue[setterParam.tag] || (setterParam.defaultValue || ''),
          placeholder: setterParam.placeholder || '请输入图片地址'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue[setterParam.tag] = acParam.value
            if (!setterParam.static) {
              this.refreshContent()
            }
            Obj.uploadParam.value = acParam.value
          }
        }.bind(this)
      },
      uploadParam: {
        value: setterParamValue[setterParam.tag] || '',
        del: true,
        callback: function (type, acParam) {
          setterParamValue[setterParam.tag] = acParam.value
          Obj.urlParam.param.value = acParam.value
          this.refreshContent()
        }.bind(this),
        delCallback: function (type, acParam) {
          setterParamValue[setterParam.tag] = acParam.value
          Obj.urlParam.param.value = acParam.value
          this.refreshContent()
        }.bind(this)
      }
    }
    return Obj
  },
  // animationGroup
  getAnimationGroupParam (setterParam, setterParamValue) {
    setterParamValue['tweenType'] = setterParamValue['tweenType'] || 'Cubic'
    setterParamValue['tweenAc'] = setterParamValue['tweenAc'] || 'easeOut'
    setterParamValue['repeat'] = setterParamValue['repeat'] || 1
    setterParamValue['theme'] = setterParamValue['theme'] || 1
    setterParamValue['tEnd'] = setterParamValue['tEnd'] || 48
    let Obj = {
      type: setterParam.type,
      themeTypeParam: {
        title: '动画类型',
        param: {
          value: setterParamValue['themeType'] || 'in',
          data: [
            {
              option: '进入',
              value: 'in'
            },
            {
              option: '退出',
              value: 'out'
            }
          ]
        },
        callback: function (acParam) {
          setterParamValue['themeType'] = acParam.value || ''
        }
      },
      themeParam: {
        value: setterParamValue['theme'] || 1,
        data: [
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/skk14sjn23.png',
            title: '飞入',
            theme: 1,
            moveDistance: 100
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/ytfuaaa0wb.png',
            title: '飞出',
            theme: 1001,
            moveDistance: 100
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/ql1u8yfloom.png',
            title: '淡入',
            theme: 2,
            tEnd: 96
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/n14ax27iq8.png',
            title: '淡出',
            theme: 1002,
            tEnd: 96
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/lvsly8qp5a.png',
            title: '翻转',
            theme: 3,
            deg: 360
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/ijru3mdn2ys.png',
            title: '翻入',
            theme: 4,
            deg: 360,
            moveDistance: 100
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/22jmysmfw41.png',
            title: '翻出',
            theme: 1004,
            deg: 360,
            moveDistance: 100
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/yekswts8y7q.png',
            title: '旋转',
            theme: 5,
            deg: 360
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/6j1f23y7fxo.png',
            title: '旋入',
            theme: 6,
            deg: 360,
            moveDistance: 100
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/ar742yiztp.png',
            title: '旋出',
            theme: 1006,
            deg: 360,
            moveDistance: 100
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/sl9vd7nlhpf.png',
            title: '放大',
            theme: 7
          },
          {
            url: '//consumerapp-1251779293.image.myqcloud.com/discovery/201911/xwpwl2ztka.png',
            title: '缩小',
            theme: 1007
          }
        ],
        callback: function (item) {
          setterParamValue['title'] = item.title || ''
          Obj.themeParam.value = setterParamValue['theme'] = item.theme || 1
          Obj.repeatParam.param.value = setterParamValue['repeat'] = item.repeat || 1
          Obj.directionParam.param.value = setterParamValue['direction'] = item.direction || 1
          Obj.delayParam.param.value = setterParamValue['delay'] = item.delay || ''
          Obj.moveDistanceParam.param.value = setterParamValue['moveDistance'] = item.moveDistance || ''
          Obj.tEndParam.param.value = setterParamValue['tEnd'] = item.tEnd || 48
          if (parseInt(item.deg) || parseInt(item.deg) === 0) {
            Obj.degParam.param.value = setterParamValue['deg'] = item.deg
          }
          Obj.tweenTypeParam.param.option = Obj.tweenTypeParam.param.value = setterParamValue['tweenType'] = item.tweenType || 'Cubic'
          Obj.tweenAcParam.param.option = Obj.tweenAcParam.param.value = setterParamValue['tweenAc'] = item.tweenAc || 'easeOut'
          if (!setterParam.static) {
            this.refreshContent()
          }
        }.bind(this)
      },
      directionParam: {
        title: '运动方向',
        param: {
          value: setterParamValue['direction'] || 1
        },
        callback: function (direction) {
          Obj.directionParam.param.value = setterParamValue['direction'] = direction || 1
          if (!setterParam.static) {
            this.refreshContent()
          }
        }.bind(this)
      },
      repeatParam: {
        title: '播放次数',
        param: {
          value: setterParamValue['repeat'] || 1,
          placeholder: '无限循环请置空'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue['repeat'] = acParam.value
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      delayParam: {
        title: '延迟ms',
        param: {
          value: setterParamValue['delay'] || '',
          placeholder: '请输入毫秒数'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue['delay'] = acParam.value
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      moveDistanceParam: {
        title: '移动距离',
        param: {
          value: setterParamValue['moveDistance'] || '',
          placeholder: '请输入移动距离'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue['moveDistance'] = acParam.value || ''
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      tEndParam: {
        title: '帧数',
        param: {
          value: setterParamValue['tEnd'] || '',
          placeholder: '请输入帧数'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue['tEnd'] = acParam.value
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      degParam: {
        title: '翻转/旋转度数',
        param: {
          value: setterParamValue['deg'] || '',
          placeholder: '请输入度数'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue['deg'] = acParam.value
            if (!setterParam.static) {
              this.refreshContent()
            }
          }
        }.bind(this)
      },
      tweenTypeParam: getSelectorParam({
        tag: 'tweenType',
        defaultOption: 'Cubic',
        defaultValue: 'Cubic',
        optionObj: {
          'Cubic': 'Cubic',
          'Linear': 'Linear',
          'Quad': 'Quad',
          'Quart': 'Quart',
          'Quint': 'Quint',
          'Sine': 'Sine',
          'Expo': 'Expo',
          'Circ': 'Circ',
          'Elastic': 'Elastic',
          'Back': 'Back',
          'Bounce': 'Bounce'
        },
        data: [
          {
            option: 'Cubic',
            value: 'Cubic'
          },
          {
            option: 'Linear',
            value: 'Linear'
          },
          {
            option: 'Quad',
            value: 'Quad'
          },
          {
            option: 'Quart',
            value: 'Quart'
          },
          {
            option: 'Quint',
            value: 'Quint'
          },
          {
            option: 'Sine',
            value: 'Sine'
          },
          {
            option: 'Expo',
            value: 'Expo'
          },
          {
            option: 'Circ',
            value: 'Circ'
          },
          {
            option: 'Elastic',
            value: 'Elastic'
          },
          {
            option: 'Back',
            value: 'Back'
          },
          {
            option: 'Bounce',
            value: 'Bounce'
          }
        ],
        callback: () => {
          if (!setterParam.static) {
            this.refreshContent()
          }
        }
      }, Object.assign({}, setterParam, {
        title: '缓动'
      }), setterParamValue, this),
      tweenAcParam: getSelectorParam({
        tag: 'tweenAc',
        defaultOption: 'easeOut',
        defaultValue: 'easeOut',
        optionObj: {
          'easeIn': 'easeIn',
          'easeOut': 'easeOut',
          'easeInOut': 'easeInOut'
        },
        data: [
          {
            option: 'easeIn',
            value: 'easeIn'
          },
          {
            option: 'easeOut',
            value: 'easeOut'
          },
          {
            option: 'easeInOut',
            value: 'easeInOut'
          }
        ],
        callback: () => {
          if (!setterParam.static) {
            this.refreshContent()
          }
        }
      }, Object.assign({}, setterParam, {
        title: '缓动方向'
      }), setterParamValue, this)
    }
    return Obj
  },
  // dataSourceGroup
  getDataSourceGroupParam (setterParam, setterParamValue) {
    let dataSource = this.contentConfig.dataSource || {}
    dataSource[setterParamValue.tag] = dataSource[setterParamValue.tag] || []
    let dataSourceParam = {
      title: setterParam.title,
      type: setterParam.type,
      param: {
        value: setterParamValue[setterParam.tag] || '',
        data: dataSource[setterParamValue.tag]
      },
      callback: function (acParam) {
        setterParamValue[setterParam.tag] = acParam.value
        this.refreshSetter()
        this.refreshContent()
      }.bind(this),
      showAdd: false,
      nameParam: {
        value: '',
        placeholder: '数据源名称'
      },
      delCallback: function (item) {
        let newSource = []
        for (let i in dataSource[setterParamValue.tag]) {
          if (dataSource[setterParamValue.tag][i].value != item.value) {
            newSource.push(dataSource[setterParamValue.tag][i])
          }
        }
        dataSource[setterParamValue.tag] = newSource
        this.refreshSetter()
        this.refreshContent()
      }.bind(this),
      saveCallback: function () {
        if (dataSourceParam.nameParam.value) {
          setterParamValue[setterParam.tag] = PublicFunc.getRandId()
          dataSource[setterParamValue.tag].push({
            option: dataSourceParam.nameParam.value,
            value: setterParamValue[setterParam.tag],
            data: []
          })
          this.contentConfig.dataSource = dataSource
          this.refreshSetter()
          this.refreshContent()
        }
      }.bind(this),
      addCallback () {
        dataSourceParam.showAdd = true
      }
    }
    return dataSourceParam
  },
  // contentGroup
  getContentGroupParam (setterParam, setterParamValue, setSource) {
    let Obj = {
      title: setterParam.title,
      type: setterParam.type,
      contentListType: setSource.contentListType || 'edit',
      setList: setterParam.setList,
      addContent: function () {
        setSource.data.push({})
        this.setConfig.moduleContentSetterKey = setSource.data.length - 1
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollHeight
        this.refreshSetter()
        this.refreshContent()
      }.bind(this),
      delContent: function (key) {
        Obj.orderSetterParam.self.delContent(key)
      },
      changeContentListType: function (type) {
        setSource.contentListType = type
        for (let i in setSource.data) {
          setSource.data[i].contentListType = type
        }
        this.refreshSetter()
      }.bind(this),
      changeItemContentListType: function (type, key) {
        setSource.data[key].contentListType = type
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
        this.refreshSetter(true)
      }.bind(this),
      orderSetterParam: {
        key: Math.random(),
        hideDel: true,
        hideAdd: true,
        scrollId: 'contentSetter',
        borderStyle: '1px dashed #64B5F6',
        content: setSource.data,
        editKey: this.setConfig.moduleContentSetterKey || this.setConfig.moduleContentSetterKey === 0 ? this.setConfig.moduleContentSetterKey : 'empty',
        scrollTop: this.setConfig.moduleContentSetterScrollTop || 0,
        orderSetterEditContentCallback: function (key) {
          if (key !== undefined && key != 'move') {
            this.setConfig.moduleContentSetterKey = key
          }
        }.bind(this),
        orderSetterDelContentCallback: function (key) {
          key = key - 1 > 0 ? key - 1 : 0
          this.setConfig.moduleContentSetterKey = key
          this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
          setSource.data = Obj.orderSetterParam.content
          this.refreshSetter()
          this.refreshContent()
        }.bind(this),
        orderSetterMoveCallback: function (key) {
          this.setConfig.moduleContentSetterKey = key
          this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
          setSource.data = Obj.orderSetterParam.content
          this.refreshSetter()
          this.refreshContent()
        }.bind(this)
      }
    }
    if (setterParamValue.tag == 'menus' || setterParamValue.tag == 'tab') {
      Obj.checkedId = setSource.checkedId || 0
      Obj.changeCheckedId = function (checkedId, key) {
        setSource.checkedId = checkedId
        this.setConfig.moduleContentSetterKey = key
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
        this.refreshSetter()
        this.refreshContent()
      }.bind(this)
      Obj.addContent = function () {
        let checkedId = PublicFunc.getRandId()
        setSource.data.push({
          checkedId
        })
        setSource.checkedId = setSource.checkedId || checkedId
        this.setConfig.moduleContentSetterKey = setSource.data.length - 1
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollHeight
        this.refreshSetter()
        this.refreshContent()
      }.bind(this)
    }
    return Obj
  },
  setParamDefaultValue (setterParam, setterParamValue) {
    setterParam.defaultValue = (setterParam.defaultValue || setterParam.defaultValue === 0) ? setterParam.defaultValue : ''
    setterParamValue[setterParam.tag] = (setterParamValue[setterParam.tag] || setterParamValue[setterParam.tag] === 0) ? setterParamValue[setterParam.tag] : setterParam.defaultValue
  }
}
export default ParamFunc
