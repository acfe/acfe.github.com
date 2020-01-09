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
          if (/%/.test(style[i])) {
            newStyle[i] = style[i]
          } else if (style[i] || parseInt(style[i]) === 0) {
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
  },
  setThemeContent () {
    const param = this.param
    const contentList = []
    let dataContent = this.dataContent
    switch (this.theme) {
      case 2:
      case 15:
      case 1001:
        let cl = dataContent.length
        if (cl % param.columNum) {
          cl = (parseInt(cl / param.columNum) + 1) * param.columNum
        }
        for (let i = 0; i < cl; i++) {
          let ik = parseInt(i / param.columNum)
          contentList[ik] = contentList[ik] || []
          contentList[ik].push(dataContent[i] || { emptyContent: true })
          if (((parseInt(i) + 1) % param.columNum) && param.contentPaddingRight) {
            contentList[ik].push({
              blankStyle: {
                'min-width': param.contentPaddingRight / 375 + 'rem'
              }
            })
          }
        }
        this.contentList = contentList
        if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
          this.contentPaddingStyle = {}
          this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom) / 375) + 'rem'
        }
        break
      case 3:
      case 14:
        this.contentPaddingStyle['width'] = 100 / param.columNum + '%'
        break
      case 4:
      case 16:
      case 17:
        let data = []
        for (let c in dataContent) {
          data.push(Object.assign(dataContent[c], {
            slot: 's1'
          }))
        }
        this.domPlayerParam.data = data
        this.domPlayerParam.loop = !!parseInt(param.loop)
        if (data.length <= 1) {
          this.domPlayerParam.loop = false
        }
        this.domPlayerParam.showGuild = !!parseInt(param.showGuild)
        this.domPlayerParam.autoPlayTime = parseInt(param.autoPlayTime) || 0
        if (!this.domPlayerParam.autoPlayTime) {
          this.domPlayerParam.autoPlay = false
        } else if (this.domPlayerParam.autoPlayTime < 100) {
          this.domPlayerParam.autoPlayTime = 100
        }
        if (this.isSet) {
          this.domPlayerParam.autoPlay = false
        }
        break
    }
  }
}
