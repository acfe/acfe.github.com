/**
 * Created by 001264 on 2018/11/16.
 */

const FcFitImage = {
  name: 'FcFitImage',
  data () {
    return {
      randKey: Math.random(),
      loaded: false,
      fitType: 1,
      imageCotainerStyle: {},
      imageContentStyle: {}
    }
  },
  props: ['src', 'imageStyle'],
  created () {
    if (!this.src) {
      return false
    }
    window.fc = window.fc || {}
    window.fc.FcPreImages = window.fc.FcPreImages || []
    window.fc.FcPreImagesLoaded = window.fc.FcPreImagesLoaded || {}
    const showImageStyle = this.imageStyle || {}
    this.showImageStyle = showImageStyle
    if (showImageStyle && showImageStyle.height) {
      this.setImageStyle(showImageStyle)
    } else {
      this.imageContentStyle = this.formatStyle(this.showImageStyle)
    }
  },
  mounted () {
    if (window.fc.FcPreImagesLoaded[this.src]) {
      this.setImageSize(window.fc.FcPreImagesLoaded[this.src])
      this.loaded = true
      this.randKey = Math.random()
    } else {
      this.src && this.loadImage()
    }
  },
  methods: {
    setImageStyle (imageStyle) {
      this.fitType = imageStyle.fitType || 3
      switch (this.fitType) {
        case 2: // 适配高度
          this.imageContentStyle = Object.assign(this.formatStyle(this.showImageStyle), {
            width: 'auto'
          })
          if (imageStyle.align) {
            this.imageCotainerStyle = {
              'text-align': imageStyle.align
            }
          }
          break
        case 3: // 适配
          this.imageContentStyle = Object.assign(this.formatStyle(this.showImageStyle), {
            'background-image': 'url(' + this.src + ')'
          })
          break
        case 4: // 拉伸
          this.imageContentStyle = this.formatStyle(this.showImageStyle)
          break
      }
    },
    loadImage () {
      let img = new Image()
      let that = this
      img.onload = function () {
        that.loaded = true
        window.fc.FcPreImagesLoaded[that.src] = {
          width: this.width,
          height: this.height
        }
        that.setImageSize({
          width: this.width,
          height: this.height
        })
      }
      img.src = this.src
    },
    setImageSize (image) {
      if (this.fitType != 3 || !this.$refs.fitImage) {
        return false
      }
      let sw = image.width
      let sh = image.height
      let fh = parseInt(this.showImageStyle.height) || 0
      let fw = this.$refs.fitImage.clientWidth
      let rw = (fh / sh) * sw
      if (fw > rw) {
        Object.assign(this.imageContentStyle, {
          'background-size': '100% auto',
          'background-position': (this.showImageStyle.vAlign || 'center') + ' center'
        })
      } else {
        Object.assign(this.imageContentStyle, {
          'background-size': 'auto 100%',
          'background-position': 'center ' + (this.showImageStyle.hAlign || 'center')
        })
      }
    },
    formatStyle (style) {
      if (!style) {
        return false
      }
      let newStyle = {}
      const remStandar = 375
      for (let i in style) {
        switch (i) {
          case 'border-top-width':
          case 'border-bottom-width':
          case 'border-left-width':
          case 'border-right-width':
            if (style[i] || parseInt(style[i]) === 0) {
              newStyle[i] = (parseInt(style[i])) + 'px'
            }
            break
          case 'height':
          case 'border-top-left-radius':
          case 'border-top-right-radius':
          case 'border-bottom-left-radius':
          case 'border-bottom-right-radius':
          case 'padding-left':
          case 'padding-right':
          case 'padding-top':
          case 'padding-bottom':
            if (/%/.test(style[i])) {
              newStyle[i] = style[i]
            } else if (style[i] || parseInt(style[i]) === 0) {
              newStyle[i] = (parseInt(style[i]) / remStandar) + 'rem'
            }
            break
          case 'border-top-color':
          case 'border-bottom-color':
          case 'border-left-color':
          case 'border-right-color':
          case 'border-top-style':
          case 'border-bottom-style':
          case 'border-left-style':
          case 'border-right-style':
            if (style[i]) {
              newStyle[i] = style[i]
            }
            break
        }
      }
      return newStyle
    }
  }
}

export default FcFitImage
