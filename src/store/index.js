import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   userInfo:JSON.parse(window.localStorage.getItem('userInfo'))
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
      window.localStorage.setItem('userInfo',JSON.stringify(data))
    },
    deleteUserInfo(state){
      state.userInfo = null
      window.localStorage.removeItem('userInfo')
    }
  },
  actions: {
  },
  modules: {
  }
})
