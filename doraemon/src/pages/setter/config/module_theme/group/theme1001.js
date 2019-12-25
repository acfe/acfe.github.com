/*
  1001.开关
*/
import commonSet from '../../common_set'

// content
const theme1ContentSetList = [
  {
    type: 'inputGroup',
    title: '模块名称',
    tag: 'name',
    param: {
      placeholder: '请输入模块名称'
    }
  },
  {
    title: '内容设置',
    type: 'contentGroup',
    setList: [
      {
        type: 'textareaGroup',
        title: '标题',
        tag: 'title',
        param: {
          placeholder: '请输入标题'
        }
      },
      {
        type: 'selectorGroup',
        title: '关联页面',
        tag: 'tabPageId',
        defaultOption: '请选择',
        dataSource: 'tabPage'
      }
    ]
  }
]

const themeSet = {
  theme: 1001,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: theme1ContentSetList
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        {
          type: 'setGroup',
          title: '模块设置',
          open: false,
          setList: [
            {
              type: 'heightGroup',
              title: '模块高度'
            },
            commonSet.getPaddingParam('模块边距设置', 'moduleStyle'),
            commonSet.getRadiusParam('模块圆角设置', 'moduleStyle'),
            commonSet.getBackgroundParam('模块背景设置', 'moduleStyle'),
            commonSet.getBorderParam('模块边框设置', 'moduleStyle')
          ]
        },
        {
          type: 'setGroup',
          title: '列表项设置',
          open: false,
          setList: [
            {
              type: 'inputGroup',
              title: '底部间距(px)',
              tag: 'contentPaddingBottom',
              param: {
                placeholder: '请输入底部间距'
              }
            },
            commonSet.getPaddingParam('列表项边距设置', 'itemStyle'),
            commonSet.getRadiusParam('列表项圆角设置', 'itemStyle'),
            commonSet.getBackgroundParam('列表项背景设置', 'itemStyle'),
            commonSet.getBorderParam('列表项边框设置', 'itemStyle')
          ]
        },
        commonSet.getTextGroupParam('标题', 'titleStyle'),
        {
          type: 'setGroup',
          title: '图标设置',
          open: false,
          setList: [
            {
              type: 'inputGroup',
              title: '图标宽度(px)',
              tag: 'iconWidth',
              param: {
                placeholder: '请输入图标宽度'
              }
            },
            {
              type: 'inputGroup',
              title: '右间距(px)',
              tag: 'iconRight',
              param: {
                placeholder: '请输入图标右间距'
              }
            },
            {
              type: 'colorGroup',
              title: '图标颜色',
              tag: 'iconColor'
            }
          ]
        }
      ]
    }
  ]
}

export default {
  themeSet
}
