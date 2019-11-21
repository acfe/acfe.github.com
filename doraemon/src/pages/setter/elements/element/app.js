/**
 * Created by 001264 on 2017/9/10.
 */
import formatAc from '../../func/format_style'
import Animation from 'fcbox/utils/animation'

const FcElement = {
  name: 'FcElement',
  data () {
    return {
      randKey: Math.random(),
      elementStyle: {},
      setConfig: {},
      eid: 0,
      clickCallback: () => {},
      inArr (theme, list) {
        let inList = false
        for (let i in list) {
          if (list[i] == theme) {
            inList = true
          }
        }
        return inList
      }
    }
  },
  props: ['param', 'isSet', 'zIndex', 'acCallback'],
  created () {
    const param = this.param
    this.eid = this.param.id
    if (this.isSet) {
      this.setConfig = this.$store.state.setConfig
    }
    if (this.acCallback) {
      this.clickCallback = this.acCallback
    }
    this.elementStyle = this.formatStyle(param.elementStyle || {})
    this.elementStyle.zIndex = this.zIndex || 0
    if (!this.isSet && param.animations && param.animations.data && param.animations.data[0]) {
      const opThemeArr = [1, 2, 3, 4]
      if (this.inArr(parseInt(param.animations.data[0].theme), opThemeArr)) {
        this.elementStyle.opacity = 0
      }
    }
    if (param.hide) {
      this.elementStyle.display = 'none'
    }
  },
  mounted () {
    if (!this.isSet) {
      this.playKey = 0
      this.animationRepeatNum = 1
      requestAnimationFrame(() => {
        this.playAnimation()
      })
    }
  },
  methods: Object.assign({
    playAnimation () {
      const param = this.param
      const playElement = this.$refs.element
      param.animations = param.animations || {}
      // param.animationRepeat = 0
      // param.animations.data = [{
      //   theme: 1,
      //   delay: 0
      // }, {
      //   theme: 2,
      //   delay: 1000,
      //   repeat: 1
      // }, {
      //   theme: 3,
      //   delay: 1000,
      //   repeat: 1
      // }, {
      //   theme: 4,
      //   delay: 1000,
      //   repeat: 1
      // }]
      if (!playElement || !param.animations || !param.animations.data) {
        return false
      }
      if (this.playKey >= param.animations.data.length && (!parseInt(param.animationRepeat) || (parseInt(param.animationRepeat) && parseInt(param.animationRepeat) > this.animationRepeatNum))) {
        this.animationRepeatNum++
        this.playKey = 0
      }
      if (!param.animations.data[this.playKey]) {
        return false
      }
      const animation = param.animations.data[this.playKey] || {}
      animation.theme = parseInt(animation.theme) || 1
      animation.delay = animation.delay || 0
      setTimeout(() => {
        playElement.style.display = 'block'
        this['animationAc'](animation)
      }, animation.delay)
    },
    getDataRender (target, tag) {
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
      return dataKey
    },
    setTransform (style, transform, otherStyle = {}) {
      Object.assign(style, {
        transform: transform,
        WebkitTransform: transform,
        OTransform: transform,
        MozTransform: transform,
        MsTransform: transform
      }, otherStyle)
    },
    animationAc (animation) {
      const playElement = this.$refs.element
      if (this.animating || !playElement) {
        return false
      }
      let dataRender = this.getDataRender(playElement, 'data-render')
      if (dataRender && dataRender != 'render') {
        return false
      }
      const AnimationObj = new Animation()
      const getAnimationData = AnimationObj.getAnimationData
      let tEnd = parseInt(animation.tEnd) || 48
      let tweenType = animation.tweenType || 'Cubic'
      let tween = AnimationObj.tween[tweenType]
      let tweenAc = animation.tweenAc || 'easeOut'
      if (tweenType != 'Linear') {
        tween = tween[tweenAc]
      }
      const playDataArr = {}
      let endLeft = playElement.offsetLeft
      let endOpacity = parseFloat(playElement.style.opacity) || 1
      let endTop = playElement.offsetTop
      let startLeft
      let startTop
      let rotateZ = 0
      let clientWidth = (document.body.clientWidth || document.documentElement.clientWidth)
      let deg = parseInt(animation.deg) || 360
      switch (animation.theme) {
        // 左侧飞入
        case 1:
          startLeft = endLeft - clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 左侧飞出
        case 1001:
          startLeft = endLeft - clientWidth
          playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 右侧飞入
        case 2:
          startLeft = endLeft + clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 右侧飞出
        case 1002:
          startLeft = endLeft + clientWidth
          playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 上方飞入
        case 3:
          startTop = endTop - clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 上方飞出
        case 1003:
          startTop = endTop - clientWidth
          playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 下方飞入
        case 4:
          startTop = endTop + clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 下方飞出
        case 1004:
          startTop = endTop + clientWidth
          playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 淡入
        case 5:
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 左上飞入
        case 6:
          startLeft = endLeft - clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop - clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 左下飞入
        case 7:
          startLeft = endLeft - clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop + clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 右上飞入
        case 8:
          startLeft = endLeft + clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop - clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 右下飞入
        case 9:
          startLeft = endLeft + clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop + clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 翻转
        case 10:
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 左侧翻入
        case 11:
          startLeft = endLeft - clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 右侧翻入
        case 12:
          startLeft = endLeft + clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 上方翻入
        case 13:
          startTop = endTop - clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 下方翻入
        case 14:
          startTop = endTop + clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 左上翻入
        case 15:
          startLeft = endLeft - clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop - clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 左下翻入
        case 16:
          startLeft = endLeft - clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop + clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 右上翻入
        case 17:
          startLeft = endLeft + clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop - clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 右下翻入
        case 18:
          startLeft = endLeft + clientWidth
          playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
          startTop = endTop + clientWidth
          playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
      }
      let that = this
      this.animating = true
      animation.playNum = animation.playNum || 0
      AnimationObj.play({
        aStart: 0,
        aEnd: 0,
        tEnd,
        tween,
        handle (num, acNum) {
          let acId = acNum
          switch (animation.theme) {
            case 1:
            case 1001:
            case 2:
            case 1002:
              Object.assign(playElement.style, {
                left: playDataArr.leftArr[acId] + 'px',
                opacity: playDataArr.opacityArr[acId]
              })
              break
            case 3:
            case 1003:
            case 4:
            case 1004:
              Object.assign(playElement.style, {
                top: playDataArr.topArr[acId] + 'px',
                opacity: playDataArr.opacityArr[acId]
              })
              break
            case 5:
              Object.assign(playElement.style, {
                opacity: playDataArr.opacityArr[acId]
              })
              break
            case 6:
            case 7:
            case 8:
            case 9:
              Object.assign(playElement.style, {
                left: playDataArr.leftArr[acId] + 'px',
                top: playDataArr.topArr[acId] + 'px',
                opacity: playDataArr.opacityArr[acId]
              })
              break
            case 10:
              that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)')
              break
            case 11:
            case 12:
              that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)', {
                left: playDataArr.leftArr[acId] + 'px',
                opacity: playDataArr.opacityArr[acId]
              })
              break
            case 13:
            case 14:
              that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)', {
                top: playDataArr.topArr[acId] + 'px',
                opacity: playDataArr.opacityArr[acId]
              })
              break
            case 15:
            case 16:
            case 17:
            case 18:
              that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)', {
                left: playDataArr.leftArr[acId] + 'px',
                top: playDataArr.topArr[acId] + 'px',
                opacity: playDataArr.opacityArr[acId]
              })
              break
          }
        },
        finish () {
          switch (animation.theme) {
            case 1001:
            case 1002:
              Object.assign(playElement.style, {
                left: endLeft + 'px',
                opacity: endOpacity,
                display: 'none'
              })
              break
            case 1003:
            case 1004:
              Object.assign(playElement.style, {
                top: endTop + 'px',
                opacity: endOpacity,
                display: 'none'
              })
              break
          }
          that.animating = false
          animation.playNum++
          if (!parseInt(animation.repeat) || (parseInt(animation.repeat) && parseInt(animation.repeat) > animation.playNum)) {
            playElement.style.display = 'block'
            setTimeout(() => {
              that['animationAc'](animation)
            }, animation.delay)
          } else {
            that.playKey++
            that.playAnimation()
          }
        }
      })
    }
  }, formatAc)
}

export default FcElement
