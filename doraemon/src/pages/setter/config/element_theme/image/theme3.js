/*
  3.帧动画
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/qa9rlz8c7o.png',
  title: '帧动画',
  config: {
    elements: [
      {
        name: '帧动画',
        tag: 'image',
        theme: 3,
        animationRepeat: 1,
        playNum: 1,
        fps: 200,
        frames: {
          data: [
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/qa9rlz8c7o.png'
            },
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/y0i03yje3ta.png'
            },
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/axsx6rs465.png'
            },
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/u0qt1lrgw2m.png'
            }
          ]
        },
        elementStyle: {
          'width': 100,
          'height': 100,
          'left': 0,
          'top': 0,
          'rotateZ': 0
        }
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
  theme: 3,
  setType: 'style',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: [
        {
          type: 'inputGroup',
          title: '帧频',
          tag: 'fps',
          param: {
            placeholder: '请输入帧频'
          }
        },
        {
          type: 'inputGroup',
          title: '播放次数',
          tag: 'playNum',
          param: {
            placeholder: '无限循环请置空'
          }
        },
        {
          title: '帧图片设置',
          type: 'contentGroup',
          tag: 'frames',
          setList: [
            {
              type: 'imageGroup',
              title: '图片地址',
              tag: 'url'
            }
          ]
        }
      ]
    },
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
