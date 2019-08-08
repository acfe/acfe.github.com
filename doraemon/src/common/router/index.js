/**
 * Created by 001264 on 2018/7/25.
 */
import Vue from 'vue'
import { mapState } from 'vuex'
import Loading from 'fcbox/pop/loading'
import Toast from 'fcbox/pop/toast'
import FcTreeMenu from 'fcbox/tree/menu'
import FcDialog from 'fcbox/pop/dialog'
Vue.use(Loading)
Vue.use(Toast)
Vue.use(FcTreeMenu)
Vue.use(FcDialog)

const Router = {
  name: 'Router',
  computed: mapState({
    userInfo: (state) => state.userInfo,
    menu: (state) => state.menu
  }),
  created () {

  },
  mounted () {
    this.$store.state.Router = this
  },
  methods: {
    logout () {
      window.fc.Dialog.show({
        title: '提示',
        text: '确定退出登录吗？',
        clearText: '取消',
        confirmText: '确定',
        confirmCallback: () => {
          // this.$store.dispatch('logout')
        }
      })
    }
  }
}

export default Router
