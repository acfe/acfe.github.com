let setElement
let self

export default {
  keySetElementSize (type, size) {
    if (!setElement) {
      return false
    }
    switch (this.setConfig.setType) {
      case 'element':
      case 'popElement':
        switch (type) {
          case 'left':
            setElement.style.width -= size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
          case 'right':
            setElement.style.width += size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
          case 'up':
            setElement.style.height -= size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
          case 'down':
            setElement.style.height += size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
        }
        break
    }
  },
  keySetElementPos (type, size) {
    if (!setElement) {
      return false
    }
    switch (this.setConfig.setType) {
      case 'element':
      case 'popElement':
        switch (type) {
          case 'left':
            setElement.style.left -= size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
          case 'right':
            setElement.style.left += size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
          case 'up':
            setElement.style.top -= size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
          case 'down':
            setElement.style.top += size
            self.elementRefreshCallback && self.elementRefreshCallback('keyAc')
            break
        }
        break
    }
  },
  mousedown (e) {
    this.acInfo = this.getAcInfo(e, 'data-eid')
    if (this.acInfo.dataKey === undefined || this.acInfo.dataKey === null) {
      return false
    }
    setElement = false
    setElement = this.param.elements[this.acInfo.dataKey]
    this.target = this.acInfo.target
    let target = this.target
    self = this
    const lock = target.getAttribute('data-lock')
    if (lock == 1) {
      this.elementCallback(e)
      return false
    }
    e.stopPropagation()
    this.selectedKey = this.acInfo.dataKey
    const element = this.param.elements[this.selectedKey]
    element.style = element.style || {}
    const param = this.moveParam
    param.moveLock = true
    const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    param.sY = event.pageY || event.y
    param.sX = event.pageX || event.x
    let sT = /rem/.test(target.style.top) ? Math.round(parseFloat(target.style.top) * 375) : parseInt(target.style.top)
    let sL = /rem/.test(target.style.left) ? Math.round(parseFloat(target.style.left) * 375) : parseInt(target.style.left)
    this.elementCallback(e)
    this.sizeSetKey = target.getAttribute('data-set-size')
    this.setTag = target.getAttribute('data-set-tag')
    if (this.sizeSetKey) {
      target = target.parentNode.parentNode
      sT = /rem/.test(target.style.top) ? Math.round(parseFloat(target.style.top) * 375) : parseInt(target.style.top)
      sL = /rem/.test(target.style.left) ? Math.round(parseFloat(target.style.left) * 375) : parseInt(target.style.left)
      param.sW = /rem/.test(target.style.width) ? Math.round(parseFloat(target.style.width) * 375) : parseInt(target.style.width) || target.clientWidth
      param.sH = /rem/.test(target.style.height) ? Math.round(parseFloat(target.style.height) * 375) : parseInt(target.style.height) || target.clientHeight
      param.sZ = element.style.rotateZ || 0
      if (param.sZ) {
        let r = target.clientHeight / 2
        let da = param.sZ / 2
        let c = Math.sin(da * (Math.PI / 180)) * r * 2
        let db = (180 - param.sZ) / 2
        let cx = Math.sin(db * (Math.PI / 180)) * c
        let cy = Math.cos(db * (Math.PI / 180)) * c
        param.sX -= (cx + 5)
        param.sY -= (cy + 5)
      }
    }
    param.sT = sT || 0
    param.sL = sL || 0
  },
  mousemove (e) {
    const param = this.moveParam
    if (!param.moveLock) {
      return false
    }
    e.stopPropagation()
    const element = this.param.elements[this.selectedKey]
    const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    param.mY = event.pageY || event.y
    param.mX = event.pageX || event.x
    let changeY = param.mY - param.sY
    let changeX = param.mX - param.sX
    if (this.sizeSetKey) {
      let setTarget = this.target.parentNode.parentNode
      let width
      let height
      let left
      let top
      switch (this.sizeSetKey) {
        case 'left':
          width = param.sW - changeX
          if (width > 10) {
            setTarget.style.width = width + 'px'
            left = param.sL + changeX
            setTarget.style.left = left + 'px'
            if (this.setTag == 'icon') {
              setTarget.style.height = width + 'px'
              this.resetSvgSize(setTarget, width)
            }
          }
          break
        case 'right':
          width = param.sW + changeX
          if (width > 10) {
            setTarget.style.width = width + 'px'
            if (this.setTag == 'icon') {
              setTarget.style.height = width + 'px'
              this.resetSvgSize(setTarget, width)
            }
          }
          break
        case 'top':
          height = param.sH - changeY
          if (height > 10) {
            top = param.sT + changeY
            setTarget.style.top = top + 'px'
            setTarget.style.height = height + 'px'
            if (this.setTag == 'icon') {
              setTarget.style.width = height + 'px'
              this.resetSvgSize(setTarget, height)
            }
          }
          break
        case 'bottom':
          height = param.sH + changeY
          if (height > 10) {
            setTarget.style.height = height + 'px'
            if (this.setTag == 'icon') {
              setTarget.style.width = height + 'px'
              this.resetSvgSize(setTarget, height)
            }
          }
          break
        case 'rotate':
          let r = setTarget.clientHeight / 2
          let changeSize = Math.sqrt(changeX * changeX + changeY * changeY)
          let rotateZ = (changeX > 0 ? 1 : -1) * changeSize / r * 60
          rotateZ = rotateZ > 180 ? 180 : rotateZ
          rotateZ = rotateZ < -180 ? -180 : rotateZ
          rotateZ = rotateZ < 0 ? 360 + rotateZ : rotateZ
          rotateZ = parseInt(rotateZ)
          element.style.rotateZ = rotateZ
          Object.assign(setTarget.style, {
            transform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            WebkitTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            OTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            MozTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)',
            MsTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(0deg) rotateX(0deg)'
          })
          break
      }
    } else {
      let top = param.sT + changeY
      this.target.style.top = top + 'px'
      let left = param.sL + changeX
      this.target.style.left = left + 'px'
    }
  },
  mouseup (e) {
    const param = this.moveParam
    if (!param.moveLock) {
      return false
    }
    param.moveLock = false
    this.argumentsTransform()
    this.elementCallback(e, 'up')
  },
  elementCallback (e, type) {
    const moduleId = this.getAcInfo(e, 'data-order-key').dataKey
    this.elementRefreshCallback && this.elementRefreshCallback(this.selectedKey, moduleId, type)
  },
  argumentsTransform () {
    const param = this.param
    let target = this.target
    if (this.sizeSetKey) {
      target = this.target.parentNode.parentNode
    }
    const element = param.elements[this.selectedKey]
    element.style = element.style || {}
    element.style.width = /rem/.test(target.style.width) ? Math.round(parseFloat(target.style.width) * 375) : parseInt(target.style.width)
    element.style.height = /rem/.test(target.style.height) ? Math.round(parseFloat(target.style.height) * 375) : parseInt(target.style.height)
    element.style.top = /rem/.test(target.style.top) ? Math.round(parseFloat(target.style.top) * 375) : parseInt(target.style.top)
    element.style.left = /rem/.test(target.style.left) ? Math.round(parseFloat(target.style.left) * 375) : parseInt(target.style.left)
  },
  getAcInfo (e, tag) {
    let target = e.target
    let loop = true
    let dataKey
    while (loop) {
      loop = !!target.parentNode
      loop = target.tagName == 'BODY' ? false : loop
      dataKey = target.getAttribute(tag)
      if (dataKey) {
        loop = false
        break
      }
      if (loop) {
        target = target.parentNode
      }
    }
    return {
      dataKey,
      target
    }
  },
  resetSvgSize (setTarget, width) {
    if (!setTarget.childNodes[0] || !setTarget.childNodes[0].innerHTML) {
      return false
    }
    let html = setTarget.childNodes[0].innerHTML
    if (html.match(/<svg.*><\/svg>/) && html.match(/<svg.*><\/svg>/)[0]) {
      let svgMatch = html.match(/<svg.*><\/svg>/)[0]
      svgMatch = svgMatch.replace(/width=".*?"/, 'width="' + width + '"')
      svgMatch = svgMatch.replace(/height=".*?"/, 'height="' + width + '"')
      setTarget.childNodes[0].innerHTML = html.replace(/<svg.*><\/svg>/, svgMatch)
    }
  }
}
