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
              name: '新品'
            },
            {
              checkedId: 2,
              name: '热销'
            },
            {
              checkedId: 3,
              name: '折扣'
            },
            {
              checkedId: 4,
              name: '拼团'
            },
            {
              checkedId: 5,
              name: '特惠'
            }
          ]
        },
        moduleStyle: {}
      }
    }
  }
]
export default tabTheme
