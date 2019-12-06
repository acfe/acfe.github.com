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
  props: ['param', 'isSet', 'zIndex', 'acCallback', 'entry'],
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
      const opThemeArr = [1, 2, 3, 4, 5, 6, 7]
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
        if (this.entry == 'm') {
          this.checkPlay()
          window.addEventListener('message', (e) => {
            if (e.data && e.data.ac == 'docScroll') {
              this.checkPlay()
            }
          })
        } else {
          this.playAnimation()
        }
      })
    }
  },
  methods: Object.assign({
    checkPlay () {
      if (this.animationPlayted) {
        return false
      }
      let moduleTop = this.$refs.element.parentNode.parentNode.parentNode.parentNode.offsetTop
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      let moduleHeight = this.$refs.element.parentNode.parentNode.parentNode.parentNode.clientHeight
      moduleHeight = moduleHeight > clientHeight ? clientHeight : moduleHeight
      if (moduleTop - clientHeight + (moduleHeight / 2) < scrollTop) {
        this.playAnimation()
      }
    },
    playAnimation () {
      this.animationPlayted = true
      const param = this.param
      const playElement = this.$refs.element
      param.animations = param.animations || {}
      if (!playElement || !param.animations || !param.animations.data) {
        return false
      }
      if (this.playKey >= param.animations.data.length && (parseInt(param.animationRepeat) === 0 || (parseInt(param.animationRepeat) && parseInt(param.animationRepeat) > this.animationRepeatNum))) {
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
      let direction = parseInt(animation.direction) || 1
      let tweenType = animation.tweenType || 'Cubic'
      let tween = AnimationObj.tween[tweenType]
      let tweenAc = animation.tweenAc || 'easeOut'
      if (tweenType != 'Linear') {
        tween = tween[tweenAc]
      }
      const playDataArr = {}
      let endLeft = playElement.offsetLeft
      let endOpacity = parseInt(this.param.elementStyle.opacity) / 100 || 1
      let endTop = playElement.offsetTop
      let startLeft
      let startTop
      let rotateZ = 0
      let clientWidth = (document.body.clientWidth || document.documentElement.clientWidth)
      clientWidth = parseInt(animation.moveDistance) || parseInt(animation.moveDistance) === 0 ? parseInt(animation.moveDistance) : clientWidth
      let deg = parseInt(animation.deg) || 360
      const getMoveData = (type) => {
        if (type == 'in') {
          switch (direction) {
            case 1: // 左上
              startLeft = endLeft - clientWidth
              playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
              startTop = endTop - clientWidth
              playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
              break
            case 2: // 上
              startTop = endTop - clientWidth
              playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
              break
            case 3: // 右上
              startLeft = endLeft + clientWidth
              playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
              startTop = endTop - clientWidth
              playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
              break
            case 4: // 左
              startLeft = endLeft - clientWidth
              playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
              break
            case 5: // 右
              startLeft = endLeft + clientWidth
              playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
              break
            case 6: // 左下
              startLeft = endLeft - clientWidth
              playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
              startTop = endTop + clientWidth
              playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
              break
            case 7: // 下
              startTop = endTop + clientWidth
              playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
              break
            case 8: // 右下
              startLeft = endLeft + clientWidth
              playDataArr.leftArr = getAnimationData(startLeft, endLeft, tEnd, tween)
              startTop = endTop + clientWidth
              playDataArr.topArr = getAnimationData(startTop, endTop, tEnd, tween)
              break
          }
        } else if (type == 'out') {
          switch (direction) {
            case 1: // 左上
              startLeft = endLeft - clientWidth
              playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
              startTop = endTop - clientWidth
              playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
              break
            case 2: // 上
              startTop = endTop - clientWidth
              playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
              break
            case 3: // 右上
              startLeft = endLeft + clientWidth
              playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
              startTop = endTop - clientWidth
              playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
              break
            case 4: // 左
              startLeft = endLeft - clientWidth
              playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
              break
            case 5: // 右
              startLeft = endLeft + clientWidth
              playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
              break
            case 6: // 左下
              startLeft = endLeft - clientWidth
              playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
              startTop = endTop + clientWidth
              playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
              break
            case 7: // 下
              startTop = endTop + clientWidth
              playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
              break
            case 8: // 右下
              startLeft = endLeft + clientWidth
              playDataArr.leftArr = getAnimationData(endLeft, startLeft, tEnd, tween)
              startTop = endTop + clientWidth
              playDataArr.topArr = getAnimationData(endTop, startTop, tEnd, tween)
              break
          }
        }
      }
      switch (animation.theme) {
        // 飞入
        case 1:
          getMoveData('in')
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 飞出
        case 1001:
          getMoveData('out')
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 淡入
        case 2:
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 淡入
        case 1002:
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 翻转
        case 3:
          playElement.style.opacity = endOpacity
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          break
        // 翻入
        case 4:
          getMoveData('in')
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 翻出
        case 1004:
          getMoveData('out')
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateYArr = getAnimationData(deg, 0, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 旋转
        case 5:
          playElement.style.opacity = endOpacity
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateZArr = getAnimationData(deg + rotateZ, rotateZ, tEnd, tween)
          break
        // 旋入
        case 6:
          getMoveData('in')
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateZArr = getAnimationData(deg + rotateZ, rotateZ, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 旋出
        case 1006:
          getMoveData('out')
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.rotateZArr = getAnimationData(rotateZ, deg + rotateZ, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
          break
        // 放大
        case 7:
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.scaleArr = getAnimationData(0, 1, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(0, endOpacity, tEnd, tween)
          break
        // 缩小
        case 1007:
          if (/rotateZ\((-?\d+)/.exec(playElement.style.transform)) {
            rotateZ = parseInt(/rotateZ\((-?\d+)/.exec(playElement.style.transform)[1]) || 0
          }
          playDataArr.scaleArr = getAnimationData(2, 1, tEnd, tween)
          playDataArr.opacityArr = getAnimationData(endOpacity, 0, tEnd, tween)
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
            case 1: // 飞入
            case 1001: // 飞出
              switch (direction) {
                case 1: // 左上
                case 3: // 右上
                case 6: // 左下
                case 8: // 右下
                  Object.assign(playElement.style, {
                    left: playDataArr.leftArr[acId] + 'px',
                    top: playDataArr.topArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
                case 2: // 上
                case 7: // 下
                  Object.assign(playElement.style, {
                    top: playDataArr.topArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
                case 4: // 左
                case 5: // 右
                  Object.assign(playElement.style, {
                    left: playDataArr.leftArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
              }
              break
            case 2: // 淡入
            case 1002: // 淡出
              Object.assign(playElement.style, {
                opacity: playDataArr.opacityArr[acId]
              })
              break
            case 3: // 翻转
              that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)')
              break
            case 4: // 翻入
            case 1004: // 翻出
              switch (direction) {
                case 1: // 左上
                case 3: // 右上
                case 6: // 左下
                case 8: // 右下
                  that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)', {
                    left: playDataArr.leftArr[acId] + 'px',
                    top: playDataArr.topArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
                case 2: // 上
                case 7: // 下
                  that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)', {
                    top: playDataArr.topArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
                case 4: // 左
                case 5: // 右
                  that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) rotateY(' + playDataArr.rotateYArr[acId] + 'deg)', {
                    left: playDataArr.leftArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
              }
              break
            case 5: // 旋转
              that.setTransform(playElement.style, 'rotateZ(' + playDataArr.rotateZArr[acId] + 'deg)')
              break
            case 6: // 旋入
            case 1006: // 旋出
              switch (direction) {
                case 1: // 左上
                case 3: // 右上
                case 6: // 左下
                case 8: // 右下
                  that.setTransform(playElement.style, 'rotateZ(' + playDataArr.rotateZArr[acId] + 'deg)', {
                    left: playDataArr.leftArr[acId] + 'px',
                    top: playDataArr.topArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
                case 2: // 上
                case 7: // 下
                  that.setTransform(playElement.style, 'rotateZ(' + playDataArr.rotateZArr[acId] + 'deg)', {
                    top: playDataArr.topArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
                case 4: // 左
                case 5: // 右
                  that.setTransform(playElement.style, 'rotateZ(' + playDataArr.rotateZArr[acId] + 'deg)', {
                    left: playDataArr.leftArr[acId] + 'px',
                    opacity: playDataArr.opacityArr[acId]
                  })
                  break
              }
              break
            case 7:
            case 1007:
              that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg) scale(' + playDataArr.scaleArr[acId] + ')', {
                opacity: playDataArr.opacityArr[acId]
              })
              break
          }
        },
        finish () {
          switch (animation.theme) {
            case 1001:
            case 1004:
              Object.assign(playElement.style, {
                left: endLeft + 'px',
                top: endTop + 'px',
                opacity: endOpacity,
                display: 'none'
              })
              break
            case 1002:
              Object.assign(playElement.style, {
                opacity: endOpacity,
                display: 'none'
              })
              break
            case 1006:
              that.setTransform(playElement.style, 'rotateZ(' + rotateZ + 'deg)', {
                left: endLeft + 'px',
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
