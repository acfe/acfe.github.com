export default {
  formatImageStyle (style) {
    let newStyle = {}
    const remStandar = 375
    for (let i in style) {
      switch (i) {
        case 'width':
        case 'height':
        case 'border-radius':
          if (style[i] || parseInt(style[i]) === 0) {
            newStyle[i] = (parseInt(style[i]) / remStandar) + 'rem'
          }
          if (parseInt(style['width']) && !parseInt(style['height'])) {
            newStyle['height'] = 'auto'
          }
          if (parseInt(style['height']) && !parseInt(style['width'])) {
            newStyle['width'] = 'auto'
          }
          break
        case 'align':
          switch (style[i]) {
            case 'right':
              newStyle['float'] = 'right'
              break
            case 'left':
              newStyle['float'] = 'left'
              break
            case 'center':
              this.cellStyle['text-align'] = 'center'
              break
          }
          break
        default:
          if (style[i]) {
            newStyle[i] = style[i]
          }
          break
      }
    }
    return newStyle
  },
  formatCheckedBarStyle (style) {
    let newStyle = {}
    const remStandar = 375
    for (let i in style) {
      switch (i) {
        case 'width':
          if (style[i] || parseInt(style[i]) === 0) {
            newStyle[i] = parseInt(style[i]) + '%'
          }
          break
        case 'height':
        case 'top':
        case 'border-radius':
          if (style[i] || parseInt(style[i]) === 0) {
            newStyle[i] = (parseInt(style[i]) / remStandar) + 'rem'
          }
          break
        case 'align':
          switch (style[i]) {
            case 'right':
              newStyle['left'] = 100 - (parseInt(style['width']) || 0) + '%'
              break
            case 'center':
              newStyle['left'] = (100 - (parseInt(style['width']) || 0)) / 2 + '%'
              break
          }
          break
        default:
          if (style[i]) {
            newStyle[i] = style[i]
          }
          break
      }
    }
    return newStyle
  },
  formatTextStyle (style) {
    let newStyle = {}
    const remStandar = 375
    for (let i in style) {
      switch (i) {
        case 'font-size':
        case 'line-height':
          if (style[i] || parseInt(style[i]) === 0) {
            newStyle[i] = (parseInt(style[i]) / remStandar) + 'rem'
          }
          break
        default:
          if (style[i]) {
            newStyle[i] = style[i]
          }
          break
      }
    }
    return newStyle
  }
}
