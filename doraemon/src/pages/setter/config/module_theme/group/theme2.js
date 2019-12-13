/*
  2.常见问题列表
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/np467pzfy6a.png?imageView2/2/w/240',
  title: '常见问题列表',
  config: {
    module: {
      name: '常见问题列表',
      tag: 'group',
      theme: 2,
      dataType: 0,
      singleDatas: {
        data: [
          {
            title: '如何认证账号？'
          },
          {
            title: '如何修改密码？'
          },
          {
            title: '如何修改手机账号？'
          },
          {
            title: '如何修改快递公司？'
          }
        ]
      },
      moduleStyle: {
        'padding-left': 12,
        'padding-right': 12,
        'padding-bottom': 10
      },
      titleStyle: {
        'font-size': 14,
        'color': '#666666'
      }
    }
  }
}
// content
const contentSetParam2 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'textareaGroup',
      title: '问题',
      tag: 'title',
      param: {
        placeholder: '请输入问题'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList2 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList2.push(contentSetParam2)

const themeSet = {
  theme: 2,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList2
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        commonSet.getTextGroupParam('问题', 'titleStyle')
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
