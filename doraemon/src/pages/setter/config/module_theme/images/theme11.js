/*
  11.单图模块
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/n4vg3y1rbw8.png',
  title: '单图模块',
  config: {
    module: {
      name: '单图模块',
      tag: 'images',
      theme: 11,
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/n4vg3y1rbw8.png',
      moduleStyle: {}
    }
  }
}

const themeSet = {
  theme: 11,
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
        },
        {
          type: 'imageGroup',
          title: '图片地址',
          tag: 'url'
        },
        {
          type: 'actionGroup',
          tag: 'action'
        }
      ]
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        commonSet.fitImageSetGroup
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
