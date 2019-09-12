export default {
  // images
  images: [
    {
      option: '单图排版',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingBottom',
            title: '行间距px',
            placeholder: '请输入行间距'
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '图片样式'
          }
        }
      ],
      style: {}
    },
    {
      option: '多列排版',
      value: 2,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingBottom',
            title: '行间距px',
            placeholder: '请输入行间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingRight',
            title: '列间距px',
            placeholder: '请输入列间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'columNum',
            title: '每行显示数量',
            placeholder: '请输入数量'
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '图片样式'
          }
        }
      ]
    },
    {
      option: '轮播图',
      value: 3,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'radioTab',
          param: {
            tag: 'loop',
            title: '是否循环',
            data: [
              {
                option: '循环',
                value: 1
              },
              {
                option: '不循环',
                value: 0
              }
            ],
            defaultValue: 1
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'autoPlayTime',
            title: '轮播时间ms',
            placeholder: '请输入时间ms'
          }
        },
        {
          type: 'radioTab',
          param: {
            tag: 'showGuild',
            title: '轮播导航',
            data: [
              {
                option: '显示',
                value: 1
              },
              {
                option: '不显示',
                value: 0
              }
            ],
            defaultValue: 1
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '图片样式'
          }
        }
      ]
    },
    {
      option: '横向滚动',
      value: 4,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingRight',
            title: '列间距px',
            placeholder: '请输入列间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'columNum',
            title: '每行显示数量',
            placeholder: '请输入数量'
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '内容图片样式'
          }
        }
      ]
    }
  ],
  // menus
  menus: [
    {
      option: '文本菜单',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingRight',
            title: '列间距px',
            placeholder: '请输入列间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'columNum',
            title: '每行显示数量',
            placeholder: '请输入数量'
          }
        }
      ]
    },
    {
      option: '图文菜单',
      value: 2,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingBottom',
            title: '行间距px',
            placeholder: '请输入行间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingRight',
            title: '列间距px',
            placeholder: '请输入列间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'columNum',
            title: '每行显示数量',
            placeholder: '请输入数量'
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '内容图片样式'
          }
        }
      ]
    }
  ],
  // goods
  goods: [
    {
      option: '列表',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingBottom',
            title: '行间距px',
            placeholder: '请输入行间距'
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '内容图片样式'
          }
        }
      ]
    },
    {
      option: '图文',
      value: 2,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingBottom',
            title: '行间距px',
            placeholder: '请输入行间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingRight',
            title: '列间距px',
            placeholder: '请输入列间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'columNum',
            title: '每行显示数量',
            placeholder: '请输入数量'
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '内容图片样式'
          }
        }
      ]
    },
    {
      option: '横向滚动',
      value: 4,
      support: ['h5', 'wx', 'alipay'],
      setEnabelList: [
        {
          type: 'textarea',
          param: {
            tag: 'imageRadius',
            title: '图片圆角px',
            placeholder: '请输入图片圆角'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'contentPaddingRight',
            title: '列间距px',
            placeholder: '请输入列间距'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'columNum',
            title: '每行显示数量',
            placeholder: '请输入数量'
          }
        },
        {
          type: 'imageSizeStyle',
          param: {
            tag: 'imageStyle',
            title: '内容图片样式'
          }
        }
      ]
    }
  ],
  // tab
  tab: [
    {
      option: '默认',
      value: 1,
      support: ['h5', 'wx', 'alipay']
    }
  ]
}
