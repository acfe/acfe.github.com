/* eslint-disable no-undef */
/**
 * Created by 001264 on 2018/7/25.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import FcInput from 'fcbox/form/input'
import FcTextarea from 'fcbox/form/textarea'
import FcSingleSelector from 'fcbox/form/selector/single'
import FcMultipleSelector from 'fcbox/form/selector/multiple'
import FcDatePicker from 'fcbox/form/date_picker'
import FcCheckbox from 'fcbox/form/checkbox'
import FcRadio from 'fcbox/form/radio'
import FcPage from 'fcbox/page'
import FcButton from 'fcbox/form/button'
import FcPop from 'fcbox/pop/pop'
import QiNiuUpload from 'fcbox/upload/qiniu'
import FcTable from 'fcbox/table'
import FcImagePopViewer from 'fcbox/pop/image_pop_viewer'
import FcLazyList from 'fcbox/list/lazy'
import FcLazyDataList from 'fcbox/list/lazy_data'
import FcLocalList from 'fcbox/list/local'
Vue.use(FcInput)
Vue.use(FcSingleSelector)
Vue.use(FcMultipleSelector)
Vue.use(FcDatePicker)
Vue.use(FcCheckbox)
Vue.use(FcRadio)
Vue.use(FcPage)
Vue.use(FcButton)
Vue.use(FcPop)
Vue.use(QiNiuUpload)
Vue.use(FcTable)
Vue.use(FcTextarea)
Vue.use(FcImagePopViewer)
Vue.use(FcLazyList)
Vue.use(FcLazyDataList)
Vue.use(FcLocalList)

const Index = {
  name: 'Index',
  data () {
    return {
      inputParam: {
        placeholder: '请输入内容',
        value: ''
      },
      textareaParam: {
        placeholder: '请输入内容',
        value: ''
      },
      singleSelectorParam: {
        option: '请选择',
        value: '',
        data: [
          {
            option: '选项1',
            value: '1'
          }
        ]
      },
      multipleSelectorParam: {
        itemStyle: {
          width: '100%'
        },
        option: '请选择',
        value: '',
        data: [
          {
            option: '选项1',
            value: '1'
          },
          {
            option: '选项2',
            value: '2'
          }
        ]
      },
      datePickerParam: {
        key: Math.random(),
        value: '',
        format: 'Y-M-D',
        year: '2018',
        month: '1',
        date: '29',
        showAdded: false,
        selectHide: true,
        limitStart: '2017-9-8',
        limitEnd: '2019-2-8',
        limitArr: ['2017-9-9', '2017-9-21', '2017-09-23'],
        placeholder: '请选择日期'
      },
      checkboxParam: {
        option: '请选择',
        value: '',
        data: [
          {
            option: '选项1',
            value: '1'
          },
          {
            option: '选项2',
            value: '2',
            checked: true
          }
        ]
      },
      lazyListParam: {
        loadPage: 2,
        showLoading: true
      },
      lazyDataListParam: {
        loadPage: 2,
        showLoading: true,
        data: []
      },
      localListParam: {
        loadPage: 5,
        data: []
      },
      radioParam: {
        itemStyle: {
          width: '70px'
        },
        value: '2',
        data: [
          {
            option: '选项1',
            value: '1'
          },
          {
            option: '选项2',
            value: '2'
          }
        ]
      },
      pageParam: {
        key: Math.random(),
        pageNum: 5,
        size: 10,
        total: 100,
        currentPage: 1,
        align: 'center',
        showPreAndNext: true,
        showInput: true,
        showCount: true
      },
      FcButtonParam: {
        type: 'default',
        theme: 'cyan'
      },
      popParam: {
        show: false
      },
      uploadParam: {
        value: '',
        del: true,
        limit: {
          width: 510,
          height: 510
        }
      },
      tableParam: {
        theme: 'cyan',
        contentWidth: 0,
        checkType: 'radio',
        titleArr: [
          {
            text: '编号',
            width: '100px'
          },
          {
            text: '名称'
          },
          {
            text: '日期',
            width: '120px'
          },
          {
            text: '创建人',
            width: '100px'
          },
          {
            text: '操作',
            width: '100px'
          }
        ],
        contentArr: [
          [
            '1',
            '名称1',
            '2018-08-16',
            'admin',
            {
              type: 'action',
              text: '修改',
              style: { color: 'green' },
              callback: () => {
                console.log('actionCallback')
              }
            }
          ],
          [
            '2',
            '名称2',
            '2018-08-16',
            'admin',
            {
              type: 'action',
              text: '修改',
              style: { color: 'green' },
              callback: () => {
                console.log('actionCallback')
              }
            }
          ],
          [
            '3',
            {
              type: 'image',
              src: 'http://static.fcbox.com/fcapp/mall/q49rnyw2job.jpg',
              callback: () => {
                window.fc.FcImagePopViewer.show({
                  data: [
                    {
                      url: 'http://static.fcbox.com/fcapp/mall/q49rnyw2job.jpg'
                    }
                  ]
                })
              }
            },
            '2018-08-16',
            'admin',
            '修改'
          ],
          [
            '4',
            { type: 'text', text: 'styleText', style: { color: '#ff0000' } },
            '2018-08-16',
            {
              type: 'link',
              style: { color: 'green' },
              text: 'admin',
              href: 'http://www.fcbox.com',
              target: '_blank'
            },
            [
              {
                type: 'link',
                text: 'href',
                href: 'http://www.fcbox.com',
                target: '_self'
              },
              { type: 'action', text: 'action', callback: () => {} }
            ]
          ]
        ]
      }
    }
  },
  computed: mapState({
    permission: state => state.permission
  }),
  created () {
    for (let i = 0; i < 20; i++) {
      this.lazyDataListParam.data.push({
        slot: 's' + (i % 2),
        name: 'name' + i
      })
    }
    for (let i = 0; i < 2000; i++) {
      this.localListParam.data.push({
        slot: 's' + (i % 2),
        name: 'name' + i
      })
    }
    // this.localListParam.slotsHeight = {
    //   s0: 40,
    //   s1: 60
    // }
    this.lazyDataListParam.callback = (list) => {
      setTimeout(() => {
        let data = []
        for (let i = 0; i < 20; i++) {
          data.push({
            slot: 's' + (i % 2),
            name: 'newData' + i
          })
        }
        list.addData(data)
        list.loadFinish = true
      }, 2000)
    }
  },
  mounted () {
    this.leftScroll = 0
    this.$refs.main.onscroll = (e) => {
      this.$refs.top.scrollLeft = this.$refs.main.scrollLeft
      if (!this.leftScroll) {
        this.$refs.left.scrollTop = this.$refs.main.scrollTop
      }
    }
    this.$refs.left.onscroll = (e) => {
      if (this.leftScroll) {
        this.$refs.main.scrollTop = this.$refs.left.scrollTop
      }
    }
    this.$refs.left.onmouseover = (e) => {
      this.leftScroll = 1
    }
    this.$refs.left.onmouseout = (e) => {
      this.leftScroll = 0
    }
  },
  methods: {
    clickIframe () {
      console.log(888)
    },
    inputCallback (param, type) {
      // console.log(type);
    },
    pageCallback (param) {
      console.log(param)
    },
    closeFramePop () {
      this.popParam.show = false
    },
    showFramePop () {
      this.popParam.show = true
      this.iv = setInterval(() => {
        if (document.activeElement == this.$refs.iframe) {
          console.log(document.activeElement)
          clearInterval(this.iv)
        }
        // this.$refs.iframe.contentWindow.addEventListener('click', () => { alert(1) })
      }, 1000)
    },
    showToast () {
      window.fc.Toast.show({
        text: 'i am a toast',
        time: 1000
      })
    },
    showLoading () {
      window.fc.Loading.show({
        timeOut: 2000
      })
    },
    showAlert () {
      window.fc.Dialog.show({
        title: 'Alert弹窗',
        text: '确定操作吗？',
        confirmText: '确定',
        confirmCallback: () => {
          console.log('alertCallback')
        }
      })
    },
    showConfirm () {
      window.fc.Dialog.show({
        title: 'Confirm弹窗',
        text: '确定操作吗？',
        clearText: '取消',
        showClose: true,
        clearCallback: () => {
          console.log('clearCallback')
        },
        confirmText: '提交',
        confirmCallback: () => {
          console.log('confirmCallback')
        }
      })
    },
    uploadCallback (type, param) {
      console.log(type)
      console.log(param)
    },
    showImagePop (showId) {
      let data = [
        {
          url: '//static.fcbox.com/fcapp/mall/ududs82vska.png',
          thumb: '//static.fcbox.com/fcapp/mall/ududs82vska.png'
        },
        {
          url: '//static.fcbox.com/fcapp/mall/cota3z2p3fl.png',
          thumb: '//static.fcbox.com/fcapp/mall/cota3z2p3fl.png'
        },
        {
          url: '//static.fcbox.com/fcapp/mall/wvd1al8grdr.jpg',
          thumb: '//static.fcbox.com/fcapp/mall/wvd1al8grdr.jpg'
        }
      ]
      window.fc.FcImagePopViewer.show({
        data,
        showId
      })
    }
  }
}

export default Index
