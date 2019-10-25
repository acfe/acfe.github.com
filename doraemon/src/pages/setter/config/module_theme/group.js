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
          'padding-bottom': 16,
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
  },
  // 帮助中心 标题栏
  {
    titleStyle: {
      'font-size': '14px',
      'line-height': '30px',
      'padding-top': 0
    },
    title: '标题栏',
    config: {
      module: {
        name: '标题栏',
        tag: 'images',
        theme: 9999,
        dataType: 0,
        heightType: 'set',
        moduleHeight: 48,
        singleDatas: {
          data: []
        },
        moduleStyle: {}
      },
      elements: [{
        name: '标题',
        text: '常见问题',
        tag: 'text',
        theme: 1,
        textStyle: {
          'font-size': 16,
          'line-height': 16,
          'text-align': 'left',
          'font-weight': 500,
          'color': '#4A4A4A'
        },
        elementStyle: {
          'width': 80,
          'height': 20,
          'left': 16,
          'top': 16
        }
      }]
    }
  },
  // 帮助中心 tab菜单
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/dq2e52cavju.png?imageView2/2/w/240',
    title: 'tab菜单',
    config: {
      module: {
        name: 'tab菜单',
        tag: 'menus',
        theme: 1001,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              checkedId: 1,
              name: '帐号问题'
            },
            {
              checkedId: 2,
              name: '派件问题'
            },
            {
              checkedId: 3,
              name: '寄件问题'
            },
            {
              checkedId: 4,
              name: '优惠券'
            },
            {
              checkedId: 5,
              name: '拉黑规则'
            },
            {
              checkedId: 6,
              name: '开发票'
            },
            {
              checkedId: 7,
              name: '租用预约'
            },
            {
              checkedId: 8,
              name: '其他'
            }
          ]
        },
        contentPaddingRight: 8,
        contentPaddingBottom: 8,
        columNum: 4,
        moduleStyle: {
          'padding-left': 16,
          'padding-right': 16
        },
        itemStyle: {},
        nameStyle: {
          'font-size': 14,
          'color': '#999999',
          'height': 28,
          'text-align': 'center',
          'line-height': 28,
          'padding-left': 10,
          'padding-right': 10
        },
        nameCheckedStyle: {
          'line-height': 28,
          'color': '#ffffff',
          'background-color': '#9AD708',
          'border-radius': 14
        }
      }
    }
  },
  // 帮助中心 常见问题列表
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/np467pzfy6a.png?imageView2/2/w/240',
    title: '常见问题列表',
    config: {
      module: {
        name: '常见问题列表',
        tag: 'group',
        theme: 2,
        dataType: 0,
        singleDatas: {
          data: [
            {
              title: '如何认证账号？'
            },
            {
              title: '如何修改密码？'
            },
            {
              title: '如何修改手机账号？'
            },
            {
              title: '如何修改快递公司？'
            }
          ]
        },
        moduleStyle: {
          'padding-left': 12,
          'padding-right': 12,
          'padding-bottom': 10
        },
        titleStyle: {
          'font-size': 14,
          'color': '#666666'
        }
      }
    }
  },
  // 专题菜单
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/bg6e0279uao.png?imageView2/2/w/240',
    title: '专题菜单',
    config: {
      module: {
        name: '专题菜单',
        tag: 'menus',
        theme: 1,
        dataType: 0,
        singleDatas: {
          checkedId: 1,
          data: [
            {
              checkedId: 1,
              name: '新人指引'
            },
            {
              checkedId: 2,
              name: '取件通知'
            },
            {
              checkedId: 3,
              name: '收件篇'
            },
            {
              checkedId: 4,
              name: '老司机经验'
            }
          ]
        },
        heightType: 'set',
        moduleHeight: 50,
        moduleStyle: {
          'padding-left': 10,
          'padding-right': 10
        },
        itemStyle: {},
        checkedBarStyle: {
          'width-percent': 70,
          'height': 3,
          'border-radius': 3,
          'background-color': '#9AD708'
        },
        checkedBarPosStyle: {
          'text-align': 'center',
          'bottom': 5
        },
        contentPaddingRight: 10,
        nameStyle: {
          'font-size': 14,
          'color': '#999999',
          'line-height': 30,
          'padding-left': 10,
          'padding-right': 10,
          'padding-top': 5,
          'padding-bottom': 5
        },
        nameCheckedStyle: {
          'font-size': 16,
          'color': '#4A4A4A'
        }
      }
    }
  },
  // 专题列表
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/tilmv1h5boj.png?imageView2/2/w/240',
    title: '专题列表',
    config: {
      module: {
        name: '专题列表',
        tag: 'group',
        theme: 3,
        dataType: 0,
        singleDatas: {
          data: [
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/2698iqkw97v.png',
              title: '丰巢智能柜-派件篇',
              description: '2019-10-21'
            },
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/2698iqkw97v.png',
              title: '丰巢智能柜-派件篇',
              description: '2019-10-21'
            }
          ]
        },
        moduleStyle: {
          'padding-top': 16,
          'padding-left': 16,
          'padding-right': 16
        },
        imageStyle: {},
        titleStyle: {
          'font-size': 16,
          'color': '#4A4A4A'
        },
        descriptionStyle: {
          'font-size': 12,
          'color': '#999999'
        }
      }
    }
  },
  // 文章信息
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/nuqdo70z1db.png?imageView2/2/w/240',
    title: '文章信息',
    config: {
      module: {
        name: '文章信息',
        tag: 'group',
        theme: 4,
        title: '文章标题',
        author: '作者',
        time: '2019-10-21 14:00:00',
        moduleStyle: {
          'padding-top': 16,
          'padding-left': 16,
          'padding-right': 16,
          'padding-bottom': 16
        },
        titleStyle: {
          'font-size': 18,
          'font-weight': 500,
          'line-height': 24,
          'color': '#4A4A4A'
        }
      }
    }
  },
  // 文章内容
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/ewbz314e1he.png?imageView2/2/w/240',
    title: '文章内容',
    config: {
      module: {
        name: '文章内容',
        tag: 'images',
        theme: 1,
        dataType: 0,
        singleDatas: {
          data: [
            {
              url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/ewbz314e1he.png',
              title: '十三能织素，十四学裁衣，十五弹箜篌，十六诵诗书。十七为君妇，心中常苦悲。君既为府吏，守节情不移，贱妾留空房，相见常日稀。鸡鸣入机织，夜夜不得息。三日断五匹，大人故嫌迟。非为织作迟，君家妇难为！妾不堪驱使，徒留无所施，便可白公姥，及时相遣归。'
            }
          ]
        },
        contentPaddingBottom: 16,
        moduleStyle: {
          'padding-left': 16,
          'padding-right': 16
        },
        itemStyle: {},
        imageStyle: {},
        titleStyle: {
          'font-size': 14,
          'color': '#333333',
          'line-height': 24,
          'padding-top': 16
        },
        descriptionStyle: {}
      }
    }
  }
]
export default groupTheme
