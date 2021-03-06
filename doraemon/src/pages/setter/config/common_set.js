// content setList
const contentSetList = [
  {
    type: 'inputGroup',
    title: '模块名称',
    tag: 'name',
    param: {
      placeholder: '请输入模块名称'
    }
  },
  {
    type: 'setGroup',
    title: '数据源设置',
    setList: [
      {
        type: 'radioTabGroup',
        title: '选择数据源',
        tag: 'dataType',
        refreshSetter: 1,
        data: [
          {
            option: '独立数据',
            value: 0
          },
          {
            option: '数据源',
            value: 1
          }
        ],
        defaultValue: 0
      },
      {
        type: 'dataSourceGroup',
        tag: 'dataSourceId'
      }
    ]
  }
]
// LockPositionParam
const LockPositionParam = {
  type: 'radioTabGroup',
  title: '模块位置',
  tag: 'lockPosition',
  defaultValue: 'normal',
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
}
// getBackgroundParam
const getBackgroundParam = (title, setValueKey = '') => {
  let backgroundParam = {
    type: 'setGroup',
    isSub: true,
    open: true,
    title,
    setList: [
      {
        type: 'imageGroup',
        tag: 'background-image',
        setValueKey
      },
      {
        type: 'colorGroup',
        title: '背景色',
        tag: 'background-color',
        param: {
          placeholder: '示例(#fff000)'
        },
        setValueKey
      },
      {
        type: 'radioTabGroup',
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
        ],
        setValueKey
      },
      {
        type: 'radioTabGroup',
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
        ],
        setValueKey
      }
    ]
  }
  return backgroundParam
}
// getTextParam
const getTextGroupParam = (title, setValueKey = '', isSub = false) => {
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
  const textStyleSetGroup = {
    type: 'setGroup',
    title: title + '样式设置',
    isSub,
    setList: [
      {
        type: 'inputGroup',
        title: '文字大小(px)',
        tag: 'font-size',
        param: {
          placeholder: '请输入文字大小'
        },
        setValueKey
      },
      {
        type: 'inputGroup',
        title: '行高(px)',
        tag: 'line-height',
        param: {
          placeholder: '请输入行高'
        },
        setValueKey
      },
      {
        type: 'colorGroup',
        title: '颜色',
        tag: 'color',
        param: {
          placeholder: '请输入颜色(#fff000)'
        },
        setValueKey
      },
      {
        type: 'selectorGroup',
        title: '粗细',
        tag: 'font-weight',
        data: fontWeightData,
        defaultOption: '正常',
        defaultValue: 'normal',
        optionObj: fontWeightObj,
        setValueKey
      },
      {
        type: 'selectorGroup',
        title: '样式',
        tag: 'text-decoration',
        data: [
          {
            option: '正常',
            value: 'none'
          },
          {
            option: '删除线',
            value: 'line-through'
          },
          {
            option: '下划线',
            value: 'underline'
          }
        ],
        defaultOption: '正常',
        defaultValue: 'none',
        optionObj: {
          'none': '正常',
          'line-through': '删除线',
          'underline': '下划线'
        },
        setValueKey
      },
      {
        type: 'radioTabGroup',
        title: '对齐',
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
        ],
        setValueKey
      },
      getPaddingParam(title + '边距设置', setValueKey)
    ]
  }
  return textStyleSetGroup
}
// getPaddingParam
const getPaddingParam = (title, setValueKey = '') => {
  let paddingParam = {
    type: 'setGroup',
    isSub: true,
    open: true,
    title,
    setList: [
      {
        type: 'paddingGroup',
        setValueKey
      }
    ]
  }
  return paddingParam
}
// getRadiusParam
const getRadiusParam = (title, setValueKey = '') => {
  let radiusParam = {
    type: 'setGroup',
    isSub: true,
    open: true,
    title,
    setList: [
      {
        type: 'radiusGroup',
        setValueKey
      }
    ]
  }
  return radiusParam
}
// getBorderParam
const getBorderParam = (title, setValueKey = '') => {
  let borderParam = {
    type: 'setGroup',
    isSub: true,
    open: true,
    title,
    setList: [
      {
        type: 'borderGroup',
        setValueKey
      }
    ]
  }
  return borderParam
}
// module style setGroup
const moduleStyleSetGroup = {
  type: 'setGroup',
  title: '模块设置',
  open: false,
  setList: [
    LockPositionParam,
    {
      type: 'heightGroup',
      title: '模块高度'
    },
    {
      type: 'textareaGroup',
      title: '查看全部文案',
      tag: 'showMoreText',
      param: {
        placeholder: '内容溢出时查看全部文案'
      }
    },
    getTextGroupParam('全部文案', 'moreTextStyle', true),
    {
      type: 'setGroup',
      title: '全部文案图标设置',
      open: false,
      isSub: true,
      setList: [
        {
          type: 'inputGroup',
          title: '图标宽度(px)',
          tag: 'moreIconWidth',
          param: {
            placeholder: '请输入图标宽度'
          }
        },
        {
          type: 'inputGroup',
          title: '图标行高(px)',
          tag: 'moreIconLineHeight',
          param: {
            placeholder: '请输入图标行高'
          }
        },
        {
          type: 'colorGroup',
          title: '图标颜色',
          tag: 'moreIconColor'
        }
      ]
    },
    getPaddingParam('模块边距设置', 'moduleStyle'),
    getRadiusParam('模块圆角设置', 'moduleStyle'),
    getBackgroundParam('模块背景设置', 'moduleStyle'),
    getBorderParam('模块边框设置', 'moduleStyle')
  ]
}
// elementStyleSetGroup
const elementStyleSetGroup = {
  type: 'setGroup',
  title: '元素样式',
  open: true,
  setList: [
    {
      type: 'inputGroup',
      title: '元素宽度(px)',
      tag: 'width',
      param: {
        placeholder: '请输入宽度'
      },
      setValueKey: 'elementStyle'
    },
    {
      type: 'inputGroup',
      title: '元素高度(px)',
      tag: 'height',
      param: {
        placeholder: '请输入高度'
      },
      setValueKey: 'elementStyle'
    },
    {
      type: 'inputGroup',
      title: '元素左边距(px)',
      tag: 'left',
      param: {
        placeholder: '请输入边距'
      },
      setValueKey: 'elementStyle'
    },
    {
      type: 'inputGroup',
      title: '元素上边距(px)',
      tag: 'top',
      param: {
        placeholder: '请输入边距'
      },
      setValueKey: 'elementStyle'
    },
    {
      type: 'inputGroup',
      title: '元素右边距(px)',
      tag: 'right',
      param: {
        placeholder: '请输入边距'
      },
      setValueKey: 'elementStyle'
    },
    {
      type: 'inputGroup',
      title: '元素下边距(px)',
      tag: 'bottom',
      param: {
        placeholder: '请输入边距'
      },
      setValueKey: 'elementStyle'
    },
    {
      type: 'sliderGroup',
      title: '透明度',
      tag: 'opacity',
      param: {
        placeholder: '请输入透明度'
      },
      setValueKey: 'elementStyle'
    },
    {
      type: 'sliderGroup',
      title: '旋转角度',
      tag: 'rotateZ',
      max: 360,
      defaultValue: 0,
      param: {
        placeholder: '请输入角度'
      },
      setValueKey: 'elementStyle'
    },
    // {
    //   type: 'sliderGroup',
    //   title: '左右翻转',
    //   tag: 'rotateY',
    //   max: 360,
    //   defaultValue: 0,
    //   param: {
    //     placeholder: '请输入角度'
    //   },
    //   setValueKey: 'elementStyle'
    // },
    // {
    //   type: 'sliderGroup',
    //   title: '上下翻转',
    //   tag: 'rotateX',
    //   max: 360,
    //   defaultValue: 0,
    //   param: {
    //     placeholder: '请输入角度'
    //   },
    //   setValueKey: 'elementStyle'
    // },
    getPaddingParam('元素边距设置', 'elementStyle'),
    getRadiusParam('元素圆角设置', 'elementStyle'),
    getBackgroundParam('元素背景设置', 'elementStyle'),
    getBorderParam('元素边框设置', 'elementStyle')
  ]
}
// item style setGroup
const itemStyleSetGroup = {
  type: 'setGroup',
  title: '列表项设置',
  setList: [
    getPaddingParam('列表项边距设置', 'itemStyle'),
    getRadiusParam('列表项圆角设置', 'itemStyle'),
    getBackgroundParam('列表项背景设置', 'itemStyle'),
    getBorderParam('列表项边框设置', 'itemStyle')
  ]
}
// image style setGroup
const imageStyleSetGroup = {
  type: 'setGroup',
  title: '图片样式设置',
  setList: [
    {
      type: 'inputGroup',
      title: '图片宽度(px)',
      tag: 'width',
      param: {
        placeholder: '请输入宽度'
      },
      setValueKey: 'imageStyle'
    },
    {
      type: 'inputGroup',
      title: '图片高度(px)',
      tag: 'height',
      param: {
        placeholder: '请输入高度'
      },
      setValueKey: 'imageStyle'
    },
    {
      type: 'radioTabGroup',
      title: '背景位置',
      tag: 'align',
      defaultValue: 'center',
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
      setValueKey: 'imageStyle'
    },
    getPaddingParam('图片边距设置', 'imageStyle'),
    getRadiusParam('图片圆角设置', 'imageStyle'),
    getBorderParam('图片边框设置', 'imageStyle')
  ]
}

