import moduleTheme from '../config/module_theme'
import moduleThemeSet from '../config/module_theme/set'

module.exports = {
  title: 'doraemon',
  setConfig: {
    moduleTheme,
    moduleThemeSet,
    setPageId: 0,
    setModuleId: 0,
    setPopId: 0,
    setterParam: {},
    setterParamValue: {},
    setterKey: Math.random(),
    showSetterPop: false,
    setType: 'page',
    mainOrderSetterParam: {
      key: Math.random(),
      hideAdd: true,
      scrollId: 'mainSetter',
      content: []
    },
    goodsSetParam: [
      {
        title: 'Tab商品设置',
        type: 'contentGroup',
        scrollId: 'goodsContentSetter',
        setList: [
          {
            type: 'imageGroup',
            title: '图片地址',
            static: 1,
            tag: 'url'
          },
          {
            type: 'inputGroup',
            title: '商品售价',
            tag: 'sellPriceStr',
            static: 1,
            param: {
              placeholder: '请输入售价'
            }
          },
          {
            type: 'inputGroup',
            title: '商品原价',
            tag: 'originalPriceStr',
            static: 1,
            param: {
              placeholder: '请输入原价'
            }
          },
          {
            type: 'textareaGroup',
            title: '商品名称',
            tag: 'goodsTitle',
            static: 1,
            param: {
              placeholder: '请输入名称'
            }
          },
          {
            type: 'textareaGroup',
            title: '商品广告语',
            tag: 'goodsAd',
            static: 1,
            param: {
              placeholder: '请输入广告语'
            }
          },
          {
            type: 'textareaGroup',
            title: '商品链接',
            tag: 'goodsLink',
            static: 1,
            param: {
              placeholder: '请输入链接'
            }
          }
        ]
      }
    ],
    goodsSetParamValue: {},
    goodsPopKey: Math.random(),
    showGoodsPop: false
  },
  contentConfig: {
    pages: [
      {
        id: 1,
        name: '页面',
        content: [{
          tag: 'images',
          theme: 3,
          hideDel: 1,
          templateType: 'noticeBoard',
          templateData: [
            {
              typeContent: '这里是公告内容'
            }
          ]
        }]
      }
    ]
  }
}
