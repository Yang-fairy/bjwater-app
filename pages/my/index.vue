<template>
	<view>
		<view class="topBox">
			<view class="touxiang"></view>
			<view class="centerBox">
				<view class="name">赵颜颜</view>
				<view class="phone">15110902098</view>
			</view>
		</view>
		<view class="bottomBox">
			<view :class="index < list.length - 1 ? 'listBox border' : 'listBox'" v-for="(item, index) in list" :key="index" @click="toPath(item.url)">
				<view class="lfBox">
					<view class="iconBox"></view>
					<view class="nameBox">{{ item.name }}</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#676C77" size="20" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					icon: null,
					name: '设备管理',
					url:'./deviceManagement'
				},
				{
					icon: null,
					name: '站点管理',
					url:'./siteManagement'
				},
				{
					icon: null,
					name: '用户管理',
					url:'./userManagement'
				},
				{
					icon: null,
					name: '密码设置',
					url:'./editPassword'
				},
				{
					icon: null,
					name: '修改手机号',
					url:'./editphone'
				}
			]
		};
	},
	methods: {
		toPath(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.topBox{
	width: 690rpx;
	height: 264rpx;
	background-image: linear-gradient(0deg, #0682C6 2%, #09ABC6 100%);
	border-radius: 16rpx;
	margin: 24rpx auto;
	overflow: hidden;
	display: flex;
	.touxiang{
		width: 144rpx;
		height: 144rpx;
		border-radius: 100%;
		margin: 60rpx 32rpx;
		background-color: #FFFFFF;
	}
	.centerBox{
		width: calc(100% - 240rpx);
		margin-top: 80rpx;
		font-family: PingFangSC-Medium;
		color: #FFFFFF;
		font-weight: 500;
		.name{
			height: 50rpx;
			font-size: 36rpx;
		}
		.phone{
			margin-top: 11rpx;
			height: 40rpx;
			font-size: 28rpx;
		}
	}
}
.bottomBox{
	width: 690rpx;
	height: 498rpx;
	background: #FFFFFF;
	border-radius: 12rpx;
	margin: 0 auto;
	padding-left:32rpx;
	padding-right:32rpx;
	box-sizing: border-box;
	.listBox{
		width: 100%;
		height: 98rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.lfBox{
			display: flex;
			.iconBox{
				width: 36rpx;
				height: auto;
				margin-right: 32rpx;
			}
			.name{
				width: 120rpx;
				height: 42rpx;
				font-family: PingFangSC-Regular;
				font-size: 30rpx;
				color: #333333;
				font-weight: 400;
			}
		}
	}
	.border{
		border-bottom: 1rpx solid #EEEEEE;
	}
}
</style>