const tabGuildData = [
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/fdwegkksi0a.png',
    value: 0
  },
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/zklg404rkff.png',
    value: 1
  },
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/5snbdc7l1j.png',
    value: 2
  },
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/maqqmtek4xm.png',
    value: 3
  }
]

const guildDefaultData = {
  0: {
    barContainerStyle: {},
    barStyle: {
      'border-top-left-radius': 4,
      'border-top-right-radius': 4,
      'border-bottom-left-radius': 4,
      'border-bottom-right-radius': 4,
      'margin-right': 5
    },
    barCheckedStyle: {
      'border-top-left-radius': 4,
      'border-top-right-radius': 4,
      'border-bottom-left-radius': 4,
      'border-bottom-right-radius': 4,
      'margin-right': 5
    }
  },
  1: {
    barContainerStyle: {},
    barStyle: {
      'width': 8,
      'height': 8,
      'border-top-width': 1,
      'border-bottom-width': 1,
      'border-left-width': 1,
      'border-right-width': 1,
      'border-top-color': '#979797',
      'border-bottom-color': '#979797',
      'border-left-color': '#979797',
      'border-right-color': '#979797',
      'border-top-style': 'solid',
      'border-bottom-style': 'solid',
      'border-left-style': 'solid',
      'border-right-style': 'solid',
      'border-top-left-radius': 4,
      'border-top-right-radius': 4,
      'border-bottom-left-radius': 4,
      'border-bottom-right-radius': 4,
      'margin-right': 5
    },
    barCheckedStyle: {
      'border-top-left-radius': 4,
      'border-top-right-radius': 4,
      'border-bottom-left-radius': 4,
      'border-bottom-right-radius': 4,
      'margin-right': 5
    }
  },
  2: {
    barContainerStyle: {},
    barStyle: {
      'width': 10,
      'height': 2,
      'border-top-left-radius': 2,
      'border-top-right-radius': 2,
      'border-bottom-left-radius': 2,
      'border-bottom-right-radius': 2,
      'background-color': '#ddd',
      'margin-right': 5
    },
    barCheckedStyle: {
      'width': 10,
      'height': 2,
      'border-top-left-radius': 2,
      'border-top-right-radius': 2,
      'border-bottom-left-radius': 2,
      'border-bottom-right-radius': 2,
      'background-color': '#F83A61',
      'margin-right': 5
    }
  },
  3: {
    barContainerStyle: {},
    barStyle: {
      'width': 12,
      'height': 4,
      'border-top-left-radius': 2,
      'border-top-right-radius': 2,
      'border-bottom-left-radius': 2,
      'border-bottom-right-radius': 2,
      'background-color': '#ddd',
      'margin-right': 5
    },
    barCheckedStyle: {
      'width': 12,
      'height': 4,
      'border-top-left-radius': 2,
      'border-top-right-radius': 2,
      'border-bottom-left-radius': 2,
      'border-bottom-right-radius': 2,
      'background-color': '#F83A61',
      'margin-right': 5
    }
  }
}

