<template>
	<view class="cart-box">
		<view class="cart-list" v-for="(goodsItem,index) in goodsList" :key="index">
			<!-- 选项 -->
			<view class="ck-box">
				<view>
					<u-checkbox-group
						:value="ckValue"
						placement="column"
						@change="ckChange"
					>
						<u-checkbox
							:customStyle="{marginBottom: '8px'}"
							:name="goodsItem.goods_id"
							shape="circle"
						>
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			
			<!-- 右侧 -->
			<view class="cart-right">
				<u--image :showLoading="true" :src="goodsItem.goods.cover_url" width="80px" height="100px"></u--image>
				<view class="cart-right-detail">
					<view class="cart-title">{{goodsItem.goods.title}}</view>
					<view class="cart-description">{{goodsItem.goods.description}}</view>
					<view class="cart-bottom">
						<text class="price">￥{{goodsItem.goods.price}}</text>
						<u-number-box :name="goodsItem.goods.id" min="0" :value="goodsItem.num" :disabledInput="true" @change="valChange"></u-number-box>
						<u--image :showLoading="true" src="../../static/delete.png" width="25px" height="25px"></u--image>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {cardList} from '@/config/api.js';
	export default {
		data() {
			return {
				goodsList:[],
				ckValue:[19,1],
				numberValue:0,
				checkboxList1: [{
						name: '苹果',
						disabled: false
					}
				],
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 获取数据
			async getData(){
				const goodsListRes = await cardList()
				this.goodsList = goodsListRes.data
				console.log(this.goodsList)
			},
			// 选中
			ckChange(detail){
				console.log(detail)
				console.log(this.ckValue)
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
				// this.value = this.value + 1;
			}
		}
	}
</script>

<style scoped lang="scss">
	.cart-box {
		width: 100%;
		overflow: hidden;
		padding: 15px;
		box-sizing: border-box;
		.cart-list {
			width: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
			margin-bottom: 15px;
			.ck-box {
				width: 60px;
			}
			.cart-right {
				flex: 1;
				overflow: hidden;
				display: flex;
				align-items: center;
				.cart-right-detail {
					flex: 1;
					overflow: hidden;
					margin-left: 10px;
					.cart-title {
						width: 100%;
						font-size: 16px;
						color: #333;
						margin-bottom: 5px;
					}
					.cart-description {
						width: 100%;
						font-size: 13px;
						color: #999;
					}
					.cart-bottom {
						width: 100%;
						overflow: hidden;
						margin-top: 10px;
						display: flex;
						align-items: center;
						.price{
							color: red;
							font-size: 14px;
							margin-right: 5px;
							width: 60px;
						}
					}
				}
			}
		}
	}
</style>
