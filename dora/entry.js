const publicPath = '/dora'

var Index = function () {
  this.commonInit()
}

Index.prototype = {

  commonInit: function () {
    window.fc = window.fc || {}
    if (!this.isListeningHash) {
      window.fc.hashChangeFuncs = {
        pageInit: this.pageInit.bind(this)
      }
      window.addEventListener('popstate', function () {
        for (var i in window.fc.hashChangeFuncs) {
          window.fc.hashChangeFuncs[i]()
        }
      })
      this.pageInit()
      this.isListeningHash = true
    }
  },

  pageInit: function () {
    var hashArr = location.hash.split('/')
    if (!hashArr || !hashArr[1]) {
      hashArr = ['', 'index']
    }
    window.fc.hashArr = hashArr
    var show = hashArr[1]
    if (this.show === show) {
      return false
    }
    window.fc.routerHashLock = false
    if (this.show) {
      window.fc.routerHashLock = true
      location.reload()
      return
    }
    this.show = show
    // loading
    var app = document.getElementById('app')
    app.style.minHeight = document.clientHeight + 'px'
    app.innerHTML = '<div class="loadingImg"><img src="/doraimg/loading.gif"></div>'
    this.createCss(show)
    setTimeout(function () {
      var modernBrowser = ('fetch' in window && 'assign' in Object)
      if (!modernBrowser) {
        this.createJs('polyfill', function () {
          this.contentJsInit(show)
        }.bind(this))
      } else {
        this.contentJsInit(show)
      }
    }.bind(this), 500)
  },

  contentJsInit: function (show) {
    if (!window.fc.vendorInit) {
      window.fc.vendorInit = true
      this.createJs('vendor', function () {
        this.createJs(show)
      }.bind(this))
    } else {
      this.createJs(show)
    }
  },

  createCss: function (name) {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    head.appendChild(link)
    link.href = publicPath + 'css/' + name + '.css?0.42738568274673416'
  },

  createJs: function (name, callback) {
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.async = false
    script.src = publicPath + 'js/' + name + '.js?0.42738568274673416'
    head.appendChild(script)
    script.onload = function () {
      callback && callback()
    }
  }

}

new Index()
