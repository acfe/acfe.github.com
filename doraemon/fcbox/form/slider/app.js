/**
 * Created by 001264 on 2017/6/26.
 */

const FcSlider = {
  name: 'FcSlider',
  data () {
    return {
      moveParam: {},
      maskWidth: 0,
      slideLeft: 0
    }
  },
  props: ['param', 'callback'],
  mounted () {
    setTimeout(() => {
      this.initPosition()
    })
  },
  methods: {
    initPosition () {
      const param = this.param
      const slideBg = this.$refs.slideBg
      if (!slideBg) {
        return false
      }
      this.slideMax = slideBg.clientWidth
      const slider = this.$refs.slider
      this.slider = this.slider || slider
      const slideMask = this.$refs.slideMask
      this.slideMask = this.slideMask || slideMask
      const setWidth = parseInt((param.value / param.max) * this.slideMax)
      this.maskWidth = setWidth + 10 + 'px'
      this.slideLeft = setWidth + 'px'
    },
    mousedown (e) {
      e.preventDefault()
      const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e
      const param = this.moveParam
      param.moveLock = true
      param.isMove = 0
      param.sX = event.pageX || event.x
      param.sL = parseInt(this.slider.style.left) || 0
      this.slider.style.transition = 'none'
      this.slideMask.style.transition = 'none'
      document.body.onmouseup = () => {
        this.mouseup()
      }
      document.body.onmousemove = (e) => {
        this.mousemove(e)
      }
    },
    mousemove (e) {
      const param = this.moveParam
      if (!param.moveLock) {
        return
      }
      const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e
      param.mX = event.pageX || event.x
      if (Math.abs(param.mX - param.sX) >= 10) {
        param.isMove = 1
      }
      var changeX = param.sL + (param.mX - param.sX)
      changeX = changeX > 0 ? changeX : 0
      changeX = changeX < this.slideMax ? changeX : this.slideMax
      this.param.value = parseInt(this.param.min + (changeX / this.slideMax) * (this.param.max - this.param.min))
      this.callback && this.callback(this.param)
      this.slideLeft = changeX + 'px'
      this.maskWidth = changeX + 10 + 'px'
    },
    mouseup () {
      const param = this.moveParam
      if (!param.moveLock) {
        return
      }
      param.moveLock = false
      this.callback && this.callback(this.param, 'up')
    },
    click (e) {
      const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e
      let layerX = event.layerX
      layerX = layerX > 0 ? layerX : 0
      layerX = layerX < this.slideMax ? layerX : this.slideMax
      this.param.value = parseInt(this.param.min + (layerX / this.slideMax) * (this.param.max - this.param.min))
      const setWidth = parseInt((this.param.value / this.param.max) * this.slideMax)
      this.slider.style.transition = 'left .25s ease'
      this.slideMask.style.transition = 'width .25s ease'
      setTimeout(() => {
        this.maskWidth = setWidth + 10 + 'px'
        this.slideLeft = setWidth + 'px'
        this.callback && this.callback(this.param)
      })
    }
  }
}

export default FcSlider
