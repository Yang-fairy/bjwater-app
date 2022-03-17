<template>
	<canvas :canvas-id="chartId"  class="chart-canvas" @touchend="_tap" :ontouch="true"
		@touchmove="moveLineA" @touchstart="touchLineA"></canvas>
</template>

<script>
	import uCharts from "@/static/js/u-charts.js";
	export default {
		props: ['time', 'series'],
		data() {
			return {
				chartId: 'ucharts-demo111111',
				chartInstance: null,
				cWidth: "",
				cHeight: "",
				pixelRatio: 1,
				chartDatas: {
					"categories": this.time,
					"series": this.series,
					
				}
			};
		},
		mounted() {
			this.cWidth = uni.upx2px(638);
			this.cHeight = uni.upx2px(720);
			_initChart(this);
		},
		methods: {
			_tap(e) {
				this.chartInstance.scrollEnd(e);
				this.chartInstance.showToolTip(e, {
					//  formatter: function (item, category, index, opts) {
					//   console.log(item,category,index.opts)
					// this.textList = [
					//   {text: item.name+'：' + item.data, color: item.color},
					// ];
					// }
				});
			},
			// 图表拖拽
			touchLineA(e) {
				this.chartInstance.scrollStart(e);
			},
			moveLineA(e) {
				this.chartInstance.scroll(e);
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
			categories: _this.chartDatas.categories,
			series: _this.chartDatas.series,
			touch: true,
			// 以下配置请在 https://demo.ucharts.cn/#/ 生成
			"type": "mix",
			// "canvasId": "",
			// "canvas2d": true,
			"background": "none",
			"animation": true,
			"timing": "easeOut",
			"duration": 1000,
			"color": [
				"#09ABC6",
				"#FA8C16",
				"#FB9222",
				"#16AFC9",
				"#1890FF",
				"#91CB74",
				"#FAC858",
				"#EE6666",
				"#73C0DE",
				"#3CA272",
				"#FC8452",
				"#9A60B4",
				"#ea7ccc"
			],
			"padding": [
				15,
				15,
				0,
				15
			],
			"rotate": false,
			"errorReload": true,
			"fontSize": 13,
			"fontColor": "#666666",
			"enableScroll": true,
			"touchMoveLimit": 60,
			// "enableMarkLine": false,
			"dataLabel": false,
			"dataPointShape": true,
			"dataPointShapeType": "solid",
			"tapLegend": true,
			"xAxis": {
				"disabled": false,
				"axisLine": true,
				"axisLineColor": "#CCCCCC",
				"calibration": false,
				"fontColor": "#666666",
				"fontSize": 13,
				"rotateLabel": false,
				"itemCount": 3,
				// "labelCount": 3,
				"boundaryGap": "center",
				"disableGrid": true,
				"gridColor": "#CCCCCC",
				"gridType": "solid",
				"dashLength": 4,
				"gridEval": 1,
				"scrollShow": true,
				"scrollAlign": "left",
				"scrollColor": "#A6A6A6",
				"scrollBackgroundColor": "#EFEBEF",
				"format": ""
			},
			"yAxis": {
				"disabled": false,
				"disableGrid": true,
				"splitNumber": 5,
				"gridType": "dash",
				"dashLength": 4,
				"gridColor": "#CCCCCC",
				"padding": 10,
				"showTitle": true,
				"data": [{
					"position": "left",
					"title": "m³"
				}, ]
			},
			"legend": {
				"show": true,
				"position": "bottom",
				"float": "left",
				// "padding": 10,
				"margin": 20,
				"backgroundColor": "rgba(0,0,0,0)",
				"borderColor": "rgba(0,0,0,0)",
				"borderWidth": 0,
				"fontSize": 13,
				"fontColor": "#666666",
				// "lineHeight": 11,
				"hiddenColor": "#CECECE",
				// "itemGap": 10
			},
			"extra": {
				"mix": {
					"column": {
						"width": 20,
						"seriesGap": 2,
						"barBorderCircle": false,
						"linearType": "none",
						"linearOpacity": 1,
						"colorStop": 0,
					}
				},
				"tooltip": {
					"showBox": true,
					"showArrow": false,
					"showCategory": true,
					"borderWidth": 0,
					"borderRadius": 6,
					"borderColor": "#000000",
					"borderOpacity": 0.7,
					"bgColor": "#000000",
					"bgOpacity": 0.7,
					"gridType": "solid",
					"dashLength": 4,
					"gridColor": "#CCCCCC",
					"fontColor": "#FFFFFF",
					"splitLine": true,
					"horizentalLine": false,
					"xAxisLabel": false,
					"yAxisLabel": false,
					"labelBgColor": "#FFFFFF",
					"labelBgOpacity": 0.7,
					"labelFontColor": "#666666",
				},
				"markLine": {
					"type": "solid",
					"dashLength": 4,
					"data": []
				}
			}
		});
	}
</script>

<style lang="scss">
	.chart-canvas {
		width: 100%;
		height: 100%;
		min-height: 500 rpx;
	}
</style>
