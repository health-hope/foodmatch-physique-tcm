const env = {}

if (process.env.VUE_APP_ENV === 'production') {
	env.BASEURL = 'https://api.jiankangyouyi.com'
} else {
	env.BASEURL = 'https://api.hbox.jiankangyouyi.com'
}
export {
	env
}