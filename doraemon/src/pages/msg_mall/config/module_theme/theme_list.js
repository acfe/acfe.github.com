const themeList = [
  {
    title: '小标题',
    config: {
      module: {
        tag: 'images',
        theme: 4,
        templateType: 'subheading',
        templateData: [
          {
            typeTitle: '小标题'
          }
        ]
      }
    }
  },
  // Banner排版
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/fkkr4kh9ooe.png',
    title: 'Banner',
    config: {
      module: {
        tag: 'images',
        theme: 1,
        templateType: 'banner',
        templateData: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/fkkr4kh9ooe.png'
          }
        ]
      }
    }
  },
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/1nilobxccpz.jpg',
    title: '双图排版',
    config: {
      module: {
        tag: 'images',
        theme: 2,
        templateType: 'twoPicTopic',
        templateData: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/wg5viz3a06g.png'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/iqsxideej6e.png'
          }
        ]
      }
    }
  },
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/cgmjzmsfnc9.jpg',
    title: '三图排版',
    config: {
      module: {
        tag: 'images',
        theme: 2,
        templateType: 'threePicTopic',
        templateData: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/kjapj927c1k.png'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/wg5viz3a06g.png'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/iqsxideej6e.png'
          }
        ]
      }
    }
  },
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/nnypu0l9kr.jpg',
    title: '商品',
    config: {
      module: {
        tag: 'images',
        theme: 5,
        templateType: 'goods',
        templateData: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/hhce8lj47s.jpg',
            goodsTitle: '丰巢定制快递员冬季夹克外套黑色',
            goodsAd: '保暖一整个冬天',
            sellPriceStr: '200',
            originalPriceStr: '100'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/o6tjh666yuk.jpg',
            goodsTitle: '丰巢定制快递员冬季夹克外套白色',
            goodsAd: '保暖一整个冬天',
            sellPriceStr: '200',
            originalPriceStr: '100'
          }
        ]
      }
    }
  },
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/y1q19lh9gqs.jpg',
    title: '商品tab',
    config: {
      module: {
        tag: 'images',
        theme: 6,
        templateType: 'goodsSubtitle',
        'checkedId': 1,
        templateData: [
          {
            'typeTitle': '特惠商品',
            'checkedId': 1,
            'goods': [
              {
                url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/hhce8lj47s.jpg',
                goodsTitle: '丰巢定制快递员冬季夹克外套黑色',
                goodsAd: '保暖一整个冬天',
                sellPriceStr: '200',
                originalPriceStr: '100'
              },
              {
                url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/o6tjh666yuk.jpg',
                goodsTitle: '丰巢定制快递员冬季夹克外套白色',
                goodsAd: '保暖一整个冬天',
                sellPriceStr: '200',
                originalPriceStr: '100'
              }
            ]
          },
          {
            'typeTitle': '热销商品',
            'checkedId': 2,
            'goods': [
              {
                url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/hhce8lj47s.jpg',
                goodsTitle: '丰巢定制快递员冬季夹克外套黑色',
                goodsAd: '保暖一整个冬天',
                sellPriceStr: '200',
                originalPriceStr: '100'
              }
            ]
          }
        ]
      }
    }
  }
]
export default themeList
