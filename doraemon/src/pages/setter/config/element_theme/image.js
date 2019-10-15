const imageTheme = [
  // 单图
  {
    url: 'http://static.fcbox.com/fcapp/mall/bactik82vmj.jpg?imageView2/2/w/240',
    title: '单图',
    config: {
      elements: [
        {
          name: '单图',
          url: 'http://static.fcbox.com/fcapp/mall/bactik82vmj.jpg',
          tag: 'image',
          theme: 1,
          elementStyle: {
            'width': 100,
            'height': 100,
            'left': 0,
            'top': 0,
            'rotateZ': 0
          },
          imageStyle: {}
        }
      ]
    }
  },
  // 白底色块
  {
    title: '白底色块',
    titleStyle: {
      'font-size': '14px',
      'line-height': '30px',
      'padding-top': 0
    },
    config: {
      elements: [
        {
          name: '白底色块',
          tag: 'image',
          theme: 1,
          elementStyle: {
            'width': 200,
            'height': 60,
            'left': 0,
            'top': 0,
            'rotateZ': 0,
            'background-color': '#fff'
          },
          imageStyle: {}
        }
      ]
    }
  }
]
export default imageTheme
