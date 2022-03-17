<template>
	<view>
		<view class="tit">
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
		</view>
		<view class="content">
			<view class="con" v-if="list.length>0">
				<view class="box" v-for="(item,index) in list" :key='index' @click="toPath('./details?id=' + id + '&chaId=' + item.id)">
					<view class="text">
						{{item.begintime}} {{item.cropName}}{{item.cname}}
					</view>
					<view class="icon">
						<uni-icons type="right" color="#676C77" size="20" />
					</view>
				</view>
			</view>
			<view class="no" v-else>
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null,
				list:[],
				list1:[],
				searchValue:null,
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		mounted() {
			this.getAllChaKou()
		},
		methods: {
			input(){
				if(this.searchValue=='' || this.searchValue==null){
					setTimeout(()=>{
						this.list = this.list1
					},1500)
				}
			},
			search(){
				uni.showLoading({
					title:'加载中'
				})
				let arr = []
				this.list.map((item,index)=>{
					item.str = item.begintime + item.cropName + item.cname
					if(item.str.includes(this.searchValue)){
						arr.push(item)
					}
					if(index==this.list.length-1){
						if(arr.length>0){
							this.list = arr
						}else{
							this.list =[]
						}
						uni.hideLoading()
					}
					
				})
			},
			getAllChaKou(){
				uni.showLoading({
					title:'加载中'
				})
				this.$http.get('/farmactive/farmsetcha/getChaList',{wsid:this.id}).then(res=>{
					// console.log(res,"站点")
					if(res.code==200 && res.data.length>0){
						uni.setNavigationBarTitle({
							title:res.data[0].wsname
						});
						this.list = res.data
						this.list1 = res.data
						uni.hideLoading()
					}
				})
			},
			toPath(url) {
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.no{
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 40rpx;
	}
	.tit {
		width: 750rpx;
		height: 94rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
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
	}

	.content {
		width: 750rpx;
		height: 94rpx;
		background-color: #F5F5F5;

		.con {
			width: 702rpx;
			height: 1302rpx;
			background: #FFFFFF;
			border-radius: 8px;
			margin: 0 auto;
			margin-top: 20rpx;

			.box {
				width: 93%;
				height: 100rpx;
				margin: 0 auto;
				background-color: #fff;
				line-height: 100rpx;
				font-family: PingFangSC-Regular;
				font-size: 15px;
				color: #333333;
				letter-spacing: 0;
				font-weight: 400;
				display: flex;
				justify-content: space-between;
				border-bottom: 0.5px solid rgba(238,238,238,1);
			}
			.icon{
				width: 17.4rpx;
				height: 17.4rpx;
			}
		}
	}
</style>
