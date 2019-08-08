/**
 * Created by 001264 on 2017/6/26.
 */

const FcTable = {
  name: 'FcTable',
  data () {
    return {
      titleArr: [],
      contentArr: [],
      checkboxChecked: {},
      isCheckAll: false,
      radioChecked: null
    }
  },
  props: ['param', 'callback'],
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.checkboxChecked = {}
      this.radioChecked = null
      this.isCheckAll = false
      this.titleArr = this.param.titleArr || []
      this.contentArr = this.param.contentArr || []
    },
    checkType (type, data) {
      switch (type) {
        case 'array':
          if (/array\]$/i.test(Object.prototype.toString.call(data))) {
            return true
          }
          break
        case 'object':
          if (/object\]$/i.test(Object.prototype.toString.call(data))) {
            return true
          }
          break
        default:
          if (!/array\]$/i.test(Object.prototype.toString.call(data)) && !/object\]$/i.test(Object.prototype.toString.call(data))) {
            return true
          }
          break
      }
      return false
    },
    checkAll () {
      this.isCheckAll = !this.isCheckAll
      for (let i in this.contentArr) {
        this.checkboxChecked[i] = this.isCheckAll
      }
      this.callback && this.callback(this.checkboxChecked)
    },
    checkboxCheck (index) {
      this.checkboxChecked[index] = !this.checkboxChecked[index]
      this.checkboxChecked = JSON.parse(JSON.stringify(this.checkboxChecked))
      this.callback && this.callback(this.checkboxChecked)
    },
    radioCheck (index) {
      this.radioChecked = index
      this.callback && this.callback(index)
    }
  }
}

export default FcTable
