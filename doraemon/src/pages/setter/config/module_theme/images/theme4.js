/*
  4.侧滑轮播
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://static.fcbox.com/fcapp/mall/lx9j545dyi.jpg',
  title: '侧滑轮播',
  config: {
    module: {
      name: '侧滑轮播',
      tag: 'images',
      theme: 4,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://static.fcbox.com/fcapp/mall/lx9j545dyi.jpg'
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/gjpw0cd0shf.jpg'
          },
          {
            url: 'http://static.fcbox.com/fcapp/mall/6x36vr5h5tg.jpg'
          }
        ]
      },
      loop: 1,
      showGuild: 1,
      guildTheme: 3,
      autoPlayTime: 5000,
      moduleStyle: {},
      itemStyle: {},
      imageStyle: {},
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
const contentSetParam4 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'imageGroup',
      title: '图片地址',
      tag: 'url'
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList4 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList4.push(contentSetParam4)

const themeSet = {
  theme: 4,
  setType: 'content',
  data: [
    {
      title: '内容',
      setType: 'content',
      setList: contentSetList4
    },
    {
      title: '样式',
      setType: 'style',
      setList: [
        commonSet.moduleStyleSetGroup,
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
              type: 'inputGroup',
              title: '轮播时间(ms)',
              tag: 'autoPlayTime',
              param: {
                placeholder: '请输入时间(毫秒ms)'
              }
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
              title: '导航选择',
              tag: 'guildTheme',
              defaultValue: 0,
              guildDefaultData: commonSet.guildDefaultData,
              data: commonSet.tabGuildData
            },
            {
              type: 'setGroup',
              title: '导航样式',
              isSub: true,
              setList: [
                {
                  type: 'radioTabGroup',
                  title: '导航对齐',
                  tag: 'text-align',
                  defaultValue: 'center',
                  setValueKey: 'barContainerStyle',
                  data: [
                    {
                      option: '靠左',
                      value: 'left'
                    },
                    {
                      option: '居中',
                      value: 'center'
                    },
                    {
                      option: '靠右',
                      value: 'right'
                    }
                  ]
                },
                {
                  type: 'inputGroup',
                  title: '底部边距(px)',
                  tag: 'bottom',
                  setValueKey: 'barContainerStyle',
                  param: {
                    placeholder: '导航距离底部边距'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '左边距(px)',
                  tag: 'padding-left',
                  setValueKey: 'barContainerStyle',
                  param: {
                    placeholder: '导航左边距'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '右边距(px)',
                  tag: 'padding-right',
                  setValueKey: 'barContainerStyle',
                  param: {
                    placeholder: '导航右边距'
                  }
                },
                {
                  type: 'colorGroup',
                  title: '背景色',
                  tag: 'background-color',
                  setValueKey: 'barStyle',
                  param: {
                    placeholder: '导航右边距'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '宽度(px)',
                  tag: 'width',
                  setValueKey: 'barStyle',
                  param: {
                    placeholder: '请输入宽度'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '高度(px)',
                  tag: 'height',
                  setValueKey: 'barStyle',
                  param: {
                    placeholder: '请输入高度'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '导航间距px',
                  tag: 'margin-right',
                  setValueKey: 'barStyle',
                  param: {
                    placeholder: '请输入导航间距'
                  }
                },
                commonSet.getRadiusParam('圆角设置', 'barStyle'),
                commonSet.getBorderParam('边框设置', 'barStyle')
              ]
            },
            {
              type: 'setGroup',
              title: '导航选中样式',
              isSub: true,
              setList: [
                {
                  type: 'colorGroup',
                  title: '背景色',
                  tag: 'background-color',
                  setValueKey: 'barCheckedStyle',
                  param: {
                    placeholder: '导航右边距'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '宽度(px)',
                  tag: 'width',
                  setValueKey: 'barCheckedStyle',
                  param: {
                    placeholder: '请输入宽度'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '高度(px)',
                  tag: 'height',
                  setValueKey: 'barCheckedStyle',
                  param: {
                    placeholder: '请输入高度'
                  }
                },
                {
                  type: 'inputGroup',
                  title: '导航间距px',
                  tag: 'margin-right',
                  setValueKey: 'barCheckedStyle',
                  param: {
                    placeholder: '请输入导航间距'
                  }
                },
                commonSet.getRadiusParam('圆角设置', 'barCheckedStyle'),
                commonSet.getBorderParam('边框设置', 'barCheckedStyle')
              ]
            }
          ]
        },
        commonSet.fitImageSetGroup
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
