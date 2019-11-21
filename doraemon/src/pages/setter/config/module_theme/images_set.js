import commonSet from '../common_set'
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
      title: '标题',
      tag: 'title',
      param: {
        placeholder: '请输入标题'
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
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
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
const contentSetParam6 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'textareaGroup',
      title: '内容',
      tag: 'title',
      param: {
        placeholder: '请输入文字内容'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetParam7 = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'editorGroup',
      title: '内容',
      tag: 'title',
      param: {
        placeholder: '请输入文字内容'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
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
const contentSetList = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList.push(contentSetParam)
const contentSetList4 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList4.push(contentSetParam4)
const contentSetList6 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList6.push(contentSetParam6)
const contentSetList7 = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList7.push(contentSetParam7)
// theme1
const theme1ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme1ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
// theme2
const theme2ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme2ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme2ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
theme2ItemStyleSetGroup.setList.unshift(columNumSet)
// theme3
const theme3ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme3ItemStyleSetGroup.setList.unshift(contentPaddingRightSet)
theme3ItemStyleSetGroup.setList.unshift(columNumSet)
// theme5
const theme5ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme5ItemStyleSetGroup.setList.unshift(contentPaddingBottomSet)
const imagesSetTheme = [
  // 空模块
  {
    theme: 9999,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: [
          {
            type: 'inputGroup',
            title: '模块名称',
            tag: 'name',
            param: {
              placeholder: '请输入模块名称'
            }
          }
        ]
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup
        ]
      }
    ]
  },
  // Banner排版
  {
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
          theme1ItemStyleSetGroup,
          commonSet.imageStyleSetGroup,
          commonSet.titleStyleGroup,
          commonSet.descriptionStyleGroup
        ]
      }
    ]
  },
  // 多列排版
  {
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
          theme2ItemStyleSetGroup,
          commonSet.imageStyleSetGroup,
          commonSet.titleStyleGroup,
          commonSet.descriptionStyleGroup
        ]
      }
    ]
  },
  // 横向滚动
  {
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
          theme3ItemStyleSetGroup,
          commonSet.imageStyleSetGroup,
          commonSet.titleStyleGroup,
          commonSet.descriptionStyleGroup
        ]
      }
    ]
  },
  // 侧滑轮播
  {
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
          },
          commonSet.imageStyleSetGroup
        ]
      }
    ]
  },
  // 图片模块
  {
    theme: 5,
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
          theme5ItemStyleSetGroup,
          commonSet.imageStyleSetGroup
        ]
      }
    ]
  },
  // 文字模块
  {
    theme: 6,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList6
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme5ItemStyleSetGroup,
          Object.assign(commonSet.titleStyleGroup, { title: '文字内容样式设置' })
        ]
      }
    ]
  },
  // 富文本模块
  {
    theme: 7,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList7
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme5ItemStyleSetGroup,
          Object.assign(commonSet.titleStyleGroup, { title: '文字内容样式设置' })
        ]
      }
    ]
  }
]
export default imagesSetTheme
