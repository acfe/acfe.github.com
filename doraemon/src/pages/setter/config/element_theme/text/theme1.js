/*
  1.大标题
*/
import commonSet from '../../common_set'

const theme = {
  titleStyle: {
    'font-size': '48px',
    'line-height': '64px',
    'padding-top': 0
  },
  title: '大标题',
  config: {
    elements: [
      {
        name: '大标题',
        text: '大标题',
        tag: 'text',
        theme: 1,
        textStyle: {
          'font-size': 48,
          'line-height': 64,
          'text-align': 'center',
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
  theme: 1,
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
          type: 'textareaGroup',
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
