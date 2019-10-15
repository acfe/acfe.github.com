import commonSet from '../common_set'
const iconSetTheme = [
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
            type: 'setGroup',
            title: '图标设置',
            open: true,
            setList: [
              {
                type: 'inputGroup',
                title: '图标颜色',
                tag: 'iconColor',
                param: {
                  placeholder: '请输入颜色'
                }
              }
            ]
          },
          commonSet.elementStyleSetGroup,
          {
            type: 'textareaGroup',
            title: '图标内容',
            tag: 'svgContent',
            param: {
              placeholder: '请输入内容'
            }
          }
        ]
      },
      {
        title: '事件',
        setType: 'action',
        setList: [
          {
            type: 'actionGroup',
            tag: 'action'
          }
        ]
      }
    ]
  }
]
export default iconSetTheme
