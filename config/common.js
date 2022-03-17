import Request from '../components/luch-request/index.js'
import errorCode from './errorCode.js'
import {
	removeToken
} from './auth.js'
import {
	getToken
} from './auth.js'
const http = new Request()
export {
	http
}
http.setConfig((config) => { /* 设置全局配置 */
	// config.baseURL = '/party-ledge/api'
	// config.baseURL = '/dpd'
	// config.baseURL = 'http://210.12.220.81/bjwater/api'
	// config.baseURL = 'http://210.12.220.75:15003'
	config.baseURL = 'http://39.108.114.231:9310'
	// config.baseURL = 'http://192.168.1.125:8080'
	return config
})

http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	const isToken = (config.header || {}).isToken === false
	if (getToken() && !isToken) {
		config.header['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	// 演示custom 用处
	// if (config.custom.auth) {
	//   config.header.token = 'token'
	// }
	// if (config.custom.loading) {
	//  uni.showLoading()
	// }
	/**
	 /* 演示
	 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	    return Promise.reject(config)
	  }
	 **/
	return config
}, error => { // 可使用async await 做异步操作
	console.log(error)
	return Promise.reject(error)
})

http.interceptors.response.use((res) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
	//  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }
	const code = res.data.code || 200;
	const message = errorCode[code] || res.data.msg || errorCode['default']
	if (code === 401) {
		removeToken()
		uni.removeStorageSync('username')
		uni.reLaunch({
			url: '/pages/index/login'
		})
	} else if (code === 500) {
		uni.showToast({
			title: message,
			icon: 'none'
		});
		return Promise.reject(new Error(message))
	} else if (code !== 200) {
		uni.showToast({
			title: message,
			icon: 'none'
		});
		return Promise.reject('error')
	} else {
		return res.data
	}
}, (error) => { /*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(error)
	const code = error.statusCode;
	const message = errorCode[code] || error.data.msg || errorCode['default']
	if (code == 401) {
		removeToken()
		uni.removeStorageSync('username')
		uni.reLaunch({
			url: '/pages/index/login'
		})
	}else if (code == 500) {
		uni.showToast({
			title: message,
			icon: 'none'
		});
	} else {
		uni.showToast({
			title: message,
			icon: 'none'
		});
	}
})