import commonSet from '../common_set'

const actionSetParam = {
  title: '事件',
  setType: 'action',
  setList: [
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const animationSetParam = {
  title: '动画',
  setType: 'animation',
  setList: [
    {
      type: 'inputGroup',
      title: '整体播放次数',
      tag: 'animationRepeat',
      param: {
        placeholder: '无限循环请输入0'
      }
    },
    {
      title: '动画设置',
      type: 'contentGroup',
      tag: 'animations',
      setList: [
        {
          type: 'animationGroup'
        }
      ]
    }
  ]
}
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
const imageSetTheme = [
  {
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
      actionSetParam,
      animationSetParam
    ]
  },
  {
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
      actionSetParam,
      animationSetParam
    ]
  },
  {
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
      actionSetParam,
      animationSetParam
    ]
  }
]
export default imageSetTheme
