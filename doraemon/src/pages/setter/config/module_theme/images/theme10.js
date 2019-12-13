/*
  10.富文本模块
*/
import commonSet from '../../common_set'

const theme = {
  title: '富文本模块',
  config: {
    module: {
      name: '富文本模块',
      tag: 'images',
      theme: 10,
      title: '富文本文字内容',
      moduleStyle: {},
      titleStyle: {
        'padding-left': 10,
        'padding-right': 10,
        'color': '#333333',
        'padding-top': 0
      }
    }
  }
}

const themeSet = {
  theme: 10,
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
          type: 'editorGroup',
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
