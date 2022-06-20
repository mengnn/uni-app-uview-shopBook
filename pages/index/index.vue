<template>
	<view>
		<!-- 轮播图 -->
		<u-swiper :list="slides" keyName="img_url" height="160" indicator></u-swiper>
		<!-- tab -->
		<view class="tab-box">
			<u-tabs :list="sortList" @click="clickSort"></u-tabs>
		</view>
		<!-- 主要内容 -->
		<view class="main-content">
			<u-row
				gutter="10"
				justify="space-between"
				customStyle="flex-wrap: wrap;"
			    >
			        <u-col span="6" v-for="(goods,index) in goodsList" v-bind:key="index">
						<!-- 组件 -->
						<goods-card :goods="goods"></goods-card>
						<!-- <navigator>
							<u--image :showLoading="true" :src="item.cover_url" width="100%" height="150px"></u--image>
							<view class="u-line-1 title">{{item.title}}</view>
							<view class="goods-box">
								<view class="price">
									￥{{item.price}}
								</view>
								<view class="sales">
									销量：{{item.sales}}
								</view>
							</view>
						</navigator> -->
			        </u-col>
			    </u-row>
				
				<!-- 骨架屏 -->
				<u-skeleton :loading="loading" :animate="true" rows="3" title rowsWidth="50%">
					
				</u-skeleton>
		</view>
	</view>
</template>

<script>
	// Api 集中管理
	import { getIndexData,authLogin, userInfo} from '../../config/api.js';
	import {isLogin} from '../../config/utils.js';
	
	export default {
		data() {
			return {
				sortList:[
					{name:'默认'},
					{name:'销量'},
					{name:'推荐'},
					{name:'最新'}
				],
				slides:[],
				goodsList:[],
				page:1,
				currentSort:0,
				loading:false
			}
		},
		onLoad() {
            
			// 测试截图url中参数
			// const currentPage = getCurrentPages().pop()
			// const options = currentPage.options
			// const optionsKeys = Object.keys(options)
			// console.log(optionsKeys)
			// let params = ''
			// if(optionsKeys.length !== 0) {
			// 	params = optionsKeys.reduce((pre,current) => {
			// 		return pre += current + "=" + options[current] + '&'
					
			// 	},'?').slice(0,-1)
			// }
			// console.log(params)
			// optionsKeys.reduce()
			
			isLogin()
			
			userInfo()
			
			this.getData()
			
			
			
		},
		methods: {
            clickSort(item){
				console.log(item)
				this.goodsList = []
				this.page = 1
				this.currentSort = item.index
				this.getData()
			},
			// 获取数据
			async getData(){
				// 骨架屏
				this.loading = true
				
				const params = {
					"params":{page:this.page}
				}
				
				// console.log(this.currentSort)
				if(this.currentSort == 1) params.params.sales = 1
				if(this.currentSort == 2) params.params.recommend = 1
				if(this.currentSort == 3) params.params.new = 1
				
				const res = await getIndexData(params)
				
				// 骨架屏
				this.loading = false
				
				this.slides = res.slides
				this.goodsList = [...this.goodsList,...res.goods.data]
			},
			onReachBottom(){
				// 重新请求数据，带上分页参数
				this.page = this.page + 1
				this.getData()
			}
		}
	}
</script>

<style scoped lang="scss">
	.tab-box {
		width: 100%;
	}
	.wrap {
	        padding: 12px;
	    }
	.main-content {
		width: 100%;
		
		.title {
			width: 100%;
			font-size: 16px;
			color: #333;
			font-weight: 800;
			margin: 10px 0;
		}
		// navigator {
		// 	margin-bottom: 15px;
		// 	padding: 20px 10px 20px 10px;
		// 	box-sizing: border-box;
		// 	box-shadow: 2px 2px 4px rgba(0,0,0,.1);
		// }
		// .goods-box {
		// 	display: flex;
		// 	width: 100%;
		// 	font-size: 13px;
		// 	.price{
		// 		flex: 1;
		// 		color: red;
		// 	}
		// 	.sales {
		// 		flex: 1;
		// 		color: #999;
		// 	}
		// }
	}
</style>
