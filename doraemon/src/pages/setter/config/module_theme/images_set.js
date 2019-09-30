import commonSet from '../common_set'
const contentSetParam = {
  title: '内容设置',
  type: 'contentGroup',
  setList: [
    {
      type: 'imageGroup',
      title: '图片地址',
      tag: 'url'
    },
    {
      type: 'textareaGroup',
      title: '标题',
      tag: 'title',
      param: {
        placeholder: '请输入标题'
      }
    },
    {
      type: 'textareaGroup',
      title: '描述',
      tag: 'description',
      param: {
        placeholder: '请输入描述'
      }
    },
    {
      type: 'actionGroup',
      tag: 'action'
    }
  ]
}
const contentSetList = JSON.parse(JSON.stringify(commonSet.contentSetList))
contentSetList.push(contentSetParam)
const theme1ItemStyleSetGroup = JSON.parse(JSON.stringify(commonSet.itemStyleSetGroup))
theme1ItemStyleSetGroup.setList.unshift({
  type: 'inputGroup',
  title: '行间距(px)',
  tag: 'contentPaddingBottom',
  param: {
    placeholder: '请输入行间距'
  }
})
const imagesSetTheme = [
  // Banner排版
  {
    theme: 1,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: contentSetList
      },
      {
        title: '样式',
        setType: 'style',
        setList: [
          commonSet.moduleStyleSetGroup,
          theme1ItemStyleSetGroup,
          commonSet.imageStyleSetGroup,
          commonSet.titleStyleGroup,
          commonSet.descriptionStyleGroup
        ]
      }
    ]
  }
]
export default imagesSetTheme
