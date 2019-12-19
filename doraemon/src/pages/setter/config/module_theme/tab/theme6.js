/*
  6.模糊-纵向
*/
import commonSet from '../../common_set'

const theme = {
  title: '模糊-纵向',
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/q1owe2niixb.jpg',
  config: {
    module: {
      name: '模糊-纵向tab',
      tag: 'tab',
      theme: 6,
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
  theme: 6,
  setType: 'content',
  data: commonSet.tabSetData
}

export default {
  theme,
  themeSet
}
