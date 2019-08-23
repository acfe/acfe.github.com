export default {
  // images
  images: [
    {
      option: '单图排版',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      titleStyle: {
        'font-size': 14,
        'color': '#666666',
        'line-height': 16
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#cccccc',
        'line-height': 16
      },
      contentPaddingBottom: 10,
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
            tag: 'contentPaddingBottom',
            title: '行间距px',
            placeholder: '请输入行间距'
          }
        }
      ],
      style: {}
    },
    {
      option: '多列排版',
      value: 2,
      support: ['h5', 'wx', 'alipay'],
      contentPaddingBottom: 10,
      contentPaddingRight: 10,
      columNum: 2,
      titleStyle: {
        'font-size': 14,
        'color': '#666666',
        'line-height': 16
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#cccccc',
        'line-height': 16
      },
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
      ],
      imageStyle: {
        'width': '',
        'height': '',
        'border-radius': 0,
        'align': 'center'
      },
      style: {
        'padding-left': 10
      }
    },
    {
      option: '轮播图',
      value: 3,
      support: ['h5', 'wx', 'alipay'],
      loop: 1,
      autoPlayTime: 5000,
      showGuild: 1,
      setEnabel: {
        imageRadius: true,
        loop: true,
        autoPlayTime: true,
        showGuild: true
      },
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
        }
      ],
      style: {}
    },
    {
      option: '横向滚动',
      value: 4,
      support: ['h5', 'wx', 'alipay'],
      contentPaddingRight: 10,
      columNum: 3,
      titleStyle: {
        'font-size': 14,
        'color': '#666666',
        'line-height': 16
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#cccccc',
        'line-height': 16
      },
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
      ],
      imageStyle: {
        'width': '',
        'height': '',
        'border-radius': 0,
        'align': 'center'
      },
      style: {
        'padding-left': 10,
        'padding-bottom': 10
      }
    }
  ],
  // menus
  menus: [
    {
      option: '文本菜单',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      contentPaddingRight: 0,
      columNum: 4,
      moduleHeight: 45,
      heightType: 'set',
      nameStyle: {
        'font-size': 14,
        'color': '#666666',
        'text-align': 'center',
        'line-height': 26
      },
      nameCheckedStyle: {
        'color': '#2979FF',
        'text-align': 'center',
        'line-height': 26
      },
      checkedBarStyle: {
        'background': '#2979FF',
        'width': 50,
        'height': 3,
        'top': 36,
        'border-radius': 3,
        'align': 'center'
      },
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
      ],
      style: {}
    },
    {
      option: '图文菜单',
      value: 2,
      support: ['h5', 'wx', 'alipay'],
      contentPaddingRight: 0,
      contentPaddingBottom: 0,
      columNum: 5,
      nameStyle: {
        'font-size': 14,
        'color': '#666666',
        'text-align': 'center'
      },
      nameCheckedStyle: {
        'color': '#2979FF',
        'text-align': 'center'
      },
      imageStyle: {
        'width': '',
        'height': 36,
        'border-radius': 0,
        'align': 'center'
      },
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
      ],
      style: {}
    }
  ],
  // goods
  goods: [
    {
      option: '列表',
      value: 1,
      support: ['h5', 'wx', 'alipay'],
      nameStyle: {
        'font-size': 14,
        'color': '#333333',
        'text-align': 'left',
        'line-height': 16
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#666666',
        'text-align': 'left',
        'line-height': 16
      },
      salePriceStyle: {
        'font-size': 12,
        'color': '#ff0000',
        'text-align': 'left'
      },
      originPriceStyle: {
        'font-size': 12,
        'color': '#666666',
        'text-align': 'left'
      },
      showSalePrice: 1,
      showDescription: 1,
      showOriginPrice: 1,
      imageWidth: 120,
      contentPaddingBottom: 10,
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
            tag: 'imageRadius',
            title: '图片圆角px',
            placeholder: '请输入圆角px'
          }
        },
        {
          type: 'textarea',
          param: {
            tag: 'imageWidth',
            title: '图片宽度px',
            placeholder: '请输入图片宽度'
          }
        }
      ],
      style: {}
    },
    {
      option: '图文',
      value: 2,
      support: ['h5', 'wx', 'alipay'],
      nameStyle: {
        'font-size': 14,
        'color': '#333333',
        'text-align': 'left',
        'line-height': 16
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#666666',
        'text-align': 'left',
        'line-height': 16
      },
      salePriceStyle: {
        'font-size': 12,
        'color': '#ff0000',
        'text-align': 'left'
      },
      originPriceStyle: {
        'font-size': 12,
        'color': '#666666',
        'text-align': 'left'
      },
      showSalePrice: 1,
      showDescription: 2,
      showOriginPrice: 2,
      columNum: 2,
      contentPaddingRight: 10,
      imageStyle: {
        'width': '',
        'height': '',
        'border-radius': '',
        'align': 'center'
      },
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
      ],
      style: {
        'padding-left': 10
      }
    },
    {
      option: '横向滚动',
      value: 4,
      support: ['h5', 'wx', 'alipay'],
      contentPaddingRight: 10,
      columNum: 3,
      titleStyle: {
        'font-size': 14,
        'color': '#666666',
        'line-height': 16
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#cccccc',
        'line-height': 16
      },
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
      ],
      imageStyle: {
        'width': '',
        'height': '',
        'border-radius': 0,
        'align': 'center'
      },
      style: {
        'padding-left': 10,
        'padding-bottom': 10
      }
    }
  ]
}
