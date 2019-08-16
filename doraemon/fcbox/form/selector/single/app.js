/**
 * Created by 001264 on 2017/6/26.
 */

const FcSingleSelector = {
  name: 'FcSingleSelector',
  data () {
    return {
      itemShow: false,
      Property: {},
      listId: Math.random()
    }
  },
  props: ['param', 'callback'],
  created () {
    window.FcSingleSelectors = window.FcSingleSelectors || {}
    if (this.param.tag) {
      window.FcSingleSelectors[this.param.tag] = this
    }
    document.addEventListener('click', this.checkHide)
  },
  methods: {
    getAcInfo (e, tag) {
      let target = e.target
      let loop = true
      let dataKey
      while (loop) {
        loop = !!target.parentNode
        loop = target.tagName == 'BODY' ? false : loop
        dataKey = target.getAttribute(tag)
        if (dataKey) {
          loop = false
          break
        }
        if (loop) {
          target = target.parentNode
        }
      }
      return {
        dataKey,
        target
      }
    },
    change (e) {
      const key = e.target.getAttribute('data-single-key')
      const param = this.param
      param.option = param.data[key].option
      param.value = param.data[key].value
      if (param.value && param.reg && !param.reg.test(param.value)) {
        param.showTip = true
      } else {
        param.showTip = false
      }
      if (this.callback) {
        this.callback(this.param, key)
      }
      this.hideItem()
    },
    show () {
      if (window.FcSingleSelectors) {
        for (var i in window.FcSingleSelectors) {
          if (i !== this.param.tag) {
            window.FcSingleSelectors[i].hideItem()
          }
        }
      }
      this.itemShow = !this.itemShow
      setTimeout(() => {
        const itemList = this.$refs.itemList
        const selectorContent = this.$refs.selectorContent
        const selectorHeight = this.param.selectorHeight || 240
        if (!itemList) {
          return false
        }
        itemList.style.overflowY = 'auto'
        if (itemList && this.param.data.length > 6) {
          selectorContent.style.height = selectorHeight + 2 + 'px'
          itemList.style.height = selectorHeight + 'px'
        } else {
          selectorContent.style.height = (this.param.data.length * 35 + 2) + 'px'
          itemList.style.height = (this.param.data.length * 35) + 'px'
          itemList.style.overflowY = 'hidden'
        }
        if (selectorContent && this.param.selectorPosition === 'top') {
          Object.assign(selectorContent.style, {
            bottom: '35px',
            top: 'auto'
          })
        }
      })
    },
    checkHide (e) {
      let ac = this.getAcInfo(e, 'data-list-content')
      if (ac.dataKey != this.listId) {
        this.itemShow = false
      }
    },
    hideItem (e) {
      this.itemShow = false
    }
  }
}

export default FcSingleSelector
