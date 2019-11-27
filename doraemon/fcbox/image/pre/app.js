/**
 * Created by 001264 on 2018/11/16.
 */

const FcPreImage = {
  name: 'FcPreImage',
  data () {
    return {
      randKey: Math.random(),
      isMounted: false,
      loadingStyle: {
        width: 'auto'
      },
      imageRenderStyle: {},
      imageUrl: '',
      getStyle (imageUrl) {
        return imageUrl ? this.imageRenderStyle : this.loadingStyle
      }
    }
  },
  props: ['fit', 'src', 'first', 'imageStyle'],
  created () {
    window.fc = window.fc || {}
    window.fc.FcPreImages = window.fc.FcPreImages || []
    window.fc.FcPreImagesLoaded = window.fc.FcPreImagesLoaded || {}
  },
  mounted () {
    let parentNode = this.$el.parentNode
    let pW = parentNode.clientWidth
    let pH = parentNode.clientHeight
    parentNode.style.overflow = 'hidden'
    if (pW < 120) {
      let lW = pW - 20
      lW = lW > 50 ? lW : 50
      this.loadingStyle.width = lW + 'px'
    }
    this.isMounted = true
    let loadSrc = this.src.split('?')[0] + '?imageView2/2/w/' + (parseInt(pW) * 2)
    if (pW && pH && pH > pW) {
      loadSrc = this.src.split('?')[0] + '?imageView2/2/h/' + (parseInt(pH) * 2)
    }
    if (window.fc.FcPreImagesLoaded[loadSrc]) {
      this.isMounted = true
      let img = new Image()
      let that = this
      let imageStyle = this.imageStyle || {}
      Object.assign(this.imageRenderStyle, imageStyle)
      img.onload = function () {
        that.setImageStyle({
          src: loadSrc,
          pW,
          pH,
          width: this.width,
          height: this.height
        })
      }
      img.src = loadSrc
      this.imageUrl = loadSrc
      return false
    }
    let infoParam = {
      pW,
      pH,
      loadNum: 0,
      src: loadSrc,
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
    setImageStyle (param) {
      let imageStyle = this.imageStyle || {}
      this.randKey = Math.random()
      if (!this.fit) {
        return false
      }
      // auto fit
      if (!imageStyle.width) {
        if (!imageStyle.float) {
          if (parseInt(imageStyle.height)) {
            param.width = param.width * (param.height / parseInt(imageStyle.height))
          }
          Object.assign(this.imageRenderStyle, {
            'margin-left': -(param.width - param.pW) / 2 + 'px'
          })
        }
      } else {
        if (!imageStyle.float) {
          Object.assign(this.imageRenderStyle, {
            'margin-left': -(parseInt(imageStyle.width) - param.pW) / 2 + 'px'
          })
        }
      }
      if (param.pH) {
        if (!imageStyle.height) {
          Object.assign(this.imageRenderStyle, {
            'margin-top': -(param.height - param.pH) / 2 + 'px'
          })
        } else {
          Object.assign(this.imageRenderStyle, {
            'margin-top': -(parseInt(imageStyle.height) - param.pH) / 2 + 'px'
          })
        }
      }
    },
    refreshImage (param) {
      if (param.height < param.pH) {
        param.width = param.width * (param.pH / param.height)
        param.src = param.src.split('?')[0] + '?imageView2/2/h/' + (parseInt(param.pH) * 2)
      }
      this.imageUrl = param.src
      window.fc.FcPreImagesLoaded[param.src] = param
      let imageStyle = this.imageStyle || {}
      Object.assign(this.imageRenderStyle, imageStyle)
      this.setImageStyle(param)
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
      let src = loadObj.src
      let img = new Image()
      img.onload = function () {
        window.fc.FcPreImageLoading = false
        loadObj.callback && loadObj.callback({
          src,
          pW: loadObj.pW,
          pH: loadObj.pH,
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
