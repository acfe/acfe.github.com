/*
  1.列表排版
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ezxug65e59.png',
  title: '列表排版',
  config: {
    module: {
      name: '列表排版',
      tag: 'goods',
      theme: 1,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://static.fcbox.com/fcapp/mall/v2a26wfs89j.jpg?imageView2/2/w/240',
            name: '花加悦花 简约混合鲜花（包月4束 一周一束）包邮',
            description: '鲜花订阅，订阅美好',
            salePrice: 10.9,
            originPrice: 20.9
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/93hk17lcfle.jpg?imageView2/2/w/240',
            name: '花加悦花 简约混合鲜花（包月4束 一周一束）包邮',
            description: '一周一花，一月4束。下单即赠花瓶1个',
            salePrice: 49.9,
            originPrice: 50.9
          }
        ]
      },
      cartIconUrl: 'https://common.fcbox.com/cdn/mall/static/images/cart.png',
      showSalePrice: 1,
      showOriginPrice: 1,
      contentPaddingBottom: 20,
      moduleStyle: {
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {
        'padding-bottom': 20,
        'border-bottom-style': 'solid',
        'border-bottom-width': 1,
        'border-bottom-color': '#e5e5e5'
      },
      imageStyle: {
        'padding-right': 10
      },
      nameStyle: {
        'font-size': 16,
        'color': '#333333',
        'line-height': 20,
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 5
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#cccccc',
        'line-height': 16,
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 2
      },
      salePriceStyle: {
        'color': '#F83A61',
        'font-size': 24
      },
      originPriceStyle: {
        'font-size': 16,
        'text-decoration': 'line-through'
      },
      salePriceTagStyle: {},
      originPriceTagStyle: {
        'font-size': 0
      },
      cartIconStyle: {}
    }
  }
}
// content
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
const showLineBSet = {
  type: 'radioTabGroup',
  title: '是否显示底线',
  tag: 'showLineB',
  defaultValue: 0,
  data: [
    {
      option: '是',
      value: 1
    },
    {
      option: '否',
      value: 0
    }
  ]
}
// theme1
const theme1ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme1ItemStyleSetGroup.setList.unshift(showLineBSet)
theme1ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)

const originPriceStyleSet = commonSet.getTextGroupParam('商品原价', 'originPriceStyle')
originPriceStyleSet.setList.unshift({
  type: 'radioTabGroup',
  title: '原价换行显示',
  tag: 'originPriceBreak',
  defaultValue: 0,
  data: [
    {
      option: '换行',
      value: 1
    },
    {
      option: '不换行',
      value: 0
    }
  ]
})
originPriceStyleSet.setList.unshift({
  type: 'radioTabGroup',
  title: '显示原价',
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

const themeSet = {
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
}

export default {
  theme,
  themeSet
}
