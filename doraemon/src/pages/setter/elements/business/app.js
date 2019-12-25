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
      textStyle: {},
      textAlignStyle: {},
      loading1BarStyle: {},
      loading1BarLoadedStyle: {},
      loading: {
        percent: 0,
        total: 0,
        loaded: 0
      },
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
    this.textStyle = this.formatStyle(param.textStyle || {})
    this.loading1BarStyle = this.formatStyle(param.loading1BarStyle || {})
    this.loading1BarStyle.width = '100%'
    this.loading1BarLoadedStyle = this.formatStyle(param.loading1BarLoadedStyle || {})
    this.textAlignStyle['text-align'] = this.textStyle['text-align']
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
    window.addEventListener('message', (e) => {
      if (e.data && e.data.ac == 'preloadImageHandle') {
        this.preloadImageHandle(e.data)
      }
    })
    window.addEventListener('message', (e) => {
      if (e.data && e.data.ac == 'preloadImageFinish') {
        this.preloadImageFinish(e.data)
      }
    })
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
    },
    preloadImageHandle (data) {
      this.loading = data
      this.loading1BarLoadedStyle.width = data.percent + '%'
    },
    preloadImageFinish (data) {
      this.loading = data
      this.loading1BarLoadedStyle.width = data.percent + '%'
      if (this.param.loadedHide) {
        this.$refs.loading1.style.display = 'none'
      }
    }
  }, formatAc)
}

export default EBusiness
