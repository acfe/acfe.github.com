/**
 * Created by 001264 on 2018/8/14.
 */

class FcTree {
  constructor (source, param) {
    this.source = source
    this.showAll = false
    this.rootId = 0
    if (param) {
      this.setParam(param)
    }
    this.treeInit()
  }
  setParam (param) {
    Object.assign(this, param)
  }
  setOpen (id) {
    this.propertyObj[id].open = !this.propertyObj[id].open
    const data = this.source || []
    for (var i in data) {
      if (data[i].id == id) {
        data[i].open = this.propertyObj[id].open
      }
    }
    this.treeInit()
  }
  treeInit () {
    const data = this.source
    const relativeObj = {}
    const propertyObj = {}
    for (var i in data) {
      data[i].selected = false
      data[i].checked = false
      propertyObj[data[i].id] = data[i]
      propertyObj[data[i].id].show = (this.showAll || this.rootId == data[i].parentId) ? true : (data[i].show || false)
      if (data[i].open) {
        propertyObj[data[i].id].open = data[i].open
      }
      relativeObj[data[i].parentId] = relativeObj[data[i].parentId] || []
      relativeObj[data[i].parentId].push(data[i].id)
    }
    this.relativeObj = relativeObj
    this.propertyObj = propertyObj
    this.renderArr = this.setRenderArr(this.relativeObj)
  }
  setRenderArr (relativeObj, result) {
    if (!Object.keys(relativeObj).length) {
      return []
    }
    const propertyObj = this.propertyObj
    const loopKeys = {}
    const rootId = this.rootId
    let loopId = rootId
    loopKeys[loopId] = 0
    let loopObj = relativeObj[loopId]
    let num = 0
    let level = 0
    const renderArr = []
    let relativeTag = rootId
    while (loopKeys[rootId] <= relativeObj[rootId].length && num < 100000) {
      loopKeys[loopId] = loopKeys[loopId] || 0
      const pushId = loopObj[loopKeys[loopId]]
      if (pushId) {
        if (propertyObj[propertyObj[pushId].parentId] && !propertyObj[propertyObj[pushId].parentId].open) {
          propertyObj[pushId].open = false
          propertyObj[pushId].hide = true
        } else {
          propertyObj[pushId].show = true
          propertyObj[pushId].hide = false
        }
        propertyObj[pushId].relative = relativeTag + '-' + pushId
        if (propertyObj[pushId].show && !propertyObj[pushId].hide) {
          if (result || (!result && !propertyObj[pushId].selected)) {
            renderArr.push(pushId)
          }
        }
        propertyObj[pushId].level = level
        if (!relativeObj[pushId]) {
          loopKeys[loopId]++
        }
      }
      if (relativeObj[pushId]) {
        relativeTag += '-' + pushId
        if (propertyObj[pushId].open == undefined && this.showAll) {
          propertyObj[pushId].open = true
        }
        loopObj = relativeObj[pushId]
        loopId = pushId
        level++
      } else if (loopKeys[loopId] >= loopObj.length) {
        loopId = propertyObj[loopId] ? propertyObj[loopId].parentId : rootId
        loopObj = relativeObj[loopId]
        loopKeys[loopId]++
        if (loopId == rootId) {
          level = 0
          relativeTag = rootId
        } else {
          level--
          relativeTag = relativeTag.replace(/-\d+$/, '')
        }
      }
      num++
    }
    return renderArr
  }
}

export default FcTree
