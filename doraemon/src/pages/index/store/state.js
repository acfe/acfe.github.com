module.exports = {
  title: '丰巢产品运营管理平台',
  // set
  setConfig: {
    setType: '', // body 主窗体 module 模块  element 元素
    setPageId: 0,
    setPopId: 0,
    setModuleId: 0,
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
        name: '商品',
        tag: 'goods',
        support: ['h5', 'wx', 'alipay']
      }
    ],
    elementListParam: [
      {
        name: '图片',
        tag: 'image',
        support: ['h5', 'wx', 'alipay']
      },
      {
        name: '文字',
        tag: 'text',
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
      scrollId: 'pageListOrderSetter',
      borderStyle: '1px dashed #64B5F6',
      content: []
    },
    mainOrderSetterParam: {
      key: Math.random(),
      hideAdd: true,
      scrollId: 'mainSetter',
      content: []
    }
  },
  // content
  contentKey: Math.random(),
  contentConfig: { 'body': { 'content': {}, 'style': {} }, 'pages': [{ 'name': '页面1', 'content': [{ 'name': '菜单', 'tag': 'menus', 'content': [], 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 45, 'top': 0, 'clientHeight': 40, 'dataSourceId': 1, 'theme': 1, 'columNum': 4, 'nameStyle': { 'font-size': 14, 'color': '#666666', 'text-align': 'center', 'line-height': '26' }, 'nameCheckedStyle': { 'color': '#2979FF', 'text-align': 'center', 'line-height': '26' }, 'checkedBarStyle': { 'background': '#2979FF', 'width': 47, 'height': 3, 'top': '36', 'border-radius': '3', 'align': 'center' }, 'imageStyle': {}, 'heightType': 'set', 'style': {}, 'lockPosition': 'top' }, { 'name': '图文', 'tag': 'images', 'content': [], 'dataSourceId': 1, 'id': 1565687064372, 'imageRadius': 0, 'theme': 3, 'moduleHeight': 174, 'loop': 1, 'autoPlayTime': 5000, 'showGuild': 1, 'titleStyle': {}, 'descriptionStyle': {}, 'style': { 'padding-bottom': '10' }, 'top': 40, 'clientHeight': 184, 'elements': [], 'imageStyle': {} }, { 'name': '菜单', 'tag': 'menus', 'content': [], 'dataSourceId': 1, 'id': 1565687064372, 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 56, 'theme': 2, 'columNum': 5, 'nameStyle': { 'font-size': '12', 'color': '#666666', 'text-align': 'center', 'line-height': '10' }, 'nameCheckedStyle': { 'color': '#666666', 'text-align': 'center', 'line-height': '10', 'font-size': '12' }, 'checkedBarStyle': {}, 'heightType': 'auto', 'style': {}, 'contentPaddingBottom': 0, 'imageStyle': { 'height': 36, 'border-radius': 0, 'align': 'center' }, 'top': 224, 'clientHeight': 56, 'lockPosition': 'lock' }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 50, 'titleStyle': { 'font-size': 14, 'color': '#666666' }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc' }, 'imageStyle': {}, 'heightType': 'set', 'style': {}, 'elements': [{ 'name': '文字', 'tag': 'text', 'style': { 'width': 87, 'height': 25, 'top': 17, 'left': 15 }, 'textStyle': { 'font-size': '18' }, 'text': '最新活动' }] }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 90, 'dataSourceId': 1565773747117 }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 2, 'moduleHeight': 91, 'dataSourceId': 1565773830969, 'contentPaddingRight': '0', 'columNum': 2, 'loop': 1, 'autoPlayTime': 5000, 'titleStyle': {}, 'descriptionStyle': {}, 'imageStyle': { 'border-radius': 0, 'align': 'center' }, 'style': { 'padding-left': '0' } }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 90, 'dataSourceId': 1565773921826 }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 98, 'dataSourceId': 1565773967370 }, { 'name': '菜单', 'tag': 'menus', 'content': [], 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 60, 'dataSourceId': 1565773427934, 'theme': 2, 'contentPaddingBottom': 0, 'columNum': '3', 'nameStyle': { 'font-size': '12', 'color': '#666666', 'text-align': 'center', 'line-height': '8' }, 'nameCheckedStyle': { 'color': '#2979FF', 'text-align': 'center' }, 'checkedBarStyle': {}, 'imageStyle': { 'height': '26', 'border-radius': 0, 'align': 'center' }, 'heightType': 'auto', 'style': { 'padding-top': '8', 'padding-bottom': '8' }, 'lockPosition': 'bottom' }], 'top': 0, 'clientHeight': 232 }, { 'name': '会员指引', 'content': [{ 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 5428, 'dataSourceId': 1565775076996, 'titleStyle': { 'font-size': 14, 'color': '#666666' }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc' }, 'imageStyle': {}, 'heightType': 'auto', 'style': { 'padding-bottom': '0' } }, { 'name': '菜单', 'tag': 'menus', 'content': [], 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 60, 'dataSourceId': 1565773427934, 'theme': 2, 'contentPaddingBottom': 0, 'columNum': '3', 'nameStyle': { 'font-size': '12', 'color': '#666666', 'text-align': 'center', 'line-height': '8' }, 'nameCheckedStyle': { 'color': '#2979FF', 'text-align': 'center' }, 'checkedBarStyle': {}, 'imageStyle': { 'height': '26', 'border-radius': 0, 'align': 'center' }, 'heightType': 'auto', 'style': { 'padding-bottom': '8', 'padding-top': '8' }, 'lockPosition': 'bottom' }], 'id': 1565775036330, 'top': 232, 'clientHeight': 232 }], 'pops': [{ 'name': '新弹窗', 'elements': [], 'id': 1565687064372 }], 'dataSource': { 'imagesDatas': [{ 'option': 'image1', 'value': 1, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/j93hsg5t6k.jpg', 'action': { 'acType': 0, 'acTarget': '_self' }, 'slot': 's1', 'show': true }, { 'url': 'http://static.fcbox.com/fcapp/mall/r0b547v0ht.jpg', 'action': { 'acType': 0, 'acTarget': '_self' }, 'slot': 's1', 'show': true }, { 'url': 'http://static.fcbox.com/fcapp/mall/3nn89hcm86c.jpg', 'action': { 'acType': 0, 'acTarget': '_self' }, 'slot': 's1', 'show': false }] }, { 'option': 'banner1', 'value': 1565773747117, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/wlygb74kb8.png', 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': 'banner2', 'value': 1565773830969, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/6ij9xgq1f0j.jpg', 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/g7yrhip4m6g.jpg', 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': 'banner3', 'value': 1565773921826, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/uyig154dhv.jpg', 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': '会员指引', 'value': 1565773967370, 'data': [{ 'url': 'http://static.fcbox.com/fcappmall663wq8ewk9o.png', 'action': { 'acType': 2, 'acTarget': '_self', 'pageName': '会员指引', 'pageId': 1565775036330 } }] }, { 'option': '会员指引内容', 'value': 1565775076996, 'data': [{ 'url': 'http://static.fcbox.com/fcappmall7qcsgdv7noo.png', 'action': { 'acType': 0, 'acTarget': '_self' } }] }], 'menusDatas': [{ 'option': 'menus1', 'value': 1, 'checkedId': 5, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/zv0h30bvqi.png', 'name': '9.9包邮', 'checkedId': 5, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/5yd2164114a.png', 'name': '热销', 'checkedId': 1, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/p1vjugnfvxi.png', 'name': '新品', 'checkedId': 2, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/jl1o14hy1qo.png', 'name': '挑礼物', 'checkedId': 3, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/zomokhbk7tj.png', 'name': '全球购', 'checkedId': 4, 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': '底部导航', 'value': 1565773427934, 'data': [{ 'url': 'https://common.fcbox.com/cdn/mall/static/images/index-selected.png', 'name': '首页', 'checkedId': 1565773428997, 'action': { 'acType': 2, 'acTarget': '_self', 'pageName': '页面1' } }, { 'url': 'https://common.fcbox.com/cdn/mall/static/images/cart-light.png', 'name': '购物车', 'checkedId': 1565773474532, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'https://common.fcbox.com/cdn/mall/static/images/user.png', 'name': '个人中心', 'checkedId': 1565773492919, 'action': { 'acType': 0, 'acTarget': '_self' } }] }] } },
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
