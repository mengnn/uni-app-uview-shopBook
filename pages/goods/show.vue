<template>
	<view class="show-detail">
		<view class="detail-top">
			<u--image :showLoading="true" :src="goodsInfo.cover_url" width="100%" height="150px"></u--image>
			<view class="u-line-1 title">{{goodsInfo.title}}</view>
			<view class="goods-box">
				<view class="price">
					￥{{goodsInfo.price}}
				</view>
				<view class="sales">
					销量：{{goodsInfo.sales}}
				</view>
			</view>
		</view>
		<!--  -->
		<view class="tab-box">
			<u-tabs :list="tabList" :current="current" @change="tabChange"></u-tabs>
		</view>
		<!-- 商品详情 -->
		<view class="tab-html" v-if="current == '0'">
			<u-parse :content="goodsDetail"></u-parse>
		</view>
		<!-- 商品评论 -->
		<view class="tab-html" v-if="current == '1'">
			<view class="no-commonts" v-if="commentList.length <= '0'">
				<!-- 暂时没有更多评论！ -->
				<u-empty
				        mode="history"
				>
				</u-empty>
			</view>
			<view v-else class="comment" v-for="(res, index) in commentList" :key="res.id">
				<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.name }}</view>
					</view>
					<view class="content">{{ res.contentText }}</view>
				</view>
			</view>
		</view>
		<!-- 商品推荐 -->
		<view class="tab-html" v-if="current == '2'">
			<u-row
				gutter="10"
				justify="space-between"
				customStyle="flex-wrap: wrap;"
			    >
			        <u-col span="6" v-for="(goods,index) in likeGoodsList" v-bind:key="index">
						<!-- 组件 -->
						<goods-card :goods="goods"></goods-card>
			        </u-col>
			    </u-row>
		</view>
		
		<!-- bottom -->
		<view class="bottom-box">
			<view class="bottom-html">
				<block v-if="isCollect == 0">
					<u-icon label="收藏" color="#606266" labelColor="#606266" size="28" labelSize="13px" name="star" labelPos="bottom" @click="collect"></u-icon>
				</block>
				<block v-else>
					<u-icon label="已收藏" color="#D20A0A" labelColor="#D20A0A" size="28" labelSize="13px" name="star" labelPos="bottom" @click="collect"></u-icon>
				</block>
				
				
			</view>
			<view class="bottom-html card-html">
				<u-icon label="购物车" color="#606266" labelColor="#606266" size="28" labelSize="13px" name="shopping-cart" labelPos="bottom"></u-icon>
				<u-badge bgColor="#F56C6C" max="99" :offset="offsetArr" :value="cardCount" :absolute="true"></u-badge>
			</view>
			<view class="add-card">
				<u-button type="error" shape="circle" text="加入购物车" @click="addCard"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {goodsInfo,isCollect,cardAdd,cardCount} from '@/config/api.js';
	import {isLogin} from '@/config/utils.js'
	export default {
		data() {
			return {
				goodsId:'',
				current:0, // 当前选中的索引
				goodsInfo:{},
				goodsDetail:'', // 商品详情
				likeGoodsList:{},
				commentList: [],
				tabList:[{
                    name: '商品详情'
                }, {
                    name: '商品评论',
                    badge: {
                        value: 0,
                    }
                }, {
                    name: '推荐商品',
                }],
				isCollect:0,
				cardCount:0,
				offsetArr:[-1,-10]
			}
		},
		onLoad(option) {
			console.log(option)
			this.goodsId = option.id
			this.getData()
			
			this.getCardList()
		},
		methods: {
			// 获取数据
			async getData(){
				 const goodsRes = await goodsInfo(this.goodsId)
				 
				 this.goodsInfo = goodsRes.goods
				 this.goodsDetail = goodsRes.goods.details
				 this.commentList = goodsRes.goods.comments
				 this.tabList[1].badge.value = goodsRes.goods.comments.length
				 this.likeGoodsList = goodsRes.like_goods
				 
				 this.isCollect = goodsRes.goods.is_collect
			},
			tabChange(item){
				this.current = item.index
			},
			// 搜藏
			async collect(){
				const collectInfo = await isCollect(this.goodsId)
				console.log(this.isCollect)
				if (this.isCollect === 0) {
					this.isCollect = 1
					uni.$u.toast("收藏成功！")
				}else {
					this.isCollect = 0
					uni.$u.toast("收藏已取消！")
				}
			},
			async addCard(){
				let params = {
					goods_id:this.goodsId
				}
				const acrdRes = await cardAdd(params)
				
				// 刷新购物车列表
				this.getCardList()
				
				uni.$u.toast("添加成功！")
				// console.log(acrdRes)
			},
			// 获取商品数量
			async getCardList(){
				if (isLogin()){
					const cardListRes = await cardCount();
					console.log(cardListRes)
					this.cardCount = cardListRes.data.length
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.show-detail {
		width: 100%;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;
		.detail-top {
			width: 100%;
			overflow: hidden;
			.title {
				width: 100%;
				font-size: 18px;
				margin: 10px auto;
			}
			.goods-box {
				display: flex;
				width: 100%;
				font-size: 14px;
				.price{
					flex: 1;
					color: red;
				}
				.sales {
					flex: 1;
					color: #999;
				}
			}
		}
		.tab-box {
			width:100%;
			overflow: hidden;
			margin-top: 10px;
		}
		.tab-html {
			width: 100%;
			overflow: hidden;
			margin-bottom: 60px;
		}
		.comment {
			display: flex;
			padding: 30rpx;
			.left {
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}
			.right {
				flex: 1;
				padding-left: 20rpx;
				font-size: 30rpx;
				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 10rpx;
					.name {
						color: #5677fc;
					}
					.highlight {
						color: #5677fc;
						.num {
							color: #5677fc;
						}
					}
				}
				.content {
					margin-bottom: 10rpx;
				}
			}
		}
		.no-commonts {
			width: 100%;
			text-align: center;
			font-size: 13px;
			color: #888;
			margin-top: 20%;
		}
		.bottom-box {
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1px solid #ddd;
			padding: 10px 20px;
			box-sizing: border-box;
			width: 100%;
			background: #fff;
			.bottom-html {
				float: left;
				// width: 100px;
				margin-right: 30px;
				text-align: center;
				text {
					display: block;
					font-size: 13px;
				}
			}
			.card-html {
				position: relative;
			}
		}
		.add-card {
			float: right;
			width: 120px;
		}
	}
</style>
