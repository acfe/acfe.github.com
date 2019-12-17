/*
  12.图文模块-文字内嵌
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/0bc6j2i5shk.jpg',
  title: '图文模块-文字内嵌',
  config: {
    module: {
      name: '图文模块-文字内嵌',
      tag: 'images',
      theme: 12,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ormq8xecxcd.jpg',
            fTitle: '时尚Fashion',
            fDescription: '年终奖就买这些高性价比的千元小众包'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/j8v5lqz8nds.jpg',
            fTitle: '美容Beauty',
            fDescription: '石原里美示范三秒能搞定的腮红'
          }
        ]
      },
      contentPaddingBottom: 10,
      fContentStyle: {
        bottom: 10
      },
      textMaskImage: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ctx62guuli.png',
      moduleStyle: {
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {},
      imageStyle: {},
      fTitleStyle: {
        'font-size': 16,
        'color': '#fff',
        'line-height': 20,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10
      },
      fDescriptionStyle: {
        'font-size': 14,
        'color': '#fff',
        'line-height': 20,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 5
      }
    }
  }
}
// content
const contentSetParam12 = {
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
      tag: 'fTitle',
      param: {
        placeholder: '请输入标题'
      }
    },
    {
      type: 'textareaGroup',
      title: '描述',
      tag: 'fDescription',
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
const contentSetList12 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList12.push(contentSetParam12)
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
  theme: 12,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList12
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
          title: '内容设置',
          open: false,
          setList: [
            {
              type: 'imageGroup',
              title: '文字蒙层背景',
              showTitle: true,
              tag: 'textMaskImage'
            },
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
        commonSet.getTextGroupParam('标题', 'fTitleStyle'),
        commonSet.getTextGroupParam('描述', 'fDescriptionStyle')
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
