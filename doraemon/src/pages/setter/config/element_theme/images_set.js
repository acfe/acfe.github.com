import commonSet from '../common_set'
const imageSetTheme = [
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
            title: '图片设置',
            open: true,
            setList: [
              {
                type: 'imageGroup',
                tag: 'url'
              },
              Object.assign(commonSet.getRadiusParam('图片圆角设置', 'imageStyle'), { open: false }),
              Object.assign(commonSet.getBorderParam('图片边框设置', 'imageStyle'), { open: false })
            ]
          },
          commonSet.elementStyleSetGroup
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
export default imageSetTheme
