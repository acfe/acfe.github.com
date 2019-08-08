class Ajax {
  createXMLHttpRequest () {
    var xmlHttp
    if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest()
      if (xmlHttp.overrideMimeType) {
        xmlHttp.overrideMimeType('text/xml')
      }
    } else if (window.ActiveXObject) {
      try {
        xmlHttp = new window.ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        xmlHttp = new window.ActiveXObject('Microsoft.XMLHTTP')
      }
    }
    xmlHttp.withCredentials = true
    return xmlHttp
  }
  get (param) {
    if (!param || !param.url) {
      return false
    }
    var xmlHttp = this.createXMLHttpRequest()
    var url = param.url
    var data = param.data || {}
    var strTag = ''
    var dataStr = ''
    for (var i in data) {
      dataStr += strTag + encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
      if (!strTag) {
        strTag = '&'
      }
    }
    url += /\?/.test(url) ? dataStr : '?' + dataStr
    xmlHttp.open('GET', url, true)
    this.setHeader(param, xmlHttp)
    xmlHttp.send()
    return this.sendCallback(xmlHttp)
  };

  post (param) {
    if (!param || !param.url) {
      return
    }
    var xmlHttp = this.createXMLHttpRequest()
    var url = param.url
    var data = param.data || {}
    xmlHttp.open('POST', url, true)
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    this.setHeader(param, xmlHttp)
    var strTag = ''
    var dataStr = ''
    for (var i in data) {
      dataStr += strTag + encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
      if (!strTag) {
        strTag = '&'
      }
    }
    xmlHttp.send(dataStr)
    return this.sendCallback(xmlHttp)
  };

  postForm (param) {
    if (!param || !param.url || !param.data) {
      return
    }
    var xmlHttp = this.createXMLHttpRequest()
    var url = param.url
    var data = param.data
    xmlHttp.open('POST', url, true)
    this.setHeader(param, xmlHttp)
    xmlHttp.send(data)
    return this.sendCallback(xmlHttp)
  }

  postJson (param) {
    if (!param || !param.url || !param.data) {
      return
    }
    var xmlHttp = this.createXMLHttpRequest()
    var url = param.url
    var data = param.data
    xmlHttp.open('POST', url, true)
    xmlHttp.setRequestHeader('Content-Type', 'application/json')
    this.setHeader(param, xmlHttp)
    xmlHttp.send(JSON.stringify(data))
    return this.sendCallback(xmlHttp)
  }

  uploadFormData (param) {
    if (!param || !param.url || !param.data) {
      return
    }
    var form = new FormData()
    var xmlHttp = this.createXMLHttpRequest()
    var url = param.url
    var data = param.data
    for (var p in data) {
      if (data.hasOwnProperty(p)) {
        form.append(p, data[p])
      }
    }
    xmlHttp.open('POST', url, true)
    if (param.Authorization) {
      xmlHttp.setRequestHeader('Authorization', param.Authorization)
    }
    this.setHeader(param, xmlHttp)
    xmlHttp.withCredentials = false
    xmlHttp.send(form)
    if (typeof param.progress === 'function') {
      xmlHttp.upload.onprogress = function (e) {
        param.progress(e)
      }
    }
    return this.sendCallback(xmlHttp)
  }

  setHeader (param, xmlHttp) {
    if (param.headers) {
      for (let i in param.headers) {
        xmlHttp.setRequestHeader(i, param.headers[i])
      }
    }
  }

  sendCallback (xmlHttp) {
    return new Promise((resolve, reject) => {
      xmlHttp.onload = (e) => {
        if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status === 304) {
          resolve(xmlHttp.responseText)
        } else {
          reject(xmlHttp.responseText || e)
        }
      }
      xmlHttp.onerror = (e) => {
        reject(xmlHttp.responseText || e)
      }
    })
  }
}

export default new Ajax()
