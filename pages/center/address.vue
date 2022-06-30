<template>
	<view>
		<view class="item" v-for="(res, index) in siteList" :key="res.id">
			<view class="top">
				<view class="name">{{ res.name }}</view>
				<view class="phone">{{ res.phone }}</view>
				<view class="tag">
					<text v-for="(item, index) in res.tag" :key="index" :class="{red:item.tagText=='默认'}">{{ item.tagText }}</text>
				</view>
			</view>
			<view class="bottom">
				{{res.address}}
				<u-icon name="edit-pen" :size="25" color="#999999"></u-icon>
			</view>
		</view>
		<view class="addSite" @tap="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="20"></u-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script>
import {addRessList} from '@/config/api.js';
export default {
	data() {
		return {
			siteList: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		async getData() {
			const addressRes = await addRessList();
			console.log(addressRes)
			this.siteList = [
				{
					id: 1,
					name: '游X',
					phone: '183****5523',
					tag: [
						{
							tagText: '默认'
						},
						{
							tagText: '家'
						}
					],
					address: '广东省深圳市宝安区 自由路6666号'
				},
				{
					id: 2,
					name: '李XX',
					phone: '183****5555',
					tag: [
						{
							tagText: '公司'
						}
					],
					address: '广东省深圳市宝安区 翻身路xx号'
				},
				{
					id: 3,
					name: '王YY',
					phone: '153****5555',
					tag: [],
					address: '广东省深圳市宝安区 平安路13号'
				}
			];
		},
		toAddSite(){
			uni.navigateTo({
			    url: '/pages/center/addressEdit'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 20px;
	.top {
		display: flex;
		font-weight: bold;
		font-size: 14px;
		.phone {
			margin-left: 30px;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 30px;
				height: 17px;
				line-height: 17px;
				color: #ffffff;
				font-size: 12px;
				border-radius: 3px;
				text-align: center;
				margin-left: 15px;
				background-color:rgb(49, 145, 253);
			}
			.red{
				background-color:red
			}
		}
	}
	.bottom {
		display: flex;
		margin-top: 10px;
		font-size: 14px;
		justify-content: space-between;
		color: #999999;
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 300px;
	line-height: 40px;
	position: absolute;
	bottom: 15px;
	left: 40px;
	background-color: red;
	border-radius: 30px;
	font-size: 14px;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 5px;
		}
	}
}
</style>
