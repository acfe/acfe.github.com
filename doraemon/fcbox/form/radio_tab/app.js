/**
 * Created by 001264 on 2017/9/10.
 */

const FcRadioTab = {
  name: 'FcRadioTab',
  data () {
    return {
      rand: Math.random(),
      svgClose: '<svg t="1566292043403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1710" width="10" height="10"><path d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z" p-id="1711" fill="#cccccc"></path></svg>'
    }
  },
  props: ['param', 'callback', 'delCallback'],
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
