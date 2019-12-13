/*
  2.多列排版
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/t2moddvo91.png',
  title: '多列排版',
  config: {
    module: {
      name: '多列排版',
      tag: 'goods',
      theme: 2,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://static.fcbox.com/fcapp/mall/iy29juc701.jpg?imageView2/2/w/240',
            name: '美的（Midea）吸尘器家用小型迷你VS04K1-FW 粉红色 包邮',
            description: '羊肉卷200g*5盒 草原嫩羊',
            salePrice: 10.9,
            originPrice: 20.9
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/ejz0nm6bnvo.jpg?imageView2/2/w/240',
            name: 'Bear/小熊  JSQ-A50U1加湿器家用静音卧室大容量',
            description: '安全营养 鲜香美味',
            salePrice: 49.9,
            originPrice: 50.9
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/1r786ddd0j.jpg?imageView2/2/w/240',
            name: '小熊煮蛋器 迷你机蒸蛋器  包邮',
            description: '迷你机蒸蛋器',
            salePrice: 399,
            originPrice: 499
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/vtr5rj865i.jpg?imageView2/2/w/240',
            name: 'Bear/小熊 榨汁机家用榨汁机LLJ-C04E1  包邮',
            description: '榨汁机家用榨汁机',
            salePrice: 39,
            originPrice: 49
          }
        ]
      },
      cartIconUrl: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201911/br0e27wpbmu.jpg',
      contentPaddingRight: 20,
      contentPaddingBottom: 20,
      showSalePrice: 1,
      showOriginPrice: 1,
      columNum: 2,
      moduleStyle: {
        'padding-left': 15,
        'padding-right': 15
      },
      itemStyle: {},
      imageStyle: {},
      nameStyle: {
        'font-size': 16,
        'color': '#333333',
        'line-height': 20,
        'padding-top': 10
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
      cartIconStyle: {
        'width': 20
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
}

export default {
  theme,
  themeSet
}
