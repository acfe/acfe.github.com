/*
  2.视频
*/
import commonSet from '../../common_set'

const theme = {
  title: '视频',
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ipztbouse7m.png',
  config: {
    elements: [
      {
        name: '视频',
        tag: 'image',
        poster: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ipztbouse7m.png',
        src: 'http://consumerapp-1251779293.file.myqcloud.com/patch/201812/v0xs23fhb3BMG.mp4',
        theme: 2,
        animationRepeat: 1,
        elementStyle: {
          'width': 320,
          'height': 200,
          'left': 0,
          'top': 0,
          'rotateZ': 0,
          'background-color': '#fff'
        },
        imageStyle: {}
      }
    ]
  }
}

const themeSet = {
  theme: 2,
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
          title: '视频设置',
          open: true,
          setList: [
            {
              type: 'imageGroup',
              tag: 'poster',
              title: '封面图',
              showTitle: true
            },
            {
              type: 'textareaGroup',
              tag: 'src',
              title: '视频地址'
            }
          ]
        },
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
