/*
  16.侧滑轮播-文字内嵌
*/
import commonSet from '../../common_set'

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/b9htt7pkgmc.jpg',
  title: '侧滑轮播-文字内嵌',
  config: {
    module: {
      name: '侧滑轮播-文字内嵌',
      tag: 'images',
      theme: 16,
      dataType: 0,
      singleDatas: {
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/c3crh6bud59.jpg',
            fTitle: '',
            fDescription: '丝巾围巾系法千万种 但这些却解锁时髦'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/srhkyq1liaa.jpg',
            fTitle: '',
            fDescription: '10款大牌眼线评测不容错过'
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/rhakcs9t38.jpg',
            fTitle: '',
            fDescription: '杨幂肖战都在穿的费尔岛毛衣原来这么潮'
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
        'margin-right': 5,
        'background-color': '#f00b7e'
      },
      fContentStyle: {
        bottom: 35
      },
      textMaskImage: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ctx62guuli.png',
      fTitleStyle: {
        'font-size': 18,
        'color': '#fff',
        'line-height': 20,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10
      },
      fDescriptionStyle: {
        'font-size': 16,
        'color': '#fff',
        'line-height': 20,
        'text-align': 'center',
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 10
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
      type: 'textareaGroup',
      title: '标题',
      tag: 'fTitle',
      param: {
        placeholder: '请输入标题'
      }
    },
    {
      type: 'textareaGroup',
      title: '描述',
      tag: 'fDescription',
      param: {
        placeholder: '请输入描述'
      }
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
  theme: 16,
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
              title: '导航样式',
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
        commonSet.fitImageSetGroup,
        {
          type: 'setGroup',
          title: '内容设置',
          open: false,
          setList: [
            {
              type: 'imageGroup',
              title: '文字蒙层背景',
              showTitle: true,
              tag: 'textMaskImage'
            },
            {
              type: 'inputGroup',
              title: '顶部距离px',
              tag: 'top',
              setValueKey: 'fContentStyle',
              param: {
                placeholder: '请输入顶部距离'
              }
            },
            {
              type: 'inputGroup',
              title: '底部距离px',
              tag: 'bottom',
              setValueKey: 'fContentStyle',
              param: {
                placeholder: '请输入底部距离'
              }
            }
          ]
        },
        commonSet.getTextGroupParam('标题', 'fTitleStyle'),
        commonSet.getTextGroupParam('描述', 'fDescriptionStyle')
      ]
    }
  ]
}

export default {
  theme,
  themeSet
}
