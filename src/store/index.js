import Vue from 'vue'
import Vuex from 'vuex'
import created from './modules/created'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        code: '',
        userId:''
    },
    mutations: {
        setFoodmatchType (state, paylod) {
            state.code = paylod
        },
        setUserId (state, paylod) {
            state.userId = paylod
        },
    },
    modules: {
        created
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})
export default store
