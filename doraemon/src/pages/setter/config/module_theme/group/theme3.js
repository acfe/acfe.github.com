/*
  3.专题列表
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/tilmv1h5boj.png?imageView2/2/w/240',
  title: '专题列表',
  config: {
    module: {
      name: '专题列表',
      tag: 'group',
      theme: 3,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/2698iqkw97v.png',
            title: '丰巢智能柜-派件篇',
            description: '2019-10-21'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/2698iqkw97v.png',
            title: '丰巢智能柜-派件篇',
            description: '2019-10-21'
          }
        ]
      },
      moduleStyle: {
        'padding-top': 16,
        'padding-left': 16,
        'padding-right': 16
      },
      imageStyle: {},
      titleStyle: {
        'font-size': 16,
        'color': '#4A4A4A'
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#999999'
      }
    }
  }
}
// content
const contentSetParam3 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'imageGroup',
      title: '图片地址',
      tag: 'url'
    },
    {
      type: 'textareaGroup',
      title: '标题',
      tag: 'title',
      param: {
        placeholder: '请输入标题'
      }
    },
    {
      type: 'textareaGroup',
      title: '发布时间',
      tag: 'description',
      param: {
        placeholder: '请输入发布时间'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList3 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList3.push(contentSetParam3)

const themeSet = {
  theme: 3,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList3
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        commonSet.imageStyleSetGroup,
        commonSet.titleStyleGroup,
        commonSet.descriptionStyleGroup
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
