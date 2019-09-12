const imagesTheme = [
  // Banner排版
  {
    url: 'http://static.fcbox.com/fcapp/mall/64gvy412zcq.jpg?imageView2/2/w/240',
    title: 'Banner排版',
    config: {
      module: {
        name: 'Banner排版',
        tag: 'images',
        theme: 1,
        dataType: 0,
        singleDatas: {
          data: [
            {
              url: 'http://static.fcbox.com/fcapp/mall/64gvy412zcq.jpg',
              title: '图片1',
              description: '描述1'
            }
          ]
        },
        contentPaddingBottom: 10,
        moduleStyle: {},
        itemStyle: {},
        imageStyle: {},
        titleStyle: {
          'font-size': 14,
          'color': '#333333',
          'line-height': 16,
          'padding-left': 10,
          'padding-right': 10,
          'padding-top': 5
        },
        descriptionStyle: {
          'font-size': 12,
          'color': '#cccccc',
          'line-height': 16,
          'padding-left': 10,
          'padding-right': 10,
          'padding-top': 2
        }
      }
    }
  }
]
export default imagesTheme
