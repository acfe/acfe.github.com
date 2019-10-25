/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../../func/format_style'

const MGroup = {
  components: {
    FcModules
  },
  name: 'MGroup',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      dataContent: [],
      contentList: [],
      titleStyle: {},
      imageFloatStyle: {},
      imageStyle: {},
      descriptionStyle: {},
      clickCallback: () => {}
    }
  },
  props: ['param', 'dataSource', 'isSet', 'refreshContent', 'setSetterContent', 'mid', 'acCallback'],
  created () {
    const param = this.param
    this.clickCallback = this.acCallback || this.clickCallback
    // 内容设置
    let dataContent = []
    switch (param.dataType) {
      case 0:
        if (param.singleDatas && param.singleDatas.data) {
          dataContent = param.singleDatas.data
        }
        break
      case 1:
        let dataSource = this.dataSource || {}
        let imagesDatas = dataSource.images || []
        for (let i in imagesDatas) {
          if (imagesDatas[i].value == param.dataSourceId) {
            dataContent = imagesDatas[i].data
          }
        }
        break
    }
    this.theme = param.theme || 1
    this.dataContent = dataContent
    // 样式设置
    this.titleStyle = this.formatStyle(param.titleStyle || {})
    this.descriptionStyle = this.formatStyle(param.descriptionStyle || {})
    this.imageStyle = this.formatStyle(param.imageStyle || {})
    if (this.imageStyle.float) {
      this.imageFloatStyle.float = this.imageStyle.float
    }
    if (this.imageStyle['text-align']) {
      this.imageFloatStyle['text-align'] = this.imageStyle['text-align']
    }
  },
  methods: Object.assign({

  }, formatAc)
}

export default MGroup
