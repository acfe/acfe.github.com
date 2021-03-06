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
          title: '弹窗属性设置',
          open: true,
          setList: [
            {
              type: 'textareaGroup',
              title: '弹窗名称',
              tag: 'name',
              param: {
                placeholder: '请输入弹窗名称'
              }
            }
          ]
        },
        {
          type: 'radioTabGroup',
          title: '弹窗对齐',
          tag: 'popValign',
          defaultValue: 'top',
          data: [
            {
              option: '靠上',
              value: 'top'
            },
            {
              option: '居中',
              value: 'center'
            },
            {
              option: '靠下',
              value: 'bottom'
            }
          ]
        },
        commonSet.getBackgroundParam('弹窗背景设置', 'style'),
        {
          type: 'textareaGroup',
          title: '背景透明度',
          tag: 'opacity',
          setValueKey: 'style',
          param: {
            placeholder: '请输入透明度'
          }
        }
      ]
    }
  ]
}
export default pageSetParam
