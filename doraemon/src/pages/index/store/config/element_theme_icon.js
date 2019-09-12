import iconDatas from './icon_datas'
let iconTheme = {
  icon: []
}

for (let i in iconDatas.datas) {
  iconTheme.icon.push({
    config: {
      elements: [
        {
          name: iconDatas.datas[i].title,
          tag: 'icon',
          theme: 1,
          style: {
            width: 32,
            height: 32,
            left: 0,
            top: 0
          },
          svgContent: iconDatas.datas[i].data
        }
      ]
    }
  })
}

export default iconTheme
