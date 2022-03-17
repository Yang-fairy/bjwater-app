<template>
	<view>
		<view class="headerBox">
			<view class="lf">
				<view class="items">
					<view class="name">
						北京
					</view>
					<!-- :color="activeIndex === index?'rgb(9, 171, 198)':'#676C77'" -->
					<uni-icons type="bottom" color="#676C77" size="15" />
				</view>
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" v-if="array.length>0">
					<view class="items">
						<view class="name">
							{{array[index].name}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
				</picker>
				<picker @change="getZhen" :value="zhenIndex" :range="zhenArray" range-key="name"
					v-if="zhenArray.length>0">
					<view class="items">
						<view class="name">
							{{zhenArray[zhenIndex].name}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
				</picker>
			</view>
			<!-- <view class="rg">
				<uni-icons type="search" color="#676C77" size="20" />
			</view> -->
		</view>
		<!-- ERRBox -->
		<view class="centerBOX" v-for="(item,index) in liveData" :key='index'>
			<!-- <view :class="item.equipmentStatus=='4'?'ZDitem ERRBox':item.equipmentStatus=='5'?'ZDitem ERRBoxY':'ZDitem'" @click="toPath(`./itemDetails?name=本忠27号站点`)"> -->
			<view :class="item.equipmentStatus=='4'?'ZDitem ERRBox':'ZDitem'"
				@click="toPath(`./itemDetails?name=${JSON.stringify(item)}`)">
				<view class="top">
					<view class="name">
						{{item.wsname}}
					</view>
					<view :class="item.equipmentStatus=='4'?'time timeColor':'time'">
						{{item.lastTime}}
					</view>
				</view>
				<view class="cBox">
					<view class="itBox">
						<view class="name">
							站点类型：
						</view>
						<view class="sj">
							{{item.stationtype=='1'?'自动监测站':item.stationtype=='2'?'农田监测站':'暂无'}}
						</view>
					</view>
					<view class="itBox">
						<view class="name">
							水表名称：
						</view>
						<view class="sj">
							{{item.sbname}}
						</view>
					</view>
					<view class="itBox">
						<view class="name">
							土壤类型：
						</view>
						<view class="sj">
							{{item.soilType=='0'?'黏土':item.soilType=='1'?'壤土':item.soilType=='2'?'沙壤土':item.soilType=='3'?'沙土':'暂无'}}
						</view>
					</view>
					<!-- <view class="itBox">
						<view class="name">
							设备信号：
						</view>
						<view class="sj">
							正常
						</view>
					</view> -->
				</view>
				<view class="bBox">
					<view class="its tisd">
						<view class="yuan">
							<view class="yTop">

							</view>
							<view class="yBom">
								<view class="ysj">
									{{item.irrigationCalendarList[0].cumulativeSum}}
								</view>
							</view>
						</view>
						<view class="dWZ">
							累计用水量(m³)
						</view>
					</view>
					<view class="its tisd">
						<!-- ysjErr -->
						<view class="yuan ">
							<!-- ysjErr -->
							<view class="yTop ">

							</view>
							<view class="yBom">
								<!-- ysjErr黄色预警 -->
								<view class="ysj">
									{{item.irrigationCalendarList[0].irrigationAmount?item.irrigationCalendarList[0].irrigationAmount:'暂无'}}
								</view>
							</view>
						</view>
						<view class="dWZ">
							昨日灌溉量(m³)
						</view>
					</view>
					<view class="its">
						<view class="yuan">
							<view class="yTop">

							</view>
							<view class="yBom">
								<view class="ysj">
									{{item.irrigationCalendarList[0].plantName?item.irrigationCalendarList[0].plantName:'暂无'}}
								</view>
							</view>
						</view>
						<view class="dWZ">
							种植作物
						</view>
					</view>
					<!-- <view class="its">
						<view class="yuan">
							<view class="yTop">
		
							</view>
							<view class="yBom">
								<view class="ysj">
									80%
								</view>
							</view>
						</view>
						<view class="dWZ">
							电池电量
						</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [],
				index: 0,
				zhenArray: [],
				zhenIndex: 0,
				liveData: [],
				onLoadParams: null,
				onLoadData: null,
			};
		},
		onLoad(params) {
			if (params) {
				// console.log(params,"Canshu11111")
				this.onLoadParams = params.id
				this.index = 0;
				this.zhenIndex = 0;
				let url = '/area/edit/' + params.id
				this.$http.get(url).then(res => {
					console.log(res, "数据")
					if (res.code == 200 && res.data) {
						this.onLoadData = res.data.ws
					}
				})
			}

		},
		mounted() {
			this.getQu()
			setTimeout(()=>{
				
			},500)
		},
		methods: {
			getQu() {
				this.$http.get('/areaApp/getArea').then(res => {
					console.log(res, "区域")
					if (res.code == 200 && res.data.length > 0) {
						this.array = res.data
						if (this.onLoadParams) {
							this.index = res.data.findIndex((value, index, arr) => {
								return value.name == this.onLoadData.district
							});
							this.getZhenData(res.data[this.index].id)
							return false
						}
						this.$http.get('/areaApp/getArea', {
							pid: res.data[0].id
						}).then(res => {
							// console.log(res, "镇")
							if (res.code == 200 && res.data.length > 0) {
								this.zhenArray = res.data
								this.zhenData(res.data[0].id)
							}
						})
					}
				})
			},
			// 首页点击过来默认选中镇
			getZhenData(id) {
				this.$http.get('/areaApp/getArea', {
					pid: id
				}).then(res => {
					// console.log(res, "传了参数的数据")
					if (res.code == 200 && res.data.length > 0) {
						this.zhenArray = res.data
						this.zhenIndex = res.data.findIndex((value, index, arr) => {
							return value.name == this.onLoadData.town
						});
						this.zhenData(this.zhenArray[this.zhenIndex].id)
					}
				})
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.zhenArray = []
				this.zhenIndex = 0
				this.$http.get('/areaApp/getArea', {
					pid: this.array[this.index].id
				}).then(res => {
					console.log(res, "镇")
					if (res.code == 200 && res.data.length > 0) {
						this.zhenArray = res.data
						this.zhenData(res.data[0].id)
					}
				})
			},
			getZhen: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.zhenIndex = e.target.value
				this.zhenData(this.zhenArray[this.zhenIndex].id)
			},
			// 获取该镇下的实时数据
			zhenData(id) {
				uni.showLoading({
					title: '加载中'
				})
					this.liveData = []
				this.$http.get('/areaApp/getRealDataByAreaApp', {
					townCode: id
				}).then(res => {
					// console.log(res, "镇查到的实时/数据")
					if (res.code == 200 && res.data.length > 0) {
						res.data.map((item, index) => {
							let sbUrl = '/dev/sensb/getSensbByCode/' + item
								.irrigationCalendarList[0].sbCode
							this.$http.get(sbUrl).then(res2 => {
								// console.log(res2,"请求水表名称")
								if (res2.data.sbcode == item
									.irrigationCalendarList[0].sbCode) {
									item.lastTime = res2.data.lastTime
									item.equipmentStatus = res2.data
										.equipmentStatus
									item.sbname = res2.data.sbname
								}
							})
							if (index == res.data.length - 1) {
								setTimeout(() => {
								
									if (this.onLoadParams) {
										this.liveData = res.data.filter(item => item.id == this
											.onLoadParams)
											uni.hideLoading()
										return false
									} else {
										this.liveData.push(...res.data)
										uni.hideLoading()
										// console.log(this.liveData, "含水表名称的实时数据")
									}
									
								}, 500)

							}
						})
					}
				})
			},

			toPath(url) {
				uni.navigateTo({
					url
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.headerBox {
		width: 750rpx;
		height: 84rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.lf {
			width: 100%;
			// width: calc(100% - 85rpx);
			height: 34rpx;
			// border-right: 2rpx solid rgba(227, 227, 227, 1);
			display: flex;
			justify-content: space-around;

			.items {
				display: flex;
			}
		}

		.rg {
			width: 85rpx;
			height: 34rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.centerBOX {
		width: 702rpx;
		margin: 0 auto;
		overflow: hidden;

		.ZDitem {
			width: 702rpx;
			height: 380rpx;
			background: #FFFFFF;
			box-shadow: 0 2rpx 24rpx 0 rgba(0, 0, 0, 0.02);
			border-radius: 16rpx;
			margin-top: 24rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.top {
				height: 42rpx;
				display: flex;

				.name {
					width: 384rpx;
					height: 42rpx;
					font-family: PingFangSC-Medium;
					font-size: 28rpx;
					color: #243036;
					text-align: left;
					font-weight: 600;
					overflow: hidden;
				}

				.time {
					width: 240rpx;
					font-family: PingFangSC-Regular;
					font-size: 24rpx;
					color: #999999;
					text-align: right;
					font-weight: 400;
					overflow: hidden;
				}

				.timeColor {
					color: #FF0000;
				}
			}

			.cBox {
				height: 80rpx;
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;

				.itBox {
					width: 50%;
					height: 36rpx;
					display: flex;

					.name {
						width: 130rpx;
						height: 36rpx;
						font-family: PingFangSC-Regular;
						font-size: 26rpx;
						color: #999999;
						text-align: left;
						font-weight: 400;
						overflow: hidden;
					}

					.sj {
						font-family: PingFangSC-Regular;
						font-size: 13px;
						color: #666666;
						text-align: left;
						font-weight: 400;
						overflow: hidden;
					}
				}
			}

			.bBox {
				width: 100%;
				height: 157.28rpx;
				margin-top: 28rpx;
				display: flex;
				justify-content: space-between;

				.its {
					width: 20%;
					height: 100%;

					.yuan {
						width: 111.2rpx;
						height: 111.2rpx;
						border-radius: 50%;
						background: rgba(4, 181, 194, 0.06);
						border: 1.24rpx solid transparent;
						border-color: #00BFBE #109CCD #1199CE;
						margin: 0 auto;

						.yTop {
							width: 111.2rpx;
							height: 69.5rpx;
							border-radius: 69.5rpx 69.5rpx 0 0;
							background-image: linear-gradient(165deg, #00BFBE 0%, #1199CE 100%);
						}

						.yTopErr {
							background-image: linear-gradient(166deg, #FFD000 0%, #FF6A00 100%);
						}

						.yBom {
							height: 41.7rpx;

							.ysj {
								width: 78rpx;
								height: 22rpx;
								margin: 9.64rpx auto 0;
								font-family: PingFangSC-Medium;
								font-size: 10px;
								color: #09ABC6;
								text-align: center;
								line-height: 20.84rpx;
								font-weight: 500;
								overflow: hidden;
							}

							.ysjErr {
								color: #FF6A00;
							}
						}
					}

					.yuanErr {
						background: #FFF5E8;
						border-color: #FFD000 #FF8A02;
					}

					.dWZ {
						width: 100%;
						overflow: hidden;
						height: 38rpx;
						line-height: 38rpx;
						font-family: PingFangSC-Regular;
						font-size: 22rpx;
						color: #666666;
						text-align: center;
						font-weight: 400;
					}
				}

				.tisd {
					width: 26%;
				}
			}
		}

		.ERRBox {
			background: #FFF1F1;
			border: 0.5px solid rgba(233, 80, 92, 1);
			box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.02);
		}
	}
</style>
