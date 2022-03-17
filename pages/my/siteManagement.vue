<template>
	<view class="page">
		<view class="typeBox">
			<view class="typeItem" @click="shenhe(1)">
				<view :class="shType==1?'wenzi':'wz'">
					已审核
				</view>
				<view class="xx" v-show="shType==1">
					
				</view>
			</view>
			<view class="typeItem" @click="shenhe(0)">
				<view :class="shType==0?'wenzi':'wz'">
					未审核
				</view>
				<view class="xx" v-show="shType==0">
					
				</view>
			</view>
		</view>
		<view class="headerBox">
			<view class="lf">
					<picker @change="getPicType" :value="tyindex" :range="tyList" range-key="dictLabel" v-if="tyList.length>0">
					<view class="items">
						<view class="name">
							{{tyList[tyindex].dictLabel}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
					</picker>
				<picker @change="getPicStatus" :value="index" :range="list" range-key="dictLabel">
				<view class="items">
					<view class="name">
						{{list[index].dictLabel}}
					</view>
					<uni-icons type="bottom" color="#676C77" size="15" />
				</view>
				</picker>
				<picker @change="getPicSoil" :value="soilindex" :range="soilList" range-key="dictLabel" v-if="soilList.length>0">
				<view class="items">
					<view class="name">
						{{soilList[soilindex].dictLabel}}
					</view>
					<uni-icons type="bottom" color="#676C77" size="15" />
				</view>
				</picker>
			</view>
			<view class="rg" @click="query">
				<uni-icons type="search" color="#676C77" size="20" />
			</view>
		</view>
		<uni-swipe-action v-if="itList.length>0">
			<uni-swipe-action-item
			    :threshold="0" :disabled="shType==0" v-for="(it,index) in itList">
				<view class="content">
					<view class="title">
						<view class="oB" @click="itChecked(it)">
							<view :class="it.auditFlag==0?'y y1':'y'" v-if="shType==0">
								
							</view>
							{{it.wsname}}
						</view>
						<view class="SHBox" :class="shType==1?'SHBox':'wH'">
							{{shType==1?'已审核':'未审核'}}
						</view>
					</view>
					
					<view class="box" @click="todetails(it)">
						<view class="one">
							<view class="quan">
								{{tyList[it.stationtype-1].dictLabel}}
							</view>
							<view class="quan1">
								{{it.type==1?'日光温室':it.type==2?'塑料棚':it.type==3?'连栋温室':'暂无'}}
							</view>
							<view class="quan" v-if="soilList&&soilList.length>0">
								{{soilList[it.soilType].dictLabel}}
							</view>
						</view>
						<view class="text">
							园区名称：<span>{{it.park}}</span>
						</view>
						<view class="text">
							联系人：<span>{{it.name}}</span>
						</view>
						<view class="text">
							联系电话：<span>{{it.phone}}</span>
						</view>
						<view class="text">
							所在地区：<span v-if='it.town||it.stree'>{{it.town}}{{it.street}}</span><span v-else>暂无</span>
						</view>
						<view class="text">
							建站时间：<span>{{it.createTime}}</span>
						</view>
					</view>
				</view>
				<template v-slot:right>
					<view class="slot-button">
						<view class="slot-button-text" @click="todetails1(it)">
							<view class="yuan">
								
							</view>
							<view class="wenzi">
								编辑
							</view>
						</view>
					</view>
					<view class="slot-button">
						<view class="slot-button-text" @click="deleteItem(1,it)">
							<view class="yuan yuan1">
								
							</view>
							<view class="wenzi">
								删除
							</view>
						</view>
					</view>
				</template>
			</uni-swipe-action-item>
		</uni-swipe-action>	
		<view class="no" v-else>
			暂无数据
		</view>
		<view class="fab" @click="toPath('./addSite')">
			<view class="text">
				新建<br/>站点
			</view>
		</view>
		<uni-popup ref="alertSPDialog" type="dialog">
			<uni-popup-dialog type="info" content="是否同意该批用户提交的审核?" confirmText="同意" title="请确认" @confirm="SPdialogConfirm"
				@close="SPdialogClose"></uni-popup-dialog>
		</uni-popup>
		<view class="bottomBtn" v-if="shType==0">
			<view class="btnBox">
				<view class="yuanbox" @click="selectAlled()">
					<view :class="selectAll?'y y1':'y'">
						
					</view>
					<view class="wzz">
						全选
					</view>
				</view>
				<view class="btn" @click="SPdialogToggle">
					审核
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itList:[],
				selectAllNum:0,
				selectAll:false,
				shType:1,
				c: true,
				index:0,
				list:['全部','密云区','延庆区','朝阳区','丰台区','石景山区','海淀区','门头沟区','房山区','通州区','顺义区','昌平区','大兴区','怀柔区','平谷区','东城区','西城区'],
				tyindex:0,  //类型下标
				tyList:[1,2,3,4],
				soilList:[1,2,3,4],  //土壤质地
				soilindex:0,
				params:{
					auditFlag:0,   //0已审核 1未审核
					  status:null,
					  soilType:null,
					  stationtype:null,
				},
				zhanDataD:[],
				areaId:[],
				areaIds:null,
			};
		},
		mounted(){
			this.getTypeZiDian()
		},
		methods: {
			todetails(item){
				this.toPath('./siteDetails?id=' + item.id)
			},
			todetails1(item){
				this.toPath('./editSite?id=' + item.id)
			},
			// 点击未审核
			shenhe(num){
				if(this.shType !=num){
					this.itList = []
					this.shType=num
					this.query()
				}
				
			},
			query(){
				uni.showLoading({
					title:'加载中'
				})
				// console.log(this.params,"参数")
				if(this.shType==1){
					this.params.auditFlag=0;
				}else{
					this.params.auditFlag=1;
				};
				this.$http.get('/area/list',this.params).then(res=>{
					console.log(res,"查询")
					uni.hideLoading()
					if(res.code==200 && res.rows.length>0){
						this.itList = res.rows
						
					}else{
						this.itList = []
					}
				})
			},
			getTypeZiDian(){
				this.$http.get('/system/dict/data/type/station_type').then(res => {
					// console.log(res,"类型字典")
					if (res.code == 200 && res.data.length > 0) {
						this.tyList = res.data
						this.params.stationtype = res.data[0].dictValue
						this.getStatusZiDian()
					}
				})
			},
			getStatusZiDian(){
				this.$http.get('/system/dict/data/type/sys_normal_disable').then(res => {
					// console.log(res,"状态")
					if (res.code == 200 && res.data.length > 0) {
						this.list = res.data
						this.params.status = res.data[0].dictValue
						this.getSoilZiDian()
					}
				})
			},
			getSoilZiDian(){
				this.$http.get('/system/dict/data/type/soil_type').then(res => {
					// console.log(res,"土壤类型")
					if (res.code == 200 && res.data.length > 0) {
						this.soilList = res.data
						this.params.soilType = res.data[0].dictValue
						this.query()
					}
				})
			},
			getPicType(e){
				this.tyindex = e.target.value
				this.params.stationtype = this.tyList[this.tyindex].dictValue
			},
			getPicStatus(e){
				this.index=e.target.value
				this.params.status = this.list[this.index].dictValue
			},
			getPicSoil(e){
				this.soilindex = e.target.value;
				this.params.soilType = this.soilList[this.soilindex].dictValue
			},
			switch1Change: function(e) {
				e.detail = {
					value: false
				}
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				// console.log(e, "11111111")
				// setTimeout(()=>{
				// 	e.target.value = true;
				// },2000)
			},
			toPath(url) {
				uni.navigateTo({
					url
				});
			},
			deleteItem(i,item){
				// console.log(i,'删除')
				let url = '/areaApp/' + item.id
				this.$http.delete(url).then(res=>{
					console.log(res,"删除接口")
					if(res.code==200){
						this.query()
						uni.showToast({
							title:'删除成功'
						})
						
					}
				})
			},
			selectAlled(){
				this.selectAll=!this.selectAll
				if(this.selectAll){
					console.log('000',this.itList)
					this.itList.map((item,i)=>{
						this.itList[i].auditFlag=0;
					})
				}else{
					console.log('111')
					this.itList.map(item=>{
						item.auditFlag=1;
					})
				}
				
			},
			itChecked(item){
				console.log(item,'itChecked')
				if(item.auditFlag==0){
					item.auditFlag=1
				}else{
					item.auditFlag=0
				}
				if(item.auditFlag==0){
					this.selectAllNum++
				}else{
					this.selectAllNum--
				}
				if(this.selectAllNum==this.itList.length){
					this.selectAll=true;
				}else{
					this.selectAll=false;
				}
			},
			SPdialogToggle() {
				console.log('审批')
				this.$refs.alertSPDialog.open()
				
			},
			SPdialogConfirm() {
				console.log('审批点击确认')
				let arr = []
				this.itList.map((item,index)=>{
					if(item.auditFlag==0){
						arr.push(item.id)
					}
					if(index==this.itList.length-1){
						this.areaId = arr.join(',')
						this.shenHeHttp()
						
					}
				})
			},
			shenHeHttp(){
				let url = '/area/changeFlag/' + this.areaId
				this.$http.put(url).then(res=>{
					console.log(res,"审核接口")
					if(res.code==200){
						uni.showToast({
							title:'审核成功',
							icon:'success'
						})
						setTimeout(()=>{
							this.query()
						},800)
						
					}
				})
			},
			SPdialogClose(){
				console.log('审批点击关闭')
			},
		},
	
	
	}
