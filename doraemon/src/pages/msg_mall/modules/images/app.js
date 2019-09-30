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
      domPlayerParam: {
        loop: true,
        autoPlay: true,
        autoPlayTime: 5000,
        renderPage: 0,
        showGuild: 1,
        data: []
      },
      checkLink (link) {
        let result
        if (link && /index\/\d+$/.test(link)) {
          result = true
        }
        return result
      }
    }
  },
  props: ['param', 'dataSource', 'isSet'],
  created () {
    const param = this.param
    // 内容设置
    let dataContent = param.templateData || []
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
    if (param.templateType == 'banner') {
      for (let c in dataContent) {
        Object.assign(dataContent[c], {
          slot: 's1'
        })
      }
      this.domPlayerParam.data = dataContent
      if (dataContent.length <= 1) {
        this.domPlayerParam.loop = false
      }
      this.domPlayerParam.autoPlayTime = 5000
      if (this.isSet) {
        this.domPlayerParam.autoPlay = false
      }
    }
  },
  methods: Object.assign({
    changeTab (e) {
      if (!this.isSet && e.currentTarget.getAttribute('data-checkedId')) {
        this.param.checkedId = e.currentTarget.getAttribute('data-checkedId')
        e.currentTarget.parentNode.parentNode.scrollLeft = e.currentTarget.offsetLeft - 170
      }
    },
    getTabgoods (item) {
      let data = []
      if (item.checkedId) {
        for (let i in item.templateData) {
          if (item.templateData[i].checkedId == item.checkedId) {
            data = item.templateData[i].goods
          }
        }
      }
      return data
    },
    acCallback (item) {
      let link = item.typeLink || item.goodsLink
      if (!this.isSet && link) {
        window.open(link)
      }
    }
  }, formatAc)
}

export default MImages
