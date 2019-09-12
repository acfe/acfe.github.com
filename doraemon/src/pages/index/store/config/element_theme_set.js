export default {
  image: [
    {
      option: '默认样式',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: []
    }
  ],
  text: [
    {
      option: '默认样式',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: []
    }
  ],
  icon: [
    {
      option: '默认样式',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: []
    }
  ],
  // search
  search: [
    {
      option: '默认样式',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'radioTab',
          param: {
            tag: 'showType',
            title: '默认显示',
            defaultValue: 1,
            data: [
              {
                option: '整体',
                value: 1
              },
              {
                option: '搜索按钮',
                value: 2
              }
            ]
          }
        },
        {
          type: 'radioTab',
          param: {
            tag: 'showIcon',
            title: '是否显示图标',
            defaultValue: 1,
            data: [
              {
                option: '是',
                value: 1
              },
              {
                option: '否',
                value: ''
              }
            ]
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'iconWidth',
            title: '图标宽度px',
            placeholder: '请输入宽度px'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'iconColor',
            title: '图标颜色',
            placeholder: '请输入颜色',
            defaultValue: '#cdcdcd'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'placeholder',
            title: '输入提示文字',
            placeholder: '请输入提示文字'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'searchText',
            title: '按钮文字内容',
            placeholder: '请输入文字'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'searchInputPadding',
            title: '搜索框与按钮间距px',
            placeholder: '请输入间距px'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'backInputPadding',
            title: '搜索框与返回图标间距px',
            placeholder: '请输入间距px'
          }
        },
        {
          type: 'radioTab',
          param: {
            tag: 'showBackIcon',
            title: '是否显示返回图标',
            defaultValue: 1,
            data: [
              {
                option: '是',
                value: 1
              },
              {
                option: '否',
                value: ''
              }
            ]
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'backIconWidth',
            title: '返回图标宽度px',
            placeholder: '请输入宽度px'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'backIconColor',
            title: '返回图标颜色',
            placeholder: '请输入颜色',
            defaultValue: '#cdcdcd'
          }
        }
      ]
    }
  ]
}
