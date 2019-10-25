/**
 * Created by 001264 on 2018/11/16.
 */

const FcPreImage = {
  name: 'FcPreImage',
  data () {
    return {
      randKey: Math.random(),
      imageContainerStyle: {},
      imageContentStyle: {},
      loadingStyle: {
        width: 'auto'
      },
      isMounted: false,
      imageUrl: ''
    }
  },
  props: ['fit', 'src', 'first', 'loadingHeight', 'imageStyle'],
  created () {
    window.fc = window.fc || {}
    window.fc.FcPreImages = window.fc.FcPreImages || []
    window.fc.FcPreImagesLoaded = window.fc.FcPreImagesLoaded || {}
    let loadingHeight = this.loadingHeight || 50
    this.loadingStyle.height = loadingHeight + 'px'
    let imageStyle = this.imageStyle || {}
    if (imageStyle.width) {
      this.imageContainerStyle.width = imageStyle.width
    }
    if (imageStyle.height) {
      this.imageContainerStyle.height = imageStyle.height
    }
    if (imageStyle.float) {
      this.imageContainerStyle.float = imageStyle.float
    }
  },
  mounted () {
    let imageWidth = this.$refs.fcPreImage.clientWidth
    let imageHeight = this.$refs.fcPreImage.clientHeight
    if (window.fc.FcPreImagesLoaded[this.src.split('?')[0]]) {
      this.isMounted = true
      let src = this.src.split('?')[0] + '?imageView2/2/w/' + imageWidth
      let img = new Image()
      let that = this
      let imageStyle = this.imageStyle || {}
      img.onload = function () {
        if (that.fit && this.width > this.height && that.$refs.fcPreImage) {
          let w = this.width * (that.$refs.fcPreImage.clientHeight / this.height)
          Object.assign(that.imageContentStyle, imageStyle, {
            width: 'auto',
            height: that.$refs.fcPreImage.clientHeight + 'px',
            'margin-left': -(w - that.$refs.fcPreImage.clientWidth) / 2 + 'px'
          })
        } else {
          Object.assign(that.imageContentStyle, imageStyle)
        }
      }
      img.src = src
      this.imageUrl = src
      return false
    }
    let infoParam = {
      fit: this.fit,
      imageWidth,
      imageHeight,
      loadNum: 0,
      src: this.src,
      callback: this.refreshImage.bind(this),
      loadImage: this.loadImage.bind(this)
    }
    if (this.first) {
      window.fc.FcPreImages.push(infoParam)
    } else {
      window.fc.FcPreImages.unshift(infoParam)
    }
    this.isMounted = true
    this.loadImage()
  },
  methods: {
    refreshImage (param) {
      let imageStyle = this.imageStyle || {}
      this.imageUrl = param.src
      if (window.fc.FcPreImagesLoaded[param.src.split('?')[0]]) {
        if (param.width > window.fc.FcPreImagesLoaded[param.src.split('?')[0]].width) {
          window.fc.FcPreImagesLoaded[param.src.split('?')[0]].width = param.width
        }
      } else {
        window.fc.FcPreImagesLoaded[param.src.split('?')[0]] = param
      }
      if (this.fit && param.width > param.height) {
        let w = param.width * (this.$refs.fcPreImage.clientHeight / param.height)
        Object.assign(this.imageContentStyle, imageStyle, {
          width: 'auto',
          height: this.$refs.fcPreImage.clientHeight + 'px',
          'margin-left': -(w - this.$refs.fcPreImage.clientWidth) / 2 + 'px'
        })
      } else {
        Object.assign(this.imageContentStyle, imageStyle)
      }
    },
    loadImage () {
      if (window.fc.FcPreImageLoading || !window.fc.FcPreImages.length) {
        return false
      }
      window.fc.FcPreImageLoading = true
      let loadObj = window.fc.FcPreImages.pop()
      if (!loadObj.src || loadObj.loadNum > 3) {
        return false
      }
      loadObj.imageWidth = loadObj.imageWidth || document.body.clientWidth
      loadObj.imageWidth = loadObj.imageWidth > document.body.clientWidth ? document.body.clientWidth : loadObj.imageWidth
      let cut = '?imageView2/2/w/' + loadObj.imageWidth
      if (loadObj.fit && loadObj.imageWidth >= loadObj.imageHeight) {
        cut = '?imageView2/2/h/' + loadObj.imageHeight
      }
      let src = loadObj.src.split('?')[0] + cut
      let img = new Image()
      img.onload = function () {
        window.fc.FcPreImageLoading = false
        loadObj.callback && loadObj.callback({
          src,
          width: this.width,
          height: this.height
        })
        loadObj.loadImage && loadObj.loadImage()
      }
      img.onerror = (e) => {
        setTimeout(() => {
          window.fc.FcPreImageLoading = false
          loadObj.loadNum++
          if (loadObj.loadNum > 1) {
            window.fc.FcPreImages.unshift(loadObj)
          } else {
            window.fc.FcPreImages.push(loadObj)
          }
          loadObj.loadImage && loadObj.loadImage()
        }, 100)
      }
      img.src = src
    }
  }
}

export default FcPreImage
