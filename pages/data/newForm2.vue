<template>
	<view class="page">
		<view class="header">
			<view class="top">
				<view class="icon">
				</view>
				<view class="text">
					站点号：12345321
				</view>
				<view class="text1">
					{{typeValue}}
				</view>
			</view>
			<view class="bottom">
				<view class="tiao">
					<view class="tiao1" style="width: 10%;">
					</view>
				</view>
				<view class="text">
					10%
				</view>
			</view>

		</view>
		<view class="tit">
			站点信息
		</view>
		<view class="OneBox">
			<view class="topBox">
				<view class="item">
					<view class="name">
						站点号
					</view>
					<view class="nr">
						<input type="text" value="" placeholder="请输入站点号" />
					</view>
				</view>
				<view class="item">
					<view class="name">
						站点类型
					</view>
					<view class="nr">
						<input type="text" value="" placeholder="请输入站点类型" />
					</view>
				</view>
				<view class="item">
					<view class="name">
						园区名称
					</view>
					<view class="nr">
						<input type="text" value="" placeholder="请输入园区名称" />
					</view>
				</view>
				<view class="item">
					<view class="name">
						联系人
					</view>
					<view class="nr">
						<input type="text" value="" placeholder="请输入联系人" />
					</view>
				</view>
				<view class="item">
					<view class="name">
						联系电话
					</view>
					<view class="nr">
						<input type="text" value="" placeholder="请输入联系电话" />
					</view>
				</view>
			</view>
			<view class="bomBox" v-show="OneBoxShow">
				<view class="item" v-for="i in 11">
					<view class="name">
						站点号
					</view>
					<view class="nr">
						12345321
					</view>
				</view>
			</view>
			<view class="BBbox">
				<view class="BtnBox">
					<view class="btnBB" v-if="!OneBoxShow" @click="OneBoxShow=!OneBoxShow">
						<view class="wenzi">
							查看详情
						</view>
						<uni-icons type="bottom" color="#09ABC6" size="20" />
					</view>
					<view class="btnBB" v-else @click="OneBoxShow=!OneBoxShow">
						<view class="wenzi">
							收起
						</view>
						<uni-icons type="top" color="#09ABC6" size="20" />
					</view>
				</view>
			</view>
		</view>
		<view class="tit" @click="TwoBoxShow=!TwoBoxShow">
			田间管理基本信息
			<view :class="TwoBoxShow?'yuan':'yuan yuaned'">
				<view class="topSan" v-if="TwoBoxShow">

				</view>
				<view class="bomSan" v-else>

				</view>
			</view>
		</view>
		<view v-show="TwoBoxShow">
			<view class="twoBox" v-for="(item,index) in tianArr" :key='index'>
				<view class="name">
					<view class="name1">
						<view class="text">
							茬口
						</view>
						<view class="inp">
							<picker @change="cha(index,$event)" :value="item.chaIndex" :range="item.chalist">
								{{item.chaIndex==-1?'请选择':item.chalist[item.chaIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							茬口日期
						</view>
						<view class="inp">
							<uni-datetime-picker type="date" :clearIcon="false" v-model="item.single">
								{{item.single?item.single:'请选择'}}
								<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
							</uni-datetime-picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							灌溉方式
						</view>
						<view class="inp">
							<picker @change="guan(index,$event)" :value="item.guanIndex" :range="item.guanlist">
								{{item.guanIndex==-1?'请选择':item.guanlist[item.guanIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							施肥系统
						</view>
						<view class="inp">
							<picker @change="sf(index,$event)" :value="item.sfIndex" :range="item.sflist">
								{{item.sfIndex==-1?'请选择':item.sflist[item.sfIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							整地方式
						</view>
						<view class="inp">
							<picker @change="zd(index,$event)" :value="item.zdIndex" :range="item.zdlist">
								{{item.zdIndex==-1?'请选择':item.zdlist[item.zdIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							作物类型
						</view>
						<view class="inp">
							<picker @change="zw(index,$event)" :value="item.zwIndex" :range="item.zwlist">
								{{item.zwIndex==-1?'请选择':item.zwlist[item.zwIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							作物品种
						</view>
						<view class="inp">
							<input type="text" :value="item.pz" placeholder="请输入作物品种" />
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							播种日期
						</view>
						<view class="inp">
							<uni-datetime-picker type="date" :clearIcon="false" v-model="item.singleBz">
								{{item.singleBz?item.singleBz:'请选择'}}
								<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
							</uni-datetime-picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							定植日期
						</view>
						<view class="inp">
							<uni-datetime-picker type="date" :clearIcon="false" v-model="item.singleDz">
								{{item.singleDz?item.singleDz:'请选择'}}
								<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
							</uni-datetime-picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							密度
						</view>
						<view class="inp">
							<input type="text" :value="item.md" placeholder="请输入" />
						</view>
						<view class="text">
							株/棚
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							生理苗龄
						</view>
						<view class="inp">
							<picker @change="sy(index,$event)" :value="item.syIndex" :range="item.sylist">
								{{item.syIndex==-1?'请选择':item.sylist[item.syIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							生育期开始时间
						</view>
						<view class="inp">
							<uni-datetime-picker type="date" :clearIcon="false" v-model="item.singleSy">
								{{item.singleSy?item.singleSy:'请选择'}}
								<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
							</uni-datetime-picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							生育期结束时间
						</view>
						<view class="inp">
							<uni-datetime-picker type="date" :clearIcon="false" v-model="item.singleEy">
								{{item.singleEy?item.singleEy:'请选择'}}
								<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
							</uni-datetime-picker>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" v-show="TwoBoxShow">
			<view class="del" @click="deleteTianJian">
				<uni-icons type="trash-filled" color="#C81717 " size="25" />
				删除
			</view>
			<view class="tiao">

			</view>
			<view class="add" @click="tianAdd">
				<uni-icons type="plus-filled" color="#09ABC6 " size="25" />
				增加管理
			</view>
		</view>
		<!-- 施肥灌溉 -->
		<view class="tit" @click="ThreeBoxShow=!ThreeBoxShow">
			施肥灌溉
			<view :class="ThreeBoxShow?'yuan':'yuan yuaned'">
				<view class="topSan" v-if="ThreeBoxShow">

				</view>
				<view class="bomSan" v-else>

				</view>
			</view>
		</view>
		<view v-show="ThreeBoxShow">
			<view class="twoBox" v-for="(item,index) in shiArr" :key='index'>
				<view class="name">
					<view class="name1">
						<view class="text">
							有机肥名称
						</view>
						<view class="inp">
							<picker @change="picYjf(index,$event)" :value="item.yjfIndex" :range="item.yjf">
								{{item.yjfIndex==-1?'请选择':item.yjf[item.yjfIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							用量
						</view>
						<view class="inp">
							<input type="text" :value="item.yl" placeholder="请输入" />
						</view>
						<view class="text">
							公斤/棚
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							化肥名称
						</view>
						<view class="inp">
							<picker @change="picHf(index,$event)" :value="item.hfIndex" :range="item.hf">
								{{item.hfIndex==-1?'请选择':item.hf[item.hfIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							养分配比
						</view>
						<view class="inp">
							<input type="text" :value="item.yf" placeholder="请输入" />
						</view>
						<view class="text">
							%
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							用量
						</view>
						<view class="inp">
							<input type="text" :value="item.yl1" placeholder="请输入" />
						</view>
						<view class="text">
							公斤/棚
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							地膜用量
						</view>
						<view class="inp">
							<input type="text" :value="item.dmyl" placeholder="请输入" />
						</view>
						<view class="text">
							公斤/棚
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							地膜厚度
						</view>
						<view class="inp">
							<input type="text" :value="item.dmhd" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							整地做畦造墒水
						</view>
						<view class="inp">
							<input type="text" :value="item.zdss" placeholder="请输入" />
						</view>
						<view class="text">
							方/棚
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							日期
						</view>
						<view class="inp">
							<uni-datetime-picker type="date" :clearIcon="false" v-model="item.rq">
								{{item.rq?item.rq:'请选择'}}
								<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
							</uni-datetime-picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							灌溉水量
						</view>
						<view class="inp">
							<input type="text" :value="item.ggsl" placeholder="请输入" />
						</view>
						<view class="text">
							方/棚
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							灌溉时长
						</view>
						<view class="inp">
							<input type="text" :value="item.ggsc" placeholder="请输入" />
						</view>
						<view class="text">
							分钟
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							肥料名称
						</view>
						<view class="inp">
							<picker @change="picFlmc(index,$event)" :value="item.flmcIndex" :range="item.flmclist">
								{{item.flmcIndex==-1?'请选择':item.flmclist[item.flmcIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							养分配比
						</view>
						<view class="inp">
							<input type="text" :value="item.yfpb" placeholder="请输入" />
						</view>
						<view class="text">
							%
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							用量
						</view>
						<view class="inp">
							<input type="text" :value="item.yl2" placeholder="请输入" />
						</view>
						<view class="text">
							公斤/棚
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							叶面肥名称
						</view>
						<view class="inp">
							<picker @change="picYmf(index,$event)" :value="item.ymfIndex" :range="item.ymflist">
								{{item.ymfIndex==-1?'请选择':item.ymflist[item.ymfIndex]}}
								<uni-icons type="right" color="grey" size="15" style="margin-left:20rpx" />
							</picker>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="name1">
						<view class="text">
							用量
						</view>
						<view class="inp">
							<input type="text" :value="item.yl3" placeholder="请输入" />
						</view>
						<view class="text">
							20 克/棚
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" v-show="ThreeBoxShow">
			<view class="del" @click="deleteShiFei">
				<uni-icons type="trash-filled" color="#C81717 " size="25" />
				删除
			</view>
			<view class="tiao">
		
			</view>
			<view class="add" @click="shiFeiAdd">
				<uni-icons type="plus-filled" color="#09ABC6 " size="25" />
				增加施肥情况
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				shiArr:[
					{
						yjf:[1,2,3,4],
						yjfIndex:-1,
						yl:null,
						hf:[1,2,3,4],
						hfIndex:-1,
						yf:null,
						yl1:null,
						dmyl:null,
						dmhd:null,
						zdss:null,   //整地做畦造墒水
						rq:null,
						ggsl:null,  //灌溉水量
						ggsc:null,  //灌溉时长
						flmclist:[1,2,3,4], //肥料名称
						flmcIndex:-1,
						yfpb:null, //养分配比
						ymflist:[1,2,3,4],  //叶面肥
						ymfIndex:-1,
						yl2:null,
						yl3:null,
					}
				],
				tianArr: [{
					chalist: [1, 2, 3, 4],
					chaIndex: -1, //茬口
					single: null, //日期
					sflist: [1, 2, 3, 4], //施肥
					sfIndex: -1,
					guanlist: [1, 2, 3, 4], //灌溉
					guanIndex: -1,
					zdlist: [1, 2, 3, 4], //整地
					zdIndex: -1,
					zwlist: [1, 2, 3, 4], //作物
					zwIndex: -1,
					singleBz: null, //播种
					singleDz: null, //定值
					sylist: [1, 2, 3, 4], //生育
					syIndex: -1,
					singleSy: null, //生育期开始
					singleEy: null, //生育期结束
					pz: null, //品种
					md: null, //密度
				}],
				typeValue: null,
				TwoBoxShow: false,
				ThreeBoxShow:true,
				OneBoxShow: false,

			}
		},
		onLoad(a) {
			// 0人工站  1自动站
			// console.log(a, "aaaaaaaaaaaaa")
			if (a.id == 0) {
				this.typeValue = '人工站'
			} else {
				this.typeValue = '自动站'
			}
		},
		methods: {
			// 增加田间管理
			tianAdd() {
				let arr = JSON.parse(JSON.stringify(this.tianArr[0]))
				this.tianArr.push(arr)
			},
			// 删除田间管理
			deleteTianJian() {
				this.tianArr.pop()
			},
			// 增加施肥灌溉
			shiFeiAdd(){
				let arr = JSON.parse(JSON.stringify(this.shiArr[0]))
				this.shiArr.push(arr)
			},
			// 删除施肥灌溉
			deleteShiFei(){
				this.shiArr.pop()
			},
			// ------------施肥灌溉
			// 有机肥名称
			picYjf: function(index, e) {
				console.log('施肥灌溉-有机肥名称', index, e.target.value)
				this.shiArr[index].yjfIndex = e.target.value
			},
			// 化肥名称
			picHf: function(index, e) {
				console.log('施肥灌溉-化肥名称', index, e.target.value)
				this.shiArr[index].hfIndex = e.target.value
			},
			// 肥料名称
			picFlmc: function(index, e) {
				console.log('施肥灌溉-肥料名称', index, e.target.value)
				this.shiArr[index].flmcIndex = e.target.value
			},
			// 叶面肥
			picYmf: function(index, e) {
				console.log('施肥灌溉-叶面肥', index, e.target.value)
				this.shiArr[index].ymfIndex = e.target.value
			},
			
			// ----------田间基本管理
			// 选择茬口
			cha: function(index, e) {
				console.log('picker发送选择改变，携带值为', index, e.target.value)
				this.tianArr[index].chaIndex = e.target.value
			},
			// 选择灌溉方式
			guan: function(index, e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.tianArr[index].guanIndex = e.target.value
			},
			// 选择施肥系统
			sf: function(index, e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.tianArr[index].sfIndex = e.target.value
			},
			// 选择整地
			zd: function(index, e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.tianArr[index].zdIndex = e.target.value
			},
			// 选择作物
			zw: function(index, e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.tianArr[index].zwIndex = e.target.value
			},
			// 选择生育
			sy: function(index, e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.tianArr[index].syIndex = e.target.value
			},
		}


	}
</script>

<style lang="scss" scoped>
	.page {
		width: 750rpx;
		// height: 164rpx;
		background: #F7F7F7;


		.header {
			width: 100%;
			height: 164rpx;
			background-color: #fff;
			padding: 24rpx 24rpx 0 24rpx;
			box-sizing: border-box;

			.top {
				display: flex;
				align-items: center;
				position: relative;

				.icon {
					width: 32rpx;
					height: 32rpx;
					border: 1px solid pink;
					margin-right: 16rpx;
				}

				.text {
					font-family: PingFangSC-Medium;
					font-size: 18px;
					color: #25343B;
					letter-spacing: 0;
					font-weight: 500;
				}

				.text1 {
					position: absolute;
					right: 0;
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #FFBF00;
					letter-spacing: 0;
					font-weight: 500;
				}
			}

			.bottom {
				margin-top: 30rpx;
				display: flex;
				align-items: center;

				.tiao {
					width: 610rpx;
					height: 16rpx;
					background: #C1EDF5;
					border-radius: 8rpx;
					position: relative;

					.tiao1 {
						height: 100%;
						position: absolute;
						top: 0;
						background-image: linear-gradient(90deg, #15D9E5 0%, #09ADE9 100%);
						border-radius: 4px;
					}
				}

				.text {
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: #00CCEE;
					letter-spacing: 0;
					text-align: right;
					line-height: 22.11px;
					font-weight: 500;
				}
			}


		}

		.tit {
			font-family: PingFangSC-Semibold;
			font-size: 16px;
			color: #09ABC6;
			letter-spacing: 0;
			text-align: left;
			font-weight: 600;
			margin-top: 32rpx;
			margin-bottom: 32rpx;
			padding: 0 24rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.yuan {
				margin-left: 20rpx;
				width: 32rpx;
				height: 32rpx;
				background: #09ABC6;
				border-radius: 100%;
				display: flex;
				justify-content: center;

				.topSan {
					width: 0;
					height: 0;
					border-top: 5px solid transparent;
					/*这行去掉也行*/
					border-bottom: 5px solid #FFFFFF;
					border-right: 5px solid transparent;
					border-left: 5px solid transparent;
				}

				.bomSan {
					width: 0;
					height: 0;
					border-top: 5px solid #FFFFFF;
					/*这行去掉也行*/
					border-bottom: 5px solid transparent;
					border-right: 5px solid transparent;
					border-left: 5px solid transparent;
				}
			}

			.yuaned {
				align-items: flex-end;
			}
		}

		.OneBox {

			// padding-bottom: 32rpx;
			.BBbox {
				width: 100%;
				background: #FFFFFF;

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
							color: #09ABC6;
							letter-spacing: 0;
							text-align: right;
							line-height: 47.1rpx;
							font-weight: 400;
						}
					}
				}
			}

			.topBox {
				background: #FFFFFF;
			}

			.bomBox {
				background: #FFFFFF;
			}

			.item {
				width: 688.4rpx;
				height: 105.08rpx;
				margin: 0 auto;
				border-bottom: 0.6rpx solid #E6E6E6;
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #676C77;
				letter-spacing: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.name {
					width: 130.44rpx;
					height: 47.1rpx;
					line-height: 47.1rpx;
					font-weight: 400;
					text-align: left;
				}

				.nr {
					width: calc(100% - 160rpx);
					height: 47.1rpx;
					color: #25343B;
					text-align: right;
					line-height: 47.1rpx;
					font-weight: 400;
				}
			}
		}

		.twoBox {
			width: 100%;
			padding: 0 24rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-top: 40rpx;

			.name {
				width: 100%;
				height: 105.08rpx;
				line-height: 105.08rpx;
				background: #FFFFFF;
				margin-top: 20rpx;

				.name1 {
					margin: 0 auto;
					width: 100%;
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
					// width: 50%;
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
		}

		.btn {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			height: 106rpx;
			background: #FFFFFF;

			.del {
				display: flex;
				align-items: center;
				font-family: PingFangSC-Regular;
				font-size: 15px;
				color: #C81717;
				letter-spacing: 0;
				font-weight: 400;
			}

			.tiao {
				width: 2rpx;
				height: 38rpx;
				opacity: 0.3;
				background-color: rgba(200, 200, 200, 1);
				border: 1px solid rgba(200, 200, 200, 1);
			}

			.add {
				display: flex;
				align-items: center;
				font-family: PingFangSC-Regular;
				font-size: 15px;
				color: #09ABC6;
				letter-spacing: 0;
				font-weight: 400;
			}
		}
	}
</style>
