export default {
  menus: [
    // 横向滚动文字菜单
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/da9jhit8rsw.jpg?imageView2/2/w/240',
      title: '横向滚动文字菜单',
      config: {
        module: {
          name: '文字菜单',
          tag: 'menus',
          dataType: 0,
          singleDatas: {
            checkedId: 1,
            data: [
              {
                name: '推荐',
                checkedId: 1
              },
              {
                name: '热销',
                checkedId: 2
              },
              {
                name: '新品',
                checkedId: 3
              },
              {
                name: '折扣',
                checkedId: 4
              },
              {
                name: '拼团',
                checkedId: 5
              },
              {
                name: '全球购',
                checkedId: 6
              }
            ],
            id: new Date().getTime()
          },
          theme: 1,
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
          style: {}
        }
      }
    },
    // 图文排列菜单
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/1ljvvi738sc.jpg?imageView2/2/w/240',
      title: '图文排列菜单',
      config: {
        module: {
          name: '图文排列菜单',
          tag: 'menus',
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
            ],
            id: new Date().getTime()
          },
          theme: 2,
          contentPaddingRight: 0,
          contentPaddingBottom: 0,
          columNum: 5,
          nameStyle: {
            'font-size': 14,
            'color': '#666666',
            'text-align': 'center'
          },
          nameCheckedStyle: {
            'color': '#333333',
            'text-align': 'center'
          },
          imageStyle: {
            'width': '',
            'height': 36,
            'border-radius': 0,
            'align': 'center'
          },
          style: {
            'padding-top': 10,
            'padding-bottom': 10
          }
        }
      }
    },
    // 底部导航菜单
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/kjqv88axllk.jpg?imageView2/2/w/240',
      title: '底部导航菜单',
      config: {
        module: {
          name: '底部导航菜单',
          tag: 'menus',
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
            ],
            id: new Date().getTime()
          },
          theme: 2,
          contentPaddingRight: 0,
          contentPaddingBottom: 0,
          columNum: 3,
          nameStyle: {
            'font-size': 12,
            'color': '#666666',
            'text-align': 'center',
            'line-height': 10
          },
          nameCheckedStyle: {
            'color': '#666666',
            'text-align': 'center',
            'line-height': 10
          },
          imageStyle: {
            'width': '',
            'height': 30,
            'border-radius': 0,
            'align': 'center'
          },
          style: {
            'padding-top': 5,
            'padding-bottom': 5
          }
        }
      }
    }
  ]
}
