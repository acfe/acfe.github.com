export default {
  images: [
    // Banner排版
    {
      url: 'http://static.fcbox.com/fcapp/mall/64gvy412zcq.jpg?imageView2/2/w/240',
      title: 'Banner排版',
      config: {
        module: {
          name: 'Banner排版',
          tag: 'images',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/64gvy412zcq.jpg',
                title: '图片1',
                description: '描述1'
              }
            ],
            id: new Date().getTime()
          },
          theme: 1,
          titleStyle: {
            'font-size': 14,
            'color': '#333333',
            'line-height': 16,
            'padding-left': 10,
            'padding-top': 5,
            'padding-right': 10
          },
          descriptionStyle: {
            'font-size': 12,
            'color': '#cccccc',
            'line-height': 16,
            'padding-left': 10,
            'padding-top': 2,
            'padding-right': 10
          },
          imageStyle: {},
          style: {},
          contentPaddingBottom: 10
        }
      }
    },
    // 侧滑轮播
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/xgbajp2njjo.jpg?imageView2/2/w/240',
      title: '侧滑轮播',
      config: {
        module: {
          name: '侧滑轮播',
          tag: 'images',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/3nn89hcm86c.jpg',
                title: '图片1'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/j93hsg5t6k.jpg',
                title: '图片2'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/r0b547v0ht.jpg',
                title: '图片3'
              }
            ],
            id: new Date().getTime()
          },
          theme: 3,
          loop: 1,
          autoPlayTime: 5000,
          showGuild: 1,
          imageStyle: {},
          style: {}
        }
      }
    },
    // 多列排版
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/7c342innk3q.jpg?imageView2/2/w/240',
      title: '多列排版(可定义列数)',
      config: {
        module: {
          name: '多列排版',
          tag: 'images',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/3nn89hcm86c.jpg?imageView2/2/w/240',
                title: '图片1',
                description: '描述1'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/j93hsg5t6k.jpg?imageView2/2/w/240',
                title: '图片2',
                description: '描述2'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/r0b547v0ht.jpg?imageView2/2/w/240',
                title: '图片3',
                description: '描述3'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/64gvy412zcq.jpg?imageView2/2/w/240',
                title: '图片4',
                description: '描述4'
              }
            ],
            id: new Date().getTime()
          },
          theme: 2,
          style: {
            'padding-left': 10,
            'padding-right': 10
          },
          imageStyle: {
            'width': '',
            'height': '',
            'border-radius': '',
            'align': 'center'
          },
          contentPaddingBottom: 10,
          contentPaddingRight: 10,
          titlePaddingTop: 3,
          descriptionPaddingTop: 2,
          columNum: 2,
          titleStyle: {
            'font-size': 14,
            'color': '#666666',
            'line-height': 16
          },
          descriptionStyle: {
            'font-size': 12,
            'color': '#cccccc',
            'line-height': 16
          }
        }
      }
    },
    // 九宫格图
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/pzp598jfqkr.jpg?imageView2/2/w/240',
      title: '九宫格图',
      config: {
        module: {
          name: '九宫格图',
          tag: 'images',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/36ltna5x4q8.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/8v0e2854o03.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/o48r8fu0rad.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/qz0yc7sdcwq.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/bactik82vmj.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/k0gp408mqqi.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/7lhnh309iis.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/ako0zvqket.jpg?imageView2/2/w/240'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/rr5cv3b892.jpg?imageView2/2/w/240'
              }
            ],
            id: new Date().getTime()
          },
          theme: 2,
          style: {},
          imageStyle: {
            'width': '',
            'height': '',
            'border-radius': '',
            'align': 'center'
          },
          titleStyle: {},
          descriptionStyle: {},
          contentPaddingBottom: 3,
          contentPaddingRight: 3,
          columNum: 3
        }
      }
    },
    // 照片墙
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/83uzoyy6xgt.jpg?imageView2/2/w/240',
      title: '照片墙',
      config: {
        module: {
          name: '照片墙',
          tag: 'images',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/36ltna5x4q8.jpg?imageView2/2/w/240',
                title: '苹果'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/8v0e2854o03.jpg?imageView2/2/w/240',
                title: '芒果'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/o48r8fu0rad.jpg?imageView2/2/w/240',
                title: '猕猴桃'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/qz0yc7sdcwq.jpg?imageView2/2/w/240',
                title: '番石榴'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/bactik82vmj.jpg?imageView2/2/w/240',
                title: '贡梨'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/k0gp408mqqi.jpg?imageView2/2/w/240',
                title: '柚子'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/7lhnh309iis.jpg?imageView2/2/w/240',
                title: '桃子'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/rr5cv3b892.jpg?imageView2/2/w/240',
                title: '石榴'
              }
            ],
            id: new Date().getTime()
          },
          theme: 2,
          style: {
            'padding-left': 10,
            'padding-right': 10
          },
          imageStyle: {
            'width': 60,
            'height': '',
            'border-radius': 60,
            'align': 'center',
            'padding-left': 3,
            'padding-right': 3,
            'padding-top': 3,
            'padding-bottom': 3,
            'border-top-width': 1,
            'border-bottom-width': 1,
            'border-left-width': 1,
            'border-right-width': 1,
            'border-top-color': '#cccccc',
            'border-bottom-color': '#cccccc',
            'border-left-color': '#cccccc',
            'border-right-color': '#cccccc',
            'border-top-style': 'solid',
            'border-bottom-style': 'solid',
            'border-left-style': 'solid',
            'border-right-style': 'solid'
          },
          titleStyle: {
            'font-size': 14,
            'color': '#666666',
            'line-height': 16,
            'text-align': 'center'
          },
          descriptionStyle: {},
          contentPaddingBottom: 30,
          contentPaddingRight: 3,
          columNum: 4
        }
      }
    },
    // 横向滚动
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/prtvz2wdoij.jpg?imageView2/2/w/240',
      title: '横向滚动',
      config: {
        module: {
          name: '横向滚动',
          tag: 'images',
          dataType: 0,
          singleDatas: {
            data: [
              {
                url: 'http://static.fcbox.com/fcapp/mall/3nn89hcm86c.jpg?imageView2/2/w/240',
                title: '图片1',
                description: '描述1'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/j93hsg5t6k.jpg?imageView2/2/w/240',
                title: '图片2',
                description: '描述2'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/r0b547v0ht.jpg?imageView2/2/w/240',
                title: '图片3',
                description: '描述3'
              },
              {
                url: 'http://static.fcbox.com/fcapp/mall/64gvy412zcq.jpg?imageView2/2/w/240',
                title: '图片4',
                description: '描述4'
              }
            ],
            id: new Date().getTime()
          },
          theme: 4,
          contentPaddingRight: 10,
          titlePaddingTop: 3,
          descriptionPaddingTop: 2,
          columNum: 2.5,
          titleStyle: {
            'font-size': 14,
            'color': '#666666',
            'line-height': 16
          },
          descriptionStyle: {
            'font-size': 12,
            'color': '#cccccc',
            'line-height': 16
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
