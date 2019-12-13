/*
  1001.tab菜单
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201910/dq2e52cavju.png?imageView2/2/w/240',
  title: 'tab菜单',
  config: {
    module: {
      name: 'tab菜单',
      tag: 'menus',
      theme: 1001,
      dataType: 0,
      singleDatas: {
        checkedId: 1,
        data: [
          {
            checkedId: 1,
            name: '帐号问题'
          },
          {
            checkedId: 2,
            name: '派件问题'
          },
          {
            checkedId: 3,
            name: '寄件问题'
          },
          {
            checkedId: 4,
            name: '优惠券'
          },
          {
            checkedId: 5,
            name: '拉黑规则'
          },
          {
            checkedId: 6,
            name: '开发票'
          },
          {
            checkedId: 7,
            name: '租用预约'
          },
          {
            checkedId: 8,
            name: '其他'
          }
        ]
      },
      contentPaddingRight: 8,
      contentPaddingBottom: 8,
      columNum: 4,
      moduleStyle: {
        'padding-left': 16,
        'padding-right': 16
      },
      itemStyle: {},
      nameStyle: {
        'font-size': 14,
        'color': '#999999',
        'height': 28,
        'text-align': 'center',
        'line-height': 28,
        'padding-left': 10,
        'padding-right': 10
      },
      nameCheckedStyle: {
        'line-height': 28,
        'color': '#ffffff',
        'background-color': '#9AD708',
        'border-radius': 14
      }
    }
  }
}
// content
const contentSetParam1001 = {
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
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList1001 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList1001.push(contentSetParam1001)
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

const nameCheckedStyleParam = commonSet.getTextGroupParam('名称选中', 'nameCheckedStyle')
nameCheckedStyleParam.setList.unshift({
  type: 'inputGroup',
  title: '选中项圆角',
  tag: 'border-radius',
  param: {
    placeholder: '请输入圆角px'
  }
})
nameCheckedStyleParam.setList.unshift({
  type: 'colorGroup',
  title: '选中背景色',
  setValueKey: 'nameCheckedStyle',
  tag: 'background-color'
})

const themeSet = {
  theme: 1001,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList1001
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme2ItemStyleSetGroup,
        commonSet.getTextGroupParam('名称', 'nameStyle'),
        nameCheckedStyleParam
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
