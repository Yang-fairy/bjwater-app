<template>
	<view id="history">
		<view class="selceBox">
			<view class="item">
				<view class="title">
					时间：
				</view>
				<uni-datetime-picker v-if="range.length>0" v-model="range" type="daterange" rangeSeparator="—"
					@maskClick="maskClick" class="box" />
			</view>
			<view class="item top">
				<view class="title">
					站点：
				</view>
				<view class="zhandian">
					<input type="text" v-model="treeContent" class="inp" placeholder="请选择站点(可多选)"
						@click="seletZhanDian" />
					<uni-icons :type="zhanIcon?'top':'bottom'" color="#676C77" size="15" />
					<view class="option" v-if="zhanIcon">
						<!-- <button class="btn" @tap="setCheckAll">{{isCheckAll ? '取消全选': '全选'}}</button> -->
						<ly-tree ref="tree" :tree-data="treeData" node-key="label" show-checkbox expand-on-check-node
							@check-change="handleCheckChange" :default-checked-keys="expandKeys" />
						<button class="btn1" @tap="getCheckedKeys">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="centerBOX">
			<view class="title">
				<view class="gan">

				</view>
				<view class="wzzw">
					用水量
				</view>
			</view>
			<view class="typeBox">
				<view :class=" type=='day'?'lo item ited':'lo item'" @click="day(1)">
					按日
				</view>
				<view :class=" type=='month'?'lw item ited':'lw item'" @click="day(2)">
					按月
				</view>
				<view :class="type=='year'?'lt item ited':'lt item'" @click="day(3)">
					按年
				</view>
			</view>
			<view class="minBox" v-if="time.length>0 && series.length>0">
				<!-- <view class="minBox"> -->
				<!-- <wMIn></wMIn> -->
				<wMIn :time='time' :series='series'></wMIn>
			</view>
			<view class="FromBox">
				<view class="topBox">
					<view :class="ind<tableHeader.length?'item itmg':'item'" v-for="(item,ind) in tableHeader"
						@click="getDetailTable(ind)">
						<view :class="index==ind?'itt itted':'itt'">
							{{item}}
						</view>
						<view :class="index==ind?'xian xianed':'xian'">

						</view>
					</view>
				</view>
				<view class="centerBOXxxx">
					<view class="cnBOx">
						<view class="lf">
							<view class="oneItem">
								接收时间
							</view>
							<view class="shu" :style="'height:' + (1+tableList.length)*90 + 'rpx'">
								<!-- <view class="shu" :style="`height: ${(1+max)*90}rpx;`"> -->

							</view>
							<view class="oneItem twoRRow" v-for="(item,index) in tableList">
								{{item.alias}}
							</view>
						</view>
						<view class="rg">
							<view class="ooRow">
								<view class="onRRow">
									实时<br />用水量(m³)
								</view>
								<view class="onRRow">
									历史累计<br />用水量(m³)
								</view>
								<view class="onRRow">
									种植<br />作物
								</view>
								<view class="onRRow">
									灌溉<br />方式
								</view>
								<view class="onRRow">
									数据<br />来源
								</view>
							</view>
							<view class="ooRow two" v-for="(item,index) in tableList">
								<view class="onRRow twoRRow">
									{{item.irrigationAmountStat}}
								</view>

								<view class="onRRow twoRRow">
									{{item.cumulativeSumStat}}
								</view>
								<view class="onRRow twoRRow">
									{{item.plantName?item.plantName:'暂无'}}
								</view>
								<view class="onRRow twoRRow">
									{{
									                  item.irrigateMode == "1"
									                    ? "滴灌"
									                    : item.irrigateMode == "2"
									                    ? "漫灌"
									                    : item.irrigateMode == "3"
									                    ? "管灌"
									                    : item.irrigateMode == "4"
									                    ? "微喷"
									                    : "未知"
									                }}
								</view>
								<view class="onRRow twoRRow">
									{{item.stationtype == "1"
                      ? "自动站"
                      : item.stationtype == "2"
                      ? "人工站"
                      : "未知"}}
								</view>
							</view>
						</view>
					</view>
					<view class="BBBOX" v-if="tableParams" @click="toPath('./itemDataDetails?data=' + JSON.stringify(tableParams))">
						<view class="zwzz">
							查看更多
						</view>
						<view class="lfSan">

						</view>
					</view>
				</view>
			</view>
			<view class="title">
				<view class="gan">

				</view>
				<view class="wzzw">
					作物生育期用水
				</view>
			</view>
			<view class="ringBBox" v-for="(item,index) in abcde">
				<view class="ringTitle">
					<view class="yuan">
					</view>
					<view class="Rwz">
						{{item.wsName}}
					</view>
				</view>
				<view class="UChatsR">
					<!-- <view class="UChatsR" :style="`height: ${JS(chartDatas.series[0].data.length)}rpx;`"> -->
					<wRing :chartId="chartId + index" :title="item.plantName" :chartDatas="item.chartDatas"
						:time='item.date'></wRing>
				</view>
				<!-- <view class="rq">
					{{item.date}}
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import wRing from '@/components/uCharts/ring.vue'
	import wMIn from '@/components/uCharts/min.vue'
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	export default {
		data() {
			return {
				index: 0,
				max: 5,
				range: [],
				candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
				city: '',
				title: "春玉米",
				chartId: 'ucharts-demo',
				chartDatas: {
					"series": [{
						"data": [{
								"name": "灌浆期",
								"value": 23.34
							},
							{
								"name": "抽穗开花期",
								"value": 23.34
							},
							{
								"name": "成熟期",
								"value": 20
							},
							{
								"name": "幼苗期",
								"value": 18
							},
							{
								"name": "拔节抽雄期",
								"value": 8
							},
							{
								"name": "孕穗期",
								"value": 35
							},
							{
								"name": "抽雄开花期",
								"value": 12
							},
							{
								"name": "吐丝受精期",
								"value": 6
							},
						]
					}]
				},
				zhanIcon: false,
				isCheckAll: false,
				treeData: [],
				expandKeys: [],
				treeContent: '',
				time: [],
				series: [],
				type: 'day',
				areaId: null,
				tableHeader: [],
				tableList: [],
				tableDataArr: [],
				abcde: [],
				onLoadValue: null,
				tableParams:null,  //传给详情的参数
			};
		},
		components: {
			wRing,
			wMIn,
			LyTree,
		},
		onLoad(option) {
			if (option) {
				this.onLoadValue = null;
				this.onLoadValue = JSON.parse(option.name)
				this.onLoadDefault(JSON.parse(option.name))
			}

		},
		mounted() {
			let startTime = this.GetYear(-1)
			let endTime = this.getDates()
			this.range = [startTime, endTime]
			this.getTree()
		},
		methods: {
			// 默认加载选中--有页面路由参数时
			onLoadDefault(option) {
				this.expandKeys = []
				this.areaId = []
				this.treeContent = null
				this.tableHeader = []
				let arr = []
				let arrId = []
				arr.push(option.wsname)
				arrId.push(option.id)
				this.areaId = arrId.join(',')
				this.expandKeys = arr
				this.tableHeader = arr
				this.treeContent = arr.join(',')
			},
			// 作物生育期
			getShengYuQi() {
				this.$http.get('/irrigation/calendar/getPeriodAnnular', {
					areaIdArr: this.areaId,
					startTime: this.range[0],
					endTime: this.range[1],
					chaName: '第一茬',
				}).then(res => {
					// console.log(res, "作物生育期用水");
					let arr = []
					if (res.code == 200 && res.data.length > 0) {
						this.abcde = [];
						let temp = [];
						for (let i = 0; i < res.data.length; i++) {
							let alldata = {
								wsName: "",
								chartDatas: {
									series: [{
										data: []
									}]
								},
								periodVoListpro: [],
								periodVoListplus: [],
								irrigationTotal: "",
								date: "",
							};
							if (res.data[i].length !== 0) {
								res.data[i].forEach((item) => {
									alldata.wsName = item.wsName;
									alldata.plantName = item.cropIrrVoList[0].plantName;
									item.cropIrrVoList[0].chaIrrVoList.forEach((item) => {
										alldata.irrigationTotal = item.irrigationTotal;
										alldata.date = item.dateTime;
										item.periodVoList.forEach((item) => {
											let periodVoListpro = {};
											let periodVoListplus = {};
											periodVoListpro.value = item.accountFor;
											periodVoListpro.irrigationSum = item
												.irrigationSum;
											// periodVoListpro.periodId = item.periodId;
											periodVoListpro.name = item.periodName;
											periodVoListplus.value = item.irrigationSum;
											if (item.periodName !== null) {
												periodVoListplus.name =
													item.periodName +
													" " +
													" " +
													item.accountFor +
													"%" +
													" " +
													" " +
													item.irrigationSum +
													"m³";
											} else {
												periodVoListplus.name =
													"暂无" +
													" " +
													" " +
													item.accountFor +
													"%" +
													" " +
													" " +
													item.irrigationSum +
													"m³";
											}

											alldata.periodVoListpro.push(periodVoListpro);
											alldata.chartDatas.series[0].data.push(
												periodVoListpro)
											alldata.periodVoListplus.push(
												periodVoListplus);
										});
									});
								});
								// console.log(alldata,'dataall');
								temp.push(alldata);
							}
							if (i == res.data.length - 1) {
								// this.abcdeShow = true;
								// console.log("abcde111111", temp);
								this.abcde = temp;
								// setTimeout(() => {
								//   this.echartsone(temp);
								// }, 1000);
							}
						}

					}
				})
			},

			getTableData() {
				this.$http.get('/irrigation/calendar/getTableDataArr', {
					areaIdArr: this.areaId,
					startTime: this.range[0],
					endTime: this.range[1],
					pageNum: 1,
					pageSize: 5,
					statType: this.type,
				}).then(res => {
					this.tableParams = {
						areaIdArr: this.areaId,
						startTime: this.range[0],
						endTime: this.range[1],
						statType: this.type,
						tableHeader:this.tableHeader
					}
					// console.log(res, "1111111111111111111")
					if (res.code == 200 && res.data.length > 0) {
						this.tableDataArr = res.data
						setTimeout(() => {
							this.getDetailTable(0)
						}, 500)
					}

				})
			},
			getDetailTable(ind) {
				this.index = ind;
				this.tableList = this.tableDataArr[ind].rows
			},
			day(num) {
				uni.showLoading({
					title: '加载中'
				})
				if (num == 1) {
					this.type = 'day'
				} else if (num == 2) {
					this.type = 'month'
				} else {
					this.type = 'year'
				}
				this.getHistoryCharts()
			},
			getTree() {
				this.$http.get('/areaApp/getTreeAll').then(res => {
					// console.log(res, "树形菜单")
					if (res.code == 200 && res.data.length > 0) {
						this.treeData = res.data
						if (this.onLoadValue) {
							this.getHistoryCharts()
							this.getTableData();
							this.getShengYuQi()
						} else {
							this.defaultSelect()
						}

					}
				})
			},
			// 默认加载选中--无页面路由参数时
			defaultSelect() {
				let arr = []
				let arrId = []
				this.treeData[0].children.map((item, index) => {
					arr.push(item.label)
					arrId.push(item.id)
					if (index == this.treeData.length - 1) {
						this.expandKeys = arr
						this.areaId = arrId.join(',')
						this.tableHeader = arr
						this.treeContent = arr.join(',')
						uni.showLoading({
							title: '加载中'
						})
						
						this.getHistoryCharts()
						this.getTableData();
						this.getShengYuQi()

					}
				})
			},
			// 获取历史数据
			getHistoryCharts() {
				this.series = []
				this.time = []
				this.$http.get('/irrigation/calendar/getEchartsDataArr', {
					areaIdArr: this.areaId,
					startTime: this.range[0],
					endTime: this.range[1],
					statType: this.type
				}).then(res => {
					// console.log(res, "历史数据")
					let str = null;
					if (this.type == 'day') {
						str = '日'
					} else if (this.type == 'month') {
						str = '月'
					} else {
						str = '年'
					}
					if (
						res.code == 200 &&
						res.data.length > 0 &&
						res.data[0].length > 0
					) {
						res.data[0].map((item, index) => {
							this.time.push(item.alias);
						});
						let arr = [];
						res.data.map((val, ind) => {
							// console.log(val[0].wsName,"0000000000000000");
							if (val.length > 0) {
								arr.push({
									name: val[0].wsName,
									cumulativeSumArr: [],
									irrigationAmountArr: [],
									plant: [],
								});
								// 第一次填0操作
								let flag = true;
								val.map((item, index) => {
									if (this.time.includes(item.alias)) {
										let timeIndex = this.time.indexOf(item.alias);
										if (timeIndex != -1 && flag) {
											for (let i = 0; index < timeIndex; index++) {
												arr[ind].cumulativeSumArr.push(0);
												arr[ind].irrigationAmountArr.push(0);
												arr[ind].plant.push("暂无");
											}
										}
										// 填完后修改标志，后续不再添加
										flag = false;
									}
									arr[ind].cumulativeSumArr.push(item.cumulativeSumStat);
									arr[ind].irrigationAmountArr.push(item.irrigationAmountStat);
									arr[ind].plant.push(item.plantName ? item.plantName : "暂无");
								});
							}
							if (ind == res.data.length - 1) {
								// console.log(arr, "arr");
								let series = [];
								arr.map((item) => {
									series.push({
										name: item.name + "每" + str + "灌溉量 ",
										type: "column",
										// id: item.plant,
										// barWidth: "20%",
										data: item.irrigationAmountArr,
									}, {
										name: item.name + "累计灌溉量 ",
										type: "line",
										// lineWidth: "20%",
										// id: item.plant,
										// yAxisIndex: '1111',
										data: item.cumulativeSumArr,
									});
								});
								this.series = series;
								// this.echartsShow = false;
								// setTimeout(() => {
								//  this.echartsShow = true;
								// }, 500);
								// console.log(this.series, this.time, "echarts图表的series");
							}
						});
						setTimeout(() => {
							uni.hideLoading()
						}, 1000)
					}
				})
			},
			// 树形菜单全选
			// setCheckAll() {
			// 	this.$refs.tree.setCheckAll(!this.isCheckAll);
			// 	this.treeContent = '全选'
			// 	this.zhanIcon = false
			// 	let arr = []
			// 	this.treeData.map((item,index)=>{
			// 		if(item.children){
			// 			item.children.map((it,val)=>{
			// 				arr.push(it.id)
			// 			})				
			// 		}
			// 		if(index==this.treeData.length-1){
			// 			this.areaId = arr.join(',')
			// 			console.log(this.areaId,this.range,this.type,"22222")
			// 			this.getHistoryCharts()
			// 		}
			// 	})

			// },

			// 从obj参数中获取全选状态checkedall
			handleCheckChange(obj) {
				this.isCheckAll = obj.checkedall;
			},
			// 树形菜单内容
			getCheckedKeys() {
				// console.log(this.range, "时间")
				if (this.range.length != 2) {
					this.zhanIcon = false
					uni.showToast({
						title: '时间与站点必须选择',
						icon: 'error'
					})
					return
				}

				uni.showLoading({
					title: '加载中',
				})
				this.tableHeader = []
				this.tableDataArr = []			
				this.tableList = []
				this.abcde = []
				// console.log('仅叶子节点', this.$refs.tree.getCheckedKeys(true));
				// console.log('不包含半选中状态的节点', this.$refs.tree.getCheckedKeys());
				// console.log('包含半选中状态的节点', this.$refs.tree.getCheckedKeys(false, true));
				let nodeKeys = this.$refs.tree.getCheckedKeys(true);
				this.treeContent = nodeKeys.join(',')
				let arr = []
				let arr1 = []
				nodeKeys.map((item, index) => {
					this.treeData.map((item1, index1) => {
						if (item1.children) {
							item1.children.map((item2, index2) => {
								if (item2.label == item) {
									arr.push(item2.id)
									arr1.push(item2.label)
								}
							})
						}
					});
					if (index == nodeKeys.length - 1) {
						this.areaId = arr.join(',')
						this.zhanIcon = false
						this.tableHeader = arr1
						// console.log(this.areaId,"获取到的id")
						this.getHistoryCharts()
						this.getTableData();
						this.getShengYuQi()


					}
				})


			},
			seletZhanDian() {
				this.zhanIcon = !this.zhanIcon
			},
			// 获取（年-月-日）
			getDates() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//获取当前时间的N年前或者N年后
			GetYear(year) {
				var time = new Date();
				time.setFullYear(time.getFullYear() + year);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				m = m > 9 ? m : "0" + m;
				d = d > 9 ? d : "0" + d;
				return y + "-" + m + '-' + d;
			},
			toPath(url) {
				uni.navigateTo({
					url
				});
			},
			JS(l) {
				// console.log(l)
				return 300 + 150 * (l / 4);
			},
			dateFormat(time) {
				let date = new Date(time);
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				let hh = date.getHours();
				let mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				return y + '-' + m + '-' + d + '<br/>' + hh + ':' + mf + ':' + ss;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.zhandian {
		width: 544rpx;
		height: 64rpx;
		background: #FFFFFF;
		border: 1px solid rgba(217, 217, 217, 1);
		border-radius: 4rpx;
		display: flex;
		justify-content: space-around;
		line-height: 64rpx;
		position: relative;

		.inp {
			width: 80%;
			height: 100%;
			font-size: 14px;
		}

		.option {
			width: 544rpx;
			// height: 64rpx;
			position: absolute;
			top: 63rpx;
			background: #FFFFFF;
			border: 1px solid rgba(204, 204, 204, 0.25);
			z-index: 2;

			.btn {
				width: 160rpx;
				white-space: nowrap;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				color: #606266;
				margin-left: 20rpx;
				margin-top: 20rpx;
				text-align: center;
				padding: 0;
			}

			.btn1 {
				width: 110rpx;
				white-space: nowrap;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				color: #606266;
				float: right;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.selceBox {
		width: 702rpx;
		height: 244rpx;
		background: #FFFFFF;
		box-shadow: 0 2rpx 24rpx 0 rgba(0, 0, 0, 0.02);
		border-radius: 16rpx;
		margin: 24rpx auto;
		box-sizing: border-box;
		padding: 24rpx 28rpx;

		.top {
			margin-top: 28rpx;
		}

		.item {
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;

			.title {
				width: 84rpx;
				height: 44rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.85);
				text-align: right;
				line-height: 44rpx;
				font-weight: 400;
			}

			.box {
				width: 544rpx;
				height: 80rpx;
				box-sizing: border-box;
				// display: flex;
			}
		}
	}

	.centerBOX {
		width: 702rpx;
		margin: 24rpx auto;
		background: #FFFFFF;
		box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.02);
		border-radius: 8px;
		box-sizing: border-box;
		padding: 32rpx;

		.FromBox {
			.topBox {
				width: 100%;
				height: 88rpx;
				background: #FFFFFF;
				box-shadow: 0 2rpx 24rpx 0 rgba(0, 0, 0, 0.02);
				padding: 0 20rpx;
				box-sizing: border-box;
				display: flex;
				white-space: nowrap;
				overflow: hidden;
				overflow-x: auto;

				.item {
					.itt {
						width: fit-content;
						height: 86rpx;
						line-height: 86rpx;
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						font-weight: 400;
						color: #999999;
					}

					.itted {
						color: #09ABC6;
					}

					.xian {
						height: 2rpx;
						border-radius: 1rpx;
					}

					.xianed {
						background: #09ABC6;
					}
				}

				.itmg {
					margin-right: 98rpx;
				}
			}

			.centerBOXxxx {
				width: 100%;
				background: #FFFFFF;
				box-shadow: 0 2rpx 24rpx 0 rgba(0, 0, 0, 0.02);
				margin-top: 20rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.cnBOx {
					width: 100%;
					margin: 0 auto;
					display: flex;
					position: relative;

					.lf {
						width: 232rpx;
						height: 88rpx;
						box-shadow: 7.5px 0 rgba(0, 0, 0, .7);

						.oneItem {
							width: 100%;
							height: 88rpx;
							line-height: 88rpx;
							padding-left: 14rpx;
							font-family: PingFangSC-Medium;
							font-size: 26rpx;
							color: rgba(0, 0, 0, 0.85);
							font-weight: 500;
							background-color: #FAFAFA;
							border-bottom: 1px solid #E8E8E8;
						}

						.twoRRow {
							background-color: #FFFFFF;
							// line-height: 44rpx;
						}

						.shu {
							width: 30rpx;
							opacity: 0.12;
							background-image: linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0%, #000000 72%);
							border-radius: 0px;
							position: absolute;
							top: 0;
							left: 216rpx;
						}
					}

					.rg {
						width: calc(100% - 232rpx);
						background: #FFFFFF;
						overflow: hidden;
						overflow-x: auto;

						.ooRow {
							width: fit-content;
							height: 88rpx;
							background-color: #FAFAFA;
							white-space: nowrap;
							border-bottom: 1px solid #E8E8E8;
						}

						.onRRow {
							display: inline-block;
							width: 132rpx;
							height: 88rpx;
							font-family: PingFangSC-Medium;
							font-size: 26rpx;
							color: rgba(0, 0, 0, 0.85);
							line-height: 44rpx;
							font-weight: 500;
							margin-left: 14rpx;
							overflow: hidden;
						}

						.two {
							background-color: #FFFFFF;
						}

						.twoRRow {
							line-height: 88rpx;
						}
					}

				}

				.BBBOX {
					width: 100%;
					height: 60rpx;
					background-color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;

					.zwzz {
						width: 56px;
						height: 20px;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #999999;
						text-align: left;
						font-weight: 400;
						margin-right: 10rpx;
					}

					.lfSan {
						width: 0;
						height: 0;
						border-top: 5px solid transparent;
						/*这行去掉也行*/
						border-bottom: 5px solid transparent;
						border-right: 5px solid transparent;
						border-left: 5px solid #999999;
					}
				}
			}
		}

		.typeBox {
			width: 360rpx;
			height: 56rpx;
			margin: 32rpx auto;
			display: flex;

			.lo {
				width: 120rpx;
				height: 56rpx;
				border: 1rpx solid rgba(9, 171, 198, 1);
				border-radius: 16px 0px 0px 16px;
			}

			.lw {
				width: 120rpx;
				height: 56rpx;
				border-top: 1rpx solid rgba(9, 171, 198, 1);
				border-bottom: 1rpx solid rgba(9, 171, 198, 1);
			}

			.lt {
				width: 120rpx;
				height: 56rpx;
				border: 1rpx solid rgba(9, 171, 198, 1);
				border-radius: 0 32rpx 32rpx 0;
			}

			.item {
				line-height: 56rpx;
				font-family: PingFangSC-Regular;
				font-size: 13px;
				color: #25343B;
				text-align: center;
				font-weight: 400;
			}

			.ited {
				color: #FFFFFF;
				background: #09ABC6;
			}
		}

		.minBox {
			width: 100%;
			height: 720rpx;
			// background: rgba(255,3,3,0.04);
			margin-bottom: 42rpx;
		}

		.title {
			width: 100%;
			display: flex;
			align-items: center;

			.gan {
				width: 3px;
				height: 14px;
				background: #09ABC6;
			}

			.wzzw {
				height: 40rpx;
				font-family: PingFangSC-Medium;
				font-size: 28rpx;
				color: #333333;
				letter-spacing: 0;
				font-weight: 500;
				margin-left: 16rpx;
			}
		}

		.ringBBox {
			margin-top: 40rpx;

			.ringTitle {
				width: 100%;
				display: flex;
				align-items: center;

				.yuan {
					width: 8rpx;
					height: 8rpx;
					background: #09ABC6;
					border-radius: 50%;
				}

				.Rwz {
					height: 48rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #000000;
					letter-spacing: 0;
					text-align: left;
					line-height: 48rpx;
					font-weight: 400;
					margin-left: 16rpx;
				}
			}
		}

		.UChatsR {
			width: 100%;
			margin-top: 40rpx;
			// background-color: red;
		}

		.rq {
			width: 100%;
			height: 40rpx;
			font-family: PingFangSC-Medium;
			font-size: 28rpx;
			color: #666666;
			letter-spacing: 0;
			text-align: center;
			font-weight: 500;
		}
	}
</style>
