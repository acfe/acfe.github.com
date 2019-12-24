/**
 * Created by 001264 on 2019/9/10.
 */
import formatAc from '../../func/format_style'
import ElementAc from '../../func/element_ac'

const FcModules = {
  name: 'FcModules',
  data () {
    return {
      randKey: Math.random(),
      moduleStyle: {},
      baseZindex: 0,
      isShowMore: false
    }
  },
  props: ['param', 'isSet', 'refreshContent', 'setSetterContent', 'mid', 'acCallback'],
  created () {
    const param = this.param
    if (param.tag == 'tab') {
      this.baseZindex = 1000
    }
    this.moveParam = {}
    this.sizeMoveParam = {}
    this.moduleStyle = this.formatStyle(param.moduleStyle || {})
    if (param.heightType == 'set' && param.moduleHeight) {
      this.moduleStyle['height'] = param.moduleHeight / 375 + 'rem'
      this.moduleStyle['min-height'] = 0
    } else if (param.heightType == 'screen') {
      let mh = this.isSet ? 667 : document.body.clientHeight
      this.moduleStyle['height'] = mh + 'px'
      this.param.moduleHeight = mh
    } else {
      this.param.heightType = 'auto'
    }
    // console.log(this.param)
    if (!this.isSet) {
      this.moduleStyle['overflow-x'] = 'hidden'
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.fcModule && this.param.heightType == 'auto') {
        this.param.moduleHeight = this.$refs.fcModule.offsetHeight
      }
      if (this.$refs.fcModule.scrollHeight > this.$refs.fcModule.offsetHeight) {
        this.isShowMore = true
      }
    }, 100)
    if (this.isSet) {
      this.$refs.fcModule.addEventListener('mousedown', this.mousedown)
      this.$refs.fcModule.addEventListener('mousemove', this.mousemove)
      this.$refs.fcModule.addEventListener('mouseup', this.mouseup)
    }
  },
  methods: Object.assign({
    showMore () {
      this.isShowMore = false
      this.$refs.fcModule.style.height = 'auto'
    }
  }, formatAc, ElementAc)
}

export default FcModules
