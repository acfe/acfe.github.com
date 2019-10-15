import commonSet from '../common_set'
const contentSetParam = {
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
      title: '商品名称',
      tag: 'name',
      param: {
        placeholder: '请输入商品名称'
      }
    },
    {
      type: 'textareaGroup',
      title: '描述',
      tag: 'description',
      param: {
        placeholder: '请输入描述'
      }
    },
    {
      type: 'textareaGroup',
      title: '售价',
      tag: 'salePrice',
      param: {
        placeholder: '请输入售价'
      }
    },
    {
      type: 'textareaGroup',
      title: '原价',
      tag: 'originPrice',
      param: {
        placeholder: '请输入原价'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList.push(contentSetParam)
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
// theme1
const theme1ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme1ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
// theme2
const theme2ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme2ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme2ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
theme2ItemStyleSetGroup.setList.unshift(columNumSet)
// theme3
const theme3ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme3ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme3ItemStyleSetGroup.setList.unshift(columNumSet)

const salePriceStyleSet = commonSet.getTextGroupParam('商品售价', 'salePriceStyle')
salePriceStyleSet.setList.unshift({
  type: 'radioTabGroup',
  title: '显示售价',
  tag: 'showSalePrice',
  defaultValue: 0,
  data: [
    {
      option: '显示',
      value: 1
    },
    {
      option: '不显示',
      value: 0
    }
  ]
})
const originPriceStyleSet = commonSet.getTextGroupParam('商品原价', 'originPriceStyle')
originPriceStyleSet.setList.unshift({
  type: 'radioTabGroup',
  title: '显示售价',
  tag: 'showOriginPrice',
  defaultValue: 0,
  data: [
    {
      option: '显示',
      value: 1
    },
    {
      option: '不显示',
      value: 0
    }
  ]
})
const styleSetList = [
  commonSet.imageStyleSetGroup,
  commonSet.getTextGroupParam('商品名称', 'nameStyle'),
  commonSet.descriptionStyleGroup,
  salePriceStyleSet,
  commonSet.getTextGroupParam('售价符号', 'salePriceTagStyle'),
  originPriceStyleSet,
  commonSet.getTextGroupParam('原价符号', 'originPriceTagStyle'),
  {
    type: 'setGroup',
    title: '购物车图标',
    setList: [
      {
        type: 'imageGroup',
        title: '图片地址',
        tag: 'cartIconUrl'
      },
      {
        type: 'inputGroup',
        title: '图标宽度',
        tag: 'width',
        setValueKey: 'cartIconStyle'
      },
      {
        type: 'inputGroup',
        title: '右边距',
        tag: 'right',
        setValueKey: 'cartIconStyle'
      },
      {
        type: 'inputGroup',
        title: '底边距',
        tag: 'bottom',
        setValueKey: 'cartIconStyle'
      }
    ]
  }
]
const imagesSetTheme = [
  // Banner排版
  {
    theme: 1,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme1ItemStyleSetGroup
        ].concat(styleSetList)
      }
    ]
  },
  // 多列排版
  {
    theme: 2,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme2ItemStyleSetGroup
        ].concat(styleSetList)
      }
    ]
  },
  // 横向滚动
  {
    theme: 3,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme3ItemStyleSetGroup
        ].concat(styleSetList)
      }
    ]
  }
]
export default imagesSetTheme
