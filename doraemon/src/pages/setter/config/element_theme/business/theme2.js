/*
  2.loading-横向
*/
import commonSet from '../../common_set'

const theme = {
  title: 'loading-横向',
  config: {
    elements: [
      {
        name: 'loading-横向',
        tag: 'business',
        theme: 2,
        businessTag: 'loading1',
        animationRepeat: 1,
        elementStyle: {
          'width': 150,
          'height': 30,
          'left': 0,
          'top': 0,
          'rotateZ': 0
        }
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
          type: 'radioTabGroup',
          title: '加载完是否隐藏',
          tag: 'loadedHide',
          defaultValue: 0,
          data: [
            {
              option: '否',
              value: 0
            },
            {
              option: '是',
              value: 1
            }
          ]
        },
        commonSet.getTextGroupParam('文字', 'textStyle'),
        {
          type: 'setGroup',
          title: '进度条设置',
          open: false,
          setList: [
            {
              type: 'colorGroup',
              title: '进度条背景色',
              tag: 'background',
              setValueKey: 'loading1BarStyle'
            },
            {
              type: 'colorGroup',
              title: '已加载背景色',
              tag: 'background',
              setValueKey: 'loading1BarLoadedStyle'
            },
            {
              type: 'inputGroup',
              title: '进度高度px',
              tag: 'height',
              param: {
                placeholder: '请输入进度高度'
              },
              setValueKey: 'loading1BarStyle'
            },
            {
              type: 'inputGroup',
              title: '进度条圆角px',
              tag: 'border-radius',
              param: {
                placeholder: '请输入进度条圆角'
              },
              setValueKey: 'loading1BarStyle'
            },
            {
              type: 'inputGroup',
              title: '已加载圆角px',
              tag: 'border-radius',
              param: {
                placeholder: '请输入已加载圆角'
              },
              setValueKey: 'loading1BarLoadedStyle'
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
