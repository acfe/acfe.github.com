import 'src/common/less/common.less'
import 'src/common/less/public.less'

class Com {
  constructor () {
    document.title = '丰巢科技'
    const docEl = document.documentElement
    let width = document.body.offsetWidth || docEl.getBoundingClientRect().width
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      document.documentElement.style.fontSize = width + 'px'
    } else {
      document.documentElement.style.fontSize = '375px'
    }
  }
}

export default new Com()
