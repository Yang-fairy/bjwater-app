<template>
	<view>
		<view class="Otit">站点信息</view>
		<view class="OneBox" v-if="list">
			<view class="topBox">
				<view class="item">
					<view class="name">站点类型</view>
					<view class="nr">{{ list.stationtype == '1' ? '自动监测站' : list.stationtype == '2' ? '农田监测站' : '暂无' }}</view>
				</view>
				<view class="item">
					<view class="name">园区名称</view>
					<view class="nr">{{ list.park ? list.park : '暂无' }}</view>
				</view>
				<view class="item">
					<view class="name">联系人</view>
					<view class="nr">{{ list.name ? list.name : '暂无' }}</view>
				</view>
				<view class="item">
					<view class="name">电话</view>
					<view class="nr">{{ list.phone ? list.phone : '暂无' }}</view>
				</view>
			</view>
			<view class="bomBox" v-show="OneBoxShow">
				<view class="item">
					<view class="name">所属区</view>
					<view class="nr">{{ list.district ? list.district : '暂无' }}</view>
				</view>
				<view class="item">
					<view class="name">所属镇</view>
					<view class="nr">{{ list.town ? list.town : '暂无' }}</view>
				</view>
				<view class="item">
					<view class="name">所属村</view>
					<view class="nr">{{ list.street ? list.street : '暂无' }}</view>
				</view>
			</view>
			<view class="BBbox">
				<view class="BtnBox">
					<view class="btnBB" v-if="!OneBoxShow" @click="OneBoxShow = !OneBoxShow">
						<view class="wenzi">查看详情</view>
						<uni-icons type="bottom" color="#09ABC6" size="20" />
					</view>
					<view class="btnBB" v-else @click="OneBoxShow = !OneBoxShow">
						<view class="wenzi">收起</view>
						<uni-icons type="top" color="#09ABC6" size="20" />
					</view>
				</view>
			</view>
		</view>
		<view class="title" @click="TwoOBoxShow = !TwoOBoxShow" v-if="Cropdetail">
			<view class="WZ" style="width: 260rpx;">田间管理基本信息</view>
			<view :class="TwoOBoxShow ? 'yuan' : 'yuan yuaned'">
				<view class="topSan" v-if="TwoOBoxShow"></view>
				<view class="bomSan" v-else></view>
			</view>
		</view>
		<view class="OneBox" v-if="Cropdetail">
			<view class="topBox" v-show="TwoOBoxShow">
				<view class="item">
					<view class="name">茬口</view>
					<view class="nr">{{ Cropdetail.cname || ZW }}</view>
				</view>
				<view class="item">
					<view class="name">茬口日期</view>
					<view class="nr">{{ Cropdetail.beginTime && Cropdetail.beginTime.replace(/-/g, '/') }}-{{ Cropdetail.endTime && Cropdetail.endTime.replace(/-/g, '/') }}</view>
				</view>
				<view class="item">
					<view class="name">灌溉方式</view>
					<view class="nr">{{ getZDItem(irrigateTypeArr, Cropdetail.irrigateType) }}</view>
				</view>
				<view class="item">
					<view class="name">施肥系统</view>
					<view class="nr">{{ getZDItem(sysFertilizationArr, Cropdetail.fertilizationSystem) }}</view>
				</view>
				<view class="item">
					<view class="name">征地方式</view>
					<view class="nr">{{ Cropdetail.soilPreparationMethod || ZW }}</view>
				</view>
				<view class="item">
					<view class="name">作物类型</view>
					<view class="nr">{{ getCropItem(SecondList, Cropdetail.cropType) }}</view>
				</view>
				<view class="item">
					<view class="name">作物品种</view>
					<view class="nr">{{ getPZItem(Cropdetail.cropType, Cropdetail.breed) || PZItemLA }}</view>
				</view>
				<view class="item">
					<view class="name">播种日期</view>
					<view class="nr">{{ (Cropdetail.dataSowing && Cropdetail.dataSowing.replace(/-/g, '/')) || ZW }}</view>
				</view>
				<view class="item">
					<view class="name">定值日期</view>
					<view class="nr">{{ (Cropdetail.dateColonization && Cropdetail.dateColonization.replace(/-/g, '/')) || ZW }}</view>
				</view>
				<view class="item">
					<view class="name">密度</view>
					<view class="nr">{{ Cropdetail.density || ZW }}</view>
				</view>
				<view class="item">
					<view class="name">生理苗龄</view>
					<view class="nr">{{ Cropdetail.physiologicalAge || ZW }}</view>
				</view>
				<!-- <view class="item">
					<view class="name">
						生育期开始日期
					</view>
					<view class="nr">
						12345321
					</view>
				</view>
				<view class="item">
					<view class="name">
						生育期结束日期
					</view>
					<view class="nr">
						12345321
					</view>
				</view> -->
			</view>
		</view>
		<view class="title" @click="TwoBoxShow = !TwoBoxShow" v-if="GGdetails||SFdetails">
			<view class="WZ">施肥灌溉</view>
			<view :class="TwoBoxShow ? 'yuan' : 'yuan yuaned'">
				<view class="topSan" v-if="TwoBoxShow"></view>
				<view class="bomSan" v-else></view>
			</view>
		</view>
		<view class="OneBox">
			<view class="topBox" v-show="TwoBoxShow">
				<view v-if="SFdetails && SFdetails.length > 0" v-for="SFd in SFdetails" :key="'0' + SFd.id">
					<view class="item">
						<view class="name">有机肥名称</view>
						<view class="nr">{{ SFd.organicFertilizer || ZW }}</view>
					</view>
					<view class="item">
						<view class="name">用量</view>
						<view class="nr">{{ SFd.dosageOrganicFertilizer || ZW }}</view>
					</view>
					<view class="item">
						<view class="name">化肥名称</view>
						<view class="nr">{{ SFd.chemicalFertilizer || ZW }}</view>
					</view>
					<view class="item">
						<view class="name">养分配比</view>
						<view class="nr">{{ SFd.chemicalFertilizerRatio || ZW }}</view>
					</view>
					<view class="item">
						<view class="name">用量</view>
						<view class="nr">{{SFd.dosageChemicalFertilizer||ZW}}</view>
					</view>
					<view class="item">
						<view class="name">地膜用量</view>
						<view class="nr">{{SFd.dosageMulch||ZW}}</view>
					</view>
					<view class="item">
						<view class="name">地膜厚度</view>
						<view class="nr">{{SFd.ticknessMulch ||ZW}}</view>
					</view>
					<view class="item">
						<view class="name">整地做畦造墒水</view>
						<view class="nr">{{SFd.dosageMoisturewater ||ZW}}</view>
					</view>
				</view>
				<!-- 灌溉 -->
				<view v-if="GGdetails && GGdetails.length > 0" v-for="it in GGdetails" :key="it.id">
					<view class="item">
						<view class="name">日期</view>
						<view class="nr">{{ it.dateIrrigation.replace(/-/g, '/') }}</view>
					</view>
					<view class="item">
						<view class="name">灌溉水量</view>
						<view class="nr">{{ it.dosageIrrigation }}</view>
					</view>
					<view class="item">
						<view class="name">灌溉时长</view>
						<view class="nr">{{ it.durationIrrigation }}分钟</view>
					</view>
				</view>
				<view v-if="SFdetails && SFdetails.length > 0" v-for="item in SFdetails" :key="'1' + item.id">
					<view class="item">
						<view class="name">肥料名称</view>
						<view class="nr">{{item.fertilizer||ZW}}</view>
					</view>
					<view class="item">
						<view class="name">养分配比</view>
						<view class="nr">{{item.compoundFertilizerRatio||ZW}}</view>
					</view>
					<view class="item">
						<view class="name">用量</view>
						<view class="nr">{{item.dosageFertilizer||ZW}}</view>
					</view>
					<view class="item">
						<view class="name">叶面肥名称</view>
						<view class="nr">{{item.foliarFertilizer||ZW}}</view>
					</view>
					<view class="item">
						<view class="name">用量</view>
						<view class="nr">{{item.dosageFoliarFertilizer||ZW}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="title" @click="ThreeBoxShow = !ThreeBoxShow">
			<view class="WZ">成本效益</view>
			<view :class="ThreeBoxShow ? 'yuan' : 'yuan yuaned'">
				<view class="topSan" v-if="ThreeBoxShow"></view>
				<view class="bomSan" v-else></view>
			</view>
		</view>
		<view class="OneBox">
			<view class="topBox" v-show="ThreeBoxShow">
				<view class="item" v-for="i in 6">
					<view class="name">站点号</view>
					<view class="nr">12345321</view>
				</view>
			</view>
		</view>
		<view class="titt" v-show="ThreeBoxShow">
			<view class="shu"></view>
			<view class="wenzi">成本</view>
		</view>
		<view class="OneBox">
			<view class="topBox" v-show="ThreeBoxShow">
				<view class="item" v-for="i in 9">
					<view class="name">站点号</view>
					<view class="nr">12345321</view>
				</view>
			</view>
		</view>
		<view class="chengben" v-show="ThreeBoxShow">
			<view class="cbBox">
				<view class="item" v-for="i in 2">
					<view class="name">本茬口投入成本共计：</view>
					<view class="shuBox">
						<view class="sj">2789</view>
						<view class="dw">元/棚</view>
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
			ZW: '暂无',
			OneBoxShow: false,
			TwoOBoxShow: true,
			TwoBoxShow: true,
			ThreeBoxShow: true,
			id: null,
			chaId: null,
			list: null, //list.stationtype（1 自动监测站，2 人工监测站
			Cropdetail: null,
			irrigateTypeArr: null,
			sysFertilizationArr: null,
			SecondList: null,
			PZItemLA: null,
			SFdetails: null,
			GGdetails: null
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.chaId = options.chaId;
	},
	mounted() {
		uni.showLoading({
			title: '加载中'
		});
		this.getZD();
	},
	methods: {
		// 获取字典项
		getZD() {
			this.$http.get('/system/dict/data/type/irrigate_type').then(res => {
				console.log(res);
				if (res.code == 200) {
					this.irrigateTypeArr = res.data;
				}
			});
			this.$http.get('/system/dict/data/type/sys_fertilization').then(res => {
				if (res.code == 200) {
					this.sysFertilizationArr = res.data;
				}
			});
			this.$http.get('/breed/genre/getSecondList').then(res => {
				console.log(res);
				if (res.code == 200) {
					this.SecondList = res.data;
				}
			});
			this.getChaKou();
			this.getTianInfo();
		},
		// 根据字典项获取对应数据
		getZDItem(Arr, i) {
			let label;
			if (i != '') {
				Arr.map(item => {
					if (item.dictValue == i) {
						label = item.dictLabel;
					}
				});
			} else {
				label = '暂无';
			}
			return label;
		},
		getPZItem(LXid, PZid) {
			this.$http.get('/breed/genre/getBreed/' + LXid).then(res => {
				console.log(res);
				if (res.code == 200) {
					this.PZItemLA = this.getCropItem(res.data, PZid);
				}
			});
		},
		//作物种类
		getCropItem(Arr, i) {
			let label;
			if (i != '') {
				Arr.map(item => {
					if (item.genreId == i) {
						label = item.genreName;
					}
				});
			} else {
				label = '暂无';
			}
			return label;
		},
		// 站点信息
		getChaKou() {
			let url = '/area/' + this.id;
			this.$http.get(url).then(res => {
				console.log(res, '查询');
				if (res.code == 200 && res.data) {
					this.list = res.data;
					if (this.list.stationtype == 1) {
						this.getSFInfo();
					} else {
						this.getSFInfo();
						this.getGGInfo();
					}
				}
				uni.hideLoading();
			});
		},
		//施肥信息
		getSFInfo() {
			this.$http.get('/irrigation/getIrrigationByChaId', { chaId: this.chaId }).then(res => {
				console.log(res, '施肥信息');
				if (res.code == 200) {
					this.SFdetails = res.data;
				}
			});
		},
		//灌溉信息
		getGGInfo() {
			this.$http.get('/irrigation/getIrrChaId', { chaId: this.chaId }).then(res => {
				console.log(res, '灌溉信息');
				if (res.code == 200) {
					this.GGdetails = res.data;
				}
			});
		},
		// 田间信息
		getTianInfo() {
			this.$http.get('/farmactive/farmsetcha/getCropCha', { chaId: this.chaId }).then(res => {
				console.log(res, '田间信息');
				this.Cropdetail = res.data;
			});
		}
	}
};
</script>

