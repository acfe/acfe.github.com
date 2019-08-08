/**
 * Created by 001264 on 2017/9/10.
 */
import ImageCompress from 'fcbox/utils/image/image_compress'
import ajax from 'fcbox/utils/http/ajax'

const QiNiuUpload = {
  name: 'QiNiuUpload',
  data () {
    return {
      imgStyle: {},
      randKey: Math.random(),
      loading: false
    }
  },
  props: ['param', 'callback'],
  mounted () {
    this.getToken()
    if (!this.image) {
      this.image = new Image()
      this.image.onload = (e) => {
        this.imageLoaded(e)
      }
    }
    if (this.param.value) {
      this.image.src = this.param.value.split('?')[0] + '?imageView2/2/w/375'
    }
  },
  methods: {
    getToken (done) {
      if (!this.param.qiniu && this.$store.state.config.api.op && this.$store.state.config.api.op.getQiNiuToken) {
        let qiniu = sessionStorage.getItem('fc_op_qiniu')
        let qiniuTime = sessionStorage.getItem('fc_op_qiniu_time') || 0
        let limitTime = 30 * 60 * 1000
        let setTime = new Date().getTime() - parseInt(qiniuTime)
        if (qiniu && setTime < limitTime) {
          this.param.qiniu = JSON.parse(qiniu)
          if (done) {
            this.upload()
          }
          return false
        }
        ajax.get({
          url: this.$store.state.config.api.op.getQiNiuToken
        }).then((res) => {
          res = JSON.parse(res)
          if (res.code === '0') {
            let data = res.data
            this.param.qiniu = {}
            Object.assign(this.param.qiniu, {
              domain: data.uploadDomain,
              token: data.token,
              url: window.location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://up.qiniu.com'
            })
            sessionStorage.setItem('fc_op_qiniu', JSON.stringify(this.param.qiniu))
            sessionStorage.setItem('fc_op_qiniu_time', new Date().getTime())
            if (done) {
              this.upload()
            }
          }
        })
      }
    },
    imageLoaded (e) {
      const imgStyle = {
        backgroundImage: 'url(' + this.image.src + ')'
      }
      if (this.image.width > this.image.height) {
        imgStyle.backgroundSize = 'auto 100%'
      } else {
        imgStyle.backgroundSize = '100% auto'
      }
      this.imgStyle = imgStyle
      this.param.value = this.image.src.split('?')[0]
      setTimeout(() => {
        this.randKey = Math.random()
      }, 100)
    },
    fileSelect (e) {
      e.stopPropagation()
      window.fc.upSelectLock = true
      let reader = new FileReader()
      let file = e.target.files[0]
      this.fileName = file.name
      let that = this
      this.selected = true
      if (this.param.compress !== false) {
        ImageCompress.compress({
          file,
          callback (backFile) {
            file = backFile
            reader.onload = () => {
              that.image.src = reader.result
              that.imageLoaded()
            }
            that.image.onload = () => {
              that.checkLimit(that.image)
              if (!that.selected) {
                return false
              }
              if (that.param.limit && !that.checkLimit(that.image)) {
                window.fc.Toast.show({ text: '请上传尺寸为' + that.param.limit.width + ' x ' + that.param.limit.height + '的图片', timeOut: 3000 })
                that.del()
                return false
              }
              that.file = file
              that.selected = false
              that.upload()
            }
            reader.readAsDataURL(file)
          }
        })
      } else {
        reader.onload = () => {
          that.image.src = reader.result
          that.imageLoaded()
        }
        that.image.onload = () => {
          if (!that.selected) {
            return false
          }
          if (that.param.limit && !that.checkLimit(that.image)) {
            window.fc.Toast.show({ text: '请上传尺寸为' + that.param.limit.width + ' x ' + that.param.limit.height + '的图片', timeOut: 3000 })
            that.del()
            return false
          }
          that.file = file
          that.selected = false
          that.upload()
        }
        reader.readAsDataURL(file)
      }
    },
    checkLimit (image) {
      if (!this.param.limit || this.param.limit.width != image.width || this.param.limit.height != image.height) {
        return false
      }
      return true
    },
    del () {
      this.param.value = ''
      this.randKey = Math.random()
      this.callback && this.callback('del', this.param)
    },
    upload () {
      if (!this.param.qiniu) {
        setTimeout(() => {
          this.getToken(true)
        }, 500)
        return false
      }
      this.loading = true
      ajax.uploadFormData({
        url: this.param.qiniu.url,
        data: {
          token: this.param.qiniu.token,
          file: this.file,
          key: 'fcapp/consumer/' + Math.random().toString(36).substr(2) + '.' + this.fileName.split('.')[1]
        }
      }).then((res) => {
        res = JSON.parse(res)
        this.image.src = this.param.qiniu.domain + '/' + res.key + '?imageView2/2/w/375'
        this.param.value = this.param.qiniu.domain + '/' + res.key
        this.loading = false
        this.callback && this.callback('uploaded', this.param)
      }).catch((e) => {
        sessionStorage.removeItem('fc_op_qiniu')
        this.param.qiniu = null
        this.getToken(true)
      })
    },
    imageClickCallback () {
      this.callback && this.callback('imageClick', this.param)
    }
  }
}

export default QiNiuUpload
