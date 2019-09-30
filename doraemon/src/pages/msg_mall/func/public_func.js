
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
  },
  trimObjBlank (obj) {
    if (isBaseDataType(obj)) {
      return obj
    }
    function judgeType (_obj) {
      return _obj === null ? 'null' : _obj instanceof Array ? 'array' : typeof _obj !== 'object' ? typeof _obj : 'object'
    }
    function isBaseDataType (_obj) {
      var types = ['boolean', 'number', 'string', 'function', 'null', 'undefined']
      var type = judgeType(_obj)
      return types.indexOf(type) !== -1
    }
    function _cloneArry (_obj) {
      var res = []
      for (var i = 0, len = _obj.length; i < len; i++) {
        var value = _obj[i]
        if (isBaseDataType(value) && value !== '' && value !== '请选择') {
          res.push(value)
        } else if (judgeType(value) === 'object') {
          res.push(_cloneObj(value))
        } else if (judgeType(value) === 'array') {
          res.push(_cloneArry(value))
        }
      }
      return res
    }
    function _cloneObj (_obj) {
      var res = {}
      for (var attr in _obj) {
        var value = _obj[attr]
        if (isBaseDataType(value) && value !== '' && value !== '请选择') {
          res[attr] = value
        } else if (judgeType(value) === 'object') {
          res[attr] = _cloneObj(value)
        } else if (judgeType(value) === 'array') {
          res[attr] = _cloneArry(value)
        }
      }
      return res
    }
    if (judgeType(obj) === 'array') {
      return _cloneArry(obj)
    } else {
      return _cloneObj(obj)
    }
  }
}
