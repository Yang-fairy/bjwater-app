<template>
	<view class="wrap" >
		<view class="box"  v-if="info">
			<view class="name">
				<view class="name1">
					<view class="text">
						站点名称
					</view>
					<view class="inp">
						{{info.wsname}}
					</view>
				</view>
			</view>

			<!-- <view class="name">
				<view class="name1">
					<view class="text">
						站点号
					</view>
					<view class="inp">
						111111111111111
					</view>
				</view>
			</view> -->
			<view class="name">
				<view class="name1">
					<view class="text">
						站点类型
					</view>
					<view class="inp">
						{{info.stationtype=='1'?'自动监测站':info.stationtype=='2'?'农田监测站':'暂无'}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						设施类型
					</view>
					<view class="inp">
						{{info.type=='1'?'日光温室':info.type=='2'?'塑料棚':info.type=='3'?'连栋温室':'暂无'}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						棚室编号
					</view>
					<view class="inp">
						{{info.areaNum}}
					</view>
				</view>
			</view>
			<!-- <view class="name">
				<view class="name1">
					<view class="text">
						土壤质地
					</view>
					<view class="inp">
						{{info.soilType=='0'?'黏土':info.soilType=='1'?'壤土':info.soilType=='2'?'沙壤土':info.soilType=='3'?'沙土':'暂无'}}
					</view>
				</view>
			</view> -->
			<view class="name">
				<view class="name1">
					<view class="text">
						长度(米)
					</view>
					<view class="inp">
						{{info.zheight}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						宽度(米)
					</view>
					<view class="inp">
						{{info.zwidth}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						经度(米)
					</view>
					<view class="inp">
						{{info.lon}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						纬度(米)
					</view>
					<view class="inp">
						{{info.lat}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						区
					</view>
					<view class="inp">
						{{info.district}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						乡镇
					</view>
					<view class="inp">
						{{info.town}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						村
					</view>
					<view class="inp">
						{{info.street}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						园区名称
					</view>
					<view class="inp">
						{{info.park}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						联系人
					</view>
					<view class="inp">
						{{info.name}}
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						联系电话
					</view>
					<view class="inp">
						{{info.phone}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zhanArr: [1, 2, 3, 4], //站点类型弹出层数据
				sbArr: [1, 2, 3, 4], //设备类型弹出层数据
				trzdArr: [1, 2, 3, 4], //土壤质地弹出层数据
				xzlist: [1, 2, 3, 4], //乡镇弹出曾数据
				cunlist: [1, 2, 3, 4], //村弹出曾数据
				index: 1, //站点类型选择下标
				sbTypeIndex: 1, //设备类型选择下标
				trzdIndex: 1, //土壤质地选择下标
				xzIndex: 1, //乡镇选择下标
				cunIndex: 1, //村选择下标
				list: ['全部', '密云区', '延庆区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区',
					'平谷区', '东城区', '西城区'
				],
				listIndex: 1, //区域选择下标
				single: null,
				onLoadParams:null,
				info:null,
			}
		},
		onLoad(options){
			this.onLoadParams = options.id
		},
		mounted(){
			this.getZhanDianHttp()
		},
		methods: {
			getZhanDianHttp(){
				uni.showLoading({
					title:'加载中'
				})
				let url = '/area/edit/'+this.onLoadParams
				this.$http.get(url).then(res=>{
					// console.log(res,"站点详情")
					if(res.code==200 && res.data.ws){
						this.info = res.data.ws
						uni.hideLoading()
					}
				})
			},
			// 选择站点类型
			zdType: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			// 选择设备类型
			sbType: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.sbTypeIndex = e.target.value
			},
			// 选择土壤质地
			trzd: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.trzdIndex = e.target.value
			},
			// 选择区域
			listArea: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.listIndex = e.target.value
			},
			// 选择乡镇
			xz: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.xzIndex = e.target.value
			},
			// 选择村
			cun: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.cunIndex = e.target.value
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding-bottom: 50rpx;
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
