/*
  6.文字模块
*/
import commonSet from '../../common_set'

const theme = {
  title: '文字模块',
  config: {
    module: {
      name: '文字模块',
      tag: 'images',
      theme: 6,
      dataType: 0,
      singleDatas: {
        data: [
          {
            title: '文字内容'
          }
        ]
      },
      contentPaddingBottom: 0,
      moduleStyle: {},
      itemStyle: {},
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
// content
const contentSetParam6 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
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
}
const contentSetList6 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList6.push(contentSetParam6)
// style
const contentPaddingBottomSet = {
  type: 'inputGroup',
  title: '行间距(px)',
  tag: 'contentPaddingBottom',
  param: {
    placeholder: '请输入行间距'
  }
}
const theme6ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme6ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)

const themeSet = {
  theme: 6,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList6
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme6ItemStyleSetGroup,
        Object.assign(commonSet.titleStyleGroup, { title: '文字内容样式设置' })
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
