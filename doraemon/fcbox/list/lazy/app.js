/**
 * Created by 001264 on 2018/10/01.
 */

const FcLazyList = {
  name: 'FcLazyList',
  data () {
    return {
      randKey: Math.random(),
      loadPage: 2,
      listHeight: 0,
      preLoadHeight: 0,
      scroll: '',
      content: '',
      preLoader: '',
      scopedSlots: [],
      scopedSlotsObj: {},
      loadNum: 0,
      preRenderArr: [],
      renderArr: [],
      componentKey: 'componentKey' + Math.random(),
      loadingData: false,
      showLoading: false
    }
  },
  props: ['param'],
  created () {
    requestAnimationFrame(() => {
      if (!this.$refs.fcList) {
        return false
      }
      this.scroll = this.$refs.fcList
      this.content = this.$refs.content
      this.preLoader = this.$refs.preLoader
      this.loadPage = this.param && this.param.loadPage ? this.param.loadPage : this.loadPage
      this.scopedSlots = Object.keys(this.$scopedSlots)
      for (let i in this.scopedSlots) {
        this.scopedSlotsObj[this.scopedSlots[i]] = {
          key: this.scopedSlots[i]
        }
      }
      if (this.loadPage === 'all') {
        this.loadAllData()
      } else {
        this.loadPage = this.param && parseInt(this.param.loadPage) > 1 ? parseInt(this.param.loadPage) : 2
        this.showLoading = !((this.param && this.param.showLoading === false))
        this.listHeight = this.scroll.clientHeight
        this.preLoadHeight = this.listHeight * this.loadPage
        this.scroll.onscroll = (e) => {
          this.checkScroll()
        }
        this.loadData()
      }
    })
  },
  methods: {
    loadAllData () {
      for (let i in this.scopedSlots) {
        if (!this.scopedSlotsObj[this.scopedSlots[i]].loaded) {
          this.scopedSlotsObj[this.scopedSlots[i]].loaded = true
          this.loadNum++
          this.preRenderArr.push(this.scopedSlotsObj[this.scopedSlots[i]])
          if (i == this.scopedSlots.length - 1 || this.loadNum > 5) {
            this.loadNum = 0
            this.renderArr = this.preRenderArr
            requestAnimationFrame(() => {
              this.loadAllData()
            })
          } else {
            this.loadAllData()
          }
          break
        }
      }
    },
    loadData () {
      for (let i in this.scopedSlots) {
        if (!this.scopedSlotsObj[this.scopedSlots[i]].loaded) {
          this.scopedSlotsObj[this.scopedSlots[i]].loaded = true
          this.preRenderArr.push(this.scopedSlotsObj[this.scopedSlots[i]])
          requestAnimationFrame(() => {
            let preContent = document.getElementById(this.componentKey)
            let preLoadedHeight = preContent.scrollHeight
            if (i == this.scopedSlots.length - 1 || preLoadedHeight >= this.preLoadHeight) {
              requestAnimationFrame(() => {
                for (let p in this.preRenderArr) {
                  this.renderArr.push(this.preRenderArr[p])
                }
                this.preRenderArr = []
                this.loadingData = false
              })
            } else {
              this.loadData()
            }
          })
          break
        }
      }
    },
    checkScroll () {
      const scrollHeight = this.scroll.clientHeight
      const contentHeight = this.scroll.scrollHeight
      let scrollTop = this.scroll.scrollTop
      if (scrollTop >= contentHeight - scrollHeight - 20) {
        if (!this.loadingData) {
          this.loadingData = true
          let loadEnd = true
          for (let i in this.scopedSlots) {
            if (!this.scopedSlotsObj[this.scopedSlots[i]].loaded) {
              loadEnd = false
            }
          }
          if (loadEnd) {
            return false
          }
          let loadingDiv
          if (this.showLoading) {
            loadingDiv = document.createElement('div')
            loadingDiv.setAttribute('class', 'fc-list-data-loading')
            this.content.appendChild(loadingDiv)
          }
          requestAnimationFrame(() => {
            this.scroll.scrollTop = this.scroll.scrollHeight - this.scroll.clientHeight
            if (this.showLoading) {
              setTimeout(() => {
                this.content.removeChild(loadingDiv)
                this.loadData()
              }, 1000)
            } else {
              this.loadData()
            }
          })
        }
      }
    }
  }
}

export default FcLazyList
