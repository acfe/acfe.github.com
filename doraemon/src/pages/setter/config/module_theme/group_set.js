import commonSet from '../common_set'
const contentSetParam = {
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
      type: 'textareaGroup',
      title: '描述',
      tag: 'description',
      param: {
        placeholder: '请输入描述'
      }
    },
    {
      type: 'radioTabGroup',
      title: '标题前标颜色',
      tag: 'tipBarColor',
      defaultValue: '#F3C500',
      data: [
        {
          option: '黄色',
          value: '#F3C500'
        },
        {
          option: '绿色',
          value: '#9AD708'
        },
        {
          option: '蓝色',
          value: '#6E83EB'
        }
      ]
    },
    {
      type: 'textareaGroup',
      title: '更新提示',
      tag: 'newTip',
      param: {
        placeholder: '请输入描述'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}

const contentSetList = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList.push(contentSetParam)

const groupSetTheme = [
  // Banner排版
  {
    theme: 1,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          commonSet.titleStyleGroup,
          commonSet.descriptionStyleGroup
        ]
      }
    ]
  }
]
export default groupSetTheme
