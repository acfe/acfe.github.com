/**
 * Created by 001264 on 2019/10/18.
 */
import Wangeditor from 'wangeditor'

const FcEditor = {
  name: 'FcEditor',
  data () {
    return {}
  },
  props: ['param', 'callback'],
  created () {
    const param = this.param
    param.id = param.id || 'editor' + Math.random().toString().substr(2)
  },
  mounted () {
    const param = this.param
    // 富文本编辑器
    const E = Wangeditor
    const editor = new E('#' + param.id + 'Tool', '#' + param.id + 'Content')
    editor.customConfig.menus = ['undo', 'redo', 'bold', 'italic', 'underline', 'strikeThrough', 'head', 'backColor', 'fontSize', 'foreColor', 'justify', 'table']
    editor.customConfig.colors = ['#000000', '#333333', '#666666', '#cccccc', '#ffffff', '#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
    editor.customConfig.onblur = function (html) {
      html = html || ''
      param.value = html.replace(/(<p><br><\/p>)$/i, '')
      this.callback && this.callback(param, 'focusout')
    }.bind(this)
    editor.create()
    editor.txt.html(param.value || '')
  },
  methods: {
    stopTouchstart (e) {
      e.stopPropagation()
    }
  }
}

export default FcEditor
