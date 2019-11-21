/**
 * Created by 001264 on 2017/6/26.
 */
import ajax from 'fcbox/utils/http/ajax'
import COS from 'cos-js-sdk-v5'

const FcSingleUpload = {
  name: 'FcSingleUpload',
  data () {
    return {
      imgStyle: {},
      picKey: Math.random()
    }
  },
  props: ['param', 'callback', 'delCallback'],
  created () {

  },
  components: {

  },
  methods: {
    getSign () {

    },
    fileSelect (e) {
      let reader = new FileReader()
      let file = e.target.files[0]
      if (!file) {
        return false
      }
      let that = this
      this.selected = true
      reader.onload = () => {
        let image = new Image()
        image.src = reader.result
        image.onload = () => {
          if (!that.selected) {
            return false
          }
          if (that.param.limit && !that.checkLimit(image)) {
            window.fc.Toast.show({ text: '请上传尺寸为' + that.param.limit.width + ' x ' + that.param.limit.height + '的图片', timeOut: 3000 })
            that.del()
            return false
          }
          that.selected = false
          that.param.value = image.src
          this.picKey = Math.random()
          that.upLoad(file)
        }
      }
      reader.readAsDataURL(file)
    },
    upLoad (file) {
      var name = file.name
      name = name.substring(name.lastIndexOf('.'))
      let fileName = '' + Math.random().toString(36).substr(2) + name
      let path = 'discovery'
      ajax.get({
        url: this.$store.state.config.api.op.customerServiceCenter.upSign,
        data: {
          fileName,
          directory: path
        }
      }).then((res) => {
        res = JSON.parse(res)
        if (res && res.data) {
          let d = res.data
          let date = new Date()
          let month = date.getMonth() + 1
          month = month < 10 ? '0' + month : month
          let year = date.getFullYear().toString()
          var cos = new COS({
            getAuthorization: (options, callback) => {
              callback(d.sign)
            }
          })
          cos.putObject({
            Bucket: d.bucket + '-' + d.appId,
            Region: d.region,
            Key: path + '/' + year + month + '/' + fileName,
            Body: file
          }, (err, data) => {
            if (err || !data || data.statusCode != 200) {
              console.log(err)
            } else {
              var src = 'http://' + d.bucket + '-' + d.appId + '.image.myqcloud.com/' + path + '/' + year + month + '/' + fileName
              this.param.value = src
              this.param.uploaded = true
              this.param.src = src
              this.picKey = Math.random()
              this.callback && this.callback('uploaded', this.param)
            }
          })
        }
      })
    },
    checkLimit (image) {
      if (!this.param.limit || this.param.limit.width != image.width || this.param.limit.height != image.height) {
        return false
      }
      return true
    },
    del () {
      this.param.value = ''
      this.picKey = Math.random()
      this.delCallback && this.delCallback('del', this.param)
    },
    showImage () {

    }
  }
}

export default FcSingleUpload
