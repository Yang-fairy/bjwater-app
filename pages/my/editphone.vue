<template>
	<view>
		<view class="OneRow">
			当前绑定手机号
		</view>
		<view class="TwoRow">
			{{test(18338865025)}}
		</view>
		<view class="bt" @click="toPath('./editphone2')">
			修改手机号
		</view>
		<view class="btt" @click="back()">
			返回
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			test(it){
				let value=it.toString()
			    var reg = /^(\d{3})\d{4}(\d{4})$/;  
			    return value.replace(reg, "$1****$2");
			},
			toPath(url) {
				console.log('....')
				uni.navigateTo({
					url
				});
			},
			back(){
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.OneRow{
	width: 750rpx;
	height: 42rpx;
	font-family: PingFangSC-Regular;
	font-size: 30rpx;
	color: #666666;
	letter-spacing: 0;
	text-align: center;
	font-weight: 400;
	margin-top: 120rpx;
}
.TwoRow{
	width: 750rpx;
	height: 30px;
	font-family: PingFangSC-Medium;
	font-size: 22px;
	color: #333333;
	letter-spacing: 0;
	text-align: center;
	font-weight: 500;
	margin-top: 32rpx;
}
.bt{
	width: 690rpx;
	height: 92rpx;
	background: #09ABC6;
	border-radius: 48rpx;
	margin: 124rpx auto 0;
	font-family: PingFangSC-Medium;
	font-size: 36rpx;
	line-height: 92rpx;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
	font-weight: 500;
}
.btt{
	width: 690rpx;
	height: 92rpx;
	background: #ECECEC;
	border-radius: 48rpx;
	margin: 40rpx auto 0;
	font-family: PingFangSC-Regular;
	font-size: 18px;
	color: #333333;
	letter-spacing: 0;
	line-height: 92rpx;
	text-align: center;
	font-weight: 400;
}
</style>
