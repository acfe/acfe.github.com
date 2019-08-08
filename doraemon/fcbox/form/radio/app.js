/**
 * Created by 001264 on 2017/6/26.
 * memberTypeParam: {
        itemStyle: {
            width: '70px'
        },
        value: '2',
        data: [
            {
                type: 'memberType',
                option: '管理员',
                value: '1',
            },
            {
                type: 'memberType',
                option: '店员',
                value: '2',
            }
        ]
    },
 */

const FcRadio = {
  name: 'FcRadio',
  data () {
    return {}
  },
  props: ['param', 'callback'],
  created () {

  },
  methods: {
    select (e) {
      const key = e.target.getAttribute('data-radio-key')
      const item = this.param.data[key]
      this.param.value = item.value
      if (this.callback) {
        this.callback(item)
      }
    }
  }
}

export default FcRadio
