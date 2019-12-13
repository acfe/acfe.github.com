/*
  4.文章信息
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/nuqdo70z1db.png?imageView2/2/w/240',
  title: '文章信息',
  config: {
    module: {
      name: '文章信息',
      tag: 'group',
      theme: 4,
      title: '文章标题',
      author: '作者',
      time: '2019-10-21 14:00:00',
      moduleStyle: {
        'padding-top': 16,
        'padding-left': 16,
        'padding-right': 16,
        'padding-bottom': 16
      },
      titleStyle: {
        'font-size': 18,
        'font-weight': 500,
        'line-height': 24,
        'color': '#4A4A4A'
      }
    }
  }
}

const themeSet = {
  theme: 4,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: [
        {
          type: 'textareaGroup',
          title: '标题',
          tag: 'title',
          param: {
            placeholder: '请输入标题'
          }
        },
        {
          type: 'textareaGroup',
          title: '作者',
          tag: 'author',
          param: {
            placeholder: '请输入作者'
          }
        },
        {
          type: 'textareaGroup',
          title: '发布时间',
          tag: 'time',
          param: {
            placeholder: '请输入发布时间'
          }
        }
      ]
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        commonSet.titleStyleGroup
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
