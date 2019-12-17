/*
  6.富文本内容
*/
import commonSet from '../../common_set'

const theme = {
  titleStyle: {
    'font-size': '14px',
    'line-height': '30px',
    'padding-top': 0
  },
  title: '富文本内容',
  config: {
    elements: [
      {
        name: '富文本内容',
        text: '富文本内容',
        tag: 'text',
        theme: 2,
        textStyle: {
          'font-size': 14,
          'line-height': 20,
          'text-align': 'left',
          'color': '#333333'
        },
        elementStyle: {
          'width': 240,
          'left': 0,
          'top': 0
        }
      }
    ]
  }
}

const themeSet = {
  theme: 2,
  setType: 'style',
  data: [
    {
      title: '样式',
      setType: 'style',
      setList: [
        {
          type: 'inputGroup',
          title: '元素名称',
          tag: 'name',
          param: {
            placeholder: '请输入名称'
          }
        },
        {
          type: 'editorGroup',
          title: '文字内容',
          tag: 'text',
          param: {
            placeholder: '请输入内容'
          }
        },
        Object.assign(commonSet.getTextGroupParam('文字', 'textStyle')),
        commonSet.elementStyleSetGroup
      ]
    },
    commonSet.actionSetParam,
    commonSet.animationSetParam
  ]
}

export default {
  theme,
  themeSet
}
