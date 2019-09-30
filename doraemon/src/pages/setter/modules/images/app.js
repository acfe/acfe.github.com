/**
 * Created by 001264 on 2017/9/10.
 */
import FcModules from '../module/app.vue'
import formatAc from '../../func/format_style'

const MImages = {
  components: {
    FcModules
  },
  name: 'MImages',
  data () {
    return {
      randKey: Math.random(),
      theme: 1,
      dataContent: [],
      contentPaddingStyle: {},
      itemStyle: {},
      imageFloatStyle: {},
      imageStyle: {},
      titleStyle: {},
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
    this.itemStyle = this.formatStyle(param.itemStyle || {})
    this.imageStyle = this.formatStyle(param.imageStyle || {})
    this.titleStyle = this.formatStyle(param.titleStyle || {})
    this.descriptionStyle = this.formatStyle(param.descriptionStyle || {})
    if (this.imageStyle.float) {
      this.imageFloatStyle.float = this.imageStyle.float
    }
    if (this.imageStyle['text-align']) {
      this.imageFloatStyle['text-align'] = this.imageStyle['text-align']
    }
    if (param.contentPaddingBottom || parseInt(param.contentPaddingBottom) === 0) {
      this.contentPaddingStyle['padding-bottom'] = (parseInt(param.contentPaddingBottom)) + 'px'
    }
    if (param.contentPaddingRight || parseInt(param.contentPaddingRight) === 0) {
      this.contentPaddingStyle['padding-right'] = (parseInt(param.contentPaddingRight)) + 'px'
    }
  },
  methods: Object.assign({

  }, formatAc)
}

export default MImages
