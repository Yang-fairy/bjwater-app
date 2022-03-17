<template>
	<view class="wrap">
		<view class="box">
			<view class="name">
				<view class="name1">
					<view class="text">
						传感器名称
					</view>
					<view class="inp">
						<input type="text" value="" v-model="params.sbname" placeholder="请输入传感器名称" />
					</view>
				</view>
			</view>

			<view class="name">
				<view class="name1">
					<view class="text">
						设备码
					</view>
					<view class="inp">
						<input type="text" value="" v-model="params.sbcode" placeholder="请输入设备码" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						机构名称
					</view>
					<view class="inp">
						<picker @change="bindPickerChange" :value="index" :range="zhanDian" range-key="label" v-if="zhanDian.length>0">
							{{index==-1?'请选择机构名称':zhanDian[index].label}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						所属站点
					</view>
					<view class="inp">
						<picker @change="getZhanDian" :value="zdindex" :range="zhanDian1" range-key="wsname" v-if="zhanDian1.length>0">
							{{zdindex==-1?'请选择机构名称':zhanDian1[zdindex].wsname}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						物联网卡到期时间
					</view>
					<view class="inp">
						<uni-datetime-picker type="date" :clearIcon="false" v-model="single" @change='getTime'>
							{{single}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</uni-datetime-picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						是否启用
					</view>
					<view class="inp">
						<switch checked @change="switch1Change" color="#09ABC6 " />
					</view>
				</view>
			</view>
		</view>
		<view class="bao" @click="submit">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zhanArr: [1, 2, 3, 4],
				index: 0,
				single:null,
				zhanDian:[],
				zhanDian1:[],
				zdindex:0,
				params:{
					deptId:null,
					wsid:null,
					usingFlag:0,
					sbname:null,
					sbcode:null,
				},
			}
		},
		mounted(){
			this.single = this.getDates()
			this.getZhanDianJiekou()
		},
		methods: {
			submit(){
				this.$http.post('/dev/sensb',this.params).then(res=>{
					// console.log(res,"提交的设备")
					if(res.code==200){
						uni.showToast({
							title:'提交成功',
							icon:'success'
						})
					}else{
						uni.showToast({
							title:'提交异常',
							icon:'error'
						})
					}
				})
			},
			// 获取组织机构
			getZhanDianJiekou() {
				this.$http.get('/system/dept/treeselect').then(res => {
					// console.log(res,"所属区域")
					if (res.code == 200 && res.data.length > 0) {
							if (res.data[0].children) {
								this.zhanDian = res.data[0].children
								this.params.deptId = res.data[0].children[0].id
							} else {
								this.zhanDian = res.data
								this.params.deptId = res.data[0].id
								
							}
						}
					this.getDetailZhan(this.params.deptId)
				})
			},
			getDetailZhan(deptId){
				this.$http.get('/area/getWsByDeptid',{deptId:deptId}).then(res=>{
					// console.log(res,"具体站点")
					if(res.code==200 && res.data.length>0){
						this.zhanDian1 = res.data
						this.params.wsid = res.data[0].id
						this.zdindex = 0
					}
					
				})
			},
			getTime(e){
				console.log(e,"时间")
				this.single = e
			},
			bindPickerChange: function(e) {
				console.log('区域', e.target.value)
				this.index = e.target.value
				this.getDetailZhan(this.zhanDian[this.index].id)
			},
			getZhanDian: function(e) {
				console.log('站点', e.target.value)
				this.zdindex = e.target.value
				this.params.wsid = this.zhanDian1[this.zdindex].id
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				if(e.target.value){
					this.params.usingFlag = 0
				}else{
					this.params.usingFlag = 2
				}
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
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: #F7F7F7;
	}

	.box {
		background-color: #fff;
	}

	.name {
		width: 100%;
		height: 105.08rpx;
		line-height: 105.08rpx;
		background: #FFFFFF;
		margin-top: 20rpx;

		.name1 {
			margin: 0 auto;
			width: 95%;
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

	.bao {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		background: #09ABC6;
		border-radius: 24px;
		font-family: PingFangSC-Medium;
		font-size: 18px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		font-weight: 500;
		margin: 0 auto;
		margin-top: 62.64rpx;
	}
</style>
