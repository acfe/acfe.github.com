export default {
  search: [
    // 搜索框
    {
      url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201909/y7g5rrohne.jpg?imageView2/2/w/240',
      title: '自定义搜索框',
      config: {
        elements: [
          {
            name: '自定义搜索框',
            tag: 'search',
            theme: 1,
            showType: 1,
            showBackIcon: 1,
            showIcon: 1,
            iconWidth: 20,
            backIconWidth: 20,
            iconColor: '#cdcdcd',
            backIconColor: '#cdcdcd',
            placeholder: '请输入关键字',
            searchText: '搜索',
            imageRadius: 24,
            inputTextStyle: {
              color: '#666666',
              'line-height': 20
            },
            searchTextStyle: {
              color: '#666666',
              'font-size': 14,
              'line-height': 20
            },
            searchInputPadding: 20,
            backInputPadding: 20,
            style: {
              width: 240,
              height: 24,
              top: 0,
              left: 0,
              'padding-left': 10,
              'padding-right': 10,
              'padding-top': 5,
              'padding-bottom': 5,
              'background-color': '#f0f2f5'
            }
          }
        ]
      }
    }
  ]
}
