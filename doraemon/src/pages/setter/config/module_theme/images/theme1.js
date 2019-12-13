/*
  1.图文模块-标题居下
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/zdo3d4l2ene.jpg?imageView2/2/w/240',
  title: '图文模块-标题居下',
  config: {
    module: {
      name: '图文模块-标题居下',
      tag: 'images',
      theme: 1,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/zdo3d4l2ene.jpg',
            title: '旅行照怎么拍才美？收好这6个护肤TIPS！'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/bpjr1w1zcuv.jpg',
            title: '不用改叫宋慧乔 你也可以粉嫩冻龄'
          }
        ]
      },
      contentPaddingBottom: 10,
      moduleStyle: {
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {},
      imageStyle: {},
      titleStyle: {
        'font-size': 14,
        'color': '#333333',
        'line-height': 16,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 10,
        'padding-bottom': 10
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#666666',
        'line-height': 16,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 10,
        'padding-bottom': 10
      }
    }
  }
}
// content
const contentSetParam1 = {
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
      title: '描述',
      tag: 'description',
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
const contentSetList1 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList1.push(contentSetParam1)
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
  theme: 1,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList1
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme1ItemStyleSetGroup,
        commonSet.fitImageSetGroup,
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
