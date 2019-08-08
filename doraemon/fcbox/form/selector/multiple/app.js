/**
 * Created by 001264 on 2017/6/26.
 */
import Checkbox from '../../checkbox/app.vue'

const FcMultipleSelector = {
  name: 'FcMultipleSelector',
  data () {
    return {
      itemShow: false,
      value: ''
    }
  },
  props: ['param', 'callback'],
  created () {
    this.getValue()
  },
  components: {
    Checkbox
  },
  methods: {
    checkboxCallback (param) {
      this.getValue()
      if (this.callback) {
        this.callback(this.param)
      }
    },
    getValue () {
      const data = this.param.data
      const checkArr = []
      for (var i in data) {
        if (data[i].checked) {
          checkArr.push(data[i].option)
        }
      }
      this.value = checkArr.length ? checkArr.join(',') : this.param.option
    },
    show () {
      this.itemShow = !this.itemShow
      setTimeout(() => {
        const itemList = this.$refs.itemList
        const selectorContent = this.$refs.selectorContent
        const selectorHeight = this.param.selectorHeight || 240
        if (itemList && itemList.clientHeight > selectorHeight) {
          itemList.style.height = selectorHeight + 'px'
          itemList.style.overflowY = 'auto'
        }
        if (selectorContent && this.param.selectorPosition === 'top') {
          Object.assign(selectorContent.style, {
            bottom: '35px',
            top: 'auto'
          })
        }
      })
    },
    hideItem () {
      this.itemShow = false
    }
  }
}

export default FcMultipleSelector
