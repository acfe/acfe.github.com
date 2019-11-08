const tabTheme = [
  // tab
  {
    title: '空白tab',
    titleStyle: {
      'line-height': '24px',
      'padding-top': 0
    },
    config: {
      module: {
        name: '空白tab',
        tag: 'tab',
        theme: 1,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              checkedId: 1,
              name: '测试项'
            }
          ]
        },
        moduleStyle: {}
      }
    }
  },
  // 横向侧滑tab
  {
    title: '横向侧滑tab',
    titleStyle: {
      'line-height': '24px',
      'padding-top': 0
    },
    config: {
      module: {
        name: '横向侧滑tab',
        tag: 'tab',
        theme: 2,
        guildTheme: 2,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              checkedId: 1,
              name: '测试项'
            }
          ]
        },
        moduleStyle: {}
      }
    }
  }
]
export default tabTheme
