class PopDrag {
  constructor (param) {
    this.param = param || {}
    this.moveParam = {}
    if (this.param.eDomId) {
      this.ListenerInit()
    }
  }
  ListenerInit () {
    const param = this.param
    const eDom = document.getElementById(param.eDomId)
    if (eDom) {
      eDom.addEventListener('mousedown', this.mousedown.bind(this))
      document.addEventListener('mousemove', this.mousemove.bind(this))
      document.addEventListener('mouseup', this.mouseup.bind(this))
    }
  }
  mousedown (e) {
    const moveParam = this.moveParam
    moveParam.moveLock = true
    const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    moveParam.sY = event.pageY || event.y
    moveParam.sX = event.pageX || event.x
    moveParam.target = document.getElementById(this.param.mDomId)
    moveParam.sT = moveParam.target.offsetTop
    moveParam.sL = moveParam.target.offsetLeft
  }
  mousemove (e) {
    const moveParam = this.moveParam
    if (!moveParam.moveLock) {
      return false
    }
    const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    moveParam.mY = event.pageY || event.y
    moveParam.mX = event.pageX || event.x
    let changeY = moveParam.mY - moveParam.sY
    let changeX = moveParam.mX - moveParam.sX
    moveParam.target.style.left = moveParam.sL + changeX + 'px'
    moveParam.target.style.top = moveParam.sT + changeY + 'px'
  }
  mouseup () {
    this.moveParam.moveLock = false
  }
}

export default PopDrag
