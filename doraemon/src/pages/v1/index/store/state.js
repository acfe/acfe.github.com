import moudlueThemeConfig from './config/module_theme'
import elementThemeConfig from './config/element_theme'

module.exports = {
  title: '丰巢产品运营管理平台',
  // set
  setConfig: {
    moudlueThemeConfig: JSON.parse(JSON.stringify(moudlueThemeConfig)),
    elementThemeConfig: JSON.parse(JSON.stringify(elementThemeConfig)),
    showEditor: false,
    setType: '', // body 主窗体 module 模块  element 元素
    setPageId: 0,
    setPopId: 0,
    setModuleId: 0,
    setModuleTag: 'images',
    setModuleList: [],
    setElementTag: 'text',
    setElementList: [],
    setElementId: 0,
    showElementWindow: false,
    setterParam: {
      key: Math.random()
    },
    leftTabParam: {
      value: 0,
      data: [
        {
          option: '页面',
          value: 0,
          show: true
        },
        {
          option: '弹窗',
          value: 1,
          show: true
        }
      ]
    },
    rightTabParam: {
      value: 0,
      data: [
        {
          option: '内容',
          value: 0,
          show: true
        },
        {
          option: '样式',
          value: 1,
          show: true
        },
        {
          option: '事件',
          value: 2,
          show: false
        },
        {
          option: '动画',
          value: 3,
          show: false
        }
      ]
    },
    editTabParam: {
      value: 0,
      data: [
        {
          option: '设置',
          value: 0,
          show: true
        },
        {
          option: '插入模块',
          value: 1,
          show: true
        },
        {
          option: '插入元素',
          value: 2,
          show: true
        },
        {
          option: '全局设置',
          value: 3,
          show: true
        }
      ]
    },
    channels: [
      {
        tag: 'h5',
        name: 'h5'
      },
      {
        tag: 'wx',
        name: '微信公众号'
      },
      {
        tag: 'wx_mini',
        name: '微信小程序'
      },
      {
        tag: 'alipay',
        name: '支付宝服务窗'
      },
      {
        tag: 'alipay_mini',
        name: '支付宝小程序'
      },
      {
        tag: 'fast',
        name: '快应用'
      },
      {
        tag: 'baidu_mini',
        name: '百度小程序'
      }
    ],
    moduleListParam: [
      {
        name: '图文',
        tag: 'images',
        support: ['h5', 'wx', 'alipay']
      },
      {
        name: '菜单',
        tag: 'menus',
        support: ['h5', 'wx', 'alipay']
      },
      {
        name: 'tab',
        tag: 'tab',
        support: ['h5', 'wx', 'alipay']
      },
      {
        name: '商品',
        tag: 'goods',
        support: ['h5', 'wx', 'alipay']
      }
    ],
    elementListParam: [
      {
        name: '文字',
        tag: 'text',
        support: ['h5', 'wx', 'alipay']
      },
      {
        name: '图片',
        tag: 'image',
        support: ['h5', 'wx', 'alipay']
      },
      {
        name: '图标',
        tag: 'icon',
        support: ['h5', 'wx', 'alipay']
      },
      {
        name: '搜索',
        tag: 'search',
        support: ['h5', 'wx', 'alipay']
      }
    ],
    elementWindowSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'elementWindow',
      borderStyle: '1px dashed #64B5F6',
      content: []
    },
    moduleWindowSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'moduleWindow',
      borderStyle: '1px dashed #64B5F6',
      content: []
    },
    popElementWindowSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'elementWindow',
      borderStyle: '1px dashed #64B5F6',
      content: []
    },
    pageListOrderSetterParam: {
      key: Math.random(),
      hideAdd: true,
      lockFirst: true,
      delTip: '确定删除页面吗？',
      scrollId: 'pageListOrderSetter',
      borderStyle: '1px dashed #64B5F6',
      content: []
    },
    mainOrderSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'mainSetter',
      content: []
    }
  },
  // content
  contentKey: Math.random(),
  contentConfig: {
    body: {
      content: {
        name: '',
        description: ''
      },
      style: {}
    },
    pages: [
      {
        name: '页面1',
        content: [],
        id: new Date().getTime()
      }
    ],
    pops: [
      {
        name: '弹窗1',
        content: [],
        id: new Date().getTime()
      }
    ],
    dataSource: {}
  },
  contentConfig1: {
    body: {
      content: {
        name: '',
        description: ''
      },
      style: {}
    },
    pages: [
      {
        name: '页面1',
        id: new Date().getTime(),
        content: [
          {
            name: '菜单',
            tag: 'menus',
            content: [],
            dataSourceId: 1,
            id: new Date().getTime()
          },
          {
            name: '图文',
            tag: 'images',
            content: [],
            dataSourceId: 1,
            id: new Date().getTime()
          }
        ]
      }
    ],
    pops: [
      {
        name: '新弹窗',
        elements: [],
        id: new Date().getTime()
      }
    ],
    dataSource: {
      imagesDatas: [
        {
          option: 'image1',
          value: 1,
          data: [
            {
              url: 'http://static.fcbox.com/fcapp/mall/j93hsg5t6k.jpg'
            }, {
              url: 'http://static.fcbox.com/fcapp/mall/r0b547v0ht.jpg'
            }, {
              url: 'http://static.fcbox.com/fcapp/mall/3nn89hcm86c.jpg'
            }
          ]
        }
      ],
      menusDatas: [
        {
          option: 'menus1',
          value: 1,
          checkedId: 2,
          data: [
            {
              name: '菜单1',
              checkedId: 1
            },
            {
              name: '菜单2',
              checkedId: 2
            },
            {
              name: '菜单3',
              checkedId: 3
            },
            {
              name: '菜单4',
              checkedId: 4
            },
            {
              name: '菜单5',
              checkedId: 5
            }
          ]
        }
      ]
    }
  }
}
