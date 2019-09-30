/**
 * Created by 001264 on 2019/9/10.
 */
import ParamFunc from '../func/param_func'
import { mapState } from 'vuex'

const ParamSetter = {
  name: 'ParamSetter',
  data () {
    return {
      randKey: Math.random(),
      setList: []
    }
  },
  props: ['setterParam', 'setterParamValue', 'setterRefreshContent', 'posRelative'],
  computed: mapState({
    setConfig: state => state.setConfig,
    contentConfig: state => state.contentConfig
  }),
  created () {
    this.getParams()
  },
  mounted () {

  },
  methods: Object.assign({
    setTabGoods (setterParamValue) {
      this.setConfig.goodsSetParamValue = setterParamValue
      this.setConfig.showGoodsPop = true
    },
    refreshContent () {
      this.setterRefreshContent && this.setterRefreshContent()
    },
    refreshSetter () {
      this.setConfig.setterKey = Math.random()
    },
    getParams () {
      const setterParam = this.setterParam
      let setterParamValue = this.setterParamValue
      if (setterParam.setValueKey && setterParamValue[setterParam.setValueKey]) {
        setterParamValue = setterParamValue[setterParam.setValueKey]
      }
      const setList = []
      for (let i in setterParam) {
        if (setterParam[i].refreshSetter) {
          setterParam[i].callback = this.refreshSetter
        }
        switch (setterParam[i].type) {
          case 'inputGroup':
          case 'textareaGroup':
            setList.push(this.getInputGroupParam(setterParam[i], setterParamValue))
            break
          case 'radioTabGroup':
            setList.push(this.getRadioTabGroupParam(setterParam[i], setterParamValue))
            break
          case 'dataSourceGroup':
            setList.push(this.getDataSourceGroupParam(setterParam[i], setterParamValue))
            break
          case 'setGroup':
            setList.push(this.getSetGroupParam(setterParam[i]))
            break
          case 'imageGroup':
            setList.push(this.getImageGroupParam(setterParam[i], setterParamValue))
            break
          case 'contentGroup':
            setList.push(this.getContentGroupParam(setterParam[i], setterParamValue))
            break
        }
      }
      this.setList = setList
    }
  }, ParamFunc)
}

export default ParamSetter
