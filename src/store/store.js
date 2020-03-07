import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 存储数据的对象
const state = {
  username: 'jackrose'
}

// 操作state中数据的函数集合
const mutations = {
  setUsername (state, name) {
    state.username = name
  },
  getUsername (state) {
    console.log('~~~~~~~~~')
    console.log(state)
    return state.username
  }
}

// 触发mutations中函数的处理函数
const actions = {
  setUserNameAction: ({commit}, name) => {
    commit('setUsername', name)
  },
  getUserNameAction: ({commit}) => {
    commit('getUsername')
  }
}
const getters = {
  getUserName: (state) => {
    return state.username
  }
}

export default new Vuex.Store({
//   strict: true,
  state,
  getters,
  actions,
  mutations
})
