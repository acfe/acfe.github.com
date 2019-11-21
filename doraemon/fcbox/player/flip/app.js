/**
 * Created by 001264 on 2018/11/12.
 */
import Animation from 'fcbox/utils/animation'
let autoPlayTimeout = []

const FcFlipPlayer = {
  name: 'FcFlipPlayer',
  data () {
    return {
      randKey: Math.random(),
      playerStyle: {},
      renderData: [],
      renderPage: 0
    }
  },
  props: ['param'],
  created () {
    this.param.autoPlay && this.clearTimeoutAc()
    const param = this.param || {}
    param.data = param.data || []
    param.randKey = param.randKey || this.randKey
    const dataLength = param.data.length
    if (!dataLength) {
      return false
    }
    this.dataLength = dataLength
    this.renderDataInit()
    this.Animation = new Animation()
    this.param.FcFlipPlayer = this
    this.param.drag = this.param.drag === undefined ? true : this.param.drag
    this.param.initCallback && this.param.initCallback(this)
  },
  mounted () {
    let player = this.$refs.player
    if (!player) {
      return false
    }
    this.player = player
    let setPage = this.param.renderPage || 0
    this.setRenderPage(setPage)
    player.addEventListener('touchstart', this.touchstart.bind(this))
    player.addEventListener('touchmove', this.touchmove.bind(this))
    player.addEventListener('touchend', this.touchend.bind(this))
    player.addEventListener('mousedown', this.touchstart.bind(this))
    document.documentElement.addEventListener('mousemove', this.touchmove.bind(this))
    document.documentElement.addEventListener('mouseup', this.touchend.bind(this))
    this.autoPlay()
  },
  beforeDestroy () {
    this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
  },
  methods: {
    clearTimeoutAc () {
      let to = autoPlayTimeout.shift()
      if (to) {
        clearTimeout(to)
        this.clearTimeoutAc()
      }
    },
    renderDataInit () {
      const param = this.param
      let renderData = []
      for (let i in param.data) {
        renderData.push(param.data[i])
      }
      if (!param.loop) {
        renderData.push({
          slot: 'empty'
        })
        renderData.unshift({
          slot: 'empty'
        })
      } else {
        renderData.push(Object.assign({}, param.data[0]))
        renderData.unshift(Object.assign({}, param.data[this.dataLength - 1]))
      }
      this.renderData = renderData
    },
    setRenderPage (setPage, fromDrag) {
      let page = setPage || 0
      let max = this.dataLength - 1
      page = page < 0 ? max : page
      page = page > max ? 0 : page
      this.renderPage = page
      if (fromDrag && this.param.singleDatas) {
        this.param.singleDatas.checkedId = this.param.data[page].checkedId
        window.postMessage({
          ac: 'tabSlide',
          tabId: this.param.tabId,
          tabItemId: this.param.data[page].checkedId
        }, '*')
      }
      for (let i in this.renderData) {
        this.renderData[i].show = false
        this.renderData[i].style = {
          display: 'none',
          position: 'absolute'
        }
        this.renderData[i].ref = 'empty'
        this.renderData[i].dataRender = 'empty'
        if (i == page) {
          this.renderData[i].ref = 'preFlip'
          this.renderData[i].show = true
        }
        if (i == page + 1) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            display: 'block',
            position: 'relative'
          }
          this.renderData[i].ref = 'renderFlip'
          this.renderData[i].dataRender = 'render'
        }
        if (i == page + 2) {
          this.renderData[i].ref = 'nextFlip'
          this.renderData[i].show = true
        }
      }
      this.randKey = Math.random()
    },
    autoPlay () {
      if (!this.param.autoPlay || this.autoPlaying || this.param.data.length <= 1 || this.animating) {
        return false
      }
      this.autoPlaying = true
      let autoPlayTime = this.param.autoPlayTime || 3000
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
      this.autoPlayTimeout = setTimeout(() => {
        this.changeX = -100
        this.changeDeg = -90
        this.moveBack(true)
      }, autoPlayTime)
      autoPlayTimeout.push(this.autoPlayTimeout)
    },
    goPre () {
      this.changeX = -100
      this.renderFlip = this.$refs.renderFlip[0]
      Object.assign(this.renderFlip.style, {
        display: 'block',
        position: 'relative',
        opacity: 0.5
      })
      this.setTransform(this.renderFlip.style, 'rotateX(10deg) rotateY(0deg) rotateZ(0deg)')
      this.preFlip = this.$refs.preFlip[0]
      Object.assign(this.preFlip.style, {
        display: 'block',
        position: 'absolute',
        opacity: 0
      })
      this.setTransform(this.preFlip.style, 'rotateX(10deg) rotateY(90deg) rotateZ(0deg)')
      this.moveBack()
    },
    goNext () {
      this.changeX = 100
      this.renderFlip = this.$refs.renderFlip[0]
      Object.assign(this.renderFlip.style, {
        position: 'relative',
        display: 'block',
        opacity: 0.5
      })
      this.setTransform(this.renderFlip.style, 'rotateX(10deg) rotateY(0deg) rotateZ(0deg)')
      this.nextFlip = this.$refs.nextFlip[0]
      Object.assign(this.nextFlip.style, {
        position: 'absolute',
        display: 'block',
        opacity: 0
      })
      this.setTransform(this.nextFlip.style, 'rotateX(10deg) rotateY(-90deg) rotateZ(0deg)')
      this.moveBack()
    },
    goto (setPage, callback) {
      if (this.renderPage == setPage) {
        return false
      }
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
      this.autoPlaying = false
      let page = setPage || 0
      let max = this.dataLength - 1
      page = page < 0 ? max : page
      page = page > max ? 0 : page
      let added = page > this.renderPage ? 1 : -1
      for (let i in this.renderData) {
        this.renderData[i].show = false
        this.renderData[i].style = {
          display: 'none'
        }
        this.renderData[i].ref = 'empty'
        if (i == parseInt(this.renderPage) + 1) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            position: 'relative',
            display: 'block',
            opacity: 0.5
          }
          this.setTransform(this.renderData[i].style, 'rotateX(10deg) rotateY(0deg) rotateZ(0deg)')
          this.renderData[i].ref = 'renderFlip'
        }
        if (i == parseInt(page) + 1) {
          this.renderData[i].ref = added > 0 ? 'nextFlip' : 'preFlip'
          this.renderData[i].show = true
          this.renderData[i].style = {
            display: 'block',
            position: 'absolute',
            opacity: 0
          }
          this.setTransform(this.renderData[i].style, 'rotateX(10deg) rotateY(' + (added * -90) + 'deg) rotateZ(0deg)')
        }
      }
      this.randKey = Math.random()
      this.changeX = 0
      setTimeout(() => {
        this.play(added, () => {
          this.setRenderPage(page)
          callback && callback()
        })
      })
    },
    touchstart (e) {
      this.scrollParam = this.scrollParam || {}
      if (!this.param.drag || this.animating || this.scrollParam.moveLock || !this.$refs.renderFlip || !this.$refs.renderFlip[0]) {
        return false
      }
      e.stopPropagation()
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
      this.autoPlaying = false
      const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e
      const scrollParam = this.scrollParam
      const sX = event.pageX || event.x
      const sY = event.pageY || event.y
      this.changeX = 0
      Object.assign(scrollParam, {
        sX,
        sY,
        moveLock: true,
        sR: 0,
        sO: 0,
        move: false
      })
      return true
    },
    setTransform (style, transform) {
      Object.assign(style, {
        transform: transform,
        WebkitTransform: transform,
        OTransform: transform,
        MozTransform: transform,
        MsTransform: transform
      })
    },
    touchmove (e) {
      const scrollParam = this.scrollParam
      if (!scrollParam || !scrollParam.moveLock) {
        return false
      }
      this.renderFlip = this.$refs.renderFlip[0]
      this.preFlip = this.$refs.preFlip[0]
      this.nextFlip = this.$refs.nextFlip[0]
      const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e
      scrollParam.mX = event.pageX || event.x
      scrollParam.mY = event.pageY || event.y
      let changeX = scrollParam.sX - scrollParam.mX
      let clientWidth = this.renderFlip.clientWidth
      scrollParam.move = false
      if (Math.abs(changeX) > 30 && (Math.abs(scrollParam.mX - scrollParam.sX) > Math.abs(scrollParam.mY - scrollParam.sY))) {
        scrollParam.move = true
        this.changeX = changeX
      }
      if (scrollParam.move) {
        e.preventDefault()
        let added = this.changeX > 0 ? 1 : -1
        let changeDeg = (changeX / clientWidth * 45)
        let changeO = (Math.abs(changeX) / clientWidth * 1)
        this.changeDeg = changeDeg
        this.setTransform(this.renderFlip.style, 'rotateX(10deg) rotateY(' + changeDeg + 'deg) rotateZ(0deg)')
        Object.assign(this.renderFlip.style, {
          opacity: 1 - changeO
        })
        if (added > 0) {
          Object.assign(this.nextFlip.style, {
            display: 'block',
            opacity: changeO,
            'z-index': 2
          })
          this.setTransform(this.nextFlip.style, 'rotateX(10deg) rotateY(' + (-90 + changeDeg) + 'deg) rotateZ(0deg)')
          Object.assign(this.preFlip.style, {
            display: 'none'
          })
        } else {
          Object.assign(this.preFlip.style, {
            display: 'block',
            opacity: changeO,
            'z-index': 2
          })
          this.setTransform(this.preFlip.style, 'rotateX(10deg) rotateY(' + (90 + changeDeg) + 'deg) rotateZ(0deg)')
          Object.assign(this.nextFlip.style, {
            display: 'none'
          })
        }
      }
    },
    touchend (e) {
      const scrollParam = this.scrollParam
      if (!scrollParam || !scrollParam.moveLock) {
        this.autoPlay()
        return false
      }
      scrollParam.moveLock = false
      if (!this.changeX) {
        this.clickCallback(this.renderPage)
        this.param.clickCallback && this.param.clickCallback(this.param.data[this.renderPage])
      } else {
        window.fc.isMoveUp = true
        setTimeout(() => {
          window.fc.isMoveUp = false
        })
        this.moveBack(true)
      }
    },
    clickCallback (renderPage) {
      this.autoPlay()
    },
    moveBack (fromDrag) {
      let added = this.changeX > 0 ? 1 : -1
      let renderPage = this.renderPage + added
      if (!this.param.loop && (renderPage < 0 || renderPage > this.dataLength - 1)) {
        renderPage = this.renderPage
        added = 0
      }
      if (Math.abs(this.changeX) < 100) {
        renderPage = this.renderPage
        added = 0
      }
      this.changeX = 0
      this.play(added, () => {
        this.setRenderPage(renderPage, fromDrag)
      })
    },
    play (added, callback) {
      this.renderFlip = this.$refs.renderFlip[0]
      this.preFlip = this.$refs.preFlip[0]
      this.nextFlip = this.$refs.nextFlip[0]
      const tween = this.Animation.tween.Cubic.easeOut
      const getAnimationData = this.Animation.getAnimationData
      const that = this
      this.animating = true
      let tEnd = 24
      let rotageXArr = getAnimationData(10, 0, tEnd, tween)
      let renderRotateYArr
      let renderSRY = 0
      if (/rotateY\((-?\d+)/.exec(this.renderFlip.style.transform)) {
        renderSRY = parseInt(/rotateY\((-?\d+)/.exec(this.renderFlip.style.transform)[1]) || 0
      }
      let renderSO = parseFloat(this.renderFlip.style.opacity)
      let renderOArr
      let preSO
      if (this.preFlip) {
        preSO = parseFloat(this.preFlip.style.opacity)
      }
      let preOArr
      let nextSO
      if (this.nextFlip) {
        nextSO = parseFloat(this.nextFlip.style.opacity)
      }
      let nextOArr
      let preSRY = 0
      let nextSRY = 0
      let preRotateYArr
      let nextRotateYArr
      switch (added) {
        case 0:
          renderRotateYArr = getAnimationData(renderSRY, 0, tEnd, tween)
          renderOArr = getAnimationData(renderSO, 1, tEnd, tween)
          if (this.preFlip) {
            preOArr = getAnimationData(preSO, 0, tEnd, tween)
          }
          if (this.nextFlip) {
            nextOArr = getAnimationData(nextSO, 0, tEnd, tween)
          }
          break
        case 1:
          if (/rotateY\((-?\d+)/.exec(this.nextFlip.style.transform)) {
            nextSRY = parseInt(/rotateY\((-?\d+)/.exec(this.nextFlip.style.transform)[1]) || 0
          }
          renderRotateYArr = getAnimationData(renderSRY, 90, tEnd, tween)
          renderOArr = getAnimationData(renderSO, 0, tEnd, tween)
          nextRotateYArr = getAnimationData(nextSRY, 0, tEnd, tween)
          nextOArr = getAnimationData(nextSO, 1, tEnd, tween)
          break
        case -1:
          if (/rotateY\((-?\d+)/.exec(this.preFlip.style.transform)) {
            preSRY = parseInt(/rotateY\((-?\d+)/.exec(this.preFlip.style.transform)[1]) || 0
          }
          renderRotateYArr = getAnimationData(renderSRY, -90, tEnd, tween)
          renderOArr = getAnimationData(renderSO, 0, tEnd, tween)
          preRotateYArr = getAnimationData(preSRY, 0, tEnd, tween)
          preOArr = getAnimationData(preSO, 1, tEnd, tween)
          break
      }
      this.Animation.play({
        aStart: 0,
        aEnd: 0,
        tEnd: 24,
        tween,
        handle (num, acNum) {
          switch (added) {
            case 0:
              that.setTransform(that.renderFlip.style, 'rotateX(' + rotageXArr[acNum] + 'deg) rotateY(' + renderRotateYArr[acNum] + 'deg) rotateZ(0deg)')
              Object.assign(that.renderFlip.style, {
                opacity: renderOArr[acNum]
              })
              if (that.preFlip) {
                Object.assign(that.preFlip.style, {
                  opacity: preOArr[acNum]
                })
              }
              if (that.nextFlip) {
                Object.assign(that.nextFlip.style, {
                  opacity: nextOArr[acNum]
                })
              }
              break
            case 1:
              that.setTransform(that.renderFlip.style, 'rotateX(' + rotageXArr[acNum] + 'deg) rotateY(' + renderRotateYArr[acNum] + 'deg) rotateZ(0deg)')
              Object.assign(that.renderFlip.style, {
                opacity: renderOArr[acNum]
              })
              // console.log(renderOArr)
              that.setTransform(that.nextFlip.style, 'rotateX(' + rotageXArr[acNum] + 'deg) rotateY(' + nextRotateYArr[acNum] + 'deg) rotateZ(0deg)')
              Object.assign(that.nextFlip.style, {
                opacity: nextOArr[acNum]
              })
              break
            case -1:
              that.setTransform(that.renderFlip.style, 'rotateX(' + rotageXArr[acNum] + 'deg) rotateY(' + renderRotateYArr[acNum] + 'deg) rotateZ(0deg)')
              Object.assign(that.renderFlip.style, {
                opacity: renderOArr[acNum]
              })
              that.setTransform(that.preFlip.style, 'rotateX(' + rotageXArr[acNum] + 'deg) rotateY(' + preRotateYArr[acNum] + 'deg) rotateZ(0deg)')
              Object.assign(that.preFlip.style, {
                opacity: preOArr[acNum]
              })
              break
          }
        },
        finish () {
          that.animating = false
          callback && callback()
          requestAnimationFrame(() => {
            that.autoPlaying = false
            that.autoPlay()
          })
        }
      })
    }
  }
}

export default FcFlipPlayer
