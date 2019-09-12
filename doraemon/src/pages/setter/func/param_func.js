import PublicFunc from './public_func'

const ParamFunc = {
  // inputGroup textareaGroup
  getInputGroupParam (setterParam, setterParamValue) {
    this.setParamDefaultValue(setterParam, setterParamValue)
    const Obj = {
      title: setterParam.title,
      type: setterParam.type,
      param: Object.assign({}, setterParam.param, {
        value: setterParamValue[setterParam.tag]
      }),
      callback: function (acParam, acType) {
        if (acType == 'focusout') {
          setterParamValue[setterParam.tag] = acParam.value || setterParam.defaultValue
          if (!setterParam.static) {
            this.refreshContent()
          }
          setterParam.callback && setterParam.callback(acParam)
        }
      }.bind(this)
    }
    return Obj
  },
  // radioTabGroup
  getRadioTabGroupParam (setterParam, setterParamValue) {
    this.setParamDefaultValue(setterParam, setterParamValue)
    let Obj = {
      title: setterParam.title,
      type: setterParam.type,
      param: {
        value: setterParamValue[setterParam.tag],
        data: setterParam.data
      },
      callback: function (acParam) {
        setterParamValue[setterParam.tag] = acParam.value || setterParam.defaultValue
        this.refreshContent()
        setterParam.callback && setterParam.callback(acParam)
      }.bind(this)
    }
    return Obj
  },
  // setGroup
  getSetGroupParam (setterParam) {
    let Obj = {
      title: setterParam.title,
      type: setterParam.type,
      open: setterParam.open,
      setList: setterParam.setList,
      setOpen: function () {
        Obj.open = !Obj.open
        setterParam.open = Obj.open
      }
    }
    return Obj
  },
  // imageGroup
  getImageGroupParam (setterParam, setterParamValue) {
    let Obj = {
      type: setterParam.type,
      urlParam: {
        title: setterParam.title,
        param: {
          value: setterParamValue[setterParam.tag] || (setterParam.defaultValue || ''),
          placeholder: setterParam.placeholder || '请输入图片地址'
        },
        callback: function (acParam, acType) {
          if (acType == 'focusout') {
            setterParamValue[setterParam.tag] = acParam.value
            if (!setterParam.static) {
              this.refreshContent()
            }
            Obj.uploadParam.value = acParam.value
          }
        }.bind(this)
      },
      uploadParam: {
        value: setterParamValue[setterParam.tag] || '',
        del: true,
        callback: function (type, acParam) {
          setterParamValue[setterParam.tag] = acParam.value
          Obj.urlParam.param.value = acParam.value
          this.refreshContent()
        }.bind(this),
        delCallback: function (type, acParam) {
          setterParamValue[setterParam.tag] = acParam.value
          Obj.urlParam.param.value = acParam.value
          this.refreshContent()
        }.bind(this)
      }
    }
    return Obj
  },
  // dataSourceGroup
  getDataSourceGroupParam (setterParam, setterParamValue) {
    let dataSource = this.contentConfig.dataSource || {}
    dataSource[setterParamValue.tag] = dataSource[setterParamValue.tag] || []
    let dataSourceParam = {
      title: setterParam.title,
      type: setterParam.type,
      param: {
        value: setterParamValue[setterParam.tag] || '',
        data: dataSource[setterParamValue.tag]
      },
      callback: function (acParam) {
        setterParamValue[setterParam.tag] = acParam.value
        this.refreshSetter()
        this.refreshContent()
      }.bind(this),
      showAdd: false,
      nameParam: {
        value: '',
        placeholder: '数据源名称'
      },
      delCallback: function (item) {
        let newSource = []
        for (let i in dataSource[setterParamValue.tag]) {
          if (dataSource[setterParamValue.tag][i].value != item.value) {
            newSource.push(dataSource[setterParamValue.tag][i])
          }
        }
        dataSource[setterParamValue.tag] = newSource
        this.refreshSetter()
        this.refreshContent()
      }.bind(this),
      saveCallback: function () {
        if (dataSourceParam.nameParam.value) {
          setterParamValue[setterParam.tag] = PublicFunc.getRandId()
          dataSource[setterParamValue.tag].push({
            option: dataSourceParam.nameParam.value,
            value: setterParamValue[setterParam.tag],
            data: []
          })
          this.contentConfig.dataSource = dataSource
          this.refreshSetter()
          this.refreshContent()
        }
      }.bind(this),
      addCallback () {
        dataSourceParam.showAdd = true
      }
    }
    return dataSourceParam
  },
  // contentGroup
  getContentGroupParam (setterParam, setterParamValue, setSource) {
    let Obj = {
      title: setterParam.title,
      type: setterParam.type,
      contentListType: setSource.contentListType || 'edit',
      setList: setterParam.setList,
      addContent: function () {
        setSource.data.push({})
        this.setConfig.moduleContentSetterKey = setSource.data.length - 1
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollHeight
        this.refreshSetter()
        this.refreshContent()
      }.bind(this),
      delContent: function (key) {
        Obj.orderSetterParam.self.delContent(key)
      },
      changeContentListType: function (type) {
        setSource.contentListType = type
        for (let i in setSource.data) {
          setSource.data[i].contentListType = type
        }
        this.refreshSetter()
      }.bind(this),
      changeItemContentListType: function (type, key) {
        setSource.data[key].contentListType = type
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
        this.refreshSetter(true)
      }.bind(this),
      orderSetterParam: {
        key: Math.random(),
        hideDel: true,
        hideAdd: true,
        scrollId: 'contentSetter',
        borderStyle: '1px dashed #64B5F6',
        content: setSource.data,
        editKey: this.setConfig.moduleContentSetterKey || this.setConfig.moduleContentSetterKey === 0 ? this.setConfig.moduleContentSetterKey : 'empty',
        scrollTop: this.setConfig.moduleContentSetterScrollTop || 0,
        orderSetterEditContentCallback: function (key) {
          if (key !== undefined && key != 'move') {
            this.setConfig.moduleContentSetterKey = key
          }
        }.bind(this),
        orderSetterDelContentCallback: function (key) {
          key = key - 1 > 0 ? key - 1 : 0
          this.setConfig.moduleContentSetterKey = key
          this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
          setSource.data = Obj.orderSetterParam.content
          this.refreshSetter()
          this.refreshContent()
        }.bind(this),
        orderSetterMoveCallback: function (key) {
          this.setConfig.moduleContentSetterKey = key
          this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
          setSource.data = Obj.orderSetterParam.content
          this.refreshSetter()
          this.refreshContent()
        }.bind(this)
      }
    }
    if (setterParamValue.tag == 'menus' || setterParamValue.tag == 'tab') {
      Obj.checkedId = setSource.checkedId || 0
      Obj.changeCheckedId = function (checkedId, key) {
        setSource.checkedId = checkedId
        this.setConfig.moduleContentSetterKey = key
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollTop
        this.refreshSetter()
        this.refreshContent()
      }.bind(this)
      Obj.orderSetterParam.addContent = function () {
        let checkedId = PublicFunc.getRandId()
        setSource.data.push({
          checkedId
        })
        setSource.checkedId = setSource.checkedId || checkedId
        this.setConfig.moduleContentSetterKey = setSource.data.length - 1
        this.setConfig.moduleContentSetterScrollTop = Obj.orderSetterParam.self.scroll.scrollHeight
        this.refreshSetter()
        this.refreshContent()
      }.bind(this)
    }
    return Obj
  },
  setParamDefaultValue (setterParam, setterParamValue) {
    setterParam.defaultValue = (setterParam.defaultValue || setterParam.defaultValue === 0) ? setterParam.defaultValue : ''
    setterParamValue[setterParam.tag] = (setterParamValue[setterParam.tag] || setterParamValue[setterParam.tag] === 0) ? setterParamValue[setterParam.tag] : setterParam.defaultValue
  }
}
export default ParamFunc
