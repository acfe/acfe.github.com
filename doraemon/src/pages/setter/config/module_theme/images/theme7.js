/*
  7.富文本模块
*/
import commonSet from '../../common_set'

const theme = {
  title: '富文本模块',
  config: {
    module: {
      name: '富文本模块',
      tag: 'images',
      theme: 7,
      dataType: 0,
      singleDatas: {
        data: [
          {
            title: '富文本文字内容'
          }
        ]
      },
      contentPaddingBottom: 0,
      moduleStyle: {},
      itemStyle: {},
      titleStyle: {
        'padding-left': 10,
        'padding-right': 10,
        'color': '#333333',
        'padding-top': 0
      }
    }
  }
}
// content
const contentSetParam7 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
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
}
const contentSetList7 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList7.push(contentSetParam7)
// style
const contentPaddingBottomSet = {
  type: 'inputGroup',
  title: '行间距(px)',
  tag: 'contentPaddingBottom',
  param: {
    placeholder: '请输入行间距'
  }
}
const theme7ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme7ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)

const themeSet = {
  theme: 7,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList7
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme7ItemStyleSetGroup,
        Object.assign(commonSet.titleStyleGroup, { title: '文字内容样式设置' })
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
