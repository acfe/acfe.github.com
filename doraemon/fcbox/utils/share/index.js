
class Share {
  constructor () {
    this.init()
  }

  init () {

  }

  trimParam (param) {
    let title = param.title
    title = title && title.length > 25 ? title.substr(0, 24) + '..' : title
    let desc = param.desc
    desc = desc && desc.length > 30 ? title.substr(0, 29) + '..' : desc
    desc = desc || '我发现了一款不错的商品，快来看看吧~'
    param.title = title
    param.desc = desc
    return param
  }

  share (param) {
    this.appShare(param)
  }

  appShare (param) {
    param = this.trimParam(param)
    let { title, desc, link, imgUrl } = param
    let fcApp = this.getCookie('fc_app')
    if (fcApp) {
      window.appShareCallback = () => {}
      let shareParam = {
        'title': title,
        'icon': imgUrl,
        'desc': desc,
        'link': link,
        'smsDesc': desc
      }
      let jsonStr = {
        callInfoList: [{
          actionType: param.customer ? 1998 : 1999,
          funcName: 'appShareCallback',
          actionParam: shareParam
        }]
      }
      jsonStr = JSON.stringify(jsonStr)
      let u = navigator.userAgent
      if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        // window.location.href = 'npc4fc://?jsonStr=' + jsonStr
        if (param.customer) {
          window.webkit.messageHandlers.appOnlineService.postMessage(jsonStr)
        } else {
          window.webkit.messageHandlers.appShareCallBack.postMessage(jsonStr)
        }
      } else if (window.npc4fc) {
        window.npc4fc.callAction(jsonStr)
      }
    }
  }

  getCookie (name) {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    arr = document.cookie.match(reg)
    if (arr && arr[2]) {
      return arr[2]
    } else {
      return false
    }
  }
}

export default new Share()
