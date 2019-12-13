/*
  1.首页指引
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/lmulvclbaxm.png?imageView2/2/w/240',
  title: '首页指引',
  config: {
    module: {
      name: '首页指引',
      tag: 'group',
      theme: 1,
      dataType: 0,
      singleDatas: {
        data: [
          {
            title: '新人指引',
            description: '更新：柜机派件篇',
            newTip: '更新',
            tipBarColor: '#F3C500'
          },
          {
            title: '取件通知',
            description: '取件通知改版问题',
            tipBarColor: '#9AD708'
          },
          {
            title: '柜机取件',
            description: '柜机派件禁用拉黑规则篇',
            tipBarColor: '#6E83EB'
          },
          {
            title: '老司机经验',
            description: '日票200票老司机教你',
            tipBarColor: '#F3C500'
          }
        ]
      },
      moduleStyle: {
        'padding-left': 16,
        'padding-right': 16,
        'padding-bottom': 8
      },
      titleStyle: {
        'padding-left': 12,
        'font-size': 16,
        'font-weight': 500,
        'color': '#4A4A4A',
        'line-height': 16
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#999999',
        'line-height': 16,
        'padding-top': 5
      }
    }
  }
}
// content
const contentSetParam = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
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
      title: '描述',
      tag: 'description',
      param: {
        placeholder: '请输入描述'
      }
    },
    {
      type: 'radioTabGroup',
      title: '标题前标颜色',
      tag: 'tipBarColor',
      defaultValue: '#F3C500',
      data: [
        {
          option: '黄色',
          value: '#F3C500'
        },
        {
          option: '绿色',
          value: '#9AD708'
        },
        {
          option: '蓝色',
          value: '#6E83EB'
        }
      ]
    },
    {
      type: 'textareaGroup',
      title: '更新提示',
      tag: 'newTip',
      param: {
        placeholder: '请输入描述'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList.push(contentSetParam)

const themeSet = {
  theme: 1,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
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
