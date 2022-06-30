<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<view class="tag">
				<view class="left">标签</view>
				<view class="right">
					<text class="tags">家</text>
					<text class="tags">公司</text>
					<text class="tags">学校</text>
					<view class="tags plus"><u-icon size="22" name="plus"></u-icon></view>
				</view>
			</view>
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><switch color="red" @change="setDefault" /></view>
			</view>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false
		};
	},
	methods: {
		setDefault() {},
		showRegionPicker() {
			this.show = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.line {
	color: $u-light-color;
	font-size: 14px;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 1px $u-border-color;
		padding: 20px;
		.item {
			display: flex;
			font-size: 14px;
			line-height: 50px;
			align-items: center;
			border-bottom: solid 1px $u-border-color;
			.left {
				width: 80px;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 10px 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 20px;
			textarea {
				// width: 100%;
				height: 75px;
				background-color: #f7f7f7;
				line-height: 30px;
				margin: 20px auto;
				padding: 10px;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 13px;
				color: $u-tips-color;
				height: 40px;
				.icon {
					margin-top: 3px;
					margin-left: 5px;
				}
			}
		}
	}
	.bottom {
		margin-top: 10px;
		padding: 20px;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 14px;
		.tag {
			display: flex;
			.left {
				width: 80px;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 70px;
					padding: 8px 4px;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 25px;
					margin: 0 5px 10px;
					display: flex;
					font-size: 14px;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 25px;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 1px $u-border-color;
			line-height: 32px;
			.tips {
				font-size: 12px;
			}
			.right {
			}
		}
	}
}
</style>
