<template>
	<view class="Userwrap">
		<view class="text1">
			基本信息
		</view>
		<view class="content">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<view class="box">
					<uni-forms-item label="账号" required name="user" class="forms-item">
						<uni-easyinput class="inp" v-model="valiFormData.user" placeholder="请输入账号" />
					</uni-forms-item>
				</view>
				
				<view class="box">
					<picker @change="getPicDanWei" :value="index" :range="list" range-key="unitName" class="forms-item" v-if="list.length>0">
						<uni-forms-item label="单位" required name="company">
							<uni-easyinput class="inp" v-model="valiFormData.company" placeholder="请选择单位" disabled>
							</uni-easyinput>
						</uni-forms-item>
					</picker>
					<uni-icons type="right" color="#C8C8C8" size="15" />
				</view>
				
				<view class="box">
					<uni-forms-item label="密码" required name="password" class="forms-item">
						<uni-easyinput class="inp" v-model="valiFormData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</view>
				<view class="box">
					<picker @change="selectRole" :value="roleindex" :range="roleArr" range-key="roleName" class="forms-item" v-if="roleArr.length>0">
						<uni-forms-item label="角色" required name="role">
							<uni-easyinput class="inp" v-model="valiFormData.role" placeholder="请选择角色" disabled>
							</uni-easyinput>
						</uni-forms-item>
					</picker>
					<uni-icons type="right" color="#C8C8C8" size="15" />
				</view>
				<view class="box">
					<uni-forms-item label="是否审核" class="forms-item">

					</uni-forms-item>
					<switch checked @change="switch1Change" color="#09ABC6" />
				</view>
			</uni-forms>

		</view>
		<view class="text1">
			个人信息
		</view>
		<view class="content">
			<view class="box">
				<view class="name">
					<view class="name1">
						<view class="text">
							姓名
						</view>
						<view class="inp">
							<input type="text" v-model="params.nickName" value="" placeholder="请输入姓名" />
						</view>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="name">
					<view class="name1">
						<view class="text">
							手机号
						</view>
						<view class="inp">
							<input type="text" v-model="params.phonenumber" value="" placeholder="请输入手机号" />
						</view>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="name">
					<view class="name1">
						<view class="text">
							邮箱
						</view>
						<view class="inp">
							<input type="text" value="" v-model="params.email" placeholder="请输入邮箱号" />
						</view>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="name">
					<view class="name1">
						<view class="text">
							省
						</view>
						<view class="inp">
							<picker @change="sheng" :value="shengIndex" :range="shenglist" range-key="name" v-if="shenglist.length>0">
								<span style='color: #C8C8C8;'>{{shengIndex==-1?'请选择省':shenglist[shengIndex].name}}</span>
								<uni-icons type="right" color="grey" size="15"  />
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="box" v-if="shengIndex!=-1">
				<view class="name">
					<view class="name1">
						<view class="text">
							市
						</view>
						<view class="inp">
							<picker @change="shi" :value="shiIndex" :range="shilist" range-key="name" v-if="shilist.length>0">
								<span style='color: #C8C8C8;'>{{shiIndex==-1?'请选择市':shilist[shiIndex].name}}</span>
								<uni-icons type="right" color="grey" size="15" />
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="box" v-if="shiIndex!=-1">
				<view class="name">
					<view class="name1">
						<view class="text">
							区
						</view>
						<view class="inp">
							<picker @change="qu" :value="quIndex" :range="qulist" v-if="qulist.length>0" range-key="name">
								<span style='color: #C8C8C8;'>{{quIndex==-1?'请选择区':qulist[quIndex].name}}</span>
								<uni-icons type="right" color="grey" size="15" />
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="box" v-if="quIndex!=-1">
				<view class="name">
					<view class="name1">
						<view class="text">
							乡镇
						</view>
						<view class="inp">
							<picker @change="zhen" :value="zhenIndex" range-key="name" :range="zhenlist" v-if="zhenlist.length>0">
								<span style='color: #C8C8C8;'>{{zhenIndex==-1?'请选择乡镇':zhenlist[zhenIndex].name}}</span>
								<uni-icons type="right" color="grey" size="15" />
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="box" v-if="zhenIndex!=-1">
				<view class="name">
					<view class="name1">
						<view class="text">
							村
						</view>
						<view class="inp">
							<picker @change="cun" :value="cunIndex" :range="cunlist" range-key="name" v-if="cunlist.length>0">
								<span style='color: #C8C8C8;'>{{cunIndex==-1?'请选择村':cunlist[cunIndex].name}}</span>
								<uni-icons type="right" color="grey" size="15"  />
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="bao"  @click="submit('valiForm')">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 校验表单数据
				valiFormData: {
					user: '',
					company: '',
					password: '',
					role: '',
				},
				// 校验规则
				rules: {
					user: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					},
					company: {
						rules: [{
							required: true,
							errorMessage: '单位不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					},
					role: {
						rules: [{
							required: true,
							errorMessage: '角色不能为空'
						}]
					},
				},
				list:[],  //单位数据
				index:0,   //单位下表
				roleArr: [1, 2, 3, 4], //选择角色数据
				roleindex: 0,	//角色下标
				shenglist:[], //选择省数据
				shengIndex:-1,   //省下标
				shilist:[],//选择市数据
				shiIndex:-1  ,//市下标
				qulist:[],  //选择区数据
				quIndex:-1  ,//区下标
				zhenlist:[], //选择镇数据
				zhenIndex:-1,  //镇下标
				cunlist:[], //选择村数据
				cunIndex:-1, //村下标
				params:{
					userName:null,   //账号名称
					unitIds:null,   // 单位 array
					password:null,   //
					roleIds:null,   // 角色 array
					status:0,   // 是否审核   (0已审核 1未审核)
					nickName:null,   // 姓名
					phonenumber:null,   //
					email:null,   //
					province:null,   // 省
					provinceCode:null,   // 省编码
					city:null,   // 市
					cityCode:null,   //
					district:null,   // 区
					districtCode:null,   //
					town:null,   // 镇
					townCode:null,   //
					village:null,   // 村
					villageCode:null,   //
				}
			}
		},
		mounted() {
			this.getDanWeiHttp()
			this.getRoleHttp()
			this.getShengHttp()
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					// console.log('success', res);
					this.params.userName = this.valiFormData.user
					this.params.password = this.valiFormData.password
					console.log(this.params,"保存参数")
					this.$http.post('system/user',this.params).then(res=>{
						console.log(res,"保存接口")
						if(res.code==200){
							uni.showToast({
								title:'保存成功'
							})
						}
					})
					uni.showToast({
						icon:'none',
						title: `保存成功`
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
			getCunHttp(id){
				this.$http.get('/regionalization/getArea',{pid:id}).then(res=>{
					console.log(res,"村")
					if(res.code==200 && res.data.length>0){
						this.cunlist = res.data
					}
				})
			},
			getZhenHttp(id){
				this.$http.get('/regionalization/getArea',{pid:id}).then(res=>{
					console.log(res,"镇")
					if(res.code==200 && res.data.length>0){
						this.zhenlist = res.data
						
					}
				})
			},
			getQUhttp(id){
				this.$http.get('/regionalization/getArea',{pid:id}).then(res=>{
					// console.log(res,"区")
					if(res.code==200 && res.data.length>0){
						this.qulist = res.data
						
					}
				})
			},
			getShiHttp(id){
				this.$http.get('/regionalization/getArea',{pid:id}).then(res=>{
					// console.log(res,"市")
					if(res.code==200 && res.data.length>0){
						this.shilist = res.data
						
					}
				})
			},
			getShengHttp(){
				this.$http.get('/regionalization/getArea',{pid:0}).then(res=>{
					// console.log(res,"省")
					if(res.code==200 && res.data.length>0){
						this.shenglist = res.data
					}
				})
			},
			getRoleHttp() {
				this.$http.get('/system/role/list').then(res => {
					// console.log(res, "角色")
					if (res.code == 200 && res.rows.length > 0) {
						this.roleArr = res.rows
						let arr = []
						arr.push(res.rows[0].roleId)
						this.params.roleIds = arr
					}
				})
			},
			getDanWeiHttp() {
				this.$http.get('/system/unit/list').then(res => {
					// console.log(res,"所在单位")
					if (res.code == 200 && res.rows.length > 0) {
						this.list = res.rows
						let arr = []
						arr.push(res.rows[0].unitId)
						this.params.unitIds = arr
					}
				})
			},
			
			// 选择单位
			getPicDanWei(e) {
				this.index = e.target.value
				this.valiFormData.company = this.list[this.index].unitName
				let arr = []
				arr.push(this.list[this.index].unitId)
				this.params.unitIds = arr
			},
			// 选择角色
			selectRole(e) {
				this.roleindex = e.target.value
				this.valiFormData.role = this.roleArr[this.roleindex].roleName
				let arr = []
				arr.push(this.roleArr[this.roleindex].roleId)
				this.params.roleIds = arr
			},
			// 是否审核
			switch1Change: function(e) {
				console.log('是否审核', e.target.value)
				// 0已审核 1未审核
				if(e.target.value){
					this.params.status = 0
				}else{
					this.params.status = 1
				}
			},
			sheng: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.shengIndex = e.target.value
				this.params.province = this.shenglist[this.shengIndex].name
				this.params.provinceCode = this.shenglist[this.shengIndex].id
				this.getShiHttp(this.shenglist[this.shengIndex].id)
			},
			shi: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.shiIndex = e.target.value
				this.params.city = this.shilist[this.shengIndex].name
				this.params.cityCode = this.shilist[this.shengIndex].id
				this.getQUhttp(this.shilist[this.shengIndex].id)
			},
			qu: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.quIndex = e.target.value
				this.params.district = this.qulist[this.quIndex].name
				this.params.districtCode = this.qulist[this.quIndex].id
				this.getZhenHttp(this.qulist[this.quIndex].id)
			},
			zhen: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.zhenIndex = e.target.value
				this.params.town = this.zhenlist[this.zhenIndex].name
				this.params.townCode = this.zhenlist[this.zhenIndex].id
				this.getCunHttp(this.zhenlist[this.zhenIndex].id)
			},
			cun: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.cunIndex = e.target.value
				this.params.village = this.cunlist[this.cunIndex].name
				this.params.villageCode = this.cunlist[this.cunIndex].id
			},
		}
	}
</script>

<style lang='scss' scoped>
	.text1 {
		margin-top: 32rpx;
		margin-bottom: 32rpx;
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		color: #09ABC6;
		letter-spacing: 0;
		text-align: left;
		font-weight: 600;
		margin-left: 32rpx;
	}

	.content {
		width: 750rpx;
		/* height: 105.08rpx; */
		background: #FFFFFF;

		.box {
			padding: 0px 32rpx;
			height: 105.08rpx;
			background: #FFFFFF;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.forms-item {
				width: 100%;
				height: 70rpx;
				position: relative;

				.inp {
					width: 50%;
					position: absolute;
					right: 0;
					text-align: right;
				}
			}

			.name {
				width: 100%;
				height: 105.08rpx;
				line-height: 105.08rpx;

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
					/* // border: 2px solid pink; */
					text-align: right;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #666;
					letter-spacing: 0;
					line-height: 23.55px;
					font-weight: 400;
				}
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
			margin-top: 52.64rpx;
			
		}
		
		
	}
</style>
