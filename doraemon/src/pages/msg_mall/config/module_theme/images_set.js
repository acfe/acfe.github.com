const imageSetList = [
  {
    type: 'imageGroup',
    title: '图片地址',
    tag: 'url'
  },
  // {
  //   type: 'textareaGroup',
  //   title: '标题',
  //   tag: 'typeTitle',
  //   param: {
  //     placeholder: '请输入标题'
  //   }
  // },
  {
    type: 'textareaGroup',
    title: '链接',
    tag: 'typeLink',
    param: {
      placeholder: '请输入链接'
    }
  }
]

const imagesSetTheme = [
  // Banner排版
  {
    theme: 1,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: [
          {
            title: '内容设置',
            type: 'contentGroup',
            setList: imageSetList
          }
        ]
      }
    ]
  },
  // 多图固定
  {
    theme: 2,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: [
          {
            title: '内容设置',
            type: 'contentGroup',
            hideDel: true,
            hideAdd: true,
            setList: imageSetList
          }
        ]
      }
    ]
  },
  // 公告
  {
    theme: 3,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: [
          {
            title: '内容设置',
            type: 'contentGroup',
            hideDel: true,
            hideAdd: true,
            setList: [
              {
                type: 'textareaGroup',
                title: '公告内容',
                tag: 'typeContent',
                param: {
                  placeholder: '请输入内容'
                }
              },
              {
                type: 'radioTabGroup',
                title: '是否显示',
                tag: 'show',
                defaultValue: 0,
                data: [
                  {
                    option: '显示',
                    value: 1
                  },
                  {
                    option: '不显示',
                    value: 0
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  // 小标题
  {
    theme: 4,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: [
          {
            title: '内容设置',
            type: 'contentGroup',
            hideDel: true,
            hideAdd: true,
            setList: [{
              type: 'textareaGroup',
              title: '标题内容',
              tag: 'typeTitle',
              param: {
                placeholder: '请输入内容'
              }
            }]
          }
        ]
      }
    ]
  },
  // 商品
  {
    theme: 5,
    setType: 'content',
    data: [
      {
        title: '内容',
        setType: 'content',
        setList: [
          {
            title: '内容设置',
            type: 'contentGroup',
            setList: [
              {
                type: 'imageGroup',
                title: '图片地址',
                tag: 'url'
              },
              {
                type: 'inputGroup',
                title: '商品售价',
                tag: 'sellPriceStr',
                param: {
                  placeholder: '请输入售价'
                }
              },
              {
                type: 'inputGroup',
                title: '商品原价',
                tag: 'originalPriceStr',
                param: {
                  placeholder: '请输入原价'
                }
              },
              {
                type: 'textareaGroup',
                title: '商品名称',
                tag: 'goodsTitle',
                param: {
                  placeholder: '请输入名称'
                }
              },
              {
                type: 'textareaGroup',
                title: '商品广告语',
                tag: 'goodsAd',
                param: {
                  placeholder: '请输入广告语'
                }
              },
              {
                type: 'textareaGroup',
                title: '商品链接',
                tag: 'goodsLink',
                param: {
                  placeholder: '请输入链接'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  // 商品tab
  {
    theme: 6,
    setType: 'content',
    data: [
      {
        title: 'tab设置',
        setType: 'content',
        setList: [
          {
            title: 'tab设置',
            type: 'contentGroup',
            setList: [
              {
                type: 'textareaGroup',
                title: 'tab名称',
                tag: 'typeTitle',
                setGoods: 1,
                param: {
                  placeholder: '请输入名称'
                }
              }
            ]
          }
        ]
      }
    ]
  }
]
export default imagesSetTheme
