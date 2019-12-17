/*
  14.横向滚动-文字内嵌
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/r1xgenm5jtn.jpg',
  title: '横向滚动-文字内嵌',
  config: {
    module: {
      name: '横向滚动-文字内嵌',
      tag: 'images',
      theme: 14,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/zksphhfgmpi.jpg',
            fTitle: '',
            fDescription: '沙宣魔法棒的秘密'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/s81t1dx1vv.jpg',
            fTitle: '型走时装周',
            fDescription: '2020春夏国际时装周'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/0h1dz30ba0n.jpg',
            fTitle: '光影威尼斯',
            fDescription: '直击威尼斯电影节'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/u02i43etewm.jpg',
            fTitle: '',
            fDescription: '大学的开学必备清单'
          }
        ]
      },
      contentPaddingRight: 15,
      columNum: 2.3,
      moduleStyle: {
        'padding-bottom': 15,
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {},
      imageStyle: {},
      fContentStyle: {
        bottom: 10
      },
      textMaskImage: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/jyeqq4r4fcn.png',
      fTitleStyle: {
        'font-size': 14,
        'color': '#fff',
        'line-height': 16,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10
      },
      fDescriptionStyle: {
        'font-size': 12,
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
const contentSetParam14 = {
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
const contentSetList14 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList14.push(contentSetParam14)
// style
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
const theme3ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme3ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme3ItemStyleSetGroup.setList.unshift(columNumSet)

const themeSet = {
  theme: 14,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList14
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme3ItemStyleSetGroup,
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
