import Vue from 'vue'
import Vuex from 'vuex'


// 引入子模块
import user from './modules/user'
import interview from './modules/interview'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		interview
	},
	plugins: []
})

export default store
