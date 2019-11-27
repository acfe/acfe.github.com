/* eslint-disable no-undef */
/**
 * Created by 001264 on 2018/7/25.
 */
// import Vue from 'vue'
import { mapState } from 'vuex'
import { envConfig } from 'src/common/js/env.config'

const Index = {
  name: 'Index',
  data () {
    return {
      demoList: [
        {
          title: '电商网站首页',
          url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201911/53idim7a15.jpg',
          previewUrl: 'http://common-sit2.fcbox.com/cdn/staticResource/program/app/advice/index.html?id=111#/play',
          tag: 'mall'
        },
        {
          title: '酒类营销长页',
          url: 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201911/fq4onlbq09v.jpg',
          previewUrl: 'http://common-sit2.fcbox.com/cdn/staticResource/program/app/advice/index.html?id=97#/play',
          tag: 'wine'
        }
      ]
    }
  },
  computed: mapState({
    permission: state => state.permission
  }),
  created () {

  },
  mounted () {
    this.createJs('qrcode.min', () => {
      for (let i in this.demoList) {
        this.setQrCode(this.demoList[i], i)
      }
    })
  },
  methods: {
    doEdit (item) {
      window.demoData = window.demoData || {}
      if (window.demoData[item.tag]) {
        this.formatEdit(window.demoData[item.tag])
      } else {
        this.createJs('demo_data/' + item.tag, () => {
          this.formatEdit(window.demoData[item.tag])
        })
      }
    },
    formatEdit (data) {
      sessionStorage.setItem('configContentCatch', JSON.stringify(data))
      location.href = '#/setter'
    },
    hideCode (e) {
      e.currentTarget.style.display = 'none'
    },
    showCode (e) {
      e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].style.display = 'block'
    },
    setQrCode (item, key) {
      new QRCode(this.$refs['qrCode' + key][0], {
        text: item.previewUrl,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    createJs (name, callback) {
      var head = document.getElementsByTagName('head')[0]
      var script = document.createElement('script')
      script.src = envConfig.publicPath + name + '.js'
      head.appendChild(script)
      script.onload = function () {
        callback && callback()
      }
    }
  }
}

export default Index
