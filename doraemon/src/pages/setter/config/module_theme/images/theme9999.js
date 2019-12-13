/*
  9999.空模块
*/
import commonSet from '../../common_set'

const theme = {
  title: '空模块',
  config: {
    module: {
      name: '空模块',
      tag: 'images',
      theme: 9999,
      dataType: 0,
      singleDatas: {
        data: []
      },
      moduleStyle: {}
    }
  }
}

const themeSet = {
  theme: 9999,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: [
        {
          type: 'inputGroup',
          title: '模块名称',
          tag: 'name',
          param: {
            placeholder: '请输入模块名称'
          }
        }
      ]
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
