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
				<picker @change="getPicRole" :value="roleindex" :range="rolelist" range-key="roleName"
					v-if="rolelist.length>0">
					<view class="items">
						<view class="name">
							{{rolelist[roleindex].roleName}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
				</picker>
				<picker @change="getPicDanWei" :value="index" :range="list" range-key="unitName" v-if="list.length>0">
					<view class="items">
						<view class="name">
							{{list[index].unitName}}
						</view>
						<uni-icons type="bottom" color="#676C77" size="15" />
					</view>
				</picker>
			</view>
			<view class="rg" @click="getYiShen">
				<uni-icons type="search" color="#676C77" size="20" />
			</view>
		</view>
		<view v-if="itList.length>0">
			
	
		<view class="content" v-for="it in itList">
			<view class="title">
				<view class="oB" @click="itChecked(it)">
					<view :class="it.status==0?'y y1':'y'" v-if="shType==0">

					</view>
					{{it.roleNames}}（{{it.phonenumber?it.phonenumber:'暂无'}}）
				</view>
				<view class="SHBox" :class="shType==1?'SHBox':'wH'">
					{{shType==1?'已审核':'未审核'}}
				</view>
			</view>
			<view class="box">
				<view class="text">
					用户角色：<span>{{it.roleNames?it.roleNames:'暂无'}}</span>
				</view>
				<view class="text">
					手机号：<span>{{it.phonenumber?it.phonenumber:'暂无'}}</span>
				</view>
				<view class="text">
					所在单位：<span>{{it.unitNames?it.unitNames:'暂无'}}</span>
				</view>
				<view class="text">
					创建时间：<span>{{it.createTime?it.createTime:'暂无'}}</span>
				</view>
				<view class="text">
					最后登录IP：<span>{{it.loginIp?it.loginIp:'暂无'}}</span>
				</view>
				<view class="text">
					最后登录时间：<span>{{it.loginDate?it.loginDate:'暂无'}}</span>
				</view>
			</view>
			<view class="bottomBBox" @click="dialogToggle(it)" v-if="shType==1">
				<uni-icons type="refreshempty" color="#09ABC6" size="30" />
				<view class="wenzi">
					重置密码
				</view>
			</view>
		</view>
			</view>
		<view class="no"  v-else>
			暂无数据
		</view>
		<view class="fab" @click="toPath('./addUser')">
			<view class="text">
				新建<br />用户
			</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog content="确定重置密码?" title=" " @confirm="dialogConfirm" @close="dialogClose">
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="alertSPDialog" type="dialog">
			<uni-popup-dialog type="info" content="是否同意该批用户提交的审核?" confirmText="同意" title="请确认"
				@confirm="SPdialogConfirm" @close="SPdialogClose"></uni-popup-dialog>
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
				itList: [],
				selectAllNum: 0,
				selectAll: false,
				shType: 1,
				c: true,
				index: 0,
				list: [],
				rolelist: [],
				roleindex: 0,
				params: {
					status: 0, //0已审核 1未审核
					unitId: null,
					roleId: null,
				},
				resetId:null,
			};
		},
		mounted() {
			this.getDanWeiHttp()
			this.getRoleHttp()
			setTimeout(()=>{
				this.getYiShen()
			},200)
		},
		methods: {
			// 点击未审核
			shenhe(num){
				if(this.shType !=num){
					this.itList = []
					this.shType=num
					this.getYiShen()
				}
				
			},
			getYiShen() {
				this.itList=[]
				uni.showLoading({
					title:'加载中'
				})
				if(this.shType==1){
					this.params.status=0;
				}else{
					this.params.status=1;
				};
				this.itList = []
				this.$http.get('/system/user/userAll', this.params).then(res => {
					// console.log(res, "查询结果")
					uni.hideLoading()
					if(res.code==200 && res.rows.length>0){
						this.itList=res.rows;
					}
				})
			},
			getDanWeiHttp() {
				this.$http.get('/system/unit/list').then(res => {
					// console.log(res,"所在单位")
					if (res.code == 200 && res.rows.length > 0) {
						this.list = res.rows
						this.params.unitId = res.rows[0].unitId
					}
				})
			},
			getRoleHttp() {
				this.$http.get('/system/role/list').then(res => {
					// console.log(res, "角色")
					if (res.code == 200 && res.rows.length > 0) {
						this.rolelist = res.rows
						this.params.roleId = res.rows[0].roleId
					}
				})
			},
			getPicRole(e) {
				this.roleindex = e.target.value
				this.params.roleId = this.rolelist[this.roleindex].roleId

			},
			getPicDanWei(e) {
				this.index = e.target.value
				this.params.unitId = this.list[this.index].unitId
			},
			switch1Change: function(e) {
				e.detail = {
					value: false
				}
				// console.log('switch1 发生 change 事件，携带值为', e.target.value)
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
			bindClick(e) {
				uni.showToast({
					title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
					icon: 'none'
				});
			},
			dialogToggle(item) {
				this.$refs.alertDialog.open()
				this.resetId = item.userId
			},
			dialogConfirm() {
				let value ={
					password:'123456',
					userId:this.resetId
				}
				this.$http.put('/system/user/resetPwd',value).then(res=>{
					// console.log(res,"重置密码")
					if(res.code==200){
						uni.showToast({
							title:'修改成功',
							icon:'success'
						})
					}else{
						uni.showToast({
							title:'数据异常，请联系管理员',
							icon:'error'
						})
					}
				})
			},
			dialogClose() {
				console.log('点击关闭')
			},
			SPdialogToggle() {
				console.log('审批')
				this.$refs.alertSPDialog.open()
			},
			SPdialogConfirm() {
				console.log('审批点击确认')
				let arr=[];
				let userIds;
				this.itList.map((item,index)=>{
					if(item.status==0){
						arr.push(item.userId)
					}
					if(index==this.itList.length-1){
						userIds = arr.join(',')
						this.shenHeHttp(userIds)
					}
				})
			},
			shenHeHttp(userIds){
				let url = url = '/system/user/check/'+userIds
				this.$http.put(url).then(res=>{
					console.log(res,"审核接口")
					if(res.code==200){
						uni.showToast({
							title:'审核成功',
							icon:'success'
						})
						setTimeout(()=>{
							this.getYiShen()
						},800)
						
					}
				})
			},
			SPdialogClose() {
				console.log('审批点击关闭')
			},
			selectAlled() {
				this.selectAll = !this.selectAll
				if(this.selectAll){
					this.itList.map((item,i)=>{
						this.itList[i].status=0;
					})
				}else{
					this.itList.map(item=>{
						item.status=1;
					})
				}
			},
			itChecked(item) {
				// console.log(item, 'itChecked')
				// let url = '/system/user/check/'+userIds
				if(item.status==1){
					item.status=0
				}else{
					item.status=1
				}
				if(item.status==0){
					this.selectAllNum++
				}else{
					this.selectAllNum--
				}
				// console.log(this.selectAllNum,'this.selectAllNum')
				if(this.selectAllNum==this.itList.length){
					this.selectAll=true;
				}else{
					this.selectAll=false;
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.no{
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 40rpx;
	}
	.page {
		background-color: #F7F7F7;
	}

	.typeBox {
		width: 750rpx;
		height: 84rpx;
		background: #FFFFFF;
		display: flex;

		.typeItem {
			width: 50%;
			height: 100%;

			.wenzi {
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

			.wz {
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

			.xx {
				width: 98rpx;
				height: 5rpx;
				background: #09ABC6;
				border-radius: 6rpx;
				margin: 0 auto;
			}
		}
	}

	.headerBox {
		width: 750rpx;
		height: 84rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.lf {
			width: calc(100% - 85rpx);
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
			height: 91rpx;
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
			margin-bottom: 28rpx;

			.oB {
				display: flex;
				align-items: center;
				white-space: nowrap;
				font-size: 27rpx;

				.y {
					width: 36.36rpx;
					height: 36.36rpx;
					border: 1.8rpx solid rgba(230, 230, 230, 1);
					border-radius: 50%;
					margin-right: 18.42rpx;
				}

				.y1 {
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

			.wH {
				width: 86rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #FFBF00;
				text-align: right;
				font-weight: 400;
			}
		}

		.box {
			width: 100%;
			height: 314rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

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

		.bottomBBox {
			border-top: 1.5px solid rgba(227, 227, 227, 1);
			width: 100%;
			margin-top: 28rpx;
			height: 97rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.wenzi {
				width: 120rpx;
				height: 42rpx;
				font-family: PingFangSC-Regular;
				font-size: 30rpx;
				color: #09ABC6;
				letter-spacing: 0;
				font-weight: 400;
				margin-left: 21.7rpx;
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

	.bottomBtn {
		width: 750rpx;
		height: 166rpx;
		background: #FFFFFF;
		box-shadow: 0 0 14rpx 0 rgba(0, 0, 0, 0.12);
		position: fixed;
		bottom: 0;

		.btnBox {
			width: 702rpx;
			height: 92rpx;
			margin: 8px auto auto;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.yuanbox {
				display: flex;

				.y {
					width: 36.36rpx;
					height: 36.36rpx;
					border: 1.8rpx solid rgba(230, 230, 230, 1);
					border-radius: 50%;
					margin-right: 18.42rpx;
				}

				.y1 {
					background: #09ABC6;
				}

				.wzz {
					margin-left: 18.42rpx;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #25343B;
					letter-spacing: 0;
					font-weight: 400;
				}
			}

			.btn {
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
