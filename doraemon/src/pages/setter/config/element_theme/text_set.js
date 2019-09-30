import commonSet from '../common_set'
const textSetTheme = [
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
            type: 'textareaGroup',
            title: '文字内容',
            tag: 'text',
            param: {
              placeholder: '请输入内容'
            }
          },
          Object.assign(commonSet.getTextGroupParam('文字样式', 'textStyle')),
          commonSet.elementStyleSetGroup
        ]
      },
      {
        title: '事件',
        setType: 'action',
        setList: [
          {
            type: 'actionGroup',
            tag: 'action'
          }
        ]
      }
    ]
  }
]
export default textSetTheme
