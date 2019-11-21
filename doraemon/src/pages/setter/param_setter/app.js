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
      setList: [],
      isTab: false,
      inArr (item, list) {
        let inList = false
        for (let i in list) {
          if (list[i] == item) {
            inList = true
          }
        }
        return inList
      }
    }
  },
  props: ['setterParam', 'setterParamValue', 'setterRefreshContent', 'posRelative', 'zIndex'],
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
    refreshContent () {
      this.setterRefreshContent && this.setterRefreshContent()
    },
    refreshSetter () {
      this.setConfig.setterKey = Math.random()
    },
    getParams () {
      const setterParam = this.setterParam
      let setterParamValue = this.setterParamValue
      const setList = []
      for (let i in setterParam) {
        if (setterParam[i].refreshSetter) {
          setterParam[i].callback = this.refreshSetter
        }
        if (setterParam[i].setValueKey) {
          this.setterParamValue[setterParam[i].setValueKey] = this.setterParamValue[setterParam[i].setValueKey] || {}
          setterParamValue = this.setterParamValue[setterParam[i].setValueKey]
        }
        switch (setterParam[i].type) {
          case 'inputGroup':
          case 'textareaGroup':
          case 'editorGroup':
            setList.push(this.getInputGroupParam(setterParam[i], setterParamValue))
            break
          case 'colorGroup':
            setList.push(this.getColorGroupParam(setterParam[i], setterParamValue))
            break
          case 'radioTabGroup':
          case 'imageTabGroup':
            let { setConfig, contentConfig } = this
            if (setterParam[i].tag == 'lockPosition' && contentConfig.pages[setConfig.setPageId].isTab) {
              break
            }
            setList.push(this.getRadioTabGroupParam(setterParam[i], setterParamValue))
            break
          case 'selectorGroup':
            setList.push(this.getSelectorGroupParam(setterParam[i], setterParamValue))
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
          case 'sliderGroup':
            setList.push(this.getSliderGroupParam(setterParam[i], setterParamValue))
            break
          case 'heightGroup':
            setList.push(this.getHeightGroupParam(setterParam[i], setterParamValue))
            break
          case 'radiusGroup':
            setList.push(this.getRadiusGroupParam(setterParam[i], setterParamValue))
            break
          case 'borderGroup':
            setList.push(this.getBorderGroupParam(setterParam[i], setterParamValue))
            break
          case 'paddingGroup':
            setList.push(this.getPaddingGroupParam(setterParam[i], setterParamValue))
            break
          case 'actionGroup':
            setList.push(this.getActionGroupParam(setterParam[i], setterParamValue))
            break
          case 'animationGroup':
            setList.push(this.getAnimationGroupParam(setterParam[i], setterParamValue))
            break
          case 'contentGroup':
            let setSource
            switch (parseInt(setterParamValue['dataType'])) {
              case 0:
                if (setterParamValue.singleDatas) {
                  setSource = setterParamValue.singleDatas
                }
                break
              case 1:
                if (setterParamValue.dataSourceId) {
                  let dataSource = this.contentConfig.dataSource || {}
                  let datas = dataSource[setterParamValue.tag] || []
                  for (let i in datas) {
                    if (datas[i].value == setterParamValue.dataSourceId) {
                      setSource = datas[i]
                    }
                  }
                }
                break
            }
            if (setterParam[i].tag == 'animations') {
              setterParamValue.animations = setterParamValue.animations || { data: [] }
              setSource = setterParamValue.animations
            }
            if (setSource) {
              setList.push(this.getContentGroupParam(setterParam[i], setterParamValue, setSource))
            }
            break
        }
      }
      this.setList = setList
    }
  }, ParamFunc)
}

export default ParamSetter
