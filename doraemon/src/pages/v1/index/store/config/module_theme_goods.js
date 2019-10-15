export default {
  goods: [
    // 列表布局
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/v3iq2tnzb6b.jpg?imageView2/2/w/240',
      title: '列表布局',
      config: {
        module: {
          name: '列表布局',
          tag: 'goods',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/kpf4x2seuns.jpg',
                name: '云南雪莲果 单果120g+ 9斤装 包邮',
                description: '云南特产',
                salePrice: 10.9,
                originPrice: 20.9
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/2q6u612fv4i.jpg',
                name: '【现摘现发】山东肥城水蜜桃大红袍 9-12粒装 约5斤 ',
                description: ' 肥城桃肥桃 包邮',
                salePrice: 49.9,
                originPrice: 50.9
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/tbqv9k32gd.jpg',
                name: '四川蒲江红心猕猴桃30粒 单果重70g+ 包邮',
                description: '红心猕猴桃',
                salePrice: 399,
                originPrice: 499
              }
            ],
            id: new Date().getTime()
          },
          theme: 1,
          nameStyle: {
            'font-size': 14,
            'color': '#333333',
            'text-align': 'left',
            'line-height': 16
          },
          descriptionStyle: {
            'font-size': 12,
            'color': '#666666',
            'text-align': 'left',
            'line-height': 16
          },
          salePriceStyle: {
            'font-size': 12,
            'color': '#ff0000',
            'text-align': 'left'
          },
          originPriceStyle: {
            'font-size': 12,
            'color': '#666666',
            'text-align': 'left'
          },
          showSalePrice: 1,
          showDescription: 1,
          showOriginPrice: 1,
          imageWidth: 120,
          contentPaddingBottom: 10,
          imageStyle: {
            'width': '',
            'height': '',
            'border-radius': '',
            'align': 'center'
          },
          style: {}
        }
      }
    },
    // 多列布局
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/ws6t2jdv7m.jpg?imageView2/2/w/240',
      title: '多列布局',
      config: {
        module: {
          name: '多列布局',
          tag: 'goods',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/kpf4x2seuns.jpg',
                name: '云南雪莲果 单果120g+ 9斤装 包邮',
                description: '云南特产',
                salePrice: 10.9,
                originPrice: 20.9
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/2q6u612fv4i.jpg',
                name: '【现摘现发】山东肥城水蜜桃大红袍 9-12粒装 约5斤 ',
                description: ' 肥城桃肥桃 包邮',
                salePrice: 49.9,
                originPrice: 50.9
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/tbqv9k32gd.jpg',
                name: '四川蒲江红心猕猴桃30粒 单果重70g+ 包邮',
                description: '红心猕猴桃',
                salePrice: 399,
                originPrice: 499
              }
            ],
            id: new Date().getTime()
          },
          theme: 2,
          nameStyle: {
            'font-size': 14,
            'color': '#333333',
            'text-align': 'left',
            'line-height': 16
          },
          descriptionStyle: {
            'font-size': 12,
            'color': '#666666',
            'text-align': 'left',
            'line-height': 16
          },
          salePriceStyle: {
            'font-size': 12,
            'color': '#ff0000',
            'text-align': 'left'
          },
          originPriceStyle: {
            'font-size': 12,
            'color': '#666666',
            'text-align': 'left'
          },
          showSalePrice: 1,
          showDescription: 2,
          showOriginPrice: 2,
          columNum: 2,
          contentPaddingRight: 10,
          imageStyle: {
            'width': '',
            'height': '',
            'border-radius': '',
            'align': 'center'
          },
          style: {
            'padding-left': 10
          }
        }
      }
    },
    // 横向滚动布局
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/7bkniledfh4.jpg?imageView2/2/w/240',
      title: '横向滚动布局',
      config: {
        module: {
          name: '横向滚动布局',
          tag: 'goods',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/kpf4x2seuns.jpg',
                name: '云南雪莲果 单果120g+ 9斤装 包邮',
                description: '云南特产',
                salePrice: 10.9,
                originPrice: 20.9
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/2q6u612fv4i.jpg',
                name: '【现摘现发】山东肥城水蜜桃大红袍 9-12粒装 约5斤 ',
                description: ' 肥城桃肥桃 包邮',
                salePrice: 49.9,
                originPrice: 50.9
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/tbqv9k32gd.jpg',
                name: '四川蒲江红心猕猴桃30粒 单果重70g+ 包邮',
                description: '红心猕猴桃',
                salePrice: 399,
                originPrice: 499
              }
            ],
            id: new Date().getTime()
          },
          theme: 4,
          contentPaddingRight: 10,
          columNum: 2.5,
          nameStyle: {
            'font-size': 14,
            'color': '#333333',
            'text-align': 'left',
            'line-height': 16
          },
          descriptionStyle: {
            'font-size': 12,
            'color': '#666666',
            'text-align': 'left',
            'line-height': 16
          },
          salePriceStyle: {
            'font-size': 12,
            'color': '#ff0000',
            'text-align': 'left'
          },
          originPriceStyle: {
            'font-size': 12,
            'color': '#666666',
            'text-align': 'left'
          },
          imageStyle: {
            'width': '',
            'height': '',
            'border-radius': '',
            'align': 'center'
          },
          style: {
            'padding-left': 10,
            'padding-bottom': 10
          }
        }
      }
    }
  ]
}
