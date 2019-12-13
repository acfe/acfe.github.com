/*
  5.图片模块
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/n4vg3y1rbw8.png',
  title: '图片模块',
  config: {
    module: {
      name: '图片模块',
      tag: 'images',
      theme: 5,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/n4vg3y1rbw8.png'
          }
        ]
      },
      contentPaddingBottom: 0,
      moduleStyle: {},
      itemStyle: {},
      imageStyle: {}
    }
  }
}
// content
const contentSetParam5 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'imageGroup',
      title: '图片地址',
      tag: 'url'
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList5 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList5.push(contentSetParam5)
// style
const contentPaddingBottomSet = {
  type: 'inputGroup',
  title: '行间距(px)',
  tag: 'contentPaddingBottom',
  param: {
    placeholder: '请输入行间距'
  }
}
const theme5ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme5ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)

const themeSet = {
  theme: 5,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList5
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme5ItemStyleSetGroup,
        commonSet.fitImageSetGroup
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
