/*
  3.侧滑-纵向
*/
import commonSet from '../../common_set'

const theme = {
  title: '侧滑-纵向',
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/b4l1kx9sjon.jpg',
  config: {
    module: {
      name: '侧滑-纵向tab',
      tag: 'tab',
      theme: 3,
      guildTheme: 0,
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
      moduleStyle: {},
      barStyle: {
        'border-top-left-radius': 4,
        'border-top-right-radius': 4,
        'border-bottom-left-radius': 4,
        'border-bottom-right-radius': 4,
        'margin-right': 5
      },
      barCheckedStyle: {
        'border-top-left-radius': 4,
        'border-top-right-radius': 4,
        'border-bottom-left-radius': 4,
        'border-bottom-right-radius': 4,
        'margin-right': 5
      }
    }
  }
}

const themeSet = {
  theme: 3,
  setType: 'content',
  data: commonSet.tabSetData
}

export default {
  theme,
  themeSet
}
