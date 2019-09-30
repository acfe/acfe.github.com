export default {
  formatStyle (style) {
    let newStyle = {}
    const remStandar = 375
    for (let i in style) {
      switch (i) {
        case 'margin-left':
        case 'margin-right':
        case 'margin-top':
        case 'margin-bottom':
        case 'border-top-width':
        case 'border-bottom-width':
        case 'border-left-width':
        case 'border-right-width':
          if (style[i] || parseInt(style[i]) === 0) {
            newStyle[i] = (parseInt(style[i])) + 'px'
          }
          break
        case 'width':
        case 'height':
        case 'top':
        case 'left':
        case 'bottom':
        case 'right':
        case 'border-radius':
        case 'font-size':
        case 'line-height':
        case 'border-top-left-radius':
        case 'border-top-right-radius':
        case 'border-bottom-left-radius':
        case 'border-bottom-right-radius':
        case 'padding-left':
        case 'padding-right':
        case 'padding-top':
        case 'padding-bottom':
          if (style[i] || parseInt(style[i]) === 0) {
            newStyle[i] = (parseInt(style[i]) / remStandar) + 'rem'
          }
          if (parseInt(style['width']) && !parseInt(style['height'])) {
            newStyle['height'] = 'auto'
          }
          if (parseInt(style['height']) && !parseInt(style['width']) && !parseInt(style['width-percent'])) {
            newStyle['width'] = 'auto'
          }
          break
        case 'background-image':
          if (style[i]) {
            newStyle[i] = 'url(' + style[i] + ')'
            newStyle['background-size'] = '100% auto'
          }
          break
        case 'opacity':
          if (style[i]) {
            newStyle[i] = parseInt(style[i]) / 100
          }
          break
        case 'width-percent':
          if (style[i]) {
            newStyle['width'] = style[i] + '%'
          }
          break
        case 'rotateX':
        case 'rotateY ':
        case 'rotateZ':
          let rotateX = style['rotateX'] || 0
          let rotateY = style['rotateY'] || 0
          let rotateZ = style['rotateZ'] || 0
          Object.assign(newStyle, {
            transform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            WebkitTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            OTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            MozTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            MsTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)'
          })
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
              newStyle['text-align'] = 'center'
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
  }
}
