<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #F7F7F7;
	}

	.uni-button-color {
		color: #09ABC6 !important;
	}

	.uni-popup__info {
		font-size: 17px !important;
		color: #333333 !important;
	}

	.uni-dialog-content-text {
		font-size: 14px !important;
		;
		color: #333333 !important;
	}

	.uni-datetime-picker--btn {
		background-color: #09ABC6 !important;
	}

	.uni-calendar-item__weeks-box .uni-calendar-item--checked {
		background-color: #09ABC6 !important;
	}

	.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
		color: #09ABC6 !important;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	// 编辑站点
	.uni-input-form, .uni-input-wrapper{
		margin-right: 20rpx !important;
	}
	
	// 新增用户页
	.Userwrap {
		.uni-forms-item__label .label-text {
			font-family: PingFangSC-Regular !important;
			font-size: 16px !important;
			color: #676C77 !important;
			letter-spacing: 0 !important;
			line-height: 105.08rpx !important;
			font-weight: 400 !important;
			display: block !important;
		}

		.is-input-border {
			border: none !important;

		}
		.is-disabled{
			background-color: #fff !important;
			color: #666 !important;
		}
		.uni-easyinput__placeholder-class {
			font-family: PingFangSC-Regular !important;
			font-size: 16px !important;
			color: #C8C8C8 !important;
			letter-spacing: 0 !important;
			text-align: right !important;
			font-weight: 400 !important;
		}

		.uni-input-placeholder {
			color: #C8C8C8 !important;
		}

		.uni-error-message {
			bottom: 55rpx !important;
		}
	}

	// 历史数据树形菜单
	#history {
		.ly-tree-node__content {
		height: 50rpx !important;
	}
	.ly-tree{
		padding: 0 !important;
	}
	}
</style>
