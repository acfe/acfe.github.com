/**
 * Created by 001264 on 2017/6/26.
 */

const FcCheckbox = {
  name: 'FcCheckbox',
  data () {
    return {}
  },
  props: ['param', 'callback'],
  created () {

  },
  methods: {
    select (e) {
      const key = e.target.getAttribute('data-checkbox-key')
      const item = this.param.data[key]
      item.checked = !item.checked
      this.param.data = Object.assign({}, this.param.data)
      if (this.callback) {
        this.callback(item)
      }
    }
  }
}

export default FcCheckbox
