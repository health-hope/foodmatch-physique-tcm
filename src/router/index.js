import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
Vue.use(Router)
const router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0, y: 0
			}
		}
	},
	routes
})
router.beforeEach((to, from, next) => {
	if (navigator.onLine) {
		next()
	} else {
		Vue.prototype.$toast('网络好像有点问题，请检查后重试！')
		next(false)
	}
})
export default router