import commonSet from '../common_set'
// theme1
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
const tabSetTheme = [
  // 空白tab
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
          {
            type: 'setGroup',
            title: '模块设置',
            open: true,
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
          }
        ]
      }
    ]
  },
  // 横向侧滑tab
  {
    theme: 2,
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
          {
            type: 'setGroup',
            title: '模块设置',
            open: true,
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
                title: '循环播放',
                tag: 'loop',
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
                data: [
                  {
                    url: 'http://consumerapp-1251779293.file.myqcloud.com/discovery/201911/wy9typ5ar8d.jpg',
                    value: 0
                  },
                  {
                    url: 'http://consumerapp-1251779293.file.myqcloud.com/discovery/201911/46jn1elny0b.jpg',
                    value: 1
                  },
                  {
                    url: 'http://consumerapp-1251779293.file.myqcloud.com/discovery/201911/cue4dupptjg.jpg',
                    value: 2
                  },
                  {
                    url: 'http://consumerapp-1251779293.file.myqcloud.com/discovery/201911/sv9d59oo4yh.jpg',
                    value: 3
                  }
                ]
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
  }
]
export default tabSetTheme