const playerStyleSetGroup = {
  type: 'setGroup',
  title: '轮播设置',
  setList: [
    {
      type: 'radioTabGroup',
      title: '循环播放',
      tag: 'loop',
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
    },
    {
      type: 'radioTabGroup',
      title: '拖动切页',
      tag: 'drag',
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
    },
    {
      type: 'radioTabGroup',
      title: '显示导航',
      tag: 'showGuild',
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
    },
    {
      type: 'inputGroup',
      title: '轮播时间(ms)',
      tag: 'autoPlayTime',
      param: {
        placeholder: '请输入时间(毫秒ms)'
      }
    },
    {
      type: 'imageTabGroup',
      title: '导航选择',
      tag: 'guildTheme',
      defaultValue: 0,
      guildDefaultData: guildDefaultData,
      data: tabGuildData
    },
    {
      type: 'setGroup',
      title: '导航样式',
      isSub: true,
      setList: [
        {
          type: 'radioTabGroup',
          title: '导航对齐',
          tag: 'text-align',
          defaultValue: 'center',
          setValueKey: 'barContainerStyle',
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
        },
        {
          type: 'inputGroup',
          title: '底部边距(px)',
          tag: 'bottom',
          setValueKey: 'barContainerStyle',
          param: {
            placeholder: '导航距离底部边距'
          }
        },
        {
          type: 'inputGroup',
          title: '左边距(px)',
          tag: 'padding-left',
          setValueKey: 'barContainerStyle',
          param: {
            placeholder: '导航左边距'
          }
        },
        {
          type: 'inputGroup',
          title: '右边距(px)',
          tag: 'padding-right',
          setValueKey: 'barContainerStyle',
          param: {
            placeholder: '导航右边距'
          }
        },
        {
          type: 'colorGroup',
          title: '背景色',
          tag: 'background-color',
          setValueKey: 'barStyle',
          param: {
            placeholder: '导航右边距'
          }
        },
        {
          type: 'inputGroup',
          title: '宽度(px)',
          tag: 'width',
          setValueKey: 'barStyle',
          param: {
            placeholder: '请输入宽度'
          }
        },
        {
          type: 'inputGroup',
          title: '高度(px)',
          tag: 'height',
          setValueKey: 'barStyle',
          param: {
            placeholder: '请输入高度'
          }
        },
        {
          type: 'inputGroup',
          title: '导航间距px',
          tag: 'margin-right',
          setValueKey: 'barStyle',
          param: {
            placeholder: '请输入导航间距'
          }
        },
        getRadiusParam('圆角设置', 'barStyle'),
        getBorderParam('边框设置', 'barStyle')
      ]
    },
    {
      type: 'setGroup',
      title: '导航选中样式',
      isSub: true,
      setList: [
        {
          type: 'colorGroup',
          title: '背景色',
          tag: 'background-color',
          setValueKey: 'barCheckedStyle',
          param: {
            placeholder: '导航右边距'
          }
        },
        {
          type: 'inputGroup',
          title: '宽度(px)',
          tag: 'width',
          setValueKey: 'barCheckedStyle',
          param: {
            placeholder: '请输入宽度'
          }
        },
        {
          type: 'inputGroup',
          title: '高度(px)',
          tag: 'height',
          setValueKey: 'barCheckedStyle',
          param: {
            placeholder: '请输入高度'
          }
        },
        {
          type: 'inputGroup',
          title: '导航间距px',
          tag: 'margin-right',
          setValueKey: 'barCheckedStyle',
          param: {
            placeholder: '请输入导航间距'
          }
        },
        getRadiusParam('圆角设置', 'barCheckedStyle'),
        getBorderParam('边框设置', 'barCheckedStyle')
      ]
    }
  ]
}

