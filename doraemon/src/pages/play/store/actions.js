module.exports = {
  setShowContent (store) {
    const state = store.state
    const pages = state.contentConfig.pages
    let showPageId = state.showPageId
    let hashArr = location.hash.substr(1).split('/')
    if (hashArr && hashArr[2]) {
      showPageId = parseInt(hashArr[2]) - 1
    }
    if (pages && pages[showPageId]) {
      state.showContent = pages[showPageId].content
      state.showPage = pages[showPageId]
    }
    store.dispatch('formatContent')
  },
  setShowPops (store) {
    const state = store.state
    state.showPops = state.contentConfig.pops
  },
  formatContent (store) {
    const state = store.state
    const showContent = state.showContent
    const topContent = []
    const bottomContent = []
    const normalContent = []
    let totalHeight = 0
    let topHeight = 0
    let normalHeight = 0
    let bottomHeight = 0
    for (let i in showContent) {
      let moduleHeight = showContent[i].moduleHeight || 0
      if (!state.sizeInit) {
        moduleHeight = moduleHeight / 375 * (document.body.clientWidth || document.documentElement.clientWidth)
      }
      if (showContent[i].heightType == 'set') {
        if (showContent[i].style && showContent[i].style['paddding-top']) {
          moduleHeight += parseInt(showContent[i].style['paddding-top'])
        }
        if (showContent[i].style && showContent[i].style['paddding-bottom']) {
          moduleHeight += parseInt(showContent[i].style['paddding-bottom'])
        }
      }
      totalHeight += moduleHeight
      showContent[i].moduleHeight = moduleHeight
      switch (showContent[i].lockPosition) {
        case 'top':
          topHeight += moduleHeight
          topContent.push(showContent[i])
          break
        case 'bottom':
          bottomHeight += moduleHeight
          bottomContent.push(showContent[i])
          break
        default:
          normalHeight += moduleHeight
          normalContent.push(showContent[i])
          break
      }
    }
    state.sizeInit = true
    let topModuleTop = 0
    if (topContent.length) {
      for (let i in topContent) {
        topContent[i].moduleTop = topModuleTop
        topModuleTop += topContent[i].moduleHeight || 0
      }
    }
    let normalModuleTop = topHeight
    if (normalContent.length) {
      for (let i in normalContent) {
        normalContent[i].moduleTop = normalModuleTop
        normalModuleTop += normalContent[i].moduleHeight || 0
      }
    }
    let moduleBottom = 0
    if (bottomContent.length) {
      for (let i = bottomContent.length - 1; i >= 0; i--) {
        bottomContent[i].moduleBottom = moduleBottom
        moduleBottom += bottomContent[i].moduleHeight || 0
      }
    }
    const showObj = {
      totalHeight,
      topHeight,
      bottomHeight,
      normalHeight,
      topContent,
      normalContent,
      bottomContent
    }
    store.state.showObj = showObj
  },
  setPageContent (store, action) {
    const state = store.state
    const pages = state.contentConfig.pages
    let pageId = action.pageId
    for (let i in pages) {
      if (pages[i].id == pageId) {
        state.showContent = pages[i].content
        state.showPage = pages[i]
      }
    }
    store.dispatch('formatContent')
  },
  setPopContent (store, action) {
    const state = store.state
    const pops = state.contentConfig.pops
    let popId = action.popId
    for (let i in pops) {
      if (pops[i].id == popId) {
        pops[i].show = action.acType == 3
      }
    }
    state.pageKey = Math.random()
  }
}
