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
        }
      ]
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
          title: '按钮宽度px',
          tag: 'toTopIconWidth',
          param: {
            placeholder: '请输入按钮宽度'
          }
        },
        {
          type: 'inputGroup',
          title: '底部距离px',
          tag: 'toTopIconBottom',
          param: {
            placeholder: '按钮距底部距离'
          }
        }
      ]
    },
    {
      type: 'setGroup',
      title: '音乐设置',
      open: false,
      setList: [
        {
          type: 'imageGroup',
          title: '音乐图标',
          showTitle: 1,
          tag: 'musicIcon'
        },
        {
          type: 'textareaGroup',
          title: '音乐地址',
          tag: 'music',
          param: {
            placeholder: '请输入音乐地址'
          }
        },
        {
          type: 'radioTabGroup',
          title: '是否自动播放',
          tag: 'autoplay',
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
          type: 'inputGroup',
          title: '顶部距离px',
          tag: 'top',
          param: {
            placeholder: '请输入顶部距离'
          },
          setValueKey: 'musicStyle'
        },
        {
          type: 'inputGroup',
          title: '右边距离px',
          tag: 'right',
          param: {
            placeholder: '请输入右边距离'
          },
          setValueKey: 'musicStyle'
        },
        {
          type: 'sliderGroup',
          title: '透明度',
          tag: 'opacity',
          defaultValue: 80,
          param: {
            placeholder: '请输入透明度'
          },
          setValueKey: 'musicStyle'
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
