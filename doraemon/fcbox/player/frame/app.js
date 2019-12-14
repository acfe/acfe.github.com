/**
 * Created by 001264 on 2019/12/14.
 */

const FcFramePlayer = {
  name: 'FcFramePlayer',
  data () {
    return {
      randKey: Math.random(),
      imageStyle: {},
      imageUrl: ''
    }
  },
  props: ['param', 'isSet'],
  created () {
    const param = this.param
    this.imageStyle = param.imageStyle || {}
    if (param.frames && param.frames.data && param.frames.data[0]) {
      this.imageUrl = param.frames.data[0].url
    }
  },
  mounted () {
    const param = this.param
    if (!this.isSet && param.frames && param.frames.data && param.frames.data.length) {
      this.playKey = 0
      this.playedNum = 0
      this.play()
    }
  },
  methods: {
    play () {
      const param = this.param
      if (!this.param.frames.data[this.playKey]) {
        return false
      }
      this.imageUrl = this.param.frames.data[this.playKey].url
      this.randKey = Math.random()
      setTimeout(() => {
        if (this.playKey == this.param.frames.data.length - 1) {
          this.playedNum++
          if (!parseInt(param.playNum) || this.playedNum < parseInt(param.playNum)) {
            this.playKey = 0
            this.play()
            return false
          }
        }
        this.playKey++
        this.play()
      }, parseInt(param.fps) || 200)
    }
  }
}

export default FcFramePlayer
