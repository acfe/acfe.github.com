/**
 * Created by 001264 on 2018/11/12.
 */
import Animation from 'fcbox/utils/animation'
let autoPlayTimeout = []

const FcDomPlayer = {
  name: 'FcDomPlayer',
  data () {
    return {
      randKey: Math.random(),
      playerStyle: {},
      itemStyle: {},
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
    this.param.FcDomPlayer = this
    this.param.drag = this.param.drag === undefined ? true : this.param.drag
    this.param.initCallback && this.param.initCallback(this)
  },
  mounted () {
    let player = this.$refs.player
    if (!player) {
      return false
    }
    this.player = player
    let playerWidth = player.clientWidth
    this.playerWidth = playerWidth
    this.playerStyle = {
      width: ((this.dataLength + 2) * playerWidth) + 'px'
    }
    this.itemStyle = {
      width: playerWidth + 'px'
    }
    let setPage = this.param.renderPage || 0
    this.setRenderPage(setPage)
    requestAnimationFrame(() => {
      player.scrollLeft = playerWidth * (this.renderPage + 1)
    })
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
        this.renderData[i].dataRender = 'empty'
        if (i == page || i == page + 1 || i == page + 2) {
          this.renderData[i].show = true
        }
        if (i == page + 1) {
          this.renderData[i].dataRender = 'render'
        }
      }
      this.randKey = Math.random()
      if (this.param.fitHeight) {
        requestAnimationFrame(() => {
          if (this.player && this.player.childNodes[0] && this.player.childNodes[0].childNodes[page + 1]) {
            this.player.style.height = this.player.childNodes[0].childNodes[page + 1].childNodes[0].offsetHeight + 'px'
          }
        })
      }
    },
    autoPlay () {
      if (!this.param.autoPlay || this.autoPlaying || this.param.data.length <= 1 || this.animating) {
        return false
      }
      this.autoPlaying = true
      let autoPlayTime = this.param.autoPlayTime || 3000
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
      this.autoPlayTimeout = setTimeout(() => {
        this.changeX = 100
        this.moveBack(true)
      }, autoPlayTime)
      autoPlayTimeout.push(this.autoPlayTimeout)
    },
    goPre () {
      this.changeX = -100
      this.moveBack()
    },
    goNext () {
      this.changeX = 100
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
      let goPage = this.renderPage + 1 + added
      this.renderData[goPage] = Object.assign({}, this.param.data[page], {
        show: true
      })
      this.randKey = Math.random()
      let moveLeft = (this.renderPage + added + 1) * this.playerWidth
      this.play(this.player.scrollLeft, moveLeft, () => {
        this.setRenderPage(page)
        this.player.scrollLeft = this.playerWidth * (page + 1)
        callback && callback()
      })
    },
    touchstart (e) {
      this.scrollParam = this.scrollParam || {}
      if (!this.param.drag || this.animating || this.scrollParam.moveLock) {
        return false
      }
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
        sL: this.player.scrollLeft,
        move: false
      })
      return true
    },
    touchmove (e) {
      const scrollParam = this.scrollParam
      if (!scrollParam || !scrollParam.moveLock) {
        return false
      }
      const event = (!e.pageX && !e.x && e.targetTouches) ? e.targetTouches[0] : e
      scrollParam.mX = event.pageX || event.x
      scrollParam.mY = event.pageY || event.y
      if (Math.abs(scrollParam.mX - scrollParam.sX) > 30 || (Math.abs(scrollParam.mX - scrollParam.sX) > Math.abs(scrollParam.mY - scrollParam.sY)) || scrollParam.move) {
        e.preventDefault()
        e.stopPropagation()
        let changeX = scrollParam.sX - scrollParam.mX
        this.player.scrollLeft = scrollParam.sL + changeX / 3
        this.changeX = changeX
        scrollParam.move = true
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
      }
      if (Math.abs(this.changeX) < 90) {
        renderPage = this.renderPage
      }
      this.changeX = 0
      let moveLeft = (renderPage + 1) * this.playerWidth
      this.play(this.player.scrollLeft, moveLeft, () => {
        this.setRenderPage(renderPage, fromDrag)
        this.player.scrollLeft = this.playerWidth * (this.renderPage + 1)
      })
    },
    play (toPageStart, toPageEnd, callback) {
      const tween = this.Animation.tween.Cubic.easeOut
      const that = this
      this.animating = true
      this.Animation.play({
        aStart: toPageStart,
        aEnd: toPageEnd,
        tEnd: 24,
        tween,
        handle (num) {
          that.player.scrollLeft = parseInt(num)
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

export default FcDomPlayer
