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
      },
      {
        name: '图标',
        tag: 'icon',
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
  contentConfig: { 'body': { 'content': {}, 'style': {} }, 'pages': [{ 'name': '页面1', 'content': [{ 'name': '菜单', 'tag': 'menus', 'content': [], 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 40, 'top': 0, 'clientHeight': 45, 'dataSourceId': 1566272551494, 'theme': 1, 'columNum': '4', 'nameStyle': { 'font-size': '13', 'color': '#666666', 'text-align': 'center', 'line-height': 26 }, 'nameCheckedStyle': { 'color': '#333333', 'text-align': 'center', 'line-height': 26, 'font-size': '13' }, 'checkedBarStyle': { 'background': '#ffdf22', 'width': '20', 'height': '2', 'top': '30', 'border-radius': '2', 'align': 'center' }, 'imageStyle': {}, 'heightType': 'set', 'style': {}, 'lockPosition': 'top', 'themeInit': 1 }, { 'name': '图文', 'tag': 'images', 'content': [], 'dataSourceId': 1, 'id': 1565687064372, 'imageRadius': 0, 'theme': 3, 'moduleHeight': 164, 'loop': 1, 'autoPlayTime': 5000, 'showGuild': 1, 'titleStyle': {}, 'descriptionStyle': {}, 'style': {}, 'top': 45, 'clientHeight': 174, 'elements': [], 'imageStyle': {}, 'lockPosition': 'normal', 'themeInit': 1, 'setEnabel': { 'imageRadius': true, 'loop': true, 'autoPlayTime': true, 'showGuild': true } }, { 'name': '图文', 'tag': 'images', 'content': [], 'id': 1566277067871, 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 24, 'dataSourceId': 1566277077748, 'lockPosition': 'normal', 'themeInit': 1, 'titleStyle': { 'font-size': 14, 'color': '#666666', 'line-height': 16 }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc', 'line-height': 16 }, 'style': {}, 'heightType': 'set' }, { 'name': '菜单', 'tag': 'menus', 'content': [], 'dataSourceId': 1, 'id': 1565687064372, 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 72, 'theme': 2, 'columNum': 5, 'nameStyle': { 'font-size': '12', 'color': '#666666', 'text-align': 'center' }, 'nameCheckedStyle': { 'color': '#666666', 'text-align': 'center', 'font-size': '12' }, 'checkedBarStyle': {}, 'heightType': 'auto', 'style': { 'padding-bottom': '5', 'padding-top': '5' }, 'contentPaddingBottom': 0, 'imageStyle': { 'height': 36, 'border-radius': 0, 'align': 'center' }, 'top': 219, 'clientHeight': 56, 'lockPosition': 'normal', 'themeInit': 1 }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 50, 'titleStyle': { 'font-size': 14, 'color': '#666666' }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc' }, 'imageStyle': {}, 'heightType': 'set', 'style': {}, 'elements': [{ 'name': '文字', 'tag': 'text', 'style': { 'width': 87, 'height': 25, 'top': 17, 'left': 15 }, 'textStyle': { 'font-size': '18' }, 'text': '最新活动' }], 'top': 275, 'clientHeight': 50 }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 90, 'dataSourceId': 1565773747117, 'top': 325, 'clientHeight': 90 }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 2, 'moduleHeight': 91, 'dataSourceId': 1565773830969, 'contentPaddingRight': '0', 'columNum': 2, 'loop': 1, 'autoPlayTime': 5000, 'titleStyle': {}, 'descriptionStyle': {}, 'imageStyle': { 'border-radius': 0, 'align': 'center' }, 'style': { 'padding-left': '0' }, 'top': 415, 'clientHeight': 91 }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 95, 'dataSourceId': 1565773921826, 'top': 506, 'clientHeight': 90, 'lockPosition': 'lock', 'themeInit': 1, 'titleStyle': { 'font-size': 14, 'color': '#666666', 'line-height': 16 }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc', 'line-height': 16 }, 'style': { 'padding-bottom': '5' } }, { 'name': '商品', 'tag': 'goods', 'content': [], 'id': 1566201962609, 'contentPaddingBottom': 10, 'dataType': 1, 'moduleHeight': 560, 'top': 596, 'clientHeight': 34, 'dataSourceId': 1566201968308, 'lockPosition': 'normal', 'themeInit': 1, 'theme': 1, 'nameStyle': { 'font-size': '16', 'color': '#333333', 'text-align': 'left', 'line-height': '18' }, 'descriptionStyle': { 'font-size': 12, 'color': '#666666', 'text-align': 'left', 'line-height': 16 }, 'salePriceStyle': { 'font-size': '16', 'color': '#ff0000', 'text-align': 'left' }, 'originPriceStyle': { 'font-size': 12, 'color': '#666666', 'text-align': 'left' }, 'showSalePrice': 1, 'showDescription': 1, 'showOriginPrice': 1, 'imageWidth': 120, 'style': { 'padding-left': '5', 'padding-right': '5' }, 'heightType': 'auto', 'contentPaddingRight': 10, 'columNum': '2.5', 'titleStyle': { 'font-size': 14, 'color': '#666666', 'line-height': 16 }, 'imageStyle': { 'border-radius': 0, 'align': 'center' } }, { 'name': '图文', 'tag': 'images', 'content': [], 'id': 1566269479619, 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 100, 'dataSourceId': 1566269489389, 'lockPosition': 'normal', 'themeInit': 1, 'titleStyle': { 'font-size': 14, 'color': '#666666', 'line-height': 16 }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc', 'line-height': 16 }, 'style': { 'padding-top': '10' } }, { 'name': '商品', 'tag': 'goods', 'content': [], 'id': 1566269556332, 'dataType': 1, 'contentPaddingBottom': 10, 'moduleHeight': 167, 'dataSourceId': 1566269563337, 'lockPosition': 'normal', 'themeInit': 1, 'theme': 4, 'nameStyle': { 'font-size': 14, 'color': '#333333', 'text-align': 'left', 'line-height': 16 }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc', 'line-height': 16 }, 'salePriceStyle': { 'font-size': 12, 'color': '#ff0000', 'text-align': 'left' }, 'originPriceStyle': { 'font-size': 12, 'color': '#666666', 'text-align': 'left' }, 'showSalePrice': 1, 'showDescription': 1, 'showOriginPrice': 1, 'imageWidth': 120, 'style': { 'padding-left': '15', 'padding-bottom': 10 }, 'heightType': 'auto', 'contentPaddingRight': 10, 'columNum': '3.5', 'titleStyle': { 'font-size': 14, 'color': '#666666', 'line-height': 16 }, 'imageStyle': { 'height': '100', 'border-radius': 0, 'align': 'center' } }, { 'name': '图文', 'tag': 'images', 'content': [], 'id': 1566270515331, 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 80, 'dataSourceId': 1566270524781, 'lockPosition': 'lock', 'themeInit': 1, 'titleStyle': { 'font-size': 14, 'color': '#666666', 'line-height': 16 }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc', 'line-height': 16 }, 'style': { 'padding-top': '10' } }, { 'name': '商品', 'tag': 'goods', 'content': [], 'id': 1566270379338, 'dataType': 1, 'contentPaddingBottom': 10, 'moduleHeight': 561, 'dataSourceId': 1566270564906, 'lockPosition': 'normal', 'themeInit': 1, 'theme': 2, 'nameStyle': { 'font-size': 14, 'color': '#333333', 'text-align': 'left', 'line-height': 16 }, 'descriptionStyle': { 'font-size': 12, 'color': '#666666', 'text-align': 'left', 'line-height': 16 }, 'salePriceStyle': { 'font-size': 12, 'color': '#ff0000', 'text-align': 'left' }, 'originPriceStyle': { 'font-size': 12, 'color': '#666666', 'text-align': 'left' }, 'showSalePrice': 1, 'showDescription': 2, 'showOriginPrice': 2, 'imageWidth': 120, 'style': { 'padding-left': '20' }, 'heightType': 'auto', 'columNum': '2', 'contentPaddingRight': '20', 'imageStyle': { 'height': '120', 'align': 'center' } }, { 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 98, 'dataSourceId': 1565773967370, 'top': 630, 'clientHeight': 98 }, { 'name': '菜单', 'tag': 'menus', 'content': [], 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 60, 'dataSourceId': 1565773427934, 'theme': 2, 'contentPaddingBottom': 0, 'columNum': '3', 'nameStyle': { 'font-size': '12', 'color': '#666666', 'text-align': 'center', 'line-height': '8' }, 'nameCheckedStyle': { 'color': '#2979FF', 'text-align': 'center' }, 'checkedBarStyle': {}, 'imageStyle': { 'height': '26', 'border-radius': 0, 'align': 'center' }, 'heightType': 'auto', 'style': { 'padding-top': '8', 'padding-bottom': '8' }, 'lockPosition': 'bottom', 'top': 728, 'clientHeight': 60 }], 'top': 0, 'clientHeight': 232, 'style': {} }, { 'name': '会员指引', 'content': [{ 'name': '图文', 'tag': 'images', 'content': [], 'imageRadius': 0, 'contentPaddingBottom': 10, 'theme': 1, 'moduleHeight': 5428, 'dataSourceId': 1565775076996, 'titleStyle': { 'font-size': 14, 'color': '#666666' }, 'descriptionStyle': { 'font-size': 12, 'color': '#cccccc' }, 'imageStyle': {}, 'heightType': 'auto', 'style': { 'padding-bottom': '0' } }, { 'name': '菜单', 'tag': 'menus', 'content': [], 'imageRadius': 0, 'contentPaddingRight': 0, 'moduleHeight': 60, 'dataSourceId': 1565773427934, 'theme': 2, 'contentPaddingBottom': 0, 'columNum': '3', 'nameStyle': { 'font-size': '12', 'color': '#666666', 'text-align': 'center', 'line-height': '8' }, 'nameCheckedStyle': { 'color': '#2979FF', 'text-align': 'center' }, 'checkedBarStyle': {}, 'imageStyle': { 'height': '26', 'border-radius': 0, 'align': 'center' }, 'heightType': 'auto', 'style': { 'padding-bottom': '8', 'padding-top': '8' }, 'lockPosition': 'bottom' }], 'id': 1565775036330, 'top': 232, 'clientHeight': 232 }], 'pops': [{ 'name': '新弹窗', 'elements': [], 'id': 1565687064372 }], 'dataSource': { 'imagesDatas': [{ 'option': 'image1', 'value': 1, 'data': [{ 'action': {}, 'slot': 's1', 'show': true, 'url': 'http://static.fcbox.com/fcapp/mall/64gvy412zcq.jpg' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/j93hsg5t6k.jpg', 'slot': 's1', 'show': true }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/r0b547v0ht.jpg', 'slot': 's1', 'show': false }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/3nn89hcm86c.jpg', 'slot': 's1', 'show': false }] }, { 'option': 'banner1', 'value': 1565773747117, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/wlygb74kb8.png', 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': 'banner2', 'value': 1565773830969, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/6ij9xgq1f0j.jpg', 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/g7yrhip4m6g.jpg', 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': 'banner3', 'value': 1565773921826, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/uyig154dhv.jpg', 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': '会员指引', 'value': 1565773967370, 'data': [{ 'url': 'http://static.fcbox.com/fcappmall663wq8ewk9o.png', 'action': { 'acType': 2, 'acTarget': '_self', 'pageName': '会员指引', 'pageId': 1565775036330 } }] }, { 'option': '会员指引内容', 'value': 1565775076996, 'data': [{ 'url': 'http://static.fcbox.com/fcappmall7qcsgdv7noo.png', 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': '大家看好货', 'value': 1566269489389, 'data': [{ 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/0wevdsfjhqjc.png' }] }, { 'option': '时令水果', 'value': 1566270524781, 'data': [{ 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/j5a7cb3r2o.png' }] }, { 'option': '服务保障', 'value': 1566277077748, 'data': [{ 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/ec3o1dgk7w910zt5o3j4w8kt9.png' }] }], 'menusDatas': [{ 'option': 'menus1', 'value': 1, 'checkedId': 5, 'data': [{ 'url': 'http://static.fcbox.com/fcapp/mall/zv0h30bvqi.png', 'name': '9.9包邮', 'checkedId': 5, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/5yd2164114a.png', 'name': '热销', 'checkedId': 1, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/p1vjugnfvxi.png', 'name': '新品', 'checkedId': 2, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/jl1o14hy1qo.png', 'name': '挑礼物', 'checkedId': 3, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'http://static.fcbox.com/fcapp/mall/zomokhbk7tj.png', 'name': '全球购', 'checkedId': 4, 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': '底部导航', 'value': 1565773427934, 'data': [{ 'url': 'https://common.fcbox.com/cdn/mall/static/images/index-selected.png', 'name': '首页', 'checkedId': 1565773428997, 'action': { 'acType': 2, 'acTarget': '_self', 'pageName': '页面1' } }, { 'url': 'https://common.fcbox.com/cdn/mall/static/images/cart-light.png', 'name': '购物车', 'checkedId': 1565773474532, 'action': { 'acType': 0, 'acTarget': '_self' } }, { 'url': 'https://common.fcbox.com/cdn/mall/static/images/user.png', 'name': '个人中心', 'checkedId': 1565773492919, 'action': { 'acType': 0, 'acTarget': '_self' } }] }, { 'option': '顶部导航', 'value': 1566272551494, 'data': [{ 'checkedId': 1566272553489, 'action': {}, 'name': '推荐' }, { 'checkedId': 1566272562487, 'action': {}, 'name': '大闸蟹券' }, { 'checkedId': 1566272595973, 'action': {}, 'name': '新鲜果蔬' }, { 'checkedId': 1566272605101, 'action': {}, 'name': '水产肉类' }, { 'checkedId': 1566272616263, 'action': {}, 'name': '家居日化' }, { 'checkedId': 1566272653857, 'action': {}, 'name': '美妆护肤' }, { 'checkedId': 1566272667100, 'action': {}, 'name': '特产干货' }], 'checkedId': 1566272553489 }], 'goodsDatas': [{ 'option': '1', 'value': 1566201968308, 'data': [{ 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/zijagejoixg.jpg', 'name': '【爆款日销30000+】源知味突尼斯软籽石榴精品大果单果200g-300g汁多味甜 软籽皮薄包邮', 'description': '汁多味甜 软籽皮薄', 'salePrice': '38.7', 'originPrice': '50.0' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/061zk2x1cabu.jpg', 'name': '福建黄金百香果3斤装 单果重50g+ 包邮', 'description': '颠覆你对百香果的想象~', 'salePrice': '29.9', 'originPrice': '39.0' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/tbqv9k32gd.jpg', 'name': '四川蒲江红心猕猴桃30粒 单果重70g+ 包邮', 'description': '红心闪闪惹人爱', 'salePrice': '49.9', 'originPrice': '60.0' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/nqnt5uiothp.jpg', 'name': '山东蒙阴锦绣黄桃 4.5-5斤 9-12个装 单果重150g+ 香甜可口  顺丰包邮', 'description': '香甜可口 一口爆汁', 'salePrice': '29.9', 'originPrice': '40.5' }] }, { 'option': '大家看好货', 'value': 1566269563337, 'data': [{ 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/v7ab9hi3s98.jpg', 'name': 'ROCK 重力车载出风口支架(万向球款) 多规格 安全 包邮', 'salePrice': '29.0' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/onii5r8gbxr.jpg', 'name': '【灭蚊中的特斯拉】家用静音灭蚊灯吸蚊灯灭蚊一扫光捕蚊神器包邮', 'salePrice': '78.0' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/2entgzn7h6p.jpg', 'name': '【保税进口】日本Aqua Savon妈妈防晒霜婴儿防晒乳液250g/瓶植物萃取无添加无刺激含税包邮', 'salePrice': '148.0' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/p6wc62pm62k.jpg', 'name': '【抗紫外线 强抗风】全自动折叠两用晴雨伞多颜色款式包邮', 'salePrice': '98.0' }, { 'action': { 'acTarget': '_self' }, 'url': 'http://static.fcbox.com/fcapp/mall/3m5kck7td09hrc2gzohb5u3di.jpg', 'name': 'FLYCO/飞科 电动推剪理发器 FC5809蓝色 智能修剪一步到位 包邮', 'salePrice': '99.0' }] }, { 'option': '时令水果', 'value': 1566270564906, 'data': [{ 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/kpf4x2seuns.jpg', 'name': '云南雪莲果 单果120g+ 9斤装 包邮', 'salePrice': '29.9' }, { 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/2q6u612fv4i.jpg', 'name': '【现摘现发】山东肥城水蜜桃大红袍 9-12粒装 约5斤 肥城桃肥桃 包邮 ', 'salePrice': '29.9' }, { 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/tbqv9k32gd.jpg', 'name': '四川蒲江红心猕猴桃30粒 单果重70g+ 包邮', 'salePrice': '49.9' }, { 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/vdtp8vypax9.jpg', 'name': '【高山现摘】四川汶川新鲜西梅 3斤 单果30g+ 包邮', 'salePrice': '49.9' }, { 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/8gxypan8xj8.jpg', 'name': '河北白皇冠梨 4.5-5斤 7-9个 肉质细嫩 香脆可口 包邮', 'salePrice': '39.9' }, { 'action': {}, 'url': 'http://static.fcbox.com/fcapp/mall/xn3hmv82xp.jpg', 'name': '广东惠州白心芭乐（番石榴）5斤装 单果200g⁺ 顺丰包邮', 'salePrice': '29.9' }] }] } },
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
