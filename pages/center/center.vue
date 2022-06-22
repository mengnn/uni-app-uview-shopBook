<template>
	<view class="center-box">
		<view class="u-flex">
			<view class="u-m-r-10">
				<u-avatar :src="vuex_user.avatar_url" size="80"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{vuex_user.email}}</view>
			</view>
		</view>
		
		<view class="background-white u-m-t-20">
			<u-cell-group>
				<u-cell icon="setting" title="个人信息" url="/pages/center/baseinfo" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
		
		<view class="background-white u-m-t-20">
			<u-cell-group>
				<u-cell icon="red-packet" title="所有订单" :isLink="true"></u-cell>
				<u-cell icon="star" title="商品收藏" :isLink="true"></u-cell>
				<u-cell icon="map" title="收货地址" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
		
		<view class="background-white u-m-t-20">
			<u-cell-group>
				<u-cell icon="reload" title="退出登录" :isLink="true" @click="logOut"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {isLogin} from '../../config/utils.js';
	import {authLogOut} from '../../config/api.js';
	export default {
		data() {
			return {
				// pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		onLoad(){
			// console.log(this.vuex_token)
			// const token = this.vuex_token 
			// if(!token) {
			// 	uni.$u.toast("请登录")
			// 	setTimeout(()=>{
			// 		uni.$u.route({
			// 			type:'redirect',
			// 			url:'pages/auth/login'
			// 		})
			// 	},1500)
			// }
			
			// 调用自定义工具方法
			if (!isLogin()) return
			// console.log(123)
		},
		methods: {
			// 退出登录
			async logOut(){
				await authLogOut()
				uni.$u.toast("退出登录！")
				
				setTimeout(()=>{
					// 清楚vuex
					this.$u.vuex("vuex_token",null)
					this.$u.vuex("vuex_user",null)
					// 跳转页面
					uni.$u.route({
						type:'reLaunch',
						url:'pages/index/index'
					})
					
				},1500)
				
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #ededed;
	}
	.center-box {
		width: 100%;
		overflow:hidden;
		.u-flex {
			display: flex;
			background-color: #fff;
			padding: 15px 10px;
			box-sizing: border-box;
			align-items: center;
		}
		.u-m-t-20 {
			margin-top: 10px;
		}
		.u-m-r-10 {
			margin-right: 10px;
		}
		.background-white {
			background: #fff;
		}
	}
	.user-box{
		background-color: #fff;
	}
</style>
