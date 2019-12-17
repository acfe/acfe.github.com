/*
  1.单图
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/uehk6a4q9j.jpg',
  title: '单图',
  config: {
    elements: [
      {
        name: '单图',
        url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/uehk6a4q9j.jpg',
        tag: 'image',
        theme: 1,
        animationRepeat: 1,
        elementStyle: {
          'width': 100,
          'height': 75,
          'left': 0,
          'top': 0,
          'rotateZ': 0
        },
        imageStyle: {}
      }
    ]
  }
}
// content
const imageStyleParam = {
  title: '图片样式设置',
  type: 'setGroup',
  setList: [
    {
      type: 'fitImageGroup',
      hideHeight: true
    },
    commonSet.getPaddingParam('图片边距设置', 'imageStyle'),
    commonSet.getRadiusParam('图片圆角设置', 'imageStyle'),
    commonSet.getBorderParam('图片边框设置', 'imageStyle')
  ]
}

const themeSet = {
  theme: 1,
  setType: 'style',
  data: [
    {
      title: '样式',
      setType: 'style',
      setList: [
        {
          type: 'inputGroup',
          title: '元素名称',
          tag: 'name',
          param: {
            placeholder: '请输入名称'
          }
        },
        {
          type: 'setGroup',
          title: '图片设置',
          open: true,
          setList: [
            {
              type: 'imageGroup',
              tag: 'url'
            }
          ]
        },
        imageStyleParam,
        commonSet.elementStyleSetGroup
      ]
    },
    commonSet.actionSetParam,
    commonSet.animationSetParam
  ]
}

export default {
  theme,
  themeSet
}
