/**
 * Created by 001264 on 2017/9/10.
 */
import FcElement from '../element/app.vue'
import formatAc from '../../func/format_style'

const EImage = {
  components: {
    FcElement
  },
  name: 'EImage',
  data () {
    return {
      randKey: Math.random(),
      imageStyle: {},
      videoPlaying: false
    }
  },
  props: ['param', 'isSet', 'zIndex', 'acCallback', 'entry'],
  created () {
    const param = this.param
    param.elementStyle = param.elementStyle || {}
    param.imageStyle = param.imageStyle || {}
    this.imageStyle = Object.assign({}, param.imageStyle)
    this.imageStyle.height = param.elementStyle.height
    if (param.imageStyle.width) {
      this.imageStyle.width = param.imageStyle.width + 'px'
    }
  },
  mounted () {
    window.addEventListener('message', (e) => {
      if (e.data && e.data.ac == 'resizeElement') {
        this.imageStyle.height = this.param.elementStyle.height
        this.randKey = Math.random()
      }
    })
    if (this.$refs.video) {
      this.$refs.video.addEventListener('pause', (e) => {
        this.$refs.videoMask.style.opacity = 1
      })
    }
  },
  methods: Object.assign({
    playVideo (e) {
      e.currentTarget.style.opacity = 0
      this.videoPlaying = !this.videoPlaying
      if (this.videoPlaying) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    }
  }, formatAc)
}

export default EImage
