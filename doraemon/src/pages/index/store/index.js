/**
 * Created by 001264 on 2017/6/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'

import com from 'src/common/js/com.js'
import config from 'src/common/js/config.js'

import entryState from 'src/common/store/state'
import entryMutations from 'src/common/store/mutations'
import entryActions from 'src/common/store/actions'
Vue.use(Vuex)
state.com = com
state.config = config

Object.assign(state, entryState)
Object.assign(mutations, entryMutations)
Object.assign(actions, entryActions)

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})

export default store
