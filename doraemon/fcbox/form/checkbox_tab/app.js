/**
 * Created by 001264 on 2017/9/10.
 */

const FcCheckboxTab = {
  name: 'FcCheckboxTab',
  data () {
    return {}
  },
  props: ['param', 'callback'],
  created () {

  },
  methods: {
    select (e) {
      const key = e.target.getAttribute('data-key')
      const item = this.param.data[key]
      if (item.enabled) {
        return
      }
      item.checked = !item.checked
      this.param.data = Object.assign({}, this.param.data)
      if (this.callback) {
        this.callback(item)
      }
    }
  }
}

export default FcCheckboxTab
