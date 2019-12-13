import imagesTheme from './images/'
import menusTheme from './menus/'
import goodsTheme from './goods/'
import tabTheme from './tab/'
import groupTheme from './group/'
export default {
  showList: 'imagesTheme',
  data: [
    {
      title: '图文',
      tag: 'imagesTheme',
      data: imagesTheme.theme
    },
    {
      title: '菜单',
      tag: 'menusTheme',
      data: menusTheme.theme
    },
    {
      title: '商品',
      tag: 'goodsTheme',
      data: goodsTheme.theme
    },
    {
      title: 'Tab',
      tag: 'tabTheme',
      data: tabTheme.theme
    },
    {
      title: '定制',
      tag: 'groupTheme',
      data: groupTheme.theme
    }
  ],
  set: {
    images: imagesTheme.themeSet,
    menus: menusTheme.themeSet,
    goods: goodsTheme.themeSet,
    tab: tabTheme.themeSet,
    group: groupTheme.themeSet
  }
}
