import EXIF from './exif'

class ImageCompress {
  constructor () {
    this.param = {
      w: 1080,
      q: 80
    }
  }

  compress (param) {
    if (!param.file) {
      return false
    }
    let that = this
    Object.assign(this.param, param)
    EXIF.getData(param.file, function () {
      that.param.Orientation = EXIF.getTag(this, 'Orientation')
    })
    /* 小于1M，不压缩 */
    if (param.file.size / 1024 <= 1024) {
      param.callback && param.callback(param.file)
      return false
    }
    let reader = new FileReader()
    reader.readAsDataURL(param.file)
    reader.onload = function () {
      that.canvasDataURL(this.result)
    }
  }

  canvasDataURL (file) {
    let img = new Image()
    img.src = file
    let that = this
    let param = this.param
    img.onload = function () {
      // 默认按比例压缩
      let w = this.width
      let h = this.height
      let scale = w / h
      w = w > param.w ? param.w : w
      h = (w / scale)
      let quality = 0.8 // 默认图片质量为0.7
      // 生成canvas
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      // 创建属性节点
      var anw = document.createAttribute('width')
      anw.nodeValue = w
      var anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      if (that.param.Orientation && that.param.Orientation !== 1) {
        switch (that.param.Orientation) {
          case 6:
            canvas.width = h
            canvas.height = w
            ctx.rotate(Math.PI / 2)
            ctx.drawImage(this, 0, -h, w, h)
            break
          case 3:
            ctx.rotate(Math.PI)
            ctx.drawImage(this, -w, -h, w, h)
            break
          case 8:
            canvas.width = h
            canvas.height = w
            ctx.rotate(3 * Math.PI / 2)
            ctx.drawImage(this, -w, 0, w, h)
            break
        }
      } else {
        ctx.drawImage(this, 0, 0, w, h)
      }
      // 图像质量
      if (param.q && param.q <= 1 && param.q > 0) {
        quality = param.q
      }
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality)
      // 回调函数返回base64的值
      param.callback && param.callback(that.convertBase64UrlToBlob(base64))
    }
  }

  convertBase64UrlToBlob (base64) {
    let arr = base64.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }
}

export default new ImageCompress()
