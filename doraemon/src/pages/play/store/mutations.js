module.exports = {
  setShowContent (state) {
    const pages = state.configContent.pages
    const showPageId = state.showPageId
    if (pages && pages[showPageId]) {
      state.showContent = pages[showPageId].content
      state.showPage = pages[showPageId]
    }
    state.pageKey = Math.random()
  },
  setShowPops (state) {
    state.showPops = state.configContent.pops
  },
  setPageContent (state, action) {
    const pages = state.configContent.pages
    let pageId = action.pageId
    for (let i in pages) {
      if (pages[i].id == pageId) {
        state.showContent = pages[i].content
      }
    }
    state.pageKey = Math.random()
  },
  setPopContent (state, action) {
    const pops = state.configContent.pops
    let popId = action.popId
    for (let i in pops) {
      if (pops[i].id == popId) {
        pops[i].show = action.acType == 3
      }
    }
    state.pageKey = Math.random()
  }
}
