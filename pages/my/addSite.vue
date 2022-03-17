<template>
	<view class="wrap">
		<view class="box">
			<view class="name">
				<view class="name1">
					<view class="text">
						所属部门
					</view>
					<view class="inp">
						<picker @change="bmType" :value="bmTypeIndex" :range="bmArr" range-key="label" v-if="bmArr.length>0">
							{{bmTypeIndex==-1?'请选择所属部门':bmArr[bmTypeIndex].label}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						站点名称
					</view>
					<view class="inp">
						<input type="text" v-model="params.wsname" value="" placeholder="请输入站点名称(必填)" />
					</view>
				</view>
			</view>

			<!-- <view class="name">
				<view class="name1">
					<view class="text">
						站点号
					</view>
					<view class="inp">
						<input type="text" value="" placeholder="请输入站点号" />
					</view>
				</view>
			</view> -->
			<view class="name">
				<view class="name1">
					<view class="text">
						站点类型
					</view>
					<view class="inp">
						<picker @change="zdType" :value="index" v-if="zhanArr.length>0"  range-key="dictLabel" :range="zhanArr">
							{{zhanArr[index].dictLabel}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						设施类型
					</view>
					<view class="inp">
						<picker @change="sbType" :value="sbTypeIndex" :range="sbArr" range-key="dictLabel" v-if="sbArr.length>0">
							{{sbTypeIndex==-1?'请选择设施类型':sbArr[sbTypeIndex].dictLabel}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						棚室编号
					</view>
					<view class="inp">
						<input type="text" v-model="params.areaNum" value="" placeholder="请输入棚室编号" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						土壤质地
					</view>
					<view class="inp">
						<picker @change="trzd" range-key="dictLabel" :value="trzdIndex" :range="trzdArr" v-if="trzdArr.length>0">
							{{trzdIndex==-1?'请选择土壤质地':trzdArr[trzdIndex].dictLabel}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						长度(米)
					</view>
					<view class="inp">
						<input type="text" v-model="params.zheight" value="" placeholder="请输入长度" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						宽度(米)
					</view>
					<view class="inp">
						<input type="text" v-model="params.zwidth" value="" placeholder="请输入跨度" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						经度(米)
					</view>
					<view class="inp">
						<input type="text" v-model="params.lon" value="" placeholder="请输入经度(必填)" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						纬度(米)
					</view>
					<view class="inp">
						<input type="text" v-model="params.lat" value="" placeholder="请输入纬度(必填)" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						区
					</view>
					<view class="inp">
						<picker @change="listArea" :value="listIndex" :range="list" v-if="list.length>0" range-key="name">
							{{listIndex==-1?'请选择区':list[listIndex].name}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name" v-if="xzlist.length>0">
				<view class="name1">
					<view class="text">
						乡镇
					</view>
					<view class="inp">
						<picker @change="xz" :value="xzIndex" :range="xzlist" range-key="name" v-if="xzlist.length>0">
							{{xzIndex==-1?'请选择乡镇':xzlist[xzIndex].name}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name" v-if="cunlist.length>0">
				<view class="name1">
					<view class="text">
						村
					</view>
					<view class="inp">
						<picker @change="cun" :value="cunIndex" :range="cunlist" range-key="name" v-if="cunlist.length>0">
							{{cunIndex==-1?'请选择村':cunlist[cunIndex].name}}
							<uni-icons type="right" color="grey" size="15" style='margin-left:20rpx;' />
						</picker>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						园区名称
					</view>
					<view class="inp">
						<input type="text" v-model="params.park" value="" placeholder="请输入园区名称" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						联系人
					</view>
					<view class="inp">
						<input type="text" v-model="params.name" value="" placeholder="请输入联系人" />
					</view>
				</view>
			</view>
			<view class="name">
				<view class="name1">
					<view class="text">
						联系电话
					</view>
					<view class="inp">
						<input type="text" v-model="params.phone" value="" placeholder="请输入联系电话" />
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
				zhanArr: [], //站点类型弹出层数据
				sbArr: [], //设备类型弹出层数据
				trzdArr: [1, 2, 3, 4], //土壤质地弹出层数据
				xzlist: [], //乡镇弹出曾数据
				cunlist: [], //村弹出曾数据
				index: 0, //站点类型选择下标
				sbTypeIndex: -1, //设备类型选择下标
				trzdIndex: -1, //土壤质地选择下标
				xzIndex: -1, //乡镇选择下标
				cunIndex: -1, //村选择下标
				list: ['全部', '密云区', '延庆区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区',
					'平谷区', '东城区', '西城区'
				],
				listIndex: -1, //区域选择下标
				single: null,
				bmTypeIndex:0, //部门下标
				bmArr:[],   //所属部门
				params:{
					deptId:null,    //所属区域id  必填
					wsname:null,    //站点名称 必填
					stationtype:null,    //站点类型 必填
					address:null,    //地址
					lon:null,    //经度  必填
					lat:null,    //纬度  必填
					zheight:null,    // 长度
					zwidth:null,    // 宽度
					area:null,    // 面积
					district:null,    // 所在区
					town:null,    // 所在镇
					street:null,    // 所在村
					districtCode:null,    // 所在区编码
					townCodet:null,    // 所在镇编码
					streetCode:null,    // 所在村编码
					park:null,    // 园区名称
					name:null,    // 基地联系人
					phone:null,    // 联系方式
					areaNum:null,    // 温室号
					waterNum:null,    // 表号
					type:null,    // 设施类型
					soilType:null,    // 土壤质地
					irrigateMode:null,    // 灌溉方式
					deviceNum:null,    // 设备通讯号
				},
			}
		},
		 mounted() {
			 this.getBuMenHttp()
		 	this.getTypeZiDian()
			this.getSheBeiType()
			this.getSoilZiDian()
			this.getAreaHttp()
		 },
		methods: {
			submit(){
				if(this.params.deptId&& this.params.wsname && this.params.stationtype && this.params.lon && this.params.lat){
					this.$http.post('/area',this.params).then(res=>{
						// console.log(res,"保存接口")
						if(res.code==200){
							uni.showToast({
								title:'保存成功',
								icon:'success'
							})
						}
					})
				}else{
					uni.showToast({
						title:'所属部门、站点名称、站点类型、经度与维度都是必填项',
						icon:'error'
					})
				}
			},
			getBuMenHttp(){
				this.$http.get('/system/dept/treeselect').then(res => {
					// console.log(res,"所属部门")
					if (res.code == 200 && res.data.length > 0) {
						if(res.data[0].children){
							this.bmArr = res.data[0].children
							this.params.deptId = res.data[0].children[0].id
						}else{
							this.bmArr = res.data
							this.params.deptId = res.data[0].id
						}
						
						// this.params.stationtype = res.data[0].dictValue
					}
				})
			},
			getTypeZiDian(){
				this.$http.get('/system/dict/data/type/station_type').then(res => {
					// console.log(res,"站点类型")
					if (res.code == 200 && res.data.length > 0) {
						this.zhanArr = res.data
						this.params.stationtype = res.data[0].dictValue
					}
				})
			},
			getSheBeiType(){
				this.$http.get('/system/dict/data/type/installation_type').then(res => {
					// console.log(res,"设施类型")
					if (res.code == 200 && res.data.length > 0) {
						this.sbArr = res.data
					}
				})
			},
			getSoilZiDian(){
				this.$http.get('/system/dict/data/type/soil_type').then(res => {
					// console.log(res,"土壤类型")
					if (res.code == 200 && res.data.length > 0) {
						this.trzdArr = res.data
					}
				})
			},
			// 区域接口
			getAreaHttp(){
				this.$http.get('/regionalization/getAreaInfo').then(res=>{
					// console.log(res,"所属区域")
					if(res.code==200 && res.data.length>0){
						this.list = res.data
					}
				})
			},
			getZhenHttp(pid){
				this.$http.get('/regionalization/getAreaInfo',{pid:pid}).then(res=>{
					// console.log(res,"所属镇")
					if(res.code==200 && res.data.length>0){
						this.xzlist = res.data
					}
				})
			},
			getCunHttp(pid){
				this.$http.get('/regionalization/getAreaInfo',{pid:pid}).then(res=>{
					// console.log(res,"所属村")
					if(res.code==200 && res.data.length>0){
						this.cunlist = res.data
					}
				})
			},
			// 选择部门
			bmType(){
				this.bmTypeIndex = e.target.value
				this.params.deptId = this.bmArr[this.bmTypeIndex].id
			},
			// 选择站点类型
			zdType: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.params.stationtype = this.zhanArr[this.index].dictValue
			},
			// 选择设备类型
			sbType: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.sbTypeIndex = e.target.value
				this.params.type = this.sbArr[this.sbTypeIndex].dictType
			},
			// 选择土壤质地
			trzd: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.trzdIndex = e.target.value
				this.params.soilType = this.trzdArr[this.trzdIndex].dictValue
			},
			// 选择区域
			listArea: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.listIndex = e.target.value
				this.params.district = this.list[this.listIndex].name
				this.params.districtCodet  = this.list[this.listIndex].id
				this.getZhenHttp(this.list[this.listIndex].id)
			},
			// 选择乡镇
			xz: function(e) {
				// console.log('镇', e.target.value)
				this.xzIndex = e.target.value
				this.params.town = this.xzlist[this.xzIndex].name
				this.params.townCode = this.xzlist[this.xzIndex].id
				this.getCunHttp(this.xzlist[this.xzIndex].id)
			},
			// 选择村
			cun: function(e) {
				// console.log('cun', e.target.value)
				this.cunIndex = e.target.value
				this.params.street = this.cunlist[this.cunIndex].name
				this.params.streetCode = this.cunlist[this.cunIndex].id
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding-bottom: 50rpx;
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
