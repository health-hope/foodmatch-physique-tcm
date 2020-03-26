const created = {
	namespaced: true, // 开启命名空间
	state: {
		resultType: '',  // 证候结果类型
		isCreated: '',		// 是否重新生成 1：重新生成
		imageUrls: [],		// 食物参照量
		dayLength: 0,		// 配餐天数
	},
	actions: {
	},
	mutations: {
		setCreated(state, payload){
            state.isCreated = payload
		},
		setResultType(state, payload) {
			state.resultType = payload
		},
		setDayLength(state, payload) {
			state.dayLength = payload
		},
		saveImageUrls(state, payload) {
			state.imageUrls = payload
		}
	},
	getters: {
	}
}
export default created
