const groupTheme = [
  // 帮助中心轮播
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/mfcppfl01bj.jpg?imageView2/2/w/240',
    title: '帮助中心轮播',
    config: {
      module: {
        name: '帮助中心轮播',
        tag: 'images',
        theme: 4,
        dataType: 0,
        singleDatas: {
          data: [
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/mfcppfl01bj.jpg'
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/j93hsg5t6k.jpg'
            },
            {
              url: 'http://static.fcbox.com/fcapp/mall/r0b547v0ht.jpg'
            }
          ]
        },
        loop: 1,
        showGuild: 1,
        guildTheme: 1,
        autoPlayTime: 5000,
        moduleStyle: {
          'padding-left': 16,
          'padding-right': 16,
          'padding-top': 16
        },
        itemStyle: {},
        imageStyle: {
          height: 100,
          'border-top-left-radius': 5,
          'border-top-right-radius': 5,
          'border-bottom-left-radius': 5,
          'border-bottom-right-radius': 5
        },
        titleStyle: {},
        descriptionStyle: {}
      }
    }
  },
  // 帮助中心 首页指引
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/lmulvclbaxm.png?imageView2/2/w/240',
    title: '首页指引',
    config: {
      module: {
        name: '首页指引',
        tag: 'group',
        theme: 1,
        dataType: 0,
        singleDatas: {
          data: [
            {
              title: '新人指引',
              description: '更新：柜机派件篇',
              newTip: '更新',
              tipBarColor: '#F3C500'
            },
            {
              title: '取件通知',
              description: '取件通知改版问题',
              tipBarColor: '#9AD708'
            },
            {
              title: '柜机取件',
              description: '柜机派件禁用拉黑规则篇',
              tipBarColor: '#6E83EB'
            },
            {
              title: '老司机经验',
              description: '日票200票老司机教你',
              tipBarColor: '#F3C500'
            }
          ]
        },
        moduleStyle: {
          'padding-left': 16,
          'padding-right': 16,
          'padding-top': 16,
          'padding-bottom': 8
        },
        titleStyle: {
          'padding-left': 12,
          'font-size': 16,
          'font-weight': 500,
          'color': '#4A4A4A',
          'line-height': 16
        },
        descriptionStyle: {
          'font-size': 12,
          'color': '#999999',
          'line-height': 16,
          'padding-top': 5
        }
      }
    }
  }
]
export default groupTheme
