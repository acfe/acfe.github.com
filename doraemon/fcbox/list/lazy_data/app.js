/**
 * Created by 001264 on 2018/10/01.
 */

const FcLazyDataList = {
  name: 'FcLazyDataList',
  data () {
    return {
      randKey: Math.random(),
      loadPage: 2,
      listHeight: 0,
      preLoadHeight: 0,
      scroll: '',
      content: '',
      preLoader: '',
      renderData: [],
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
      this.renderData = this.param && this.param.data ? this.param.data : this.renderData
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
      for (let i in this.renderData) {
        if (!this.renderData[i].loaded) {
          this.renderData[i].loaded = true
          this.loadNum++
          this.preRenderArr.push(this.renderData[i])
          if (i == this.renderData.length - 1 || this.loadNum > 5) {
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
      for (let i in this.renderData) {
        if (!this.renderData[i].loaded) {
          this.renderData[i].loaded = true
          this.preRenderArr.push(this.renderData[i])
          requestAnimationFrame(() => {
            let preContent = document.getElementById(this.componentKey)
            let preLoadedHeight = preContent.scrollHeight
            if (i == this.renderData.length - 1 || preLoadedHeight >= this.preLoadHeight) {
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
          for (let i in this.renderData) {
            if (!this.renderData[i].loaded) {
              loadEnd = false
            }
          }
          if ((loadEnd && !this.param.callback) || (loadEnd && this.loadFinish)) {
            return false
          }
          let loadingDiv
          if (this.showLoading) {
            loadingDiv = document.createElement('div')
            loadingDiv.setAttribute('class', 'fc-list-data-loading')
            this.content.appendChild(loadingDiv)
            this.loadingDiv = loadingDiv
          }
          requestAnimationFrame(() => {
            this.scroll.scrollTop = this.scroll.scrollHeight - this.scroll.clientHeight
            if (loadEnd && this.param.callback) {
              this.param.callback(this)
              return false
            }
            if (this.showLoading) {
              setTimeout(() => {
                this.hideLoading()
                this.loadData()
              }, 1000)
            } else {
              this.loadData()
            }
          })
        }
      }
    },
    addData (data) {
      if (!data || !data.length) {
        this.hideLoading()
        return false
      }
      this.renderData = this.renderData.concat(data)
      this.hideLoading()
      this.loadData()
    },
    hideLoading () {
      this.content.removeChild(this.loadingDiv)
    }
  }
}

export default FcLazyDataList
