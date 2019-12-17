import commonSet from '../../common_set'
import iconDatas from '../../icon_datas'
const iconTheme = []
for (let i in iconDatas.datas) {
  iconTheme.push({
    title: iconDatas.datas[i].title,
    config: {
      elements: [
        {
          name: iconDatas.datas[i].title,
          svgContent: iconDatas.datas[i].data,
          tag: 'icon',
          theme: 1,
          iconWidth: 32,
          iconColor: '#cdcdcd',
          elementStyle: {
            'width': 32,
            'height': 32,
            'left': 0,
            'top': 0,
            'rotateZ': 0
          }
        }
      ]
    }
  })
}

export default {
  theme: iconTheme,
  themeSet: [
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
        commonSet.actionSetParam,
        commonSet.animationSetParam
      ]
    }
  ]
}
