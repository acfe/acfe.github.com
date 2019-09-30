import commonSet from './common_set'
const bodySetParam = {
  setList: [
    {
      type: 'setGroup',
      title: '全局属性设置',
      open: true,
      setList: [
        {
          type: 'textareaGroup',
          title: '文档标题',
          tag: 'title',
          param: {
            placeholder: '请输入文档标题'
          }
        },
        {
          type: 'textareaGroup',
          title: '文档关键字',
          tag: 'keyword',
          param: {
            placeholder: '请输入文档关键字'
          }
        }
      ]
    },
    commonSet.getBackgroundParam('文档背景设置', 'style')
  ]
}
export default bodySetParam
