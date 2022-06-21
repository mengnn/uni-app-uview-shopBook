<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录书城</view>
			<input class="u-border-bottom" type="text" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<!-- <view class="tips">未注册的手机号验证后自动创建美团账号</view> -->
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @click="goRegister">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	
import {authLogin, userInfo} from '../../config/api.js';

export default {
	data() {
		return {
			email: '',
			password:''
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(uni.$u.test.email(this.email) && this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		
		async submit() {
			if(!uni.$u.test.email(this.email) || !this.password) return
			
			const params = {
					email: this.email,
					password: this.password
				}
			const loginRes = await authLogin(params)
			// console.log(loginRes)
			uni.$u.toast("登录成功")
			
			// 缓存token
			this.$u.vuex("vuex_token",loginRes.access_token)
			
			// 获取用户信息
			const userInfoRes = await userInfo();
			console.log(userInfoRes)
			this.$u.vuex("vuex_user",userInfoRes)
			
			
			// 内置数据缓存 获取
			const get_back_url = uni.getStorageSync("back_url")
			// console.log(get_back_url)
			setTimeout(() => {
				uni.$u.route({
					type:"reLaunch",
					url:get_back_url
				})
			},1500)
			
		},
		goRegister(){
			uni.$u.route({
				type:'reLaunch',
				url:'pages/auth/register'
			})
		}
	}
};
</script>
<style lang="scss" scoped>
	.u-border-bottom {
		margin-bottom: 20px!important;
	}
	.wrap {
		font-size: 14px;
		.content {
			width: 300px;
			padding-top: 40px;
			margin: 0px auto 0;

			.title {
				text-align: left;
				font-size: 30px;
				font-weight: 500;
				margin-bottom: 50px;
			}
			input {
				text-align: left;
				margin-bottom: 5px;
				padding-bottom: 3px;
			}
			.tips {
				color: $u-info;
				margin-bottom: 30px;
				margin-top: 4px;
			}
			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 15px;
				padding: 6px 0;
				
				&::after {
					border: none;
				}
			}
			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 15px;
			}
		}
		.buttom {
			.loginType {
				display: flex;
				padding: 175px 75px 75px 75px;
				justify-content:space-between;
				
				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 14px;
				}
			}
			
			.hint {
				padding: 10px 20px;
				font-size: 10px;
				color: $u-tips-color;
				
				.link {
					color: $u-warning;
				}
			}
		}
	}
</style>
