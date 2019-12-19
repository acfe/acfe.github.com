import imageTheme from './image/'
import textTheme from './text/'
import iconTheme from './icon/'
import businessTheme from './business/'
export default {
  showList: 'imageTheme',
  data: [
    {
      title: '图片',
      tag: 'imageTheme',
      data: imageTheme.theme
    },
    {
      title: '文字',
      tag: 'textTheme',
      data: textTheme.theme
    },
    {
      title: '图标',
      tag: 'iconTheme',
      data: iconTheme.theme
    },
    {
      title: '功能',
      tag: 'businessTheme',
      data: businessTheme.theme
    }
  ],
  set: {
    image: imageTheme.themeSet,
    text: textTheme.themeSet,
    icon: iconTheme.themeSet,
    business: businessTheme.themeSet
  }
}
