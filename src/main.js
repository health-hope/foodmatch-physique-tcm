import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index.js'
import '@/assets/style/base.scss'
import '@/assets/js/rem'
import lottie from 'vue-lottie';
import Toast from '@/assets/js/toast'
import loading from './assets/js/loading'
import { getUrlParam } from '@/assets/js/util.js'
Vue.use(Toast, { defaultType: 'center', duration: '2000' })
Vue.component('lottie', lottie)
Vue.use(loading);
Vue.config.productionTip = false;
import ModalHelper from '@//assets/js/modalHelper'
Vue.prototype.$modalHelper = ModalHelper

import VerticalToggle from '@/assets/js/toggle.js'
Vue.component(VerticalToggle.name, VerticalToggle)

if (process.env.VUE_APP_ENV !== "production") {
	Vue.config.devtools = true;
} 
(() => {
    /**
     * @des 处理不同code的静态资源
     * 
     */
	let mealCode = getUrlParam('code')
	if(mealCode) {
		window.sessionStorage.setItem('mealCode',mealCode)
	}
    let path = window.sessionStorage.getItem('mealCode');
    Vue.filter('PUBLIC_PATH', (str) => {
		if(str.backgroundImage) {
			let url = str.backgroundImage.substring(str.backgroundImage.length-1,-1).substring(4)
			return {
				backgroundImage: `url(${process.env.BASE_URL}${path}/${url})`
			}
		}else {
			return `${process.env.BASE_URL}${path}/${str}`;
		}
    })
})()
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
