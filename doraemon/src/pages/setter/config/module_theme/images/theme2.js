/*
  2.多列排版-双列
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/dzzodaniz4.jpg',
  title: '多列排版-双列',
  config: {
    module: {
      name: '多列排版',
      tag: 'images',
      theme: 2,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/qa9rlz8c7o.png',
            title: '看了海量出游照，我发现好看的照片都有一个共同点！'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/y0i03yje3ta.png',
            title: '又到穿裙子、衬衫的季节，我选了这些'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/axsx6rs465.png',
            title: '有了它们，期待过个不一样的夏天'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/u0qt1lrgw2m.png',
            title: '颜好性能妙的科技潮品让你的学习娱乐双向开挂'
          }
        ]
      },
      contentPaddingRight: 15,
      contentPaddingBottom: 20,
      columNum: 2,
      moduleStyle: {
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {},
      imageStyle: {},
      titleStyle: {
        'font-size': 14,
        'color': '#333333',
        'line-height': 20,
        'padding-top': 10
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
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList2 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList2.push(contentSetParam2)
// style
const contentPaddingBottomSet = {
  type: 'inputGroup',
  title: '行间距(px)',
  tag: 'contentPaddingBottom',
  param: {
    placeholder: '请输入行间距'
  }
}
const contentPaddingRightSet = {
  type: 'inputGroup',
  title: '列间距(px)',
  tag: 'contentPaddingRight',
  param: {
    placeholder: '请输入列间距'
  }
}
const columNumSet = {
  type: 'inputGroup',
  title: '每行显示列数',
  tag: 'columNum',
  param: {
    placeholder: '每行显示列数'
  }
}
const theme2ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme2ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme2ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
theme2ItemStyleSetGroup.setList.unshift(columNumSet)

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
        theme2ItemStyleSetGroup,
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
