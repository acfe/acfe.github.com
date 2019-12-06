/**
 * Created by 001264 on 2017/9/10.
 */
import FcElement from '../element/app.vue'
import formatAc from '../../func/format_style'

const EBusiness = {
  components: {
    FcElement
  },
  name: 'EBusiness',
  data () {
    return {
      randKey: Math.random(),
      btnStyle: {},
      inputParam: {
        value: '',
        placeholder: '搜索'
      }
    }
  },
  props: ['param', 'isSet', 'zIndex', 'acCallback', 'entry'],
  created () {
    const param = this.param
    this.btnStyle = this.formatStyle(param.btnStyle || {})
    if (param.defaultValue) {
      this.inputParam.value = param.defaultValue
    }
    if (param.placeholder) {
      this.inputParam.placeholder = param.placeholder
    }
  },
  mounted () {
    if (this.inputParam.value) {
      this.$refs.searchBtn.style.display = 'block'
    }
  },
  methods: Object.assign({
    doSeach () {
      this.doSeachAc = true
      if (this.inputParam.value) {
        location.href = 'https://mall.fcbox.com/index.html?show=list&keyword=' + this.inputParam.value
      }
    },
    inputCallback (param, type) {
      switch (type) {
        case 'focus':
          this.$refs.searchBtn.style.display = 'block'
          this.doSeachAc = false
          break
        case 'focusout':
          setTimeout(() => {
            if (!this.doSeachAc && !this.inputParam.value) {
              this.$refs.searchBtn.style.display = 'none'
            }
          })
          break
      }
    }
  }, formatAc)
}

export default EBusiness
