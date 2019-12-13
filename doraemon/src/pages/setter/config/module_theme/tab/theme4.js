/*
  4.立体翻转tab
*/
import commonSet from '../../common_set'

const theme = {
  title: '立体翻转tab',
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/vt5b5pzr9re.png',
  config: {
    module: {
      name: '立体翻转tab',
      tag: 'tab',
      theme: 4,
      guildTheme: 0,
      dataType: 0,
      singleDatas: {
        checkedId: 1,
        data: [
          {
            checkedId: 1,
            name: '测试项'
          }
        ]
      },
      moduleStyle: {},
      barStyle: {
        'border-top-left-radius': 4,
        'border-top-right-radius': 4,
        'border-bottom-left-radius': 4,
        'border-bottom-right-radius': 4,
        'margin-right': 5
      },
      barCheckedStyle: {
        'border-top-left-radius': 4,
        'border-top-right-radius': 4,
        'border-bottom-left-radius': 4,
        'border-bottom-right-radius': 4,
        'margin-right': 5
      }
    }
  }
}
// content
const theme1ContentSetList = [
  {
    type: 'inputGroup',
    title: '模块名称',
    tag: 'name',
    param: {
      placeholder: '请输入模块名称'
    }
  },
  {
    title: '内容设置',
    type: 'contentGroup',
    setList: [
      {
        type: 'textareaGroup',
        title: '名称',
        tag: 'name',
        param: {
          placeholder: '请输入tab名'
        }
      },
      {
        type: 'selectorGroup',
        title: '关联页面',
        tag: 'tabPageId',
        defaultOption: '请选择',
        dataSource: 'tabPage'
      }
    ]
  }
]

const tabSetData = [
  {
    title: '内容',
    setType: 'content',
    setList: theme1ContentSetList
  },
  {
    title: '样式',
    setType: 'style',
    setList: [
      {
        type: 'setGroup',
        title: '模块设置',
        open: false,
        setList: [
          {
            type: 'heightGroup',
            title: '模块高度'
          },
          commonSet.getPaddingParam('模块边距设置', 'moduleStyle'),
          commonSet.getRadiusParam('模块圆角设置', 'moduleStyle'),
          commonSet.getBackgroundParam('模块背景设置', 'moduleStyle'),
          commonSet.getBorderParam('模块边框设置', 'moduleStyle')
        ]
      },
      {
        type: 'setGroup',
        title: '轮播设置',
        setList: [
          {
            type: 'radioTabGroup',
            title: '拖动切页',
            tag: 'drag',
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
          },
          {
            type: 'radioTabGroup',
            title: '显示导航',
            tag: 'showGuild',
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
          },
          {
            type: 'imageTabGroup',
            title: '导航样式',
            tag: 'guildTheme',
            refreshSetter: true,
            defaultValue: 0,
            guildDefaultData: commonSet.guildDefaultData,
            data: commonSet.tabGuildData
          },
          {
            type: 'inputGroup',
            title: '轮播时间(ms)',
            tag: 'autoPlayTime',
            param: {
              placeholder: '请输入时间(毫秒ms)'
            }
          }
        ]
      }
    ]
  }
]

const themeSet = {
  theme: 4,
  setType: 'content',
  data: tabSetData
}

export default {
  theme,
  themeSet
}