<style scoped lang="scss">
.Otit {
	width: 64px;
	height: 44rpx;
	font-family: PingFangSC-Semibold;
	font-size: 32rpx;
	color: #09abc6;
	letter-spacing: 0;
	text-align: center;
	font-weight: 600;
	margin: 32rpx 30rpx;
}
.OneBox {
	// padding-bottom: 32rpx;
	.BBbox {
		width: 100%;
		background: #ffffff;
		.BtnBox {
			width: 688.4rpx;
			height: 105.08rpx;
			margin: 0 auto;
			display: flex;
			justify-content: flex-end;
			.btnBB {
				width: 180rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.wenzi {
					width: 112rpx;
					height: 48rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #09abc6;
					letter-spacing: 0;
					text-align: right;
					line-height: 47.1rpx;
					font-weight: 400;
				}
			}
		}
	}
	.topBox {
		background: #ffffff;
	}
	.bomBox {
		background: #ffffff;
	}
	.item {
		width: 688.4rpx;
		height: 105.08rpx;
		margin: 0 auto;
		border-bottom: 0.6rpx solid #e6e6e6;
		font-family: PingFangSC-Regular;
		font-size: 32rpx;
		color: #676c77;
		letter-spacing: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.name {
			width: 260rpx;
			height: 47.1rpx;
			line-height: 47.1rpx;
			font-weight: 400;
			text-align: left;
		}
		.nr {
			width: calc(100% - 290rpx);
			height: 47.1rpx;
			color: #25343b;
			text-align: right;
			line-height: 47.1rpx;
			font-weight: 400;
		}
	}
}
.title {
	width: 100%;
	padding-left: 30rpx;
	padding: 32rpx 30rpx;
	height: 44rpx;
	display: flex;
	align-items: center;
	.WZ {
		width: 128rpx;
		height: 44rpx;
		font-family: PingFangSC-Semibold;
		font-size: 32rpx;
		color: #09abc6;
		letter-spacing: 0;
		font-weight: 600;
	}
	.yuan {
		margin-left: 20rpx;
		width: 32rpx;
		height: 32rpx;
		background: #09abc6;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		.topSan {
			width: 0;
			height: 0;
			border-top: 5px solid transparent; /*这行去掉也行*/
			border-bottom: 5px solid #ffffff;
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
		}
		.bomSan {
			width: 0;
			height: 0;
			border-top: 5px solid #ffffff; /*这行去掉也行*/
			border-bottom: 5px solid transparent;
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
		}
	}
	.yuaned {
		align-items: flex-end;
	}
}
.titt {
	width: 100%;
	padding-left: 30rpx;
	height: 44rpx;
	margin: 32rpx 0;
	display: flex;
	align-items: center;
	.shu {
		width: 6rpx;
		height: 30rpx;
		background: #09abc6;
		margin-right: 16rpx;
	}
	.wenzi {
		width: 64rpx;
		height: 44rpx;
		font-family: PingFangSC-Medium;
		font-size: 32rpx;
		color: #333333;
		letter-spacing: 0;
		font-weight: 500;
	}
}
.chengben {
	width: 100%;
	padding: 16rpx 0;
	.cbBox {
		background: #ffffff;
		padding: 0 32rpx;
		.item {
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.name {
				width: 300rpx;
				height: 48rpx;
				font-family: PingFangSC-Regular;
				font-size: 30rpx;
				color: #676c77;
				letter-spacing: 0;
				line-height: 47.1rpx;
				font-weight: 400;
			}
			.shuBox {
				width: calc(100% - 350rpx);
				height: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.dw {
					width: 76rpx;
					height: 42rpx;
					line-height: 42rpx;
					font-family: PingFangSC-Regular;
					font-size: 30rpx;
					color: #25343b;
					letter-spacing: 0;
					font-weight: 400;
					margin-left: 16rpx;
				}
				.sj {
					width: 114rpx;
					height: 66rpx;
					line-height: 66rpx;
					font-family: PingFangSC-Semibold;
					font-size: 48rpx;
					color: #ff7400;
					letter-spacing: 0;
					font-weight: 600;
				}
			}
		}
	}
}
</style>
