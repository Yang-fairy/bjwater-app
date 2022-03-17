<template>
	<view>
		
		<button type="default" @click="exit">退出</button>
		<button type="default" @click="getImg">登录</button>
	</view>
</template>
<script>
	import {
	  getToken,
	  setToken,
	  removeToken
	 } from '@/config/auth.js'
export default {
	data() {
		return {}
	},
	mounted() {
		// this.getImg()
	},
	methods:{
		exit(){
			removeToken()
		},
		getImg(){
			let obj = {
				username:'bjwater',
				password:123456
			}
			this.$http.post('/loginApp',obj).then(res=>{
				console.log(res,"登录成功")
				setToken(res.token)
			})
		},
	}
}
</script>