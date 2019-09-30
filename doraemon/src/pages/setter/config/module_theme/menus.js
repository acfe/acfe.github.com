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
  }
]
export default menusTheme
