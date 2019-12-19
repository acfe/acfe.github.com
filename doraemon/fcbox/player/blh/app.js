/**
 * Created by 001264 on 2019/12/18.
 */
import Animation from 'fcbox/utils/animation'
let autoPlayTimeout = []

const FcBlurHPlayer = {
  name: 'FcBlurHPlayer',
  data () {
    return {
      randKey: Math.random(),
      playerStyle: {

      },
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
    this.param.FcBlurHPlayer = this
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
        this.changeX = 300
        this.nextFlip = this.$refs.nextFlip[0]
        if (this.nextFlip) {
          Object.assign(this.nextFlip.style, {
            position: 'absolute',
            display: 'block',
            'z-Index': 0,
            opacity: 0
          })
        }
        this.moveBack(true)
      }, autoPlayTime)
      autoPlayTimeout.push(this.autoPlayTimeout)
    },
    goPre () {
      this.changeX = -300
      this.preFlip = this.$refs.preFlip[0]
      if (this.preFlip) {
        Object.assign(this.preFlip.style, {
          display: 'block',
          position: 'absolute',
          'z-Index': 0,
          opacity: 0
        })
      }
      this.moveBack()
    },
    goNext () {
      this.changeX = 300
      this.nextFlip = this.$refs.nextFlip[0]
      if (this.nextFlip) {
        Object.assign(this.nextFlip.style, {
          position: 'absolute',
          display: 'block',
          'z-Index': 0,
          opacity: 0
        })
      }
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
        this.renderData[i].dataRender = 'empty'
        if (i == parseInt(this.renderPage) + 1) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            position: 'relative',
            display: 'block',
            'z-index': 0
          }
          this.renderData[i].ref = 'renderFlip'
        }
        if (i == parseInt(page) + 1) {
          this.renderData[i].ref = added > 0 ? 'nextFlip' : 'preFlip'
          this.renderData[i].show = true
          this.renderData[i].style = {
            display: 'block',
            position: 'absolute',
            'z-index': 0,
            opacity: 0
          }
        }
      }
      this.randKey = Math.random()
      this.changeX = added * 300
      setTimeout(() => {
        this.play(added, () => {
          this.setRenderPage(page, true)
          callback && callback()
        })
        this.changeX = 0
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
        move: false
      })
      return true
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
      scrollParam.move = false
      if (Math.abs(changeX) > 30 && (Math.abs(scrollParam.mX - scrollParam.sX) > Math.abs(scrollParam.mY - scrollParam.sY))) {
        scrollParam.move = true
        this.changeX = changeX
      }
      if (scrollParam.move) {
        e.preventDefault()
        let added = this.changeX > 0 ? 1 : -1
        let br = parseInt(Math.abs(changeX / 8)) - 3
        br = br < 1 ? 1 : br
        br = br > 50 ? 50 : br
        this.renderFlip.className = 'blh-player-scroll bl' + br
        let clientWidth = this.renderFlip.clientWidth
        let scale = Math.abs(changeX / 10) / clientWidth
        this.setTransform(this.renderFlip.style, 'scale(' + (1 - scale) + ')')
        Object.assign(this.renderFlip.style, {
          'z-index': 1
        })
        if (added > 0) {
          Object.assign(this.nextFlip.style, {
            display: 'block',
            opacity: 0
          })
          Object.assign(this.preFlip.style, {
            display: 'none'
          })
        } else {
          Object.assign(this.preFlip.style, {
            display: 'block',
            opacity: 0
          })
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
      let added = this.changeX > 0 ? 1 : -1
      let renderPage = this.renderPage + added
      if (!this.param.loop && (renderPage < 0 || renderPage > this.dataLength - 1)) {
        renderPage = this.renderPage
        added = 0
      }
      if (Math.abs(this.changeX) < 185) {
        renderPage = this.renderPage
        added = 0
      }
      this.play(added, () => {
        this.setRenderPage(renderPage, fromDrag)
      })
      this.changeX = 0
    },
    play (added, callback) {
      this.renderFlip = this.$refs.renderFlip[0]
      this.preFlip = this.$refs.preFlip[0]
      this.nextFlip = this.$refs.nextFlip[0]
      const tween = this.Animation.tween.Cubic.easeOut
      const getAnimationData = this.Animation.getAnimationData
      const that = this
      this.animating = true
      let tEnd = 48
      let br = parseInt(Math.abs(this.changeX / 8)) - 3
      br = br < 1 ? 1 : br
      br = br > 50 ? 50 : br
      let clientWidth = this.renderFlip.clientWidth
      let scale = 1 - Math.abs(this.changeX / 10) / clientWidth
      let scaleArr = getAnimationData(scale, 1, tEnd, tween)
      let rBArr = getAnimationData(br, 0, tEnd, tween)
      let sBArr = getAnimationData(100, 0, tEnd, tween)
      let opArr = getAnimationData(1, 0, tEnd, tween)
      let opSArr = getAnimationData(0, 1, tEnd, tween)
      this.Animation.play({
        aStart: 0,
        aEnd: 0,
        tEnd,
        tween,
        handle (num, acNum) {
          switch (added) {
            case 0:
              that.setTransform(that.renderFlip.style, 'scale(' + (scaleArr[acNum]) + ')')
              that.renderFlip.className = 'blh-player-scroll bl' + parseInt(rBArr[acNum])
              break
            case 1:
              Object.assign(that.renderFlip.style, {
                opacity: opArr[acNum]
              })
              that.nextFlip.className = 'blh-player-scroll bl' + parseInt(sBArr[acNum])
              Object.assign(that.nextFlip.style, {
                opacity: opSArr[acNum]
              })
              break
            case -1:
              Object.assign(that.renderFlip.style, {
                opacity: opArr[acNum]
              })
              that.preFlip.className = 'blh-player-scroll bl' + parseInt(sBArr[acNum])
              Object.assign(that.preFlip.style, {
                opacity: opSArr[acNum]
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

export default FcBlurHPlayer
