/**
 * Created by 001264 on 2017/6/26.
 */

const FcPage = {
  name: 'FcPage',
  data () {
    return {
      showArr: [],
      showPre: true,
      showNext: true
    }
  },
  props: ['param', 'callback'],
  created () {
    this.initData()
  },
  methods: {
    initData () {
      const param = this.param
      const { total, size, pageNum, currentPage } = param
      const added = (total % size) ? 1 : 0
      param.totalPage = parseInt(total / size) + added
      let showStart = currentPage - parseInt(pageNum / 2)
      showStart = showStart < param.totalPage - pageNum + 1 ? showStart : param.totalPage - pageNum + 1
      showStart = showStart > 0 ? showStart : 1
      let showEnd = showStart + pageNum - 1
      showEnd = showEnd > param.totalPage ? param.totalPage : showEnd
      param.totalPage = param.totalPage > 1 ? param.totalPage : 1
      showEnd = showEnd > 1 ? showEnd : 1
      const showArr = []
      for (var i = showStart; i <= showEnd; i++) {
        showArr.push(i)
      }
      this.showArr = showArr
      this.checkPage()
    },
    checkPage () {
      // const param = this.param
      // this.showPre = param.currentPage > 1 ? true : false;
      // this.showNext = param.currentPage < this.showArr.length ? true : false;
    },
    checkCallback () {
      this.callback && this.callback(this.param)
    },
    inputAction (e) {
      this.changePage(e.target.value)
    },
    click (e) {
      let dataPage = e.target.getAttribute('data-page')
      const param = this.param
      if (dataPage == param.currentPage) {
        return
      }
      this.changePage(dataPage)
    },
    changePage (dataPage) {
      const param = this.param
      if (!dataPage) {
        return
      }
      dataPage = dataPage == 'pre' ? param.currentPage - 1 : dataPage
      dataPage = dataPage == 'next' ? param.currentPage + 1 : dataPage
      dataPage = parseInt(dataPage)
      dataPage = dataPage < 1 ? 1 : dataPage
      dataPage = dataPage > param.totalPage ? param.totalPage : dataPage
      param.currentPage = dataPage
      this.initData()
      this.checkCallback()
    }
  }
}

export default FcPage