</script>

<style lang="scss" scoped>
	.no{
		color: #000;
		font-size: 40rpx;
		text-align: center;
		margin-top: 40rpx;
	}
	.page {
		background-color: #F7F7F7;
	}
	.typeBox{
		width: 750rpx;
		height: 84rpx;
		background: #FFFFFF;
		display: flex;
		.typeItem{
			width: 50%;
			height: 100%;
			.wenzi{
				width: 96rpx;
				height: 44rpx;
				font-family: PingFangSC-Medium;
				font-size: 32rpx;
				color: #09ABC6;
				letter-spacing: 0;
				text-align: center;
				font-weight: 600;
				margin: 20rpx auto;
			}
			.wz{
				width: 96rpx;
				height: 44rpx;
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #25343B;
				letter-spacing: 0;
				text-align: center;
				font-weight: 500;
				margin: 20rpx auto;
			}
			.xx{
				width: 98rpx;
				height: 5rpx;
				background: #09ABC6;
				border-radius: 6rpx;
				margin: 0 auto;
			}
		}
	}
	.headerBox{
		width: 750rpx;
		height: 84rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		.lf{
			width: calc(100% - 85rpx);
			height: 34rpx;
			border-right: 2rpx solid rgba(227,227,227,1);
			display: flex;
			justify-content: space-around;
			.items{
				display: flex;
			}
		}
		.rg{
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
			font-size: 14px;
			color: #25343B;
			letter-spacing: 0.19px;
			font-weight: 600;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.oB{
				display: flex;
				align-items: center;
				white-space: nowrap;
				.y{
					width: 36.36rpx;
					height: 36.36rpx;
					border: 1.8rpx solid rgba(230,230,230,1);
					border-radius: 50%;
					margin-right: 18.42rpx;
				}
				.y1{
					background: #09ABC6;
				}
			}

			.SHBox {
				width: 86rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #09ABC6;
				text-align: right;
				font-weight: 400;
			}
			.wH{
				width: 86rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #FFBF00;
				text-align: right;
				font-weight: 400;
				white-space: nowrap;
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
	.slot-button {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		// background-color: #ff5a5f;
	}
	
	.slot-button-text {
		.yuan{
			width: 80rpx;
			height: 80rpx;
			background-image: linear-gradient(270deg, #FE443E 0%, #FD5929 100%);
			border-radius: 33px;
		}
		.yuan1{
			background-image: linear-gradient(90deg, #FD2B89 0%, #FE2C41 100%);
		}
		.wenzi{
			width: 100%;
			height: 36rpx;
			font-family: PingFangSC-Regular;
			font-size: 26rpx;
			color: #25343B;
			text-align: center;
			font-weight: 400;
		}
	}
	.bottomBtn{
		width: 750rpx;
		height: 166rpx;
		background: #FFFFFF;
		box-shadow: 0 0 14rpx 0 rgba(0,0,0,0.12);
		position: fixed;
		bottom: 0;
		.btnBox{
			width: 702rpx;
			height: 92rpx;
			margin: 8px auto auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.yuanbox{
				display: flex;
				.y{
					width: 36.36rpx;
					height: 36.36rpx;
					border: 1.8rpx solid rgba(230,230,230,1);
					border-radius: 50%;
					margin-right: 18.42rpx;
				}
				.y1{
					background: #09ABC6;
				}
				.wzz{
					margin-left: 18.42rpx;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #25343B;
					letter-spacing: 0;
					font-weight: 400;
				}
			}
			
			.btn{
				width: 300rpx;
				height: 92rpx;
				line-height: 92rpx;
				background: #09ABC6;
				border-radius: 48rpx;
				font-family: PingFangSC-Medium;
				font-size: 36rpx;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				font-weight: 500;
			}
		}
	}
</style>
