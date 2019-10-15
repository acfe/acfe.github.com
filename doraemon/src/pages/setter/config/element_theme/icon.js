import iconDatas from '../icon_datas'
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
export default iconTheme
