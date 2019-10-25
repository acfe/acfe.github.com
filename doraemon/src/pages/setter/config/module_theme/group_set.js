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

const contentSetParam2 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'textareaGroup',
      title: '问题',
      tag: 'title',
      param: {
        placeholder: '请输入问题'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}

const contentSetParam3 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'imageGroup',
      title: '图片地址',
      tag: 'url'
    },
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
      title: '发布时间',
      tag: 'description',
      param: {
        placeholder: '请输入发布时间'
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
const contentSetList2 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList2.push(contentSetParam2)
const contentSetList3 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList3.push(contentSetParam3)

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
  },
  // 常见问题列表
  {
    theme: 2,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList2
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          commonSet.getTextGroupParam('问题', 'titleStyle')
        ]
      }
    ]
  },
  // 专题列表
  {
    theme: 3,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList3
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          commonSet.imageStyleSetGroup,
          commonSet.titleStyleGroup,
          commonSet.descriptionStyleGroup
        ]
      }
    ]
  },
  // 专题列表
  {
    theme: 4,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
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
            title: '作者',
            tag: 'author',
            param: {
              placeholder: '请输入作者'
            }
          },
          {
            type: 'textareaGroup',
            title: '发布时间',
            tag: 'time',
            param: {
              placeholder: '请输入发布时间'
            }
          }
        ]
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          commonSet.titleStyleGroup
        ]
      }
    ]
  }
]
export default groupSetTheme
