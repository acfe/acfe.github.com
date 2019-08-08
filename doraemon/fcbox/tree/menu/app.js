/**
 * Created by 001264 on 2018/8/14.
 */
import FcTree from '../tree'

const FcTreeMenu = {
  name: 'FcTreeMenu',
  data () {
    return {
      rendStart: 0,
      renderArr: [],
      relativeObj: {},
      propertyObj: {}
    }
  },
  props: ['source'],
  mounted () {
    if (this.source && this.source.length) {
      let fcTreeOpens
      if (sessionStorage.getItem('fcTreeOpens')) {
        fcTreeOpens = JSON.parse(sessionStorage.getItem('fcTreeOpens'))
        if (fcTreeOpens && fcTreeOpens.length) {
          let fcTreeOpensObj = {}
          for (let i in fcTreeOpens) {
            fcTreeOpensObj[fcTreeOpens[i]] = true
          }
          for (let i in this.source) {
            if (fcTreeOpensObj[this.source[i].id]) {
              this.source[i].open = true
            }
          }
        }
      }
      this.tree = new FcTree(this.source)
      this.treeRefresh()
    }
  },
  methods: {
    treeRefresh () {
      this.relativeObj = this.tree.relativeObj
      this.propertyObj = this.tree.propertyObj
      this.renderArr = this.tree.renderArr
      for (let i in this.renderArr) {
        this.propertyObj[this.renderArr[i]].checked = false
        if (location.href.indexOf(this.propertyObj[this.renderArr[i]].actionUrl) > 0) {
          this.propertyObj[this.renderArr[i]].checked = true
        }
      }
    },
    treeClick (e) {
      let id = e.target.getAttribute('data-id')
      if (!id) {
        return false
      }
      if (this.propertyObj[id].actionUrl) {
        setTimeout(() => {
          location.href = this.propertyObj[id].actionUrl
        }, 100)
      } else {
        this.tree.setOpen(id)
        this.treeRefresh()
        let fcTreeOpens = []
        for (let i in this.renderArr) {
          if (this.propertyObj[this.renderArr[i]].open) {
            fcTreeOpens.push(this.propertyObj[this.renderArr[i]].id)
          }
        }
        sessionStorage.setItem('fcTreeOpens', JSON.stringify(fcTreeOpens))
      }
    }
  }
}

export default FcTreeMenu
