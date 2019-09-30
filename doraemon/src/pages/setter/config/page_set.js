import commonSet from './common_set'
const pageSetParam = {
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: [
        {
          type: 'setGroup',
          title: '页面属性设置',
          open: true,
          setList: [
            {
              type: 'textareaGroup',
              title: '页面名称',
              tag: 'name',
              param: {
                placeholder: '请输入页面名称'
              }
            },
            {
              type: 'radioTabGroup',
              title: '是否tab页',
              tag: 'isTab',
              defaultValue: 0,
              data: [
                {
                  option: '是',
                  value: 1
                },
                {
                  option: '否',
                  value: 0
                }
              ]
            }
          ]
        },
        commonSet.getBackgroundParam('页面背景设置', 'style')
      ]
    }
  ]
}
export default pageSetParam
