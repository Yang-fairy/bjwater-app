<template>
	<view class="data">
		<view class="headerBox">
			<view class="searchBox">
				<uni-icons type="search" color="#676C77" size="20" />
			</view>
			<view class="wenzi">
				<input type="text" value="" v-model="searchValue" @input="input"/>
			</view>
			<view class="btn" @click="search">
				搜索
			</view>
		</view>
		<view class="centerBox">
			<view class="listBox">
				<view class="lf" v-if="list.length>0">
					
					<view :class="index==i?'item itemClicked':index-1==i?'item topClicked':index+1==i?'item botClicked':'item'" v-for="item,i in list" @click="topItem(i,item)">
					
					<!-- <view :class="css(index,i)" v-for="item,i in list" @click="topItem(i)"> -->
						<view class="gang">
							
						</view>
						<view class="wz">
							{{item.label}}
						</view>
					</view>
				</view>
				<view class="rg">
					<view class="top" v-if="searchShow">
						<view :class="id==typeIndex?'items itemsed':'items'" v-for="it,id in typeArr" :key='id' @click="Toptype(id)">
							<view class="item">
								{{it}}
							</view>
							<view class="gan ganed">
								
							</view>
						</view>
					</view>
					<view class="ccBox" v-if="chaxunList.length>0">
						<view class="itss" v-for="(item,index) in chaxunList" :key="index">
							<view class="tit">
								{{item.wsname}}
							</view>
							<view class="itList">
								<view class="llf">
									<view class="it" v-for="(it,ind) in item.yyFarmsetchaList.slice(0,3)">
										{{it.begintime}} {{it.cropName}}{{it.cname}}
									</view>
								</view>
								<view class="lrg">
									<view class="btn" @click="toPath('./list?id=' + item.id)">
										更多
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="no" v-else>
						暂无数据
					</view>
				</view>
			</view>
		</view>
		<view class="fab">
			<view class="text" @click="toPath('./newForm')">
				新建<br/>表单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:1,
				index1:1,
				list:[],
				searchShow:true,
				typeIndex:0,
				typeIndex1:0,
				typeArr:['自动站','人工站']  ,//1 自动监测站，2 人工监测站
				chaxunList:[],
				chaxunList1:[],
				chaXunParams:{
					deptId:null,
					 stationtype:1,
				},
				searchValue:null,
				searchNo:null,
			};
		},
		mounted() {
			this.getLeftMenu()
		},
		methods: {
			input(){
				if(this.searchValue=='' || this.searchValue==null){
					setTimeout(()=>{
						this.searchShow = true
						this.chaxunList = this.chaxunList1
						this.index = this.index1
						this.typeIndex = this.typeIndex1
					},1500)
				}
			},
			// 查询接口
			search(){
				uni.showLoading({
					title:'加载中'
				})
				this.$http.get('/areaApp/getListCha',{wsname:this.searchValue}).then(res=>{
					console.log(res,"搜索结果")
					if(res.code==200 && res.data.length>0){
						this.chaxunList = []
						this.searchShow = false
						this.searchNo = null
						this.list.map(((item,index)=>{
							if(res.data[0].district.includes(item.label)){
								this.index = index
								this.chaxunList = res.data
								
							}
						}))
					}else{
						this.chaxunList = []
						this.index = null
						this.searchNo = 1
					}
					uni.hideLoading()
					
				})
			},
			// 查询左侧菜单
			getLeftMenu(){
				
				this.$http.get('/system/dept/treeselect').then(res=>{
					console.log(res,"左侧菜单")
					if(res.code==200 && res.data.length>0){
						if(res.data[0].children){
							res.data[0].children.unshift({label:'全部',id:1})
							this.list = res.data[0].children
							
							this.chaXunParams.deptId = res.data[0].children[1].id
						}else{
							res.data[0].unshift({label:'全部',id:1})
							this.list = res.data
						
							this.chaXunParams.deptId = res.data[0].id
						}
					this.getChaKouHttp()	
					}
				})
			},
			// 查询茬口列表
			getChaKouHttp(){
				if(this.searchValue==null || this.searchValue=='' ||this.searchNo ==1){
					this.searchShow = true
					this.chaxunList = []
					uni.showLoading({
						title:'加载中'
					})
					this.$http.get('/areaApp/getListCha',this.chaXunParams).then(res=>{
						// console.log(res,"查询结果")
						if(res.code==200 &&res.data.length>0){
							this.chaxunList = res.data
							this.chaxunList1 = res.data
							
						}
						uni.hideLoading()
					})
				}
				
			},
			css(index,i){
				let n='item';
				if(index==i){
					n='item itemClicked';
				}
				if(index-1==i){
					n='item topClicked';
				}
				if(index+1==i){
					n='item botClicked';
				}
				return n;
			},
			topItem(i,item){
				// console.log(item,"点击每一项")
				this.chaXunParams.deptId = item.id
				this.getChaKouHttp()
				if(this.index !== i){
					this.index=i
					this.index1=i
				}
			},
			Toptype(i){
				if(i==0){
					this.chaXunParams.stationtype = 1
				}else{
					this.chaXunParams.stationtype = 2
				}
				this.getChaKouHttp()
				if(this.typeIndex !== i){
					this.typeIndex=i
					this.typeIndex1=i
				}
			},
			toPath(url) {
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no{
		font-size: 35rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 40rpx;
	}
.data{
	background-color: #FFFFFF;
	overflow: hidden;
}	
.headerBox{
	width: 688.4rpx;
	height: 65.22rpx;
	background: #F5F5F5;
	border-radius: 32.6rpx;
	margin: 15rpx auto;
	display: flex;
	align-items: center;
	.searchBox{
		width: 66.84rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wenzi{
		width: calc(100% - 170rpx);
		border-right: 1rpx solid rgba(153,153,153,1);
	}
	.btn{
		width: 100.84rpx;
		height: 65.22rpx;
		line-height: 65.22rpx;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #09ABC6;
		letter-spacing: 0;
		font-weight: 400;
		text-align: center;
	}
}
.centerBox{
	width: 750rpx;
	background: #E6E6E6;
	padding-top: 25.8rpx;
	.listBox{
		width: 100%;
		height: calc(100vh - 260rpx);
		display: flex;
		.lf{
			width: 230rpx;
			height: 100%;
			background-color: #fff;
			margin-top: 16rpx;
			.item{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				background-color: #E6E6E6;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #25343B;
				text-align: center;
				font-weight: 400;
			}
			.itemClicked{
				font-size: 32rpx;
				color: #25343B;
				font-weight: 600;
				background-color: #fff;
				display: flex;
				align-items: center;
				.gang{
					width: 6rpx;
					height: 28rpx;
					background: #09ABC6;
					margin-left: 8rpx;
				}
				.wz{
					width: 100%;
				}
			}
			.topClicked{
				border-bottom-right-radius: 16rpx;
			}
			.botClicked{
				border-top-right-radius: 16rpx;
			}
			
		}
		.rg{
			width: 520rpx;
			height: 100%;
			// background-color: #FFFFFF;
			.top{
				width: 100%;
				height: 106rpx;
				border-top-left-radius: 16rpx;
				background: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				.items{
					width: 50%;
					color: #25343B;
					font-weight: 400;
					.item{
						width: 84rpx;
						height: 40rpx;
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						text-align: center;
						margin: 0 auto;
					}
					.gan{
						width: 48rpx;
						height: 4rpx;
						margin: 15rpx auto 0;
					}
				}
				.itemsed{
					color: #09ABC6;
					font-weight: 600;
					.ganed{
						background: #09ABC6;
					}
				}
			}
			.ccBox{
				width: 100%;
				height: calc(100% - 106rpx);
				background: #fff;
				overflow: hidden;
				overflow-y: auto;
				.itss{
					width: 240px;
					height: 108px;
					background: #FAFAFA;
					border-radius: 2px;
					margin:20rpx auto 0;
					box-sizing: border-box;
					padding: 24rpx;
					.tit{
						height: 36rpx;
						font-family: PingFangSC-Medium;
						font-size: 26rpx;
						color: #25343B;
						font-weight: 600;
						overflow: hidden;
					}
					.itList{
						height: 110rpx;
						margin-top: 22rpx;
						display: flex;
						justify-content: space-between;
						.llf{
							width: 75%;
							height: 100%;
							.it{
								height: 34rpx;
								font-family: PingFangSC-Regular;
								font-size: 24rpx;
								color: #999999;
								font-weight: 400;
								text-align: left;
							}
						}
						.lrg{
							width: 15%;
							height: 100%;
							display: flex;
							align-items: flex-end;
							.btn{
								width: 100%;
								text-align: center;
								font-family: PingFangSC-Regular;
								font-size: 22rpx;
								color: #09ABC6;
								font-weight: 400;
							}
						}
					}
				}
			}
			.ccBox::-webkit-scrollbar{
				display: none;
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
