<template>
	<navigator :url="'/pages/goods/show?id=' + goods.id">
		<u--image :showLoading="true" :src="goods.cover_url" width="100%" height="150px"></u--image>
		<view class="u-line-1 title">{{goods.title}}</view>
		<view class="goods-box">
			<view class="price">
				￥{{goods.price}}
			</view>
			<view class="sales">
				销量：{{goods.sales}}
			</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
navigator {
	margin-bottom: 15px;
	padding: 20px 10px 20px 10px;
	box-sizing: border-box;
	box-shadow: 2px 2px 4px rgba(0,0,0,.1);
}
.goods-box {
	display: flex;
	width: 100%;
	font-size: 13px;
	.price{
		flex: 1;
		color: red;
	}
	.sales {
		flex: 1;
		color: #999;
	}
}
</style>