const fitImageSetGroup = {
  title: '图片样式设置',
  type: 'setGroup',
  setList: [
    {
      type: 'fitImageGroup'
    },
    getPaddingParam('图片边距设置', 'imageStyle'),
    getRadiusParam('图片圆角设置', 'imageStyle'),
    getBorderParam('图片边框设置', 'imageStyle')
  ]
}

const actionSetParam = {
  title: '事件',
  setType: 'action',
  setList: [
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const animationSetParam = {
  title: '动画',
  setType: 'animation',
  setList: [
    {
      type: 'inputGroup',
      title: '整体播放次数',
      tag: 'animationRepeat',
      param: {
        placeholder: '无限循环请输入0'
      }
    },
    {
      title: '动画设置',
      type: 'contentGroup',
      tag: 'animations',
      setList: [
        {
          type: 'animationGroup'
        }
      ]
    }
  ]
}

const tabContentSetList = [
  {
    type: 'inputGroup',
    title: '模块名称',
    tag: 'name',
    param: {
      placeholder: '请输入模块名称'
    }
  },
  {
    title: '内容设置',
    type: 'contentGroup',
    setList: [
      {
        type: 'textareaGroup',
        title: '名称',
        tag: 'name',
        param: {
          placeholder: '请输入tab名'
        }
      },
      {
        type: 'selectorGroup',
        title: '关联页面',
        tag: 'tabPageId',
        defaultOption: '请选择',
        dataSource: 'tabPage'
      }
    ]
  }
]

const tabSetData = [
  {
    title: '内容',
    setType: 'content',
    setList: tabContentSetList
  },
  {
    title: '样式',
    setType: 'style',
    setList: [
      {
        type: 'setGroup',
        title: '模块设置',
        open: false,
        setList: [
          {
            type: 'heightGroup',
            title: '模块高度'
          },
          getPaddingParam('模块边距设置', 'moduleStyle'),
          getRadiusParam('模块圆角设置', 'moduleStyle'),
          getBackgroundParam('模块背景设置', 'moduleStyle'),
          getBorderParam('模块边框设置', 'moduleStyle')
        ]
      },
      playerStyleSetGroup
    ]
  }
]

const commonSet = {
  tabSetData,
  actionSetParam,
  animationSetParam,
  contentSetList,
  tabGuildData,
  guildDefaultData,
  getBackgroundParam,
  moduleStyleSetGroup,
  elementStyleSetGroup,
  itemStyleSetGroup,
  imageStyleSetGroup,
  getPaddingParam,
  getRadiusParam,
  getBorderParam,
  getTextGroupParam,
  fitImageSetGroup,
  titleStyleGroup: getTextGroupParam('标题', 'titleStyle'),
  descriptionStyleGroup: getTextGroupParam('描述', 'descriptionStyle')
}
export default commonSet
