<template>
	<view class="can">
		<canvas :canvas-id="chartId" class="chart-canvas" @touchend="_tap"></canvas>
		<view class="text1">
			{{time}}
		</view>
		<view class="cc" v-if="chartDatas">
			<view class="box" v-for="(item,index) in chartDatas.series[0].data">
				<view class="circ" :style="'background-color:'+item.color + ';'">
				
				</view>
				<view class="text">
					{{item.name}} 
				</view>
				<view class="text">
					 {{item.value}}%
				</view>
				<view class="text">
					{{item.irrigationSum}}m³
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import uCharts from "@/static/js/u-charts.js";
	export default {
		props: [
			'chartId', 'title', 'chartDatas','time'
		],
		data() {
			return {
				// chartId: 'ucharts-demo',
				chartInstance: null,
				cWidth: "",
				cHeight: "",
				pixelRatio: 1,
			};
		},
		mounted() {
			this.cWidth = uni.upx2px(638);
			this.cHeight = uni.upx2px(400);
			_initChart(this);
		},
		methods: {
			shengTuLi(){
				this.chartDatas.series[0].data.map((item,index)=>{
					
				})
			},
			_tap(e) {
				this.chartInstance.showToolTip(e, {
					formatter: function(item, category, index, opts) {
						this.textList = [{
								text: '生育期：' + item.name,
								color: item.color
							},
							{
								text: '用水量：' + item.irrigationSum + 'm³',
								color: item.color
							}
						];
					}
				});
			},
		}
	}
	/**
	 * 图表初始化
	 * @param _this
	 * @private
	 */
	function _initChart(_this) {
		_this.chartInstance = new uCharts({
			$this: _this,
			context: uni.createCanvasContext(_this.chartId, _this),
			canvasId: _this.chartId,
			width: _this.cWidth * _this.pixelRatio,
			height: _this.cHeight * _this.pixelRatio,
			pixelRatio: _this.pixelRatio,
			// categories: this.chartDatas.categories,
			series: _this.chartDatas.series,
			// 以下配置请在 https://demo.ucharts.cn/#/ 生成
			// "type": "pie",
			"type": "ring",
			"canvasId": "",
			"canvas2d": false,
			"background": "none",
			"animation": true,
			"timing": "easeOut",
			"duration": 1000,
			// legend:false,
			"color": [
				"#1F73FF",
				"#449EFE",
				"#4BCACA",
				"#59C85A",
				"#FCED52",
				"#FA8D42",
				"#F14C71",
				"#9A60B4",
				"#F364C3"
			],
			"padding": [
				5,
				5,
				5,
				5
			],
			"rotate": false,
			"errorReload": true,
			"fontSize": 13,
			"fontColor": "#666666",
			"enableScroll": false,
			"touchMoveLimit": 60,
			"enableMarkLine": false,
			"dataLabel": true,
			"dataPointShape": true,
			"dataPointShapeType": "solid",
			"tapLegend": true,
			"legend": {
				"show": false,
				"position": "bottom",
				"float": "center",
				"padding": 5,
				"margin": 5,
				"backgroundColor": "rgba(0,0,0,0)",
				"borderColor": "rgba(0,0,0,0)",
				"borderWidth": 0,
				"fontSize": 13,
				"fontColor": "#666666",
				"lineHeight": 25,
				"hiddenColor": "#CECECE",
				"itemGap": 10
			},
			"title": {
				"name": _this.title,
				"fontSize": 18,
				"color": "#000000",
				"offsetX": 0,
				"offsetY": 0
			},
			"subtitle": {
				"name": "",
				"fontSize": 25,
				"color": "",
				"offsetX": 0,
				"offsetY": 0
			},
			"extra": {
				// pie: {
				//                          lableWidth:15
				//                        },
				"ring": {
					"ringWidth": 30,
					"centerColor": "#FFFFFF",
					"activeOpacity": 0.5,
					"activeRadius": 10,
					"offsetAngle": 0,
					"customRadius": 0,
					"labelWidth": 15,
					"border": false,
					"borderWidth": 3,
					"borderColor": "#FFFFFF",
					"linearType": "custom"
				},
				"tooltip": {
					"showBox": true,
					"showArrow": false,
					"showCategory": false,
					"borderWidth": 0,
					"borderRadius": 0,
					"borderColor": "#000000",
					"borderOpacity": 0.7,
					"bgColor": "#000000",
					"bgOpacity": 0.7,
					"gridType": "dash",
					"dashLength": 4,
					"gridColor": "#CCCCCC",
					"fontColor": "#FFFFFF",
					"splitLine": true,
					"horizentalLine": false,
					"xAxisLabel": false,
					"yAxisLabel": false,
					"labelBgColor": "#FFFFFF",
					"labelBgOpacity": 0.7,
					"labelFontColor": "#666666"
				}
			}
		});
	}
</script>

<style lang="scss" scoped>
	.can{
		width: 100%;
		.text1{
			text-align: center;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: #666666;
			letter-spacing: 0;
			font-weight: 500;
		}
		.cc{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-top: 20rpx;
		}
		.box{
			height: 40rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.circ{
				width: 20rpx;
				height: 20rpx;
				// background-color: blue;
				border-radius: 50%;
			}
			.text{
				width: 20%;
				letter-spacing: 0px;
				white-space: nowrap;
				text-align: left;
				font-size: 20rpx;
				font-size: 14px;
				color: #000000;
				font-weight: 400;
			}
		}
	}
	.chart-canvas {
		width: 100%;
		height: 400rpx;
	}
</style>
