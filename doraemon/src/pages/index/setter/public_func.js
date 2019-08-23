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

export default {
  // 获取样式模板排版配置
  getThemeSetter (setModule, themeList) {
    let themeObj = {
      title: '模块排版',
      type: 'themeSelector',
      param: {
        value: setModule['theme'],
        data: themeList
      },
      callback: function (param) {
        setModule['theme'] = param.value
        setModule['heightType'] = param.heightType || 'auto'
        themeObj.param.value = param.value
        this.resetThemeParamsValue(setModule, themeList)
        this.refreshContent()
        this.refreshSetter(true)
      }.bind(this)
    }
    return themeObj
  },
  // 重置模块排版默认属性
  resetThemeParamsValue (setModule, themeList) {
    for (let i in themeList) {
      if (themeList[i].value == setModule['theme']) {
        for (let key in themeList[i]) {
          switch (key) {
            case 'value':
            case 'option':
            case 'support':
            case 'setEnabelList':
              break
            default:
              setModule[key] = themeList[i][key]
              break
          }
        }
      }
    }
  },
  // 获取tab单选组件配置
  getRadioTabParam (setModule, param) {
    let Obj = {
      title: param.title,
      type: 'radioTab',
      param: {
        value: setModule[param.tag] || (param.defaultValue || ''),
        data: param.data
      },
      callback: function (acParam) {
        setModule[param.tag] = acParam.value
        this.refreshContent()
        param.callback && param.callback(acParam)
      }.bind(this)
    }
    return Obj
  },
  // 获取textarea组件配置
  getTextareaParam (setModule, param) {
    let Obj = {
      title: param.title,
      type: 'textarea',
      param: {
        value: setModule[param.tag] || (param.defaultValue || ''),
        placeholder: param.placeholder || ''
      },
      callback: function (acParam, acType) {
        if (acType == 'focusout') {
          setModule[param.tag] = acParam.value
          if (!param.static) {
            this.refreshContent()
          }
          param.callback && param.callback(acParam)
        }
      }.bind(this)
    }
    return Obj
  },
  // 获取selector组件设置
  getSelectorParam (setParam, param) {
    let Obj = {
      title: param.title,
      hideSelectedIcon: true,
      value: setParam[param.tag] || (param.defaultValue || ''),
      option: param.optionObj[setParam[param.tag]] || (param.defaultOption || '请选择'),
      data: param.data,
      callback: function (acParam) {
        setParam[param.tag] = acParam.value
        this.refreshContent()
        param.callback && param.callback(acParam)
      }.bind(this)
    }
    return Obj
  },
  // 获取滑块组件设置
  getSliderParam (setParam, param) {
    let defaultValue = (param.defaultValue || param.defaultValue === 0 ? param.defaultValue : 100)
    let slParam = {
      type: 'sliderGroup',
      title: param.title,
      textParam: {
        param: {
          value: setParam[param.tag] || defaultValue
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setParam[param.tag] = acParam.value
            slParam.sliderParam.param.value = acParam.value
            this.refreshContent()
          }
        }.bind(this)
      },
      sliderParam: {
        param: {
          min: param.min || 0,
          max: param.max || 100,
          value: parseInt(setParam[param.tag]) || defaultValue
        },
        callback: function (acParam) {
          setParam[param.tag] = acParam.value
          slParam.textParam.param.value = acParam.value
          this.refreshContent()
        }.bind(this)
      }
    }
    return slParam
  },
  // 获取图片上传设置
  getUploadParam (setParam, param) {
    let Obj = {
      value: setParam[param.tag] || '',
      del: true,
      callback: function (type, acParam) {
        setParam[param.tag] = acParam.value
        param.callback && param.callback(acParam)
        this.refreshContent()
      }.bind(this),
      delCallback: function (type, acParam) {
        setParam[param.tag] = acParam.value
        param.callback && param.callback(acParam)
        this.refreshContent()
      }.bind(this)
    }
    return Obj
  },
  // 获取内容图片样式设置
  getImageSizeStyleSetterParam (setParam) {
    const Obj = {
      type: 'imageSizeStyle',
      heightParam: this.getTextareaParam(setParam, {
        tag: 'height'
      }),
      widthParam: this.getTextareaParam(setParam, {
        tag: 'width'
      }),
      borderRadiusParam: this.getTextareaParam(setParam, {
        tag: 'border-radius'
      }),
      alignParam: this.getRadioTabParam(setParam, {
        title: '背景位置',
        tag: 'align',
        defaultValue: 'left',
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
        ]
      })
    }
    return Obj
  },
  // 获取模块内容样式配置
  getModuleContentStyleParam (setModule, themeList) {
    const Obj = {
      title: '模块内容样式设置',
      type: 'moduleContentStyle'
    }
    let setEnabelList
    for (let i in themeList) {
      if (themeList[i].value == setModule['theme'] && themeList[i]['setEnabelList']) {
        setEnabelList = themeList[i]['setEnabelList']
      }
    }
    if (setEnabelList) {
      Obj.setList = []
      for (let i in setEnabelList) {
        let setParam = setEnabelList[i]
        switch (setParam.type) {
          case 'textarea':
            Obj.setList.push(this.getTextareaParam(setModule, setParam.param))
            break
          case 'radioTab':
            Obj.setList.push(this.getRadioTabParam(setModule, setParam.param))
            break
          case 'imageSizeStyle':
            Obj.setList.push(Object.assign(this.getImageSizeStyleSetterParam(setModule[setParam.param.tag]), {
              title: setParam.param.title
            }))
            break
        }
      }
    }
    return Obj
  },
  // 事件设置
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
    let pagesNames = {}
    for (let i in pages) {
      pagesData.push({
        option: pages[i].name,
        value: pages[i].id
      })
      pagesNames[pages[i].id] = pages[i].name
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
    return {
      type: 'actionGroup',
      pagesParam: this.getSelectorParam(setModule.action, {
        title: '选择页面',
        tag: 'pageId',
        defaultOption: '请选择',
        optionObj: pagesNames,
        data: pagesData
      }),
      popsParam: this.getSelectorParam(setModule.action, {
        title: '选择弹窗',
        tag: 'popId',
        defaultOption: '请选择',
        optionObj: popsNames,
        data: popsData
      }),
      acTypeParam: this.getSelectorParam(setModule.action, {
        title: '事件类型',
        tag: 'acType',
        defaultOption: '请选择',
        defaultValue: 0,
        optionObj: acTypeObj,
        data: acTypeData
      }),
      acUrlParam: this.getTextareaParam(setModule.action, {
        title: '链接地址',
        placeholder: '请输入链接地址',
        tag: 'acUrl'
      }),
      acTargetParam: this.getRadioTabParam(setModule.action, {
        title: '打开方式',
        tag: 'acTarget',
        defaultValue: '_self',
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
      }),
      acFunParam: this.getTextareaParam(setModule.action, {
        title: '事件名称',
        placeholder: '请输入事件名称',
        tag: 'acFun'
      })
    }
  },
  // 获取图片内容设置
  getImageSetter (setModule, tag, title) {
    let Obj = {
      type: 'image',
      title: title || '图片地址',
      urlParam: this.getTextareaParam(setModule, {
        tag,
        title: '图片地址',
        placeholder: '请输入图片地址',
        callback (acParam) {
          Obj.uploadParam.value = acParam.value
        }
      }),
      uploadParam: this.getUploadParam(setModule, {
        tag,
        callback (acParam) {
          Obj.urlParam.param.value = acParam.value
        }
      })
    }
    return Obj
  },
  // 背景设置配置
  getBackgroundSetterParam (setParam) {
    let Obj = {
      title: '背景设置',
      type: 'backgroundGroup',
      backgroundColorParam: this.getTextareaParam(setParam, {
        tag: 'background-color',
        title: '背景颜色',
        placeholder: '请输入背景颜色'
      }),
      urlParam: this.getTextareaParam(setParam, {
        tag: 'background-image',
        title: '图片地址',
        placeholder: '请输入图片地址',
        callback (acParam) {
          Obj.uploadParam.value = acParam.value
        }
      }),
      uploadParam: this.getUploadParam(setParam, {
        tag: 'background-image',
        callback (acParam) {
          Obj.urlParam.param.value = acParam.value
        }
      }),
      backgroundPositionParam: this.getRadioTabParam(setParam, {
        title: '背景位置',
        tag: 'background-position',
        defaultValue: 'top',
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
      }),
      backgroundRepeatParam: this.getRadioTabParam(setParam, {
        title: '背景重复',
        tag: 'background-repeat',
        defaultValue: 'repeat',
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
      })
    }
    return Obj
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
    const Obj = {
      title: '边框设置',
      type: 'borderGroup'
    }
    for (let i in setGroup) {
      Obj[setGroup[i].key] = {
        title: setGroup[i].title,
        sizeParam: this.getTextareaParam(setParam, {
          tag: 'border-' + setGroup[i].key + '-width'
        }),
        colorParam: this.getTextareaParam(setParam, {
          tag: 'border-' + setGroup[i].key + '-color'
        }),
        styleParam: this.getSelectorParam(setParam, {
          tag: 'border-' + setGroup[i].key + '-style',
          data: borderStyleData,
          optionObj: borderStyleObj
        })
      }
    }
    return Obj
  },
  // 获取边距设置
  getMarginPaddingSetterParam (setParam, param) {
    const Obj = {
      title: param.title,
      type: 'marginGroup'
    }
    for (let i in setGroup) {
      Obj[setGroup[i].key] = this.getTextareaParam(setParam, {
        title: setGroup[i].title,
        tag: param.type + '-' + setGroup[i].key
      })
    }
    return Obj
  },
  // 获取模块高度设置
  getHeightSetterParam (setParam) {
    const Obj = {
      title: '模块高度',
      type: 'heightGroup',
      typeParam: this.getRadioTabParam(setParam, {
        tag: 'heightType',
        defaultValue: 'auto',
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
      }),
      overflowParam: this.getRadioTabParam(setParam, {
        tag: 'overflow',
        data: [
          {
            option: '滚动',
            value: 'auto'
          },
          {
            option: '不滚动',
            value: ''
          }
        ]
      }),
      valueParam: this.getTextareaParam(setParam, {
        tag: 'moduleHeight',
        placeholder: '请输入高度'
      })
    }
    return Obj
  },
  // 获取文本样式设置
  getFontStyleSetterParam (setParam) {
    let fontWeightObj = {
      normal: '正常',
      bold: '粗体'
    }
    let fontWeightData = [
      {
        option: '正常',
        value: 'normal'
      },
      {
        option: '粗体',
        value: 'bold'
      }
    ]
    for (let i = 1; i <= 9; i++) {
      const num = i * 100
      fontWeightObj[num] = num
      fontWeightData.push({
        option: num,
        value: num
      })
    }
    let Obj = {
      title: '文字样式',
      type: 'textStyle',
      sizeParam: this.getTextareaParam(setParam, {
        tag: 'font-size'
      }),
      colorParam: this.getTextareaParam(setParam, {
        tag: 'color'
      }),
      weightParam: this.getSelectorParam(setParam, {
        tag: 'font-weight',
        data: fontWeightData,
        defaultOption: '正常',
        defaultValue: 'normal',
        optionObj: fontWeightObj
      }),
      textAlignParam: this.getRadioTabParam(setParam, {
        title: '背景位置',
        tag: 'text-align',
        defaultValue: 'left',
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
        ]
      }),
      lineHeightParam: this.getTextareaParam(setParam, {
        title: '行高px',
        tag: 'line-height',
        placeholder: '请输入行高px'
      })
    }
    return Obj
  },
  // 获取浮标样式设置
  getMenuBarStyleSetterParam (setParam) {
    const Obj = {
      type: 'barStyle',
      slParam: this.getSliderParam(setParam, {
        tag: 'width',
        title: '宽度'
      }),
      heightParam: this.getTextareaParam(setParam, {
        tag: 'height'
      }),
      topParam: this.getTextareaParam(setParam, {
        tag: 'top'
      }),
      backgroundParam: this.getTextareaParam(setParam, {
        tag: 'background'
      }),
      borderRadiusParam: this.getTextareaParam(setParam, {
        tag: 'border-radius',
        placeholder: '请输入浮标圆角px'
      }),
      alignParam: this.getRadioTabParam(setParam, {
        title: '背景位置',
        tag: 'align',
        defaultValue: 'left',
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
        ]
      })
    }
    return Obj
  }
}
