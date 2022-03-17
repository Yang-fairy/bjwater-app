<template>
	<view>
		<view class="topBox" v-if="tableName.length>0">
			<view :class="ind<tableName.length?'item itmg':'item'" v-for="(item,ind) in tableName"
				@click="getDetailTable(ind)">
				<view :class="index==ind?'itt itted':'itt'">
					{{item}}
				</view>
				<view :class="index==ind?'xian xianed':'xian'">

				</view>
			</view>
		</view>
		<view class="centerBOX">
			<view class="cnBOx">
				<view class="lf" v-if="tableList.length>0">
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
			<view class="BBBOX">

			</view>
			<!-- <view class="loadmore" v-if="showLoadMore">
				<uni-icons type="spinner-cycle" color="#999999" size="20" v-if="loadMoreText=='加载中...'" />
				{{loadMoreText}}
			</view> -->
		</view>
		<uni-pagination :total="total" :current="current" @change="change" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				max: 10,
				// loadMoreText: "加载中...",
				showLoadMore: true,
				params:null,
				tableName:[],
				tableList:[],
				current:1,
				total:100,
				areaIdArr:null,
			}
		},
		onLoad(option) {
			// console.log(JSON.parse(option.data),"Cansji")
			if(option){
				let da = JSON.parse(option.data)
				this.areaIdArr = JSON.parse(option.data).areaIdArr.split(',')
				this.params = {
					areaIdArr: this.areaIdArr[this.current-1],
					startTime: da.startTime,
					endTime: da.endTime,
					statType: da.statType,
					pageNum: this.current,
					pageSize: 10,
				}
				this.tableName = da.tableHeader
				this.getTableData()
			}
		},
		//页面卸载
		// onUnload() {
		// 	this.max = 0,
		// 	this.data = [],
		// 	this.loadMoreText = "加载更多",
		// 	this.showLoadMore = false;
		// },
		// 下拉触底
		// onReachBottom() {
		// 	// console.log("onReachBottom");
		// 	if (this.max > 40) {
		// 		this.loadMoreText = "没有更多数据了!"
		// 		return;
		// 	}
		// 	this.showLoadMore = true;
		// 	setTimeout(() => {
		// 		this.setListData();
		// 	}, 300);
		// },
		methods: {
			getTableData() {
				uni.showLoading({
					title:'加载中'
				})
				this.$http.get('/irrigation/calendar/getTableDataArr', this.params).then(res => {
					console.log(res, "1111111111111111111")
					if (res.code == 200 && res.data.length > 0) {
						this.total = res.data[0].total
						this.tableList = res.data[0].rows
						uni.hideLoading()
					}
			
				})
			},
			getDetailTable(ind){
				this.current = 1
				this.tableList = []
				this.total = 0
				this.index = ind
				this.getTableData()
			},
			change(e) {
				this.current = e.current
				this.tableList = [];
				this.getTableData()
				// this.getDetailTable(this.current-1)
			},
			setListData() {
				this.max += 10;
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
	.topBox {
		width: 750rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0 2rpx 24rpx 0 rgba(0, 0, 0, 0.02);
		padding: 0 22rpx;
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

	.centerBOX {
		width: 750rpx;
		background: #FFFFFF;
		box-shadow: 0 2rpx 24rpx 0 rgba(0, 0, 0, 0.02);
		margin-top: 16rpx;

		.cnBOx {
			width: 662rpx;
			margin: 0 auto;
			padding-top: 28rpx;
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
					line-height: 88rpx;
				}

				.shu {
					width: 30rpx;
					opacity: 0.12;
					background-image: linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0%, #000000 72%);
					border-radius: 0px;
					position: absolute;
					top: 28rpx;
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
		}

		.loadmore {
			width: 100%;
			line-height: 80rpx;
			background-color: #F7F7F7;
			display: flex;
			align-items: center;
			justify-content: center;

			.wzi {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #999999;
				letter-spacing: 0;
				font-weight: 400;
				margin-left: 28.2rpx;
			}
		}
	}
</style>
