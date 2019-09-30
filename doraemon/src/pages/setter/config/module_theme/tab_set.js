import commonSet from '../common_set'
// theme1
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
const tabSetTheme = [
  // 空白tab
  {
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
]
export default tabSetTheme
