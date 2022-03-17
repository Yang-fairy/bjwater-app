<template>
	<view class="wrap">
		<view class="box">
			<view class="name">
				<view class="name1">
					<view class="text">
						选择地区
					</view>
					<view class="inp">
						<picker @change="area" :value="index" :range="list">
							{{index==-1?'请选择地区':list[index]}}
							<uni-icons type="right" color="grey" size="15" />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						站点类型
					</view>
					<view class="inp">
						<picker @change="zhanType" :value="zhanTypeIndex" :range="zhanTypelist">
								{{zhanTypeIndex==-1?'请选择站点类型':zhanTypelist[zhanTypeIndex]}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						选择站点
					</view>
					<view class="inp">
						<picker @change="zhan" :value="zhanIndex" :range="zhanlist">
							{{zhanIndex==-1?'请选择站点':zhanlist[zhanIndex]}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="bao" @click="toNewForm">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['全部', '密云区', '延庆区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区',
					'平谷区', '东城区', '西城区'
				],
				index: -1,
				zhanTypelist: ['人工站', '自动站'],
				zhanTypeIndex:-1,
				zhanlist:[1,2,3,4],
				zhanIndex:-1,
			}
		},
		methods: {
			toNewForm(){
				uni.navigateTo({
					url:'/pages/data/newForm2?id=' + this.zhanTypeIndex 
				})
			},
			// 选择站点类型
			area: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			zhanType: function(e) {
				console.log('站点类型', e.target.value)
				this.zhanTypeIndex = e.target.value
			},
			zhan: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.zhanIndex = e.target.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: #F7F7F7;
	}

	.box {
		background-color: #fff;
	}

	.name {
		width: 100%;
		height: 105.08rpx;
		line-height: 105.08rpx;
		background: #FFFFFF;
		margin-top: 20rpx;

		.name1 {
			margin: 0 auto;
			width: 95%;
			height: 100%;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.text {
			font-family: PingFangSC-Regular;
			font-size: 16px;
			color: #676C77;
			letter-spacing: 0;
			line-height: 23.55px;
			font-weight: 400;
		}

		.inp {
			// border: 2px solid pink;
			text-align: right;
			font-family: PingFangSC-Regular;
			font-size: 16px;
			color: grey;
			letter-spacing: 0;
			line-height: 23.55px;
			font-weight: 400;
		}
	}

	.bao {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		background: #09ABC6;
		border-radius: 24px;
		font-family: PingFangSC-Medium;
		font-size: 18px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		font-weight: 500;
		margin: 0 auto;
		margin-top: 62.64rpx;
	}
</style>
