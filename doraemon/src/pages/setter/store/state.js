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
      hideDel: true,
      scrollId: 'mainSetter',
      content: []
    },
    pageListOrderSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'pageListOrderSetter',
      borderStyle: '1px dashed #64B5F6',
      content: []
    },
    popListOrderSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'popListOrderSetter',
      borderStyle: '1px dashed #64B5F6',
      content: []
    }
  },
  contentConfig: {
    pages: [
      {
        id: 1,
        name: '页面1',
        content: []
      }
    ],
    pops: [
      {
        id: 1,
        name: '弹窗1',
        elements: []
      }
    ]
  }
}
