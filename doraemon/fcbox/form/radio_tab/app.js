/**
 * Created by 001264 on 2017/9/10.
 */

const FcRadioTab = {
  name: 'FcRadioTab',
  data () {
    return {
      rand: Math.random()
    }
  },
  props: ['param', 'callback'],
  created () {

  },
  methods: {
    select (e) {
      const key = e.target.getAttribute('data-key')
      const item = this.param.data[key]
      if (item.disabled) {
        return
      }
      if (this.param.clearChecked) {
        this.param.value = this.param.value == item.value ? '' : item.value
      } else {
        this.param.value = item.value
      }
      this.rand = Math.random()
      if (this.callback) {
        if (!this.param.value) {
          this.callback(Object.assign({}, item, { value: '' }))
        } else {
          this.callback(item)
        }
      }
    }
  }
}

export default FcRadioTab
