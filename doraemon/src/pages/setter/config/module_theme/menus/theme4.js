/*
  2.图文菜单-状态切换
*/

const theme = {
  url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/guzz56bnuzd.png',
  title: '图文菜单-状态切换',
  config: {
    module: {
      name: '图文菜单-状态切换',
      tag: 'menus',
      theme: 2,
      dataType: 0,
      singleDatas: {
        checkedId: 1,
        data: [
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/fq22uq3y78j.png',
            checkedUrl: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/jfevfnfmdao.png',
            name: '首页',
            checkedId: 1
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ale0hgc72l.png',
            checkedUrl: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/ypy0hl5py7p.png',
            name: '购物车',
            checkedId: 2
          },
          {
            url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/3qutlr9npev.png',
            checkedUrl: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/gs3hl3dgyev.png',
            name: '个人中心',
            checkedId: 3
          }
        ]
      },
      contentPaddingRight: 10,
      columNum: 3,
      moduleStyle: {
        'padding-left': 10,
        'padding-right': 10,
        'padding-top': 10,
        'padding-bottom': 10
      },
      itemStyle: {},
      imageStyle: {
        'width': 32
      },
      nameStyle: {
        'font-size': 12,
        'color': '#666',
        'line-height': 16,
        'text-align': 'center',
        'padding-top': 2
      },
      nameCheckedStyle: {
        'font-size': 12,
        'color': '#F83A61',
        'text-align': 'center'
      }
    }
  }
}

export default {
  theme
}
