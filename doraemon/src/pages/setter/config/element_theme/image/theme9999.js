/*
  1.白底色块
*/

const theme = {
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
        tag: 'text',
        theme: 1,
        animationRepeat: 1,
        elementStyle: {
          'width': 200,
          'height': 60,
          'left': 0,
          'top': 0,
          'rotateZ': 0,
          'background-color': '#fff'
        }
      }
    ]
  }
}

export default {
  theme
}
