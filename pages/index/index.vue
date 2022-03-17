<template>
	<view>
		<view class="topBox" v-if="zhanCount">
			<view class="title">
				累计用水量（m³）
			</view>
			<view class="num">
				{{zhanCount.cumulativeSum}}
			</view>
			<view class="bottonBox">
				<view class="item">
					<view class="name">
						自动监测站点数（个）
					</view>
					<view class="shuju">
						{{zhanCount.automaticStation}}
					</view>
				</view>
				<view class="line">

				</view>
				<view class="item">
					<view class="name">
						人工监测站点数（个）
					</view>
					<view class="shuju">
						{{zhanCount.artificialStation}}
					</view>
				</view>
			</view>
		</view>
		<view class="centerBox">
			<view class="map" v-if="polygons.length>0 || covers.length>0">
				<map style="width: 100%; height: 300px;" :scale='7.5' :latitude="latitude" :longitude="longitude"
					:markers="covers" :polygons='polygons' @markertap="markertap" @callouttap="callouttap" >
				</map>
			</view>
			<view class="tuli">
				<view class="text1">
					单位 m³
				</view>
				<view class="content">
					<view class="box">
						<view class="totol" style="background: #10919B;">
						</view>
						<view class="textb">
							>40m³
						</view>
					</view>
					<view class="box">
						<view class="totol" style="background: #10A7BF;">
						</view>
						<view class="textb">
							30-40m³
						</view>
					</view>
					<view class="box">
						<view class="totol" style="background:#1FC6DD;">
						</view>
						<view class="textb">
							20-30m³
						</view>
					</view>
					<view class="box">
						<view class="totol" style="background:#68EAF4 ;">
						</view>
						<view class="textb">
							10-20m³
						</view>
					</view>
					<view class="box">
						<view class="totol" style="background:#B7FBFF;">
						</view>
						<view class="textb">
							0-10m³
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import uCharts from "@/static/js/u-charts.js";
	import mapdata from '@/static/js/beijing.json'
	import obj from '../../static/js/mapData.js'
	export default {
		data() {
			return {
				chartId: 'ucharts-demo',
				chartInstance: null,
				cWidth: "",
				cHeight: "",
				pixelRatio: 1,
				// 1111111111111
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 40.29,
				longitude: 116.5,
				//标记点位置
				covers: [],
				///多边形
				polygons:[],
				polygonsArr: [
					{
						name:'昌平',
						points: obj.pointsCp,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'大兴',
						points: obj.pointsDx,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'海淀',
						points: obj.pointsHd,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'通州',
						points: obj.pointsTz,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'丰台',
						points: obj.pointsFt,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						points: obj.pointsMy,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'东城',
						points: obj.pointsDc,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'石景山',
						points: obj.pointsSjs,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'房山',
						points: obj.pointsFs,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'门头沟',
						points: obj.pointsMtg,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'西城',
						points: obj.pointsXc,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'平谷',
						points: obj.pointsPg,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'怀柔',
						points: obj.pointsHr,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'延庆',
						points: obj.pointsYq,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'朝阳',
						points: obj.pointsCy,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},
					{
						name:'顺义',
						points: obj.pointsSy,
						strokeWidth: 2,
						strokeColor: '#fff',
						fillColor: '#10A7BF'
					},			

				],
				deptId: 133,
				zhanCount:null,   //数量
			}
		},
		mounted() {
			// console.log(obj, "11111")
			// this.getAreaColor()
			this.getCount()
			
		},
		methods: {
			getLat() {
				this.$http.get('/areaApp/list').then(res => {
					console.log(res, "经纬度")
					if (res.code == 200 && res.rows.length > 0) {
						var icon;
						let arr = []
						var cumulativeSum = null
						res.rows.map((item, index) => {
							if (item.stationtype == "1") {
								icon =
									"http://210.12.220.75:16008/oss/greenhouseplan/image/3e8b3758-590a-4b30-9e9d-0cc231403341.png";

							} else {
								icon =
									"http://210.12.220.75:16008/oss/greenhouseplan/image/77b7f154-ffe9-4a99-9123-a6a16d6e6e56.png";
							}
							if(item.irrigationCalendarList.length<=0){
								cumulativeSum = '暂无'
							}else{
								cumulativeSum = item.irrigationCalendarList[0].cumulativeSum
							}
							let name = item.wsname + '\n' + '累计用量: ' + cumulativeSum + 'm³\n' + '查看详情'
							let obj = {
								id: item.id,
								width: 20,
								height: 25,
								latitude: item.lat,
								longitude: item.lon,
								iconPath: icon,
								callout: {
									content: name,
									color: '#fff',
									bgColor: 'rgba(0,0,0,.6)',
									padding: 6,
									borderRadius: 6,
									// textAlign:'left',
								},
							};
							if(item.lat >= -90 && item.lat <=90){
									arr.push(obj)
							}
						
							if(index==res.rows.length-1){
								this.covers = arr
								setTimeout(()=>{uni.hideLoading()},2000)
								
							}
						})
					}
					

				})
			},
			getCount(){
				uni.showLoading({
					title: '加载中',
				});
				this.$http.get('/home/page/getHomePageStat',{deptId: this.deptId}).then(res=>{
					console.log(res,"用水信息")
					if(res.code==200){
						this.zhanCount = res.data
						
						this.getLat()
					}
				})
			},
			getAreaColor(){
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				this.$http.get('/irrigation/calendar/getUseWaterInfo',{deptId:this.deptId,type:1}).then(res=>{
					// console.log(res,"区域颜色")
				
					if(res.code==200 && res.data.length>0){
						let arr = JSON.parse(JSON.stringify(this.polygonsArr))
						res.data.map((item,index)=>{
							arr.map((it,val)=>{
								if(item.deptName==it.name){
									var color=null;
									if(item.irrigationTotal>=0 && item.irrigationTotal<=10){
										color='#B7FBFF';
									}else if(item.irrigationTotal>10 && item.irrigationTotal<=20){
										color='#68EAF4';
									}else if(item.irrigationTotal>20 && item.irrigationTotal<=30){
										color='#1FC6DD';
									}else if(item.irrigationTotal>30 && item.irrigationTotal<=40){
										color='#10A7BF';
									}else if(item.irrigationTotal>40) {
										color='#10919B';
									}else{
										color='#B7FBFF';
									}
									it.fillColor = color
								}
							})
							if(index==res.data.length-1){
								this.polygons = arr;
								setTimeout(()=>{
									uni.hideLoading()
								},6000)
								
							}
						});
						
					}
				})
			},
			markertap(e) {
				console.log(e,"点击具体站点的")
			},
			callouttap(e) {
				console.log(e, "点击了气泡窗口")
				this.toPath('./details?id=' + e.detail.markerId)
			},
			toPath(url) {
				uni.navigateTo({
					url
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topBox {
		width: 750rpx;
		height: 356rpx;
		background-image: linear-gradient(0deg, #0682C6 2%, #09ABC6 100%);
		border-radius: 0px 0px 16rpx 6rpx;
		overflow: hidden;

		.title {
			text-align: center;
			height: 26rpx;
			opacity: 0.8;
			font-family: PingFangSC-Regular;
			font-size: 26rpx;
			color: #FFFFFF;
			line-height: 26rpx;
			font-weight: 400;
			margin-top: 48rpx;
		}

		.num {
			text-align: center;
			height: 44rpx;
			font-family: AvenirNext-DemiBold;
			font-size: 56rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 44rpx;
			font-weight: 600;
			margin-top: 28rpx;
		}

		.bottonBox {
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 80rpx;

			.item {
				width: 260rpx;
				height: 100%;

				.name {
					height: 26rpx;
					opacity: 0.8;
					font-family: PingFangSC-Regular;
					font-size: 26rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 26rpx;
					font-weight: 400;
				}

				.shuju {
					height: 44rpx;
					font-family: AvenirNext-DemiBold;
					font-size: 36rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 44rpx;
					font-weight: 600;
					margin-top: 20rpx;
				}
			}

			.line {
				height: 40rpx;
				opacity: 0.3;
				border: 1px solid rgba(255, 255, 255, 1);
				margin: 0 55rpx;
			}
		}
	}

	.centerBox {
		width: 710rpx;
		height: 850rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 20rpx auto 40rpx;
		overflow: hidden;
		position: relative;

		.tuli {
			width: 100%;
			height: 100rpx;
			position: absolute;
			bottom: 40rpx;
			box-sizing: border-box;
			display: flex;

			.text1 {
				font-family: PingFangSC-Regular;
				font-size: 10px;
				color: #666666;
				font-weight: 400;
				margin-left: 5%;
			}

			.content {
				width: 75%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-left: 2%;

				.box {
					width: 90rpx;

					.totol {
						height: 3px;
					}

					.textb {
						font-family: PingFangSC-Regular;
						font-size: 10px;
						color: #666666;
						text-align: center;
						font-weight: 400;
						white-space: nowrap;
					}
				}
			}

		}

		.map {
			width: 650rpx;
			height: 600.12rpx;
			margin: 0 auto;
			margin-top: 40rpx;

			#container {
				width: 100%;
				height: 100%;
			}

			.chart-canvas {
				width: 100%;
				height: 100%;
			}
		}

	}
</style>
