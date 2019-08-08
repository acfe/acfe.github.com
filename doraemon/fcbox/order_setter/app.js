/**
 * Created by 001264 on 2017/9/10.
 */
const OrderSetter = {
  name: 'OrderSetter',
  data () {
    return {
      slots: '',
      randomKey: Math.random(),
      editKey: 'empty'
    }
  },
  props: ['param', 'callback', 'addCallback', 'editCallback', 'delCallback'],
  mounted () {
    this.param.self = this
    this.slots = Object.keys(this.$slots)
    this.moveParam = {}
    this.scroll = this.param.scrollId ? document.getElementById(this.param.scrollId) : document.body
    this.param.scrollTop = this.param.scrollTop || 0
    if (this.param.editKey !== undefined) {
      this.refresh(this.param.editKey)
    }
  },
  methods: {
    refresh (selectedKey) {
      // this.randomKey = Math.random()
      if (selectedKey === undefined) {
        return false
      }
      this.selectedKey = selectedKey
      this.editKey = selectedKey === 0 ? 0 : (selectedKey || 'empty')
      this.setSelectModule(selectedKey)
    },
    setSelectModule (selectedKey) {
      setTimeout(() => {
        this.scroll.scrollTop = this.param.scrollTop
        const doms = this.scroll.getElementsByClassName('selectedBorder')
        if (doms && doms.length) {
          for (let i = 0; i < doms.length; i++) {
            doms[i].style.border = 'none'
            if (doms[i].getAttribute('data-border-key') == 's' + selectedKey) {
              doms[i].style.border = this.param.borderStyle || '1px dashed #ff0000'
            }
          }
        }
      })
    },
    delOrderIcon (key) {
      const doms = this.scroll.getElementsByClassName('selectedBorder')
      if (doms && doms.length) {
        for (let i = 0; i < doms.length; i++) {
          doms[i].style.border = 'none'
        }
      }
      const content = this.param.content
      const newContent = []
      for (var i in content) {
        if (i != key) {
          newContent.push(content[i])
        }
      }
      this.param.content = newContent
      this.randomKey = Math.random()
      setTimeout(() => {
        this.slots = Object.keys(this.$slots)
      })
      this.delCallback && this.delCallback(key)
    },
    addOrderIcon (key) {
      if (this.addCallback) {
        this.addCallback(key, this.target)
        return
      }
      const newArr = []
      const content = this.param.content
      for (var i = 0; i <= key; i++) {
        newArr.push(content[i])
      }
      const addModule = JSON.parse(JSON.stringify(content[0]))
      for (let i in addModule) {
        if (typeof addModule[i] === 'object') {
          addModule[i].option = '请选择'
          addModule[i].value = ''
        } else {
          addModule[i] = ''
        }
      }
      newArr.push(addModule)
      for (let i = key + 1; i < content.length; i++) {
        newArr.push(JSON.parse(JSON.stringify(content[i])))
      }
      this.param.content = newArr
      this.randomKey = Math.random()
      setTimeout(() => {
        this.slots = Object.keys(this.$slots)
      })
      this.callback && this.callback()
    },
    getAcDataKey (e, tag) {
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
    mousedown (e) {
      // e.stopPropagation();
      let dataKey = this.getAcDataKey(e, 'data-order-key')
      this.target = e.target
      if (dataKey == null || dataKey == undefined) {
        return
      }
      this.selectedKey = dataKey
      this.moveParam.sST = this.scroll.scrollTop
      this.to = setTimeout(() => {
        this.selectedContent = ''
        this.transferToAbsolute(dataKey)
        this.scroll.scrollTop = this.moveParam.sST
        if (!this.selectedContent) {
          return
        }
        const param = this.moveParam
        param.moveLock = true
        const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
        param.sY = event.pageY || event.y
        param.sT = parseInt(this.selectedContent.style.top) || 0
        param.isMove = false
        this.moveNum = 0
        this.editKey = this.selectedKey === 0 ? 0 : (this.selectedKey || 'empty')
      }, 500)
    },
    mousemove (e) {
      e.stopPropagation()
      const param = this.moveParam
      if (!param.moveLock) {
        return
      }
      e.preventDefault()
      if (this.editCallback) {
        this.editCallback('move')
      }
      const event = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
      param.mY = event.pageY || event.y
      const changeY = param.mY - param.sY
      this.scroll.scrollTop = param.sST + changeY * 2
      let top = this.scroll.scrollTop - param.sST + param.sT + changeY
      this.selectedContent.style.top = top + 'px'
      this.checkMove(changeY)
    },
    mouseup (e) {
      e.stopPropagation()
      this.to && clearTimeout(this.to)
      const param = this.moveParam
      if (!param.moveLock) {
        if (this.editCallback && e.target.getAttribute('class') != 'OrderSetter' && this.target) {
          if (!e.target.getAttribute('data-control')) {
            let dataKey = this.getAcDataKey(e, 'data-eid')
            if (parseInt(dataKey) || (parseInt(dataKey) === 0 && dataKey !== null)) {
              return false
            }
            this.editCallback(this.selectedKey, e.target, this.target.offsetTop)
          }
          if (!this.$refs.OrderSetterItem) {
            return false
          }
          const OrderSetterItem = this.$refs.OrderSetterItem.childNodes
          const len = OrderSetterItem.length
          for (let i = 0; i < len; i++) {
            if (OrderSetterItem[i].getAttribute('data-order-key') == this.selectedKey) {
              OrderSetterItem[i].getElementsByClassName('selectedBorder')[0].style.border = this.param.borderStyle || '1px dashed #ff0000'
            } else {
              OrderSetterItem[i].getElementsByClassName('selectedBorder')[0].style.border = 'none'
            }
          }
        }
        this.editKey = this.selectedKey === 0 ? 0 : (this.selectedKey || 'empty')
        return false
      }
      param.moveLock = false
      this.selectedContent.style.top = this.param.content[this.selectedKey].top + 'px'
      this.selectedContent.style.position = 'relative'
      if (this.selectedContent.getElementsByClassName('selectedBorder')[0]) {
        this.selectedContent.getElementsByClassName('selectedBorder')[0].style.border = 'none'
      }
      if (!this.moveNum) {
        let dataKey = this.getAcDataKey(e, 'data-eid')
        if (parseInt(dataKey) || (parseInt(dataKey) === 0 && dataKey !== null)) {
          return false
        }
        if (!e.target.getAttribute('data-control')) {
          this.callback && this.callback(parseInt(this.selectedKey))
        }
        return false
      }
      const newPageContents = this.param.content
      const relativeArr = []
      const setContents = []
      for (var i in newPageContents) {
        newPageContents[i].top = newPageContents[i].top > 0 ? newPageContents[i].top : 0
        relativeArr[newPageContents[i].top] = newPageContents[i]
      }
      for (let i in relativeArr) {
        setContents.push(relativeArr[i])
      }
      this.param.content = setContents
      this.randomKey = Math.random()
      this.callback && this.callback(parseInt(this.selectedKey) + this.moveNum)
    },
    transferToAbsolute (selectedDataKey) {
      if (!this.$refs.OrderSetterItem) {
        return
      }
      const OrderSetterItem = this.$refs.OrderSetterItem.childNodes
      const len = OrderSetterItem.length
      let totalHeight = 0
      for (var i = 0; i < len; i++) {
        OrderSetterItem[i].getElementsByClassName('selectedBorder')[0].style.border = 'none'
        for (var p in this.param.content) {
          if (OrderSetterItem[i].getAttribute('data-order-key') == p) {
            Object.assign(this.param.content[p], {
              top: totalHeight,
              clientHeight: OrderSetterItem[i].clientHeight
            })
            OrderSetterItem[i].style.top = totalHeight + 'px'
            OrderSetterItem[i].style.position = 'absolute'
            OrderSetterItem[i].style.zIndex = 0
            totalHeight += OrderSetterItem[i].clientHeight
            if (OrderSetterItem[i].getAttribute('data-order-key') == selectedDataKey) {
              this.selectedContent = OrderSetterItem[i]
              this.selectedKey = p
            }
          }
        }
      }
      this.$refs.OrderSetterItem.style.height = totalHeight + 'px'
      if (this.selectedContent.getElementsByClassName('selectedBorder')[0]) {
        this.selectedContent.getElementsByClassName('selectedBorder')[0].style.border = this.param.borderStyle || '1px dashed #ff0000'
      }
      this.selectedContent.style.zIndex = 1
    },
    checkMove (changeY) {
      const OrderSetterItem = this.$refs.OrderSetterItem.childNodes
      const content = this.param.content
      const moveTop = parseInt(this.selectedContent.style.top) || 0
      const selectedObj = content[this.selectedKey]
      const selectedTop = selectedObj.top
      if (moveTop > selectedTop) {
        for (var i in content) {
          if (content[i].top > selectedTop) {
            if (moveTop + selectedObj.clientHeight > content[i].top + content[i].clientHeight / 2) {
              OrderSetterItem[i].style.top = selectedTop + 'px'
              content[i].top = selectedTop
              selectedObj.top = (selectedTop + content[i].clientHeight)
              this.moveNum++
            }
            break
          }
        }
      } else {
        const len = content.length - 1
        for (let i = len; i >= 0; i--) {
          if (content[i].top < selectedTop) {
            if (moveTop < content[i].top + content[i].clientHeight / 2) {
              content[i].top += selectedObj.clientHeight
              OrderSetterItem[i].style.top = content[i].top + 'px'
              selectedObj.top = (selectedTop - content[i].clientHeight)
              this.moveNum--
            }
            break
          }
        }
      }
    }
  }
}

export default OrderSetter
