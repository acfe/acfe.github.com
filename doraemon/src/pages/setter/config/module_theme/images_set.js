const LockPositionParam = {
  type: 'radioTabGroup',
  title: '模块位置',
  tag: 'lockPosition',
  defaultValue: 'normal',
  data: [
    {
      option: '正常',
      value: 'normal'
    },
    {
      option: '吸顶',
      value: 'top'
    },
    {
      option: '吸底',
      value: 'bottom'
    },
    {
      option: '吸附',
      value: 'lock'
    }
  ]
}
const imagesSetTheme = [
  // Banner排版
  {
    theme: 1,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: [
          {
            type: 'inputGroup',
            title: '模块名称',
            tag: 'name',
            param: {
              placeholder: '请输入模块名称'
            }
          },
          {
            type: 'setGroup',
            title: '数据源设置',
            setList: [
              {
                type: 'radioTabGroup',
                title: '选择数据源',
                tag: 'dataType',
                refreshSetter: 1,
                data: [
                  {
                    option: '独立数据',
                    value: 0
                  },
                  {
                    option: '数据源',
                    value: 1
                  }
                ],
                defaultValue: 0
              },
              {
                type: 'dataSourceGroup',
                tag: 'dataSourceId'
              }
            ]
          },
          {
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
                title: '描述',
                tag: 'description',
                param: {
                  placeholder: '请输入描述'
                }
              }
            ]
          }
        ]
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          LockPositionParam
        ]
      }
    ]
  }
]
export default imagesSetTheme
