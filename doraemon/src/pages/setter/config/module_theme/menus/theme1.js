/*
  1.文字菜单
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/h129hoty8qq.jpg',
  title: '文字菜单',
  config: {
    module: {
      name: '文字菜单',
      tag: 'menus',
      theme: 1,
      dataType: 0,
      singleDatas: {
        checkedId: 1,
        data: [
          {
            checkedId: 1,
            name: '推荐'
          },
          {
            checkedId: 2,
            name: '新鲜果蔬'
          },
          {
            checkedId: 3,
            name: '水产肉类'
          },
          {
            checkedId: 4,
            name: '家居日化'
          },
          {
            checkedId: 5,
            name: '美妆个护'
          },
          {
            checkedId: 6,
            name: '特产干货'
          }
        ]
      },
      heightType: 'set',
      moduleHeight: 46,
      moduleStyle: {
        'padding-left': 10,
        'padding-right': 10
      },
      itemStyle: {},
      checkedBarStyle: {
        'width-percent': 70,
        'height': 2,
        'border-radius': 2,
        'background-color': '#2196F3'
      },
      checkedBarPosStyle: {
        'text-align': 'center',
        'bottom': 10
      },
      contentPaddingRight: 10,
      nameStyle: {
        'font-size': 14,
        'color': '#333333',
        'line-height': 30,
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 5,
        'padding-bottom': 5
      },
      nameCheckedStyle: {
        'color': '#2196F3'
      }
    }
  }
}
// content
const contentSetParam1 = {
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
const contentSetList1 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList1.push(contentSetParam1)
// style
const contentPaddingRightSet = {
  type: 'inputGroup',
  title: '列间距(px)',
  tag: 'contentPaddingRight',
  param: {
    placeholder: '请输入列间距'
  }
}
const theme1ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme1ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)

const themeSet = {
  theme: 1,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList1
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
        theme1ItemStyleSetGroup,
        commonSet.getTextGroupParam('名称', 'nameStyle'),
        commonSet.getTextGroupParam('名称选中', 'nameCheckedStyle'),
        {
          type: 'setGroup',
          title: '选中浮标设置',
          setList: [
            {
              type: 'sliderGroup',
              title: '宽度(%)',
              tag: 'width-percent',
              param: {
                placeholder: '请输入宽度百分比'
              },
              setValueKey: 'checkedBarStyle'
            },
            {
              type: 'inputGroup',
              title: '高度(px)',
              tag: 'height',
              param: {
                placeholder: '请输入高度'
              },
              setValueKey: 'checkedBarStyle'
            },
            {
              type: 'inputGroup',
              title: '圆角(px)',
              tag: 'border-radius',
              param: {
                placeholder: '请输入圆角'
              },
              setValueKey: 'checkedBarStyle'
            },
            {
              type: 'colorGroup',
              title: '背景色',
              tag: 'background-color',
              param: {
                placeholder: '请输入浮标背景色'
              },
              setValueKey: 'checkedBarStyle'
            },
            {
              type: 'inputGroup',
              title: '底部距离(px)',
              tag: 'bottom',
              param: {
                placeholder: '请输入距离'
              },
              setValueKey: 'checkedBarPosStyle'
            },
            {
              type: 'radioTabGroup',
              title: '背景位置',
              tag: 'text-align',
              defaultValue: 'center',
              data: [
                {
                  option: '居左',
                  value: 'left'
                },
                {
                  option: '居中',
                  value: 'center'
                },
                {
                  option: '居右',
                  value: 'right'
                }
              ],
              setValueKey: 'checkedBarPosStyle'
            }
          ]
        }
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
