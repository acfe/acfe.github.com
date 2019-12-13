/*
  1.空白tab
*/
import commonSet from '../../common_set'

const theme = {
  title: '空白tab',
  titleStyle: {
    'line-height': '24px',
    'padding-top': 0
  },
  config: {
    module: {
      name: '空白tab',
      tag: 'tab',
      theme: 1,
      dataType: 0,
      singleDatas: {
        checkedId: 1,
        data: [
          {
            checkedId: 1,
            name: '测试项'
          }
        ]
      },
      moduleStyle: {}
    }
  }
}
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
        title: '名称',
        tag: 'name',
        param: {
          placeholder: '请输入tab名'
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
  theme: 1,
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
          open: true,
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
        }
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
