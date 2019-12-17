/*
  3.横向滚动图文
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/s780719wr3p.jpg',
  title: '横向滚动',
  config: {
    module: {
      name: '横向滚动',
      tag: 'images',
      theme: 3,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/62mfhh4rv56.jpg',
            title: '这些救命润唇膏，囤再多都觉得少！'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/uehk6a4q9j.jpg',
            title: '9月最爱口红——格子间女孩一周工作日的仪式感'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/kuu2i4i931g.jpg',
            title: '三种堪比整容的元气腮红化法 到底有多显瘦？'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/mqa1ja0uv4i.jpg',
            title: '亮片烟熏屡次翻车？红毯妆容也要LESS IS MORE'
          }
        ]
      },
      contentPaddingRight: 15,
      columNum: 2.3,
      moduleStyle: {
        'padding-bottom': 15,
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {},
      imageStyle: {},
      titleStyle: {
        'font-size': 14,
        'color': '#333333',
        'line-height': 20,
        'padding-top': 10
      }
    }
  }
}
// content
const contentSetParam3 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'imageGroup',
      title: '图片地址',
      tag: 'url'
    },
    {
      type: 'textareaGroup',
      title: '标题',
      tag: 'title',
      param: {
        placeholder: '请输入标题'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList3 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList3.push(contentSetParam3)
// style
const contentPaddingRightSet = {
  type: 'inputGroup',
  title: '列间距(px)',
  tag: 'contentPaddingRight',
  param: {
    placeholder: '请输入列间距'
  }
}
const columNumSet = {
  type: 'inputGroup',
  title: '每行显示列数',
  tag: 'columNum',
  param: {
    placeholder: '每行显示列数'
  }
}
const theme3ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme3ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme3ItemStyleSetGroup.setList.unshift(columNumSet)

const themeSet = {
  theme: 3,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList3
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme3ItemStyleSetGroup,
        commonSet.fitImageSetGroup,
        commonSet.titleStyleGroup,
        commonSet.descriptionStyleGroup
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
