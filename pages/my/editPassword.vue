<template>
	<view>
		<view class="tit">
			手机验证码发送到{{test(18338865025)}}的手机上，请注意查收
		</view>
		<view class="OneRow">
			<view class="lf">
				手机验证码
			</view>
			<view class="rg fx">
				<input type="text" value="" placeholder="请输入验证码" />
				<view class="btn">
					获取验证码
				</view>
			</view>
		</view>
		<view class="OneRow top">
			<view class="lf">
				输入密码
			</view>
			<view class="rg">
				<input type="text" value="" placeholder="请输入6位的数字和密码" />
			</view>
		</view>
		<view class="OneRow">
			<view class="lf">
				确认密码
			</view>
			<view class="rg">
				<input type="text" value="" placeholder="请重复上面的密码" />
			</view>
		</view>
		<view class="bt">
			确定
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
			}
		}
	}
</script>

<style lang="scss" scoped>
.tit{
	width: 750rpx;
	height: 76.24rpx;
	line-height: 76.24rpx;
	font-family: PingFangSC-Medium;
	font-size: 13px;
	color: #999999;
	letter-spacing: -0.31px;
	font-weight: 500;
	text-align: center;
}
.top{
		margin-top: 20.92rpx;
}
.fx{
	display: flex;
}
.OneRow{
	width: 750rpx;
	height: 105.08rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	.lf{
		width: 220.26rpx;
		height: 24px;
		padding-left: 30.8rpx;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #676C77;
		letter-spacing: 0;
		line-height: 23.55px;
		font-weight: 400;
		box-sizing: border-box;
	}
	.rg{
		width: calc(100% - 220.26rpx);
		.btn{
			width: 180rpx;
			height: 100%;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #09ABC6;
			letter-spacing: 0;
			text-align: right;
			line-height: 23.55px;
			font-weight: 600;
			padding-right: 33.2rpx;
		}
	}
}
.bt{
	width: 690rpx;
	height: 92rpx;
	background: #09ABC6;
	border-radius: 48rpx;
	margin: 62.7rpx auto 0;
	font-family: PingFangSC-Medium;
	font-size: 36rpx;
	line-height: 92rpx;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
	font-weight: 500;
}
</style>
