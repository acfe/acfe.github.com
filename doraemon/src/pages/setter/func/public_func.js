
export default {
  // 获取列表唯一Id
  getId (list) {
    let id = 1
    for (let i in list) {
      if (list[i].id > id) {
        id = list[i].id
      }
    }
    return id + 1
  },
  getRandId () {
    return '1' + (Math.random().toString().substr(2, 9))
  },
  getAcDataValue (e, tag) {
    let dataKey
    let target = e.target
    let loop = true
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
    return dataKey
  },
  // 页面点击事件设置
  bodyClickEventInit () {
    document.body.addEventListener('click', (e) => {
      if (this.getAcDataValue(e, 'data-menu') != 'pageListMenu') {
        if (this.setConfig.pageMenuShowing) {
          let pageContent = this.setConfig.pageListOrderSetterParam.content
          for (let i in pageContent) {
            pageContent[i].showMenu = false
          }
          this.setConfig.pageMenuShowing = false
          this.refreshPageList()
        }
        if (this.setConfig.popMenuShowing) {
          let popContent = this.setConfig.popListOrderSetterParam.content
          for (let i in popContent) {
            popContent[i].showMenu = false
          }
          this.refreshPopList()
          this.setConfig.popMenuShowing = false
        }
      }
    })
  }
}
