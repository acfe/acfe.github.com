/*
  13.图文模块-浮动标签
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ez4ty8k4nja.jpg',
  title: '图文模块-浮动标签',
  config: {
    module: {
      name: '图文模块-浮动标签',
      tag: 'images',
      theme: 13,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/j8v5lqz8nds.jpg',
            fTag: '美容Beauty',
            title: '石原里美示范三秒能搞定的腮红'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ormq8xecxcd.jpg',
            fTag: '时尚Fashion',
            title: '年终奖就买这些高性价比的千元小众包'
          }
        ]
      },
      contentPaddingBottom: 10,
      fContentStyle: {
        bottom: -18
      },
      moduleStyle: {
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {},
      imageStyle: {},
      titleStyle: {
        'font-size': 14,
        'color': '#333',
        'line-height': 20,
        'text-align': 'center',
        'font-weight': 'bold',
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 20,
        'padding-bottom': 15
      },
      fTagStyle: {
        'font-size': 14,
        'color': '#fff',
        'line-height': 20,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 5,
        'padding-bottom': 5,
        'background-color': '#f00b7e'
      }
    }
  }
}
// content
const contentSetParam13 = {
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
      title: '标签',
      tag: 'fTag',
      param: {
        placeholder: '请输入标签'
      }
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
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList13 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList13.push(contentSetParam13)
// style
const contentPaddingBottomSet = {
  type: 'inputGroup',
  title: '行间距(px)',
  tag: 'contentPaddingBottom',
  param: {
    placeholder: '请输入行间距'
  }
}
const theme1ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme1ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)

const themeSet = {
  theme: 13,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList13
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme1ItemStyleSetGroup,
        commonSet.fitImageSetGroup,
        {
          type: 'setGroup',
          title: '内容位置',
          open: false,
          setList: [
            {
              type: 'inputGroup',
              title: '顶部距离px',
              tag: 'top',
              setValueKey: 'fContentStyle',
              param: {
                placeholder: '请输入顶部距离'
              }
            },
            {
              type: 'inputGroup',
              title: '底部距离px',
              tag: 'bottom',
              setValueKey: 'fContentStyle',
              param: {
                placeholder: '请输入底部距离'
              }
            }
          ]
        },
        commonSet.getTextGroupParam('标签', 'fTagStyle'),
        commonSet.getTextGroupParam('标题', 'titleStyle')
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
