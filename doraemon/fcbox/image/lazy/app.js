/**
 * Created by 001264 on 2018/11/16.
 */

const FcLazyImage = {
  name: 'FcLazyImage',
  data () {
    return {
      randKey: Math.random(),
      imageName: Math.random(),
      imageUrl: '',
      imageStyle: {}
    }
  },
  props: ['param', 'src', 'load'],
  created () {
    window.fc = window.fc || {}
    window.fc.FcLazyImages = window.fc.FcLazyImages || {}
    window.fc.FcLazyLoadedImages = window.fc.FcLazyLoadedImages || {}
    window.fc.FcLazyImages[this.imageName] = this
    if (this.param.imageStyle) {
      this.imageStyle = this.param.imageStyle
    }
  },
  mounted () {
    if (this.$refs.fcLazyImage && this.src) {
      if (window.fc.FcLazyLoadedImages[this.src]) {
        this.imageUrl = this.src
      } else {
        this.setPlaceholder()
      }
    }
  },
  methods: {
    setPlaceholder () {
      let placeHolderImage = this.src + '?imageView2/2/q/1'
      let img = new Image()
      let fcLazyImage = this.$refs.fcLazyImage
      this.fcLazyImage = fcLazyImage
      let w = fcLazyImage.clientWidth
      let h
      let wp
      let hp
      let that = this
      img.onload = function () {
        wp = this.width
        hp = this.height
        h = (w / wp) * hp
        fcLazyImage.style.height = parseInt(h) + 'px'
        that.imageUrl = placeHolderImage
        if (that.load) {
          that.loadImageImmediately()
        } else {
          that.loadImage()
        }
      }
      img.src = placeHolderImage
    },
    loadImage () {
      if (window.fc.lazyImageLoading) {
        return false
      }
      let FcLazyImages = window.fc.FcLazyImages
      let fcLazyImage
      for (let i in FcLazyImages) {
        if (FcLazyImages[i] && !FcLazyImages[i].loaded) {
          fcLazyImage = FcLazyImages[i]
        }
      }
      if (!fcLazyImage) {
        return false
      }
      let that = this
      window.fc.lazyImageLoading = true
      let realImage = new Image()
      realImage.onload = function () {
        fcLazyImage.imageUrl = fcLazyImage.src
        fcLazyImage.loaded = true
        window.fc.FcLazyLoadedImages[fcLazyImage.src] = true
        window.fc.lazyImageLoading = false
        fcLazyImage.loadImage()
      }
      realImage.onerror = (e) => {
        setTimeout(() => {
          that.loadImage()
        }, 1000)
      }
      realImage.src = fcLazyImage.src
    },
    loadImageImmediately () {
      let that = this
      if (window.fc.lazyImageLoading) {
        setTimeout(() => {
          this.loadImageImmediately()
        })
        return false
      }
      window.fc.lazyImageLoading = true
      let realImage = new Image()
      realImage.onload = function () {
        that.imageUrl = that.src
        that.loaded = true
        window.fc.FcLazyLoadedImages[that.src] = true
        window.fc.lazyImageLoading = false
        that.loadImage()
      }
      realImage.onerror = (e) => {
        setTimeout(() => {
          that.loadImage()
        }, 1000)
      }
      realImage.src = that.src
    }
  }
}

export default FcLazyImage
