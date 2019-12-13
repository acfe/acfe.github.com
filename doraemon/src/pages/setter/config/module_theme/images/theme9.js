/*
  9.文字模块
*/
import commonSet from '../../common_set'

const theme = {
  title: '文字模块',
  config: {
    module: {
      name: '文字模块',
      tag: 'images',
      theme: 9,
      title: '文字内容',
      moduleStyle: {},
      titleStyle: {
        'font-size': 14,
        'color': '#333333',
        'line-height': 20,
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 0
      }
    }
  }
}

const themeSet = {
  theme: 9,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: [
        {
          type: 'inputGroup',
          title: '模块名称',
          tag: 'name',
          param: {
            placeholder: '请输入模块名称'
          }
        },
        {
          type: 'textareaGroup',
          title: '内容',
          tag: 'title',
          param: {
            placeholder: '请输入文字内容'
          }
        },
        {
          type: 'actionGroup',
          tag: 'action'
        }
      ]
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        Object.assign(commonSet.getTextGroupParam('文字', 'titleStyle'), { title: '文字样式设置' })
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
