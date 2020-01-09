/**
 * Created by 001264 on 2019/12/18.
 */
import Animation from 'fcbox/utils/animation'
let autoPlayTimeout = []

const FcPartHPlayer = {
  name: 'FcPartHPlayer',
  data () {
    return {
      randKey: Math.random(),
      playerStyle: {

      },
      renderData: [],
      renderPage: 0
    }
  },
  props: ['param', 'isSet'],
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
    this.addedNum = param.addedNum || 2
    if (!param.loop) {
      this.addedNum = 1
    }
    if (param.showHeight) {
      this.playerStyle.height = param.showHeight / 375 + 'rem'
    }
    this.renderDataInit()
    this.Animation = new Animation()
    this.param.FcPartHPlayer = this
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
    if (!this.isSet) {
      player.addEventListener('touchstart', this.touchstart.bind(this))
      player.addEventListener('touchmove', this.touchmove.bind(this))
      player.addEventListener('touchend', this.touchend.bind(this))
      player.addEventListener('mousedown', this.touchstart.bind(this))
      document.documentElement.addEventListener('mousemove', this.touchmove.bind(this))
      document.documentElement.addEventListener('mouseup', this.touchend.bind(this))
    }
    setTimeout(() => {
      this.autoPlay()
    })
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
        for (let i = 0; i < this.addedNum; i++) {
          renderData.push(Object.assign({}, param.data[i % this.dataLength]))
          renderData.unshift(Object.assign({}, param.data[this.dataLength - 1 - (i % this.dataLength)]))
        }
      }
      this.renderData = renderData
    },
    setRenderPage (setPage, fromDrag) {
      const param = this.param
      let page = setPage || 0
      let max = this.dataLength - 1
      page = page < 0 ? max : page
      page = page > max ? 0 : page
      this.renderPage = page
      let clientWidth = this.player.clientWidth
      let leftPos = param.leftPos || 0
      let space = param.space || 0
      leftPos = leftPos ? parseInt((leftPos * clientWidth) / 375) : leftPos
      space = space ? parseInt((space * clientWidth) / 375) : space
      let contentWidth = param.contentWidth || clientWidth
      let sourceLeft = 0
      let renderLeft = 0
      let preLeft = 0
      let nextLeft = 0
      for (let i in this.renderData) {
        let d = this.renderData[i]
        d.width = d.width ? parseInt((d.width * clientWidth) / 375) : contentWidth
        d.sourceLeft = sourceLeft
        sourceLeft += (d.width + space)
        if (i == page + this.addedNum - 1) {
          preLeft = d.sourceLeft
        }
        if (i == page + this.addedNum) {
          renderLeft = d.sourceLeft
        }
        if (i == page + this.addedNum + 1) {
          nextLeft = d.sourceLeft
        }
      }
      this.movePre = renderLeft - preLeft
      this.moveNext = nextLeft - renderLeft
      this.renderLeft = renderLeft
      this.leftPos = leftPos
      for (let i in this.renderData) {
        let d = this.renderData[i]
        d.show = true
        if (i == page + this.addedNum) {
          d.style = {
            position: 'relative',
            width: d.width + 'px',
            'padding-left': leftPos + 'px'
          }
          this.renderData[i].ref = 'renderFlip'
          this.renderData[i].dataRender = 'render'
        } else {
          d.style = {
            display: 'block',
            position: 'absolute',
            width: d.width + 'px',
            left: d.sourceLeft - renderLeft + leftPos + 'px',
            'z-index': 1
          }
          d.ref = 'empty'
          d.dataRender = 'empty'
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
        this.moveBack(true)
      }, autoPlayTime)
      autoPlayTimeout.push(this.autoPlayTimeout)
    },
    goPre () {
      this.changeX = 100
      this.moveBack()
    },
    goNext () {
      this.changeX = -100
      this.moveBack()
    },
    goto (setPage, callback) {
      if (this.renderPage == setPage) {
        return false
      }
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
      this.autoPlaying = false
      let page = setPage || 0
      this.setRenderPage(page)
      callback && callback()
    },
    touchstart (e) {
      this.scrollParam = this.scrollParam || {}
      if (!this.param.drag || this.animating || this.scrollParam.moveLock || !this.$refs.renderFlip || !this.$refs.renderFlip[0]) {
        return false
      }
      e.stopPropagation()
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
      this.autoPlaying = false
      const event = (!e.pageX && !e.x && e.targetTouches) ? e.targetTouches[0] : e
      const scrollParam = this.scrollParam
      const sX = event.pageX || event.x
      const sY = event.pageY || event.y
      this.changeX = 0
      Object.assign(scrollParam, {
        sX,
        sY,
        moveLock: true,
        move: false
      })
      return true
    },
    touchmove (e) {
      const scrollParam = this.scrollParam
      this.moveDom = this.$refs.scroll
      if (!scrollParam || !scrollParam.moveLock || !this.moveDom) {
        return false
      }
      const event = (!e.pageX && !e.x && e.targetTouches) ? e.targetTouches[0] : e
      scrollParam.mX = event.pageX || event.x
      scrollParam.mY = event.pageY || event.y
      let changeX = scrollParam.mX - scrollParam.sX
      this.changeX = changeX
      if (Math.abs(changeX) > 30 && (Math.abs(scrollParam.mX - scrollParam.sX) > Math.abs(scrollParam.mY - scrollParam.sY))) {
        scrollParam.move = true
      }
      if (scrollParam.move) {
        e.preventDefault()
        let clientWidth = this.player.clientWidth
        let moveWidth = changeX > 0 ? this.moveNext : this.movePre
        let moveX = changeX * (moveWidth / clientWidth)
        this.setTransform(this.moveDom.style, 'translateX(' + (moveX) + 'px)')
      }
    },
    touchend (e) {
      const scrollParam = this.scrollParam
      if (!scrollParam || !scrollParam.moveLock) {
        this.autoPlay()
        return false
      }
      scrollParam.moveLock = false
      if (!scrollParam.move) {
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
    setTransform (style, transform) {
      Object.assign(style, {
        transform: transform,
        WebkitTransform: transform,
        OTransform: transform,
        MozTransform: transform,
        MsTransform: transform
      })
    },
    clickCallback (renderPage) {
      this.autoPlay()
    },
    moveBack (fromDrag) {
      let added = this.changeX > 0 ? -1 : 1
      let renderPage = this.renderPage + added
      if (!this.param.loop && (renderPage < 0 || renderPage > this.dataLength - 1)) {
        renderPage = this.renderPage
        added = 0
      }
      if (Math.abs(this.changeX) < 100) {
        renderPage = this.renderPage
        added = 0
      }
      this.play(added, () => {
        this.setRenderPage(renderPage, fromDrag)
      })
      this.changeX = 0
    },
    play (added, callback) {
      let changeX = this.changeX
      this.moveDom = this.$refs.scroll
      const tween = this.Animation.tween.Cubic.easeOut
      const getAnimationData = this.Animation.getAnimationData
      const that = this
      this.animating = true
      let tEnd = 48
      let clientWidth = this.player.clientWidth
      let moveWidth = changeX > 0 ? this.moveNext : this.movePre
      let moveX = changeX * (moveWidth / clientWidth)
      let endX = 0
      if (added > 0) {
        endX = -this.moveNext
      } else if (added < 0) {
        endX = this.movePre
      }
      let moveArr = getAnimationData(moveX, endX, tEnd, tween)
      this.Animation.play({
        aStart: 0,
        aEnd: 0,
        tEnd,
        tween,
        handle (num, acNum) {
          that.setTransform(that.moveDom.style, 'translateX(' + (moveArr[acNum]) + 'px)')
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

export default FcPartHPlayer
