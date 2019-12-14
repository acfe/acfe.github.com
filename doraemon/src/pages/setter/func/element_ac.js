export default {
  getSetElement (eid) {
    let setElement = {}
    for (let i in this.param.elements) {
      if (this.param.elements[i].id == eid) {
        setElement = this.param.elements[i]
      }
    }
    setElement.elementStyle = setElement.elementStyle || {}
    return setElement
  },
  mousedown (e) {
    this.acInfo = this.getAcInfo(e, 'data-eid')
    if (this.acInfo.dataKey === undefined || this.acInfo.dataKey === null) {
      return false
    }
    const target = this.acInfo.target
    const lock = target.getAttribute('data-lock')
    if (lock == 1) {
      this.$store.state.setConfig.setElementId = this.acInfo.dataKey
      this.$store.state.setConfig.setType = 'element'
      this.$store.state.setConfig.setModuleId = this.mid
      this.setSetterContent()
      this.$store.state.setConfig.showSetterPop = true
      return false
    }
    e.stopPropagation()
    this.$store.state.setConfig.setElementId = this.acInfo.dataKey
    const moveParam = this.moveParam
    moveParam.setElement = this.getSetElement(this.acInfo.dataKey)
    moveParam.moveLock = true
    const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    moveParam.sY = event.pageY || event.y
    moveParam.sX = event.pageX || event.x
    moveParam.sT = target.offsetTop
    moveParam.sL = target.offsetLeft
    moveParam.sW = target.offsetWidth
    moveParam.sH = target.offsetHeight
    this.setSizeInfo = this.getAcInfo(e, 'data-set-size')
    moveParam.sizeSetKey = this.setSizeInfo.dataKey
    if (moveParam.sizeSetKey) {
      let parentTop = target.parentNode.parentNode.parentNode.parentNode.offsetTop
      const sizeMoveParam = this.sizeMoveParam
      sizeMoveParam.sT = this.setSizeInfo.target.offsetTop
      sizeMoveParam.sL = this.setSizeInfo.target.offsetLeft
      sizeMoveParam.cL = document.getElementById('stage').offsetLeft + 260 + moveParam.sL + moveParam.sW / 2
      sizeMoveParam.cT = document.getElementById('stage').offsetTop - document.getElementById('mainSetter').scrollTop + parentTop + 57 + moveParam.sT + moveParam.sH / 2
    }
    this.$store.state.setConfig.setType = 'element'
    this.$store.state.setConfig.setModuleId = this.mid
    this.setSetterContent()
    this.$store.state.setConfig.showSetterPop = true
  },
  mousemove (e) {
    const moveParam = this.moveParam
    const sizeMoveParam = this.sizeMoveParam
    if (!moveParam.moveLock) {
      return false
    }
    const target = this.acInfo.target
    e.stopPropagation()
    const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    moveParam.mY = event.pageY || event.y
    moveParam.mX = event.pageX || event.x
    let changeY = moveParam.mY - moveParam.sY
    let changeX = moveParam.mX - moveParam.sX
    let top
    let left
    let width
    let height
    if (moveParam.sizeSetKey) {
      let rate = 1
      if (moveParam.setElement.elementStyle.rotateZ > 90 && moveParam.setElement.elementStyle.rotateZ < 270) {
        rate = -1
      }
      if (moveParam.setElement.elementStyle.rotateZ > 65 && moveParam.setElement.elementStyle.rotateZ <= 90) {
        changeX = changeY
        changeY = (moveParam.mX - moveParam.sX) * -1
      }
      if (moveParam.setElement.elementStyle.rotateZ > 90 && moveParam.setElement.elementStyle.rotateZ < 115) {
        changeX = changeY * rate
        changeY = (moveParam.mX - moveParam.sX)
      }
      if (moveParam.setElement.elementStyle.rotateZ > 270 && moveParam.setElement.elementStyle.rotateZ < 295) {
        changeX = changeY * -1
        changeY = (moveParam.mX - moveParam.sX)
      }
      if (moveParam.setElement.elementStyle.rotateZ > 245 && moveParam.setElement.elementStyle.rotateZ < 270) {
        changeX = changeY
        changeY = (moveParam.mX - moveParam.sX) * -1
      }
      switch (moveParam.sizeSetKey) {
        case 'left':
          if (rate > 0) {
            target.style.left = (moveParam.sL + changeX * rate) + 'px'
            moveParam.setElement.elementStyle.left = (moveParam.sL + changeX * rate)
          }
          width = moveParam.sW - changeX * rate
          target.style.width = width + 'px'
          moveParam.setElement.elementStyle.width = width
          break
        case 'right':
          if (rate < 0) {
            target.style.left = (moveParam.sL - changeX * rate) + 'px'
            moveParam.setElement.elementStyle.left = (moveParam.sL - changeX * rate)
          }
          width = moveParam.sW + changeX * rate
          target.style.width = width + 'px'
          moveParam.setElement.elementStyle.width = width
          break
        case 'top':
          if (rate > 0) {
            target.style.top = (moveParam.sT + changeY * rate) + 'px'
            moveParam.setElement.elementStyle.top = (moveParam.sT + changeY * rate)
          }
          height = moveParam.sH - changeY * rate
          target.style.height = height + 'px'
          moveParam.setElement.elementStyle.height = height
          break
        case 'bottom':
          if (rate < 0) {
            target.style.top = (moveParam.sT - changeY * rate) + 'px'
            moveParam.setElement.elementStyle.top = (moveParam.sT - changeY * rate)
          }
          height = moveParam.sH + changeY * rate
          target.style.height = height + 'px'
          moveParam.setElement.elementStyle.height = height
          break
        case 'rotate':
          let x = moveParam.mX - sizeMoveParam.cL
          let y = sizeMoveParam.cT - moveParam.mY
          let deg = Math.atan(x / y) * (180 / Math.PI)
          if (y < 0) {
            deg += 180
          } else if (x < 0) {
            deg += 360
          }
          let rotateZ = parseInt(deg)
          let rotateX = moveParam.setElement.elementStyle.rotateX || 0
          let rotateY = moveParam.setElement.elementStyle.rotateY || 0
          Object.assign(target.style, {
            transform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            WebkitTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            OTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            MozTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
            MsTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)'
          })
          moveParam.setElement.elementStyle.rotateZ = rotateZ
          break
      }
    } else {
      top = moveParam.sT + changeY
      target.style.top = top + 'px'
      left = moveParam.sL + changeX
      target.style.left = left + 'px'
      moveParam.setElement.elementStyle.top = top
      moveParam.setElement.elementStyle.left = left
    }
  },
  mouseup (e) {
    const moveParam = this.moveParam
    if (!moveParam.moveLock) {
      return false
    }
    e.stopPropagation()
    moveParam.moveLock = false
    // this.refreshContent()
    window.postMessage({
      ac: 'resizeElement'
    }, '*')
    this.setSetterContent(true)
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
  }
}
