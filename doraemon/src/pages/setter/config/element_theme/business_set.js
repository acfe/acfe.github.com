import commonSet from '../common_set'
const businessSetTheme = [
  {
    theme: 1,
    setType: 'style',
    data: [
      {
        title: '样式',
        setType: 'style',
        setList: [
          {
            type: 'inputGroup',
            title: '元素名称',
            tag: 'name',
            param: {
              placeholder: '请输入名称'
            }
          },
          {
            type: 'textareaGroup',
            title: '提示文字',
            tag: 'placeholder',
            param: {
              placeholder: '请输入提示文字'
            }
          },
          {
            type: 'textareaGroup',
            title: '默认值',
            tag: 'defaultValue',
            param: {
              placeholder: '请输入默认值'
            }
          },
          {
            type: 'setGroup',
            title: '搜索按钮',
            open: true,
            setList: [
              {
                type: 'colorGroup',
                title: '背景颜色',
                tag: 'background',
                param: {
                  placeholder: '请输入颜色(#fff000)'
                },
                setValueKey: 'btnStyle'
              },
              Object.assign(commonSet.getTextGroupParam('搜索按钮文字', 'btnStyle'), { isSub: true })
            ]
          },
          commonSet.elementStyleSetGroup
        ]
      },
      {
        title: '动画',
        setType: 'animation',
        setList: [
          {
            type: 'inputGroup',
            title: '整体播放次数',
            tag: 'animationRepeat',
            param: {
              placeholder: '无限循环请输入0'
            }
          },
          {
            title: '动画设置',
            type: 'contentGroup',
            tag: 'animations',
            setList: [
              {
                type: 'animationGroup'
              }
            ]
          }
        ]
      }
    ]
  }
]
export default businessSetTheme
