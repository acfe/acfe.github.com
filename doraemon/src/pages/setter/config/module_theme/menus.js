const menusTheme = [
  // 文字菜单
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/h129hoty8qq.jpg',
    title: '文字菜单',
    config: {
      module: {
        name: '文字菜单',
        tag: 'menus',
        theme: 1,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              checkedId: 1,
              name: '推荐'
            },
            {
              checkedId: 2,
              name: '新鲜果蔬'
            },
            {
              checkedId: 3,
              name: '水产肉类'
            },
            {
              checkedId: 4,
              name: '家居日化'
            },
            {
              checkedId: 5,
              name: '美妆个护'
            },
            {
              checkedId: 6,
              name: '特产干货'
            }
          ]
        },
        heightType: 'set',
        moduleHeight: 46,
        moduleStyle: {
          'padding-left': 10,
          'padding-right': 10
        },
        itemStyle: {},
        checkedBarStyle: {
          'width-percent': 70,
          'height': 2,
          'border-radius': 2,
          'background-color': '#2196F3'
        },
        checkedBarPosStyle: {
          'text-align': 'center',
          'bottom': 10
        },
        contentPaddingRight: 10,
        nameStyle: {
          'font-size': 14,
          'color': '#333333',
          'line-height': 30,
          'padding-left': 10,
          'padding-right': 10,
          'padding-top': 5,
          'padding-bottom': 5
        },
        nameCheckedStyle: {
          'color': '#2196F3'
        }
      }
    }
  },
  // 图文菜单 多列排版
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/1ljvvi738sc.jpg?imageView2/2/w/240',
    title: '图文菜单',
    config: {
      module: {
        name: '图文菜单',
        tag: 'menus',
        theme: 2,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              url: 'http://static.fcbox.com/fcapp/mall/zv0h30bvqi.png',
              name: '9.9包邮',
              checkedId: 1
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/5yd2164114a.png',
              name: '热销',
              checkedId: 2
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/p1vjugnfvxi.png',
              name: '新品',
              checkedId: 3
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/jl1o14hy1qo.png',
              name: '挑礼物',
              checkedId: 4
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/zomokhbk7tj.png',
              name: '全球购',
              checkedId: 5
            }
          ]
        },
        contentPaddingRight: 10,
        contentPaddingBottom: 10,
        columNum: 5,
        moduleStyle: {
          'padding-left': 10,
          'padding-right': 10,
          'padding-top': 10,
          'padding-bottom': 10
        },
        itemStyle: {},
        imageStyle: {
          'width': 36
        },
        nameStyle: {
          'font-size': 14,
          'color': '#666666',
          'line-height': 16,
          'text-align': 'center',
          'padding-top': 5
        },
        nameCheckedStyle: {
          'text-align': 'center',
          'color': '#333333'
        }
      }
    }
  },
  // 底部菜单 多列排版
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/kjqv88axllk.jpg?imageView2/2/w/240',
    title: '底部菜单',
    config: {
      module: {
        name: '底部菜单',
        tag: 'menus',
        theme: 2,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              url: 'https://common.fcbox.com/cdn/mall/static/images/index-selected.png',
              name: '首页',
              checkedId: 1
            },
            {
              url: 'https://common.fcbox.com/cdn/mall/static/images/cart-light.png',
              name: '购物车',
              checkedId: 2
            },
            {
              url: 'https://common.fcbox.com/cdn/mall/static/images/user.png',
              name: '个人中心',
              checkedId: 3
            }
          ]
        },
        contentPaddingRight: 10,
        contentPaddingBottom: 10,
        columNum: 3,
        moduleStyle: {
          'padding-left': 10,
          'padding-right': 10,
          'padding-top': 10
        },
        itemStyle: {},
        imageStyle: {
          'width': 30
        },
        nameStyle: {
          'font-size': 12,
          'color': '#666666',
          'line-height': 16,
          'text-align': 'center',
          'padding-top': 3
        },
        nameCheckedStyle: {
          'text-align': 'center',
          'color': '#333333'
        }
      }
    }
  },
  // 横向滚动菜单
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/1ljvvi738sc.jpg?imageView2/2/w/240',
    title: '横向滚动菜单',
    config: {
      module: {
        name: '横向滚动菜单',
        tag: 'menus',
        theme: 3,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              url: 'http://static.fcbox.com/fcapp/mall/zv0h30bvqi.png',
              name: '9.9包邮',
              checkedId: 1
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/5yd2164114a.png',
              name: '热销',
              checkedId: 2
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/p1vjugnfvxi.png',
              name: '新品',
              checkedId: 3
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/jl1o14hy1qo.png',
              name: '挑礼物',
              checkedId: 4
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/zomokhbk7tj.png',
              name: '全球购',
              checkedId: 5
            }
          ]
        },
        contentPaddingRight: 0,
        columNum: 4,
        moduleStyle: {
          'padding-left': 10,
          'padding-right': 10,
          'padding-top': 10,
          'padding-bottom': 10
        },
        itemStyle: {},
        imageStyle: {
          'width': 36
        },
        nameStyle: {
          'font-size': 14,
          'color': '#666666',
          'line-height': 16,
          'text-align': 'center',
          'padding-top': 5
        },
        nameCheckedStyle: {
          'color': '#333333'
        }
      }
    }
  }
]
export default menusTheme
