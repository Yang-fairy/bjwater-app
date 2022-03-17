<template>
	<view class="page">
		<view class="headerBox">
			<view class="lf">
				<picker v-if="ZtArray.length>0" @change="getStatus" :value="ZtIndex" :range="ZtArray"
					range-key="dictLabel">
					<view class="items">
						<view class="name">
							{{ZtArray[ZtIndex].dictLabel}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
				</picker>
				<picker v-if="zhanDian.length>0" @change="getZhanDian" type="daterange" :value="zdindex"
					:range="zhanDian" range-key="label">
					<view class="items">
						<view class="name">
							{{zhanDian[zdindex].label}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
				</picker>
				<uni-datetime-picker v-model="single" type="daterange" @change='getTime'>
					<view class="items">
						<view class="name">
							{{single[0]}} - {{single[1]}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
				</uni-datetime-picker>
			</view>
			<!-- <view class="rg">
				<uni-icons type="search" color="#676C77" size="20" />
			</view> -->
		</view>
		<view v-if="ZhanData.length>0">
			
		
		<view class="content" v-for="(item,index) in ZhanData" :key='index'>
			<view class="title">
				{{item.sbname}}
				<switch :checked='item.usingFlag==0?1:0' disabled color='#09ABC6' class="switch" />

			</view>
			<view class="box">
				<view class="one">
					<view :class="item.equipmentStatus=='1'?'quan':'quan quanH'" >
						{{item.equipmentStatus=='1'?'设备正常':item.equipmentStatus=='2'?'设备异常':item.equipmentStatus=='3'?'流量到期':item.equipmentStatus=='4'?'数据中断':item.equipmentStatus=='5'?'长期无变化':'暂无'}}
					</view>
					<view class="quan1">
						流量剩余{{item.flowRemainingDays}}天
					</view>
					<!-- <view class="quan">
						电量80%
					</view> -->
				</view>
				<view class="text">
					所属站点：<span>{{item.areaName}}</span>
				</view>
				<view class="text">
					生产商：<span>{{item.manufacturer?item.manufacturer:'暂无'}}</span>
				</view>
				<view class="text">
					经销商：<span>{{item.distributor?item.distributor:'暂无'}}</span>
				</view>
				<view class="text">
					最后数据发送时间：<span>{{item.lastTime}}</span>
				</view>
				<view class="text">
					创建时间：<span>{{item.createTime}}</span>
				</view>
			</view>
		</view>
		</view>
		<view class="no" v-else>
			暂无数据
		</view>
		<view class="fab" @click="toPath('./addDevice')">
			<view class="text">
				新建<br />设备
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				c: true,
				zdindex: 0,
				ZtArray: [1, 2, 3, 4],
				ZtIndex: 0,
				single: [],
				zhanDian: [],
				ZhanData: [],
				equipmentStatus:null,
				deptId:null
			};
		},
		mounted() {
			uni.showToast({
				title:'三项全选会自动查询哦',
				icon:'none'
			})
			let startTime = this.GetYear(-1)
			let endTime = this.getDates()
			this.single = [startTime, endTime]
			this.getHZt()
		},
		methods: {
			query() {
				uni.showLoading({
					title:'加载中'
				})
				this.$http.get('/dev/sensb/selectDeviceList', {
					equipmentStatus: this.equipmentStatus,
					deptId: this.deptId,
					beginTime: this.single[0],
					endTime: this.single[1]
				}).then(res => {
					// console.log(res, "查询结果")
					if (res.code == 200 && res.rows.length > 0) {
						this.ZhanData = res.rows
					}else{
						this.ZhanData = []
					}
					uni.hideLoading()
				})
			},
			getTime(e) {
				this.single = e
				// console.log(this.equipmentStatus,this.deptId,this.single,"33333333333")
				if(this.equipmentStatus && this.deptId && this.single.length==2){
					this.query()
				}else{
					uni.showToast({
						title:'三项需全选哦',
						icon:'error'
					})
				}
				
			},
			getHZt() {
				this.$http.get('/system/dict/data/type/equipment_status').then(res => {
					// console.log(res,"状态字典")
					if (res.code == 200 && res.data.length > 0) {
						this.ZtArray = res.data
						this.equipmentStatus = res.data[0].dictValue
						this.getZhanDianJiekou()
					}
				})
			},
			getZhanDianJiekou() {
				this.$http.get('/system/dept/treeselect').then(res => {
					// console.log(res,"所属区域")
					if (res.code == 200 && res.data.length > 0) {
							if (res.data[0].children) {
								this.zhanDian = res.data[0].children
								this.deptId = res.data[0].children[0].id
							} else {
								this.zhanDian = res.data
								this.deptId = res.data[0].id
								
							}
							this.query()
						}

					
				})
			},
			switch1Change: function(e) {
				e.detail = {
					value: false
				}
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				console.log(e, "11111111")
				// setTimeout(()=>{
				// 	e.target.value = true;
				// },2000)
			},
			// 获取状态
			getStatus(e) {
				this.ZtIndex = e.target.value
				this.equipmentStatus = this.ZtArray[this.ZtIndex].dictValue
				// console.log(this.ZtArray[this.ZtIndex].dictValue, "状态")
				if(this.equipmentStatus && this.deptId && this.single.length==2){
					this.query()
				}else{
					
				}
			},
			getZhanDian(e) {
				this.zdindex = e.target.value
				this.deptId = this.zhanDian[this.zdindex].id
				// console.log(this.zhanDian[this.zdindex].id, "所属站点id")
				if(this.equipmentStatus && this.deptId && this.single.length==2){
					this.query()
				}else{
					
				}
			},
			toPath(url) {
				uni.navigateTo({
					url
				});
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
		},
	}
</script>

<style lang="scss" scoped>
	.no{
		font-size: 40rpx;
		text-align: center;
		margin-top: 40rpx;
		font-weight: bold;
	}
	.page {
		background-color: #F7F7F7;
	}

	.headerBox {
		width: 750rpx;
		height: 84rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.lf {
			width: 100%;
			height: 34rpx;
			border-right: 2rpx solid rgba(227, 227, 227, 1);
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

	.content {
		width: 702rpx;
		height: 424rpx;
		margin: 0 auto;
		border-radius: 8px;
		background-color: #fff;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-top: 20rpx;
		box-sizing: border-box;

		.title {
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			border-bottom: 1rpx solid rgba(227, 227, 227, 1);
			font-family: PingFangSC-Semibold;
			font-size: 16px;
			color: #25343B;
			letter-spacing: 0.19px;
			font-weight: 600;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.switch {
				height: 90rpx;
			}
		}

		.box {
			width: 100%;
			height: calc(100% - 90rpx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.one {
				width: 100%;
				height: 10%;
				margin-bottom: 10rpx;
				display: flex;

				.quan {
					width: 130rpx;
					height: 48rpx;
					line-height: 48rpx;
					border: 1px solid rgba(9, 171, 198, 1);
					border-radius: 12px;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #09ABC6;
					letter-spacing: 0.14px;
					text-align: center;
					font-weight: 400;
					margin-right: 20rpx;
				}
				.quanH{
					border: 1px solid red;
					color: red;
				}

				.quan1 {
					width: 180rpx;
					height: 48rpx;
					line-height: 48rpx;
					border: 1px solid rgba(9, 171, 198, 1);
					border-radius: 12px;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #09ABC6;
					letter-spacing: 0.14px;
					text-align: center;
					font-weight: 400;
					margin-right: 20rpx;
				}
			}

			.text {
				font-family: PingFangSC-Regular;
				font-size: 13px;
				color: #999999;
				text-align: left;
				font-weight: 400;
				// margin-top: 10px;

				span {
					font-family: PingFangSC-Regular;
					font-size: 13px;
					color: #666666;
					text-align: left;
					font-weight: 400;
				}
			}

		}


	}

	.fab {
		width: 144rpx;
		height: 144rpx;
		background-image: linear-gradient(-41deg, #0682C6 0%, #09ABC6 100%);
		position: fixed;
		right: 40rpx;
		bottom: 226rpx;
		border-radius: 50%;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
