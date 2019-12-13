/*
  2.图文菜单-多列排版
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/kp2dfefqr6d.png',
  title: '图文菜单-多列排版',
  config: {
    module: {
      name: '图文菜单-多列排版',
      tag: 'menus',
      theme: 2,
      dataType: 0,
      singleDatas: {
        checkedId: 1,
        data: [
          {
            url: 'http://static.fcbox.com/fcapp/mall/2wydf3x0xjh.png',
            name: '新鲜果蔬',
            checkedId: 1
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/01bhe9ow6qgj.png',
            name: '海鲜水产',
            checkedId: 2
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/kbwaduhxxao.png',
            name: '肉类禽蛋',
            checkedId: 3
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/kpw83g20aob.png',
            name: '家居礼品',
            checkedId: 4
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/p75t6aknrd8.png',
            name: '美妆个护',
            checkedId: 5
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/pdhs32j777q.png',
            name: '食品零食',
            checkedId: 6
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/yeaw9rb31f.png',
            name: '酒水饮料',
            checkedId: 7
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/89enpmyb1x8.png',
            name: '特色干货',
            checkedId: 8
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/bgsfubp31en.png',
            name: '手机数码',
            checkedId: 9
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/orggk0o9cem.png',
            name: '营养滋补',
            checkedId: 10
          }
        ]
      },
      contentPaddingRight: 10,
      contentPaddingBottom: 10,
      columNum: 5,
      moduleStyle: {
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 10,
        'padding-bottom': 10
      },
      itemStyle: {},
      imageStyle: {
        'width': 45
      },
      nameStyle: {
        'font-size': 12,
        'color': '#333',
        'line-height': 16,
        'text-align': 'center',
        'padding-top': 10
      },
      nameCheckedStyle: {
        'font-size': 12,
        'color': '#333',
        'text-align': 'center'
      }
    }
  }
}
// content
const contentSetParam2 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'textareaGroup',
      title: '名称',
      tag: 'name',
      param: {
        placeholder: '请输入菜单名'
      }
    },
    {
      type: 'imageGroup',
      title: '图片地址',
      showTitle: 1,
      tag: 'url'
    },
    {
      type: 'imageGroup',
      title: '选中图片地址',
      showTitle: 1,
      tag: 'checkedUrl'
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList2 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList2.push(contentSetParam2)
// style
const contentPaddingBottomSet = {
  type: 'inputGroup',
  title: '行间距(px)',
  tag: 'contentPaddingBottom',
  param: {
    placeholder: '请输入行间距'
  }
}
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
const theme2ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme2ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme2ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
theme2ItemStyleSetGroup.setList.unshift(columNumSet)

const themeSet = {
  theme: 2,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList2
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme2ItemStyleSetGroup,
        commonSet.imageStyleSetGroup,
        commonSet.getTextGroupParam('名称', 'nameStyle'),
        commonSet.getTextGroupParam('名称选中', 'nameCheckedStyle')
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
