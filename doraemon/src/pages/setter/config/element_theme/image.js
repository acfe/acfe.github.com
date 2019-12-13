const imageTheme = [
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
          animationRepeat: 1,
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
  },
  // 单图
  {
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/uehk6a4q9j.jpg',
    title: '单图',
    config: {
      elements: [
        {
          name: '单图',
          url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/uehk6a4q9j.jpg',
          tag: 'image',
          theme: 1,
          animationRepeat: 1,
          elementStyle: {
            'width': 100,
            'height': 75,
            'left': 0,
            'top': 0,
            'rotateZ': 0
          },
          imageStyle: {}
        }
      ]
    }
  },
  // 视频
  {
    title: '视频',
    url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ipztbouse7m.png',
    config: {
      elements: [
        {
          name: '视频',
          tag: 'image',
          poster: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ipztbouse7m.png',
          src: 'http://consumerapp-1251779293.file.myqcloud.com/patch/201812/v0xs23fhb3BMG.mp4',
          theme: 2,
          animationRepeat: 1,
          elementStyle: {
            'width': 320,
            'height': 200,
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
