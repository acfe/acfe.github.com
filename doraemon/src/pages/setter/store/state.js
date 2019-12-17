import moduleTheme from '../config/module_theme'
import elementTheme from '../config/element_theme'
import pageSetParam from '../config/page_set'
import popSetParam from '../config/pop_set'
import bodySetParam from '../config/body_set'
import popTheme from '../config/pop_theme'
import pageTheme from '../config/page_theme'

module.exports = {
  title: 'doraemon',
  setConfig: {
    bodySetParam,
    pageSetParam,
    popSetParam,
    popTheme,
    pageTheme,
    moduleTheme,
    moduleThemeSet: moduleTheme.set,
    elementTheme,
    elementThemeSet: elementTheme.set,
    setPageId: 0,
    setModuleId: 0,
    setElementId: 0,
    setPopId: 0,
    setterParam: {},
    setterParamValue: {},
    setterKey: Math.random(),
    showSetterPop: false,
    showElementPop: false,
    setType: 'page',
    mainOrderSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'mainSetter',
      content: []
    },
    elementWindowSetterParam: {
      key: Math.random(),
      hideAdd: true,
      hideDel: true,
      scrollId: 'elementWindowSetter',
      borderStyle: '1px dashed #64B5F6',
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
    body: {
      style: {
        'background-color': '#fff'
      }
    },
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
