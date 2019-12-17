/*
  15.多列排版-文字内嵌
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/2spc2yy70z.jpg',
  title: '多列排版-文字内嵌',
  config: {
    module: {
      name: '多列排版-文字内嵌',
      tag: 'images',
      theme: 15,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/axsx6rs465.png',
            fTitle: '',
            fDescription: '期待过个不一样的夏天'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/y0i03yje3ta.png',
            fTitle: '',
            fDescription: '又到穿裙子的季节'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/qa9rlz8c7o.png',
            fTitle: '',
            fDescription: '好看的照片都有共同点'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/u0qt1lrgw2m.png',
            fTitle: '科技Tech',
            fDescription: '颜好性能妙的科技潮品'
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
      fContentStyle: {
        bottom: 10
      },
      textMaskImage: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ctx62guuli.png',
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
const contentSetParam15 = {
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
const contentSetList15 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList15.push(contentSetParam15)
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
const theme15ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme15ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme15ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
theme15ItemStyleSetGroup.setList.unshift(columNumSet)

const themeSet = {
  theme: 15,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList15
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme15ItemStyleSetGroup,
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
