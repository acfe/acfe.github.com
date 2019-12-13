/*
  3.横向滚动
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/mcyha53aekc.png',
  title: '横向滚动',
  config: {
    module: {
      name: '横向滚动',
      tag: 'goods',
      theme: 3,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://static.fcbox.com/fcapp/mall/ptx5ekfkzpq.jpg?imageView2/2/w/240',
            name: '大希地 好大力牛肉丸108g*10袋 潮汕风味 千百次敲击 筋道Q弹 顺丰包邮',
            description: '安全营养 鲜香美味',
            salePrice: 10.9,
            originPrice: 20.9
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/nxhzira54q.png?imageView2/2/w/240',
            name: '早康冻干鲜枸杞 宁夏中宁枸杞鲜果60g*2袋 独立小包装 超值实惠 包邮',
            description: '早康冻干鲜枸杞',
            salePrice: 49.9,
            originPrice: 50.9
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/uq9vx9o79q.png?imageView2/2/w/240',
            name: '早康野生蓝莓原浆30ml*10支 大兴安岭原生态种植基地 富含花青素 营养丰富 包邮',
            description: '大兴安岭原生态种植基地',
            salePrice: 399,
            originPrice: 499
          }
        ]
      },
      contentPaddingRight: 15,
      columNum: 2.5,
      cartIconUrl: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201911/br0e27wpbmu.jpg',
      showSalePrice: 1,
      showOriginPrice: 1,
      moduleStyle: {
        'padding-left': 15,
        'padding-right': 15,
        'padding-bottom': 15
      },
      itemStyle: {},
      imageStyle: {
        'height': 120
      },
      nameStyle: {
        'font-size': 14,
        'color': '#333333',
        'line-height': 20,
        'padding-top': 5
      },
      descriptionStyle: {
        'font-size': 12,
        'color': '#cccccc',
        'line-height': 16,
        'padding-top': 2
      },
      salePriceStyle: {
        'color': '#F83A61',
        'padding-top': 10,
        'font-size': 16
      },
      originPriceStyle: {
        'font-size': 12,
        'text-decoration': 'line-through'
      },
      salePriceTagStyle: {},
      originPriceTagStyle: {
        'font-size': 0
      },
      cartIconStyle: {
        'width': 20,
        'right': 20
      }
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
  commonSet.fitImageSetGroup,
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

export default {
  theme,
  themeSet
}
