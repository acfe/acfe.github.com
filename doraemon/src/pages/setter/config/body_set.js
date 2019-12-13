import commonSet from './common_set'
const bodySetParam = {
  setList: [
    {
      type: 'setGroup',
      title: '全局属性设置',
      open: true,
      setList: [
        {
          type: 'selectorGroup',
          title: '内容类型',
          tag: 'showType',
          data: [
            {
              option: '首页',
              value: '首页'
            },
            {
              option: '专题',
              value: '专题'
            },
            {
              option: '帖子',
              value: '帖子'
            }
          ],
          defaultOption: '帖子',
          defaultValue: '帖子',
          optionObj: {
            '首页': '首页',
            '专题': '专题',
            '帖子': '帖子'
          }
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
          title: '小标题',
          tag: 'adviceSubheading',
          param: {
            placeholder: '请输入小标题'
          }
        },
        {
          type: 'imageGroup',
          title: '分享缩略图',
          showTitle: 1,
          tag: 'shareImage'
        },
        {
          type: 'textareaGroup',
          title: '关键字',
          tag: 'keyword',
          param: {
            placeholder: '请输入关键字'
          }
        },
        {
          type: 'setGroup',
          title: '返回顶部按钮',
          open: false,
          setList: [
            {
              type: 'radioTabGroup',
              title: '是否显示返回顶部按钮',
              tag: 'showToTopBtn',
              defaultValue: 0,
              data: [
                {
                  option: '是',
                  value: 1
                },
                {
                  option: '否',
                  value: 0
                }
              ]
            },
            {
              type: 'imageGroup',
              title: '按钮图片',
              tag: 'toTopIconUrl'
            },
            {
              type: 'inputGroup',
              title: '按钮宽度',
              tag: 'toTopIconWidth',
              param: {
                placeholder: '请输入按钮宽度'
              }
            }
          ]
        }
      ]
    },
    Object.assign(commonSet.getBackgroundParam('文档背景设置', 'style'), {
      isSub: false,
      open: false
    })
  ]
}
export default bodySetParam
