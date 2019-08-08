/**
 * Created by 001264 on 2017/6/26.
 */
import ajax from 'fcbox/utils/http/ajax'

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
          // that.upLoad(file)
        }
      }
      reader.readAsDataURL(file)
    },
    upLoad (file) {
      var name = file.name
      name = name.substring(name.lastIndexOf('.'))
      this.param.key = '' + Math.random().toString(36).substr(2) + name
      ajax.get({
        url: this.$store.state.config.api.op.uploadSign,
        data: {
          fileName: this.param.key,
          directory: 'discovery'
        }
      }).then((res) => {
        res = JSON.parse(res)
        if (res.data) {
          let data = res.data || {}
          this.param.Authorization = data.sign || ''
          this.param.domain = data.domain || ''
          this.param.imageUrl = data.imageUrl || ''
          ajax.uploadFormData({
            url: this.param.domain,
            Authorization: this.param.Authorization,
            data: {
              op: 'upload',
              insertOnly: 0,
              filecontent: file
            }
          }).then((res) => {
            res = JSON.parse(res)
            if (!res.data) {
              return false
            }
            let src = this.param.imageUrl
            // let src =this.param.imageUrl.replace('http:', '');
            // this.param.value = src + '?imageView2/2/h/100';
            this.param.value = src
            this.param.uploaded = true
            this.param.src = src
            this.picKey = Math.random()
            this.callback && this.callback('uploaded', this.param)
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
