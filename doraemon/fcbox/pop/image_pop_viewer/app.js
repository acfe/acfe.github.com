/**
 * Created by 001264 on 2017/6/26.
 */
import Animation from 'fcbox/utils/animation'

const FcImagePopViewer = {
  name: 'ImagePopViewer',
  data () {
    return {
      loading: false,
      ImagePopViewer: {
        show: false,
        zoom: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 0,
        height: 0,
        percent: 0,
        data: [],
        showId: 0
      }
    }
  },
  created () {
    window.fc = window.fc || {}
    window.fc.FcImagePopViewer = this
    this.toolHeight = 40
    this.param = {}
    this.Animation = new Animation()
    document.body.onmouseup = () => {
      this.mouseup()
    }
  },
  methods: {
    close () {
      this.ImagePopViewer.show = false
    },
    show (param = {}) {
      param.showId = param.showId || 0
      Object.assign(this.ImagePopViewer, param)
      if (this.ImagePopViewer.data && this.ImagePopViewer.data.length) {
        Object.assign(this.ImagePopViewer, {
          show: true
        })
        requestAnimationFrame(() => {
          this.showAction()
        })
      }
    },
    setValue (param) {
      this.ImagePopViewer[param.key] = param.value
    },
    showAction () {
      const ImagePopViewer = this.ImagePopViewer
      this.pic = this.$refs.pic
      this.img = this.$refs.img
      const showId = ImagePopViewer.showId || 0
      const data = ImagePopViewer.data
      this.img.src = data[showId].url
      this.loading = true
      this.img.onload = this.imageOnload
      this.pic.addEventListener('mousedown', this.touchStart.bind(this))
      this.pic.addEventListener('mousemove', this.touchMove.bind(this))
      this.pic.addEventListener('mouseup', this.touchEnd.bind(this))
      const pop = this.$refs.ImagePopViewerContent
      pop.onmousewheel = (e) => {
        const zoom = e.wheelDelta > 0 ? 1.1 : 0.9
        this.zoom(zoom)
      }
    },
    changeImage (key) {
      if (this.param.isMove) {
        return
      }
      this.loading = true
      this.ImagePopViewer.showId = key
      this.refresh()
    },
    showChange (type) {
      const ImagePopViewer = this.ImagePopViewer
      let showId = ImagePopViewer.showId
      const min = 0
      const max = ImagePopViewer.data.length - 1
      showId = type == 'pre' ? showId - 1 : showId + 1
      showId = showId < min ? max : showId
      showId = showId > max ? min : showId
      this.ImagePopViewer.showId = showId
      this.refresh()
    },
    refresh () {
      const ImagePopViewer = this.ImagePopViewer
      const showId = ImagePopViewer.showId || 0
      const data = ImagePopViewer.data
      this.img.src = data[showId].url
    },
    imageOnload (e) {
      this.loading = false
      this.setDefaultSize()
      this.showImg = this.$refs.showImg
      this.showImg.src = this.img.src
    },
    setDefaultSize () {
      const ImagePopViewer = {}
      ImagePopViewer.rotateZ = 0
      ImagePopViewer.rotateY = 0
      ImagePopViewer.rotateX = 0
      ImagePopViewer.width = this.img.clientWidth
      ImagePopViewer.sourceWidth = this.img.clientWidth
      ImagePopViewer.height = this.img.clientHeight
      ImagePopViewer.sourceHeight = this.img.clientHeight
      ImagePopViewer.rotateX = 0
      const defaultWidth = parseInt(ImagePopViewer.width * (7 / 10))
      const defaultHeight = parseInt(defaultWidth * (ImagePopViewer.height / ImagePopViewer.width))
      Object.assign(this.pic.style, {
        width: defaultWidth + 'px',
        height: defaultHeight + 'px',
        marginLeft: -(defaultWidth / 2) + 'px',
        marginTop: -(defaultHeight / 2 + this.toolHeight / 2) + 'px',
        left: '50%',
        top: '50%'
      })
      ImagePopViewer.percent = parseInt(defaultWidth / ImagePopViewer.width * 100)
      this.setTransform(ImagePopViewer)
      Object.assign(this.ImagePopViewer, ImagePopViewer)
    },
    setTransform (ImagePopViewer) {
      let rotateZ = ImagePopViewer.rotateZ || 0
      let rotateY = ImagePopViewer.rotateY || 0
      let rotateX = ImagePopViewer.rotateX || 0
      Object.assign(this.pic.style, {
        transform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
        WebkitTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
        OTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
        MozTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
        MsTransform: 'rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)'
      })
    },
    // tool
    zoom (percent) {
      const ImagePopViewer = this.ImagePopViewer
      percent = parseInt(ImagePopViewer.percent * percent)
      percent = percent > 1000 ? 1000 : percent
      percent = percent < 10 ? 10 : percent
      if (percent > 95 && percent < 105) {
        percent = 100
      }
      const width = parseInt(ImagePopViewer.sourceWidth * percent / 100)
      const height = parseInt(ImagePopViewer.sourceHeight * percent / 100)
      Object.assign(this.pic.style, {
        width: width + 'px',
        height: height + 'px',
        marginLeft: -width / 2 + 'px',
        marginTop: -height / 2 + 'px'
      })
      ImagePopViewer.percent = percent
    },
    resize () {
      const ImagePopViewer = this.ImagePopViewer
      ImagePopViewer.rotateZ = 0
      ImagePopViewer.rotateY = 0
      ImagePopViewer.rotateX = 0
      ImagePopViewer.percent = 100
      Object.assign(this.pic.style, {
        width: ImagePopViewer.sourceWidth + 'px',
        height: ImagePopViewer.sourceHeight + 'px',
        marginLeft: -ImagePopViewer.sourceWidth / 2 + 'px',
        marginTop: -ImagePopViewer.sourceHeight / 2 + 'px',
        left: '50%',
        top: '50%'
      })
      this.setTransform(ImagePopViewer)
    },
    rotateZ (deg) {
      const ImagePopViewer = this.ImagePopViewer
      let rotateZ = ImagePopViewer.rotateZ || 0
      rotateZ += deg
      ImagePopViewer.rotateZ = rotateZ
      this.setTransform(ImagePopViewer)
    },
    rotateY (deg) {
      const ImagePopViewer = this.ImagePopViewer
      let rotateY = ImagePopViewer.rotateY || 0
      rotateY += deg
      if (rotateY >= 360) {
        rotateY = 0
      }
      ImagePopViewer.rotateY = rotateY
      this.setTransform(ImagePopViewer)
    },
    rotateX (deg) {
      const ImagePopViewer = this.ImagePopViewer
      let rotateX = ImagePopViewer.rotateX || 0
      rotateX += deg
      if (rotateX >= 360) {
        rotateX = 0
      }
      ImagePopViewer.rotateX = rotateX
      this.setTransform(ImagePopViewer)
    },
    touchStart (event) {
      event.preventDefault()
      var param = this.param
      param.moveLock = true
      param.sX = event.pageX || event.x
      param.sY = event.pageY || event.y
      var top = this.pic.style.top
      var left = this.pic.style.left
      if (top && !/%/.test(top)) {
        param.sT = parseInt(top)
        param.sL = parseInt(left)
      } else {
        const width = this.$refs.ImagePopViewerContent.clientWidth
        const height = this.$refs.ImagePopViewerContent.clientHeight
        param.sT = (height) / 2
        param.sL = (width) / 2
      }
    },
    touchMove (event) {
      var param = this.param
      if (!param.moveLock) {
        return
      }
      param.mX = event.pageX || event.x
      param.mY = event.pageY || event.y
      var changeX = param.mX - param.sX
      var changeY = param.mY - param.sY
      this.pic.style.left = param.sL + changeX + 'px'
      this.pic.style.top = param.sT + changeY + 'px'
    },
    touchEnd () {
      var param = this.param
      param.moveLock = false
    },
    // thumb
    mousedown (e) {
      this.scroll = this.$refs.scrollTable
      const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e
      const param = this.param
      param.moveLock = true
      param.isMove = 0
      param.sX = event.pageX || event.x
      param.sL = this.scroll.scrollLeft || 0
      this.startTime = new Date().getTime()
      param.lastPosX = param.sX
      param.sLastPosX = param.sX
    },
    mousemove (e) {
      const param = this.param
      if (!param.moveLock) {
        return
      }
      const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e
      param.mX = event.pageX || event.x
      if (Math.abs(param.mX - param.sX) >= 10) {
        param.isMove = 1
      }
      var changeX = param.sX - param.mX
      this.scroll.scrollLeft = param.sL + changeX
      param.sLastPosX = param.lastPosX
      param.lastPosX = param.mX
      if (this.mEv) {
        clearTimeout(this.mEv)
      }
      this.mEv = setTimeout(() => {
        this.startTime = new Date().getTime()
      }, 50)
    },
    mouseup () {
      if (this.mEv) {
        clearTimeout(this.mEv)
      }
      const param = this.param
      if (!param.moveLock) {
        return
      }
      param.moveLock = false
      if (!param.isMove) {
        return
      }
      this.endTime = new Date().getTime()
      let moveAdd = 0
      this.showScrollContentWidth = this.$refs.showScrollContent.clientWidth
      moveAdd = (param.lastPosX - param.sLastPosX) / 100 * this.showScrollContentWidth
      if (Math.abs(moveAdd) < 30) {
        return
      }
      let frameNum = 0
      frameNum = (this.endTime - this.startTime)
      frameNum = frameNum > 50 ? 50 : frameNum
      const that = this
      const tween = this.Animation.tween.Cubic.easeOut
      let aEnd = that.scroll.scrollLeft - moveAdd
      aEnd = aEnd > this.showScrollContentWidth ? this.showScrollContentWidth : aEnd
      aEnd = aEnd < 0 ? 0 : aEnd
      new Animation().play({
        aStart: that.scroll.scrollLeft,
        aEnd,
        tEnd: frameNum,
        tween,
        handle (num) {
          that.scroll.scrollLeft = num
        }
      })
    }
  }
}

export default FcImagePopViewer
