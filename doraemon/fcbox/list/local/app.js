/**
 * Created by 001264 on 2018/10/08.
 */

const FcLocalList = {
  name: 'FcLocalList',
  data () {
    return {
      randKey: Math.random(),
      loadPage: 5,
      listHeight: 0,
      scroll: '',
      content: '',
      preLoader: '',
      renderData: [],
      loadNum: 0,
      loadId: 0,
      preRenderArr: [],
      renderArr: [],
      lazyRenderArr: [],
      contentStyle: {},
      componentKey: 'componentKey' + Math.random(),
      loadingData: false,
      showLoading: false,
      preLoadNum: 10,
      totalHeight: 0
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
      this.preLoadNum = this.param && this.param.preLoadNum ? this.param.preLoadNum : this.preLoadNum
      this.loadPage = this.loadPage >= 5 ? this.loadPage : 5
      if (this.param.slotsHeight) {
        this.setRenderArr()
      } else {
        this.loadAllData()
      }
      this.scroll.onscroll = (e) => {
        this.checkScroll()
      }
    })
  },
  methods: {
    setRenderArr () {
      let result = true
      for (let i in this.renderData) {
        if (this.param.slotsHeight[this.renderData[i].slot]) {
          this.renderArr.push(Object.assign({}, this.renderData[i], {
            top: this.totalHeight,
            height: this.param.slotsHeight[this.renderData[i].slot],
            style: {
              top: this.totalHeight + 'px'
            }
          }))
          this.totalHeight += this.param.slotsHeight[this.renderData[i].slot]
        } else {
          result = false
          this.totalHeight = 0
          this.renderArr = []
          this.loadAllData()
          break
        }
      }
      if (result) {
        this.contentStyle = {
          height: this.totalHeight + 'px'
        }
        this.initData = true
        this.setLazyRender()
      }
    },
    loadAllData () {
      for (let i in this.renderData) {
        if (!this.renderData[i].loaded) {
          this.renderData[i].loaded = true
          this.loadNum++
          this.loadId++
          this.renderData[i].loadId = this.loadId
          this.preRenderArr.push(this.renderData[i])
          if (i == this.renderData.length - 1 || this.loadNum >= this.preLoadNum) {
            this.loadNum = 0
            requestAnimationFrame(() => {
              this.setSize()
            })
          } else {
            this.loadAllData()
          }
          break
        }
      }
    },
    setSize () {
      let nodes = this.preLoader.children
      for (let i = 0; i < nodes.length; i++) {
        this.renderArr.push(Object.assign({}, this.preRenderArr[i], {
          top: this.totalHeight,
          height: nodes[i].clientHeight,
          style: {
            top: this.totalHeight + 'px'
          }
        }))
        this.totalHeight += nodes[i].clientHeight
      }
      this.contentStyle = {
        height: this.totalHeight + 'px'
      }
      if (!this.initData && (this.loadId > 100 || this.loadId >= this.renderData.length - 1)) {
        this.initData = true
        this.setLazyRender()
      }
      this.preRenderArr = []
      this.loadAllData()
    },
    setLazyRender () {
      let scrollTop = this.scroll.scrollTop
      let totalHeight = this.totalHeight
      let clientHeight = this.scroll.clientHeight
      let renderMin = scrollTop - clientHeight * ((this.loadPage - 1) / 2)
      let renderMax = scrollTop + clientHeight * ((this.loadPage - 1) / 2 + 1)
      renderMin = renderMin > 0 ? renderMin : 0
      renderMax = renderMax < totalHeight ? renderMax : totalHeight
      this.renderMin = renderMin
      this.renderMax = renderMax
      let lazyRenderArr = []
      for (let i in this.renderArr) {
        if (this.renderArr[i].top >= renderMin && this.renderArr[i].top <= renderMax) {
          lazyRenderArr.push(this.renderArr[i])
        }
      }
      this.lazyRenderArr = lazyRenderArr
      this.loadingData = false
    },
    checkScroll () {
      if (!this.initData || this.loadingData) {
        return false
      }
      let scrollTop = this.scroll.scrollTop
      let clientHeight = this.scroll.clientHeight
      if (scrollTop <= this.renderMin + clientHeight || scrollTop >= this.renderMax - clientHeight) {
        this.loadingData = true
        requestAnimationFrame(() => {
          this.setLazyRender()
        })
      }
    }
  }
}

export default FcLocalList
