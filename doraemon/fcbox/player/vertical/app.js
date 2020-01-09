/**
 * Created by 001264 on 2018/11/12.
 */
import Animation from 'fcbox/utils/animation'
let autoPlayTimeout = []

const FcVerticalPlayer = {
  name: 'FcVerticalPlayer',
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
    this.param.FcVerticalPlayer = this
    this.param.drag = this.param.drag === undefined ? true : this.param.drag
    this.param.initCallback && this.param.initCallback(this)
  },
  mounted () {
    let player = this.$refs.player
    if (!player) {
      return false
    }
    const param = this.param
    this.player = player
    let moduleHeight = param.moduleHeight
    if (param.heightType == 'screen') {
      // moduleHeight = (document.body.offsetHeight || document.documentElement.offsetHeight)
      moduleHeight = window.screen.availHeight
    }
    moduleHeight = moduleHeight > window.screen.availHeight ? window.screen.availHeight : moduleHeight
    this.moduleHeight = moduleHeight
    this.playerStyle = {
      height: moduleHeight + 'px'
    }
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
          top: (3 * this.moduleHeight) + 'px'
        }
        this.renderData[i].ref = 'empty'
        this.renderData[i].dataRender = 'empty'
        if (i == page) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            top: -this.moduleHeight + 'px'
          }
        }
        if (i == page + 1) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            top: 0
          }
          this.renderData[i].ref = 'renderScroll'
          this.renderData[i].dataRender = 'render'
        }
        if (i == page + 2) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            top: this.moduleHeight + 'px'
          }
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
        this.changeY = -100
        this.moveBack(true)
      }, autoPlayTime)
      autoPlayTimeout.push(this.autoPlayTimeout)
    },
    goPre () {
      this.changeY = 100
      this.moveBack()
    },
    goNext () {
      this.changeY = -100
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
      let added = page > this.renderPage ? -1 : 1
      let eT = added * this.moduleHeight
      for (let i in this.renderData) {
        this.renderData[i].show = false
        this.renderData[i].style = {
          top: (3 * this.moduleHeight) + 'px'
        }
        this.renderData[i].ref = 'empty'
        if (i == parseInt(page) + 1) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            top: -eT + 'px'
          }
        }
        if (i == parseInt(this.renderPage) + 1) {
          this.renderData[i].show = true
          this.renderData[i].style = {
            top: 0
          }
          this.renderData[i].ref = 'renderScroll'
        }
      }
      this.randKey = Math.random()
      this.play(0, eT, () => {
        this.setRenderPage(page)
        callback && callback()
      })
    },
    touchstart (e) {
      this.scrollParam = this.scrollParam || {}
      if (!this.param.drag || this.animating || this.scrollParam.moveLock || !this.$refs.renderScroll || !this.$refs.renderScroll[0]) {
        return false
      }
      e.stopPropagation()
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout)
      this.autoPlaying = false
      const event = (!e.pageX && !e.x && e.targetTouches) ? e.targetTouches[0] : e
      const scrollParam = this.scrollParam
      const sX = event.pageX || event.x
      const sY = event.pageY || event.y
      this.changeY = 0
      Object.assign(scrollParam, {
        sX,
        sY,
        moveLock: true,
        sT: 0,
        move: false
      })
      return true
    },
    touchmove (e) {
      const scrollParam = this.scrollParam
      if (!scrollParam || !scrollParam.moveLock) {
        return false
      }
      this.renderScroll = this.$refs.renderScroll[0]
      const event = (!e.pageX && !e.x && e.targetTouches) ? e.targetTouches[0] : e
      scrollParam.mX = event.pageX || event.x
      scrollParam.mY = event.pageY || event.y
      let changeY = scrollParam.mY - scrollParam.sY
      let maxScroll = this.renderScroll.scrollHeight - this.renderScroll.offsetHeight
      scrollParam.move = false
      if ((this.renderScroll.scrollTop == 0 && changeY > 30) || (this.renderScroll.scrollTop >= maxScroll && changeY < 30)) {
        scrollParam.move = true
        this.changeY = changeY
      }
      if (scrollParam.move) {
        e.preventDefault()
        Object.assign(this.player.childNodes[0].style, {
          transform: 'translateY(' + (scrollParam.sT + changeY / 3) + 'px)',
          WebkitTransform: 'translateY(' + (scrollParam.sT + changeY / 3) + 'px)',
          OTransform: 'translateY(' + (scrollParam.sT + changeY / 3) + 'px)',
          MozTransform: 'translateY(' + (scrollParam.sT + changeY / 3) + 'px)',
          MsTransform: 'translateY(' + (scrollParam.sT + changeY / 3) + 'px)'
        })
      }
    },
    touchend (e) {
      const scrollParam = this.scrollParam
      if (!scrollParam || !scrollParam.moveLock) {
        this.autoPlay()
        return false
      }
      scrollParam.moveLock = false
      if (!this.changeY) {
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
      let added = this.changeY > 0 ? 1 : -1
      let renderPage = this.renderPage - added
      if (!this.param.loop && (renderPage < 0 || renderPage > this.dataLength - 1)) {
        renderPage = this.renderPage
        added = 0
      }
      if (Math.abs(this.changeY) < 100) {
        renderPage = this.renderPage
        added = 0
      }
      this.changeY = 0
      let sT = 0
      if (/^translateY\((-?\d+)/.exec(this.player.childNodes[0].style.transform)) {
        sT = parseInt(/^translateY\((-?\d+)/.exec(this.player.childNodes[0].style.transform)[1]) || 0
      }
      let eT = added * this.moduleHeight
      this.play(sT, eT, () => {
        if (added) {
          this.setRenderPage(renderPage, fromDrag)
        }
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
          Object.assign(that.player.childNodes[0].style, {
            transform: 'translateY(' + parseInt(num) + 'px)',
            WebkitTransform: 'translateY(' + parseInt(num) + 'px)',
            OTransform: 'translateY(' + parseInt(num) + 'px)',
            MozTransform: 'translateY(' + parseInt(num) + 'px)',
            MsTransform: 'translateY(' + parseInt(num) + 'px)'
          })
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

export default FcVerticalPlayer
