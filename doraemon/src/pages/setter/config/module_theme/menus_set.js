import commonSet from '../common_set'
// theme1
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
const theme1ContentSetList = JSON.parse(JSON.stringify(commonSet.contentSetList))
theme1ContentSetList.push(contentSetParam1)
const theme1ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme1ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
// theme2
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
const theme2ContentSetList = JSON.parse(JSON.stringify(commonSet.contentSetList))
theme2ContentSetList.push(contentSetParam2)
const theme2ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme2ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme2ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
theme2ItemStyleSetGroup.setList.unshift(columNumSet)
const theme3ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme3ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme3ItemStyleSetGroup.setList.unshift(columNumSet)
const menusSetTheme = [
  // 文字菜单
  {
    theme: 1,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: theme1ContentSetList
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
  },
  // 图文菜单
  {
    theme: 2,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: theme2ContentSetList
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
  },
  // 侧滑菜单
  {
    theme: 3,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: theme2ContentSetList
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme3ItemStyleSetGroup,
          commonSet.imageStyleSetGroup,
          commonSet.getTextGroupParam('名称', 'nameStyle'),
          commonSet.getTextGroupParam('名称选中', 'nameCheckedStyle')
        ]
      }
    ]
  },
  // 帮助中心定制tab菜单
  {
    theme: 1001,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: theme1ContentSetList
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme2ItemStyleSetGroup,
          commonSet.getTextGroupParam('名称', 'nameStyle'),
          commonSet.getTextGroupParam('名称选中', 'nameCheckedStyle')
        ]
      }
    ]
  }
]
export default menusSetTheme
