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
    this.imageStyle = param.imageStyle
    this.imageStyle.height = param.elementStyle.height
  },
  mounted () {
    window.addEventListener('message', (e) => {
      if (e.data && e.data.ac == 'resizeElement') {
        this.imageStyle.height = this.param.elementStyle.height
        this.randKey = Math.random()
      }
    })
  },
  methods: Object.assign({
    playVideo () {
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
