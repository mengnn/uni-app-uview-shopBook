<template>
	<view class="register-box">
		<u--form
			labelPosition="left"
			:model="registerInfo"
			:rules="rules"
			ref="uForm"
			labelWidth="80px"
			labelAlign="right"
		>
			<u-form-item
				label="姓名:"
				prop="name"
				ref="item1"
			>
			    <u--input
					v-model="registerInfo.name"
					placeholder="请输入昵称"
				></u--input>
			</u-form-item>
			<u-form-item
				label="邮箱:"
				prop="email"
				ref="item1"
			>
			    <u--input
					v-model="registerInfo.email"
					placeholder="请输入邮箱"
				></u--input>
			</u-form-item>
				<u-form-item
					label="密码:"
					prop="password"
					ref="item1"
				>
				    <u--input
						v-model="registerInfo.password"
						type="password"
						placeholder="请输入密码"
					></u--input>
			</u-form-item>
			<u-form-item
					label="确认密码:"
					prop="password_confirmation"
					ref="item1"
				>
				    <u--input
						v-model="registerInfo.password_confirmation"
						type="password"
						placeholder="请输入确认密码"
					></u--input>
			</u-form-item>
	   </u--form>
	   <u-button type="primary" class="submit-btn" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {authResigter} from '../../config/api.js';
	export default {
		data() {
			return {
				registerInfo:{
					name:'',
					email:'',
					password:'',
					password_confirmation:''
				},
				rules:{
					name:[
						// 必填规则
						{
							required: true,
							message: '昵称不能为空！',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
					],
					email:[
						// 必填规则
						{
							required: true,
							message: '邮箱不能为空！',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
						// 正则判断为邮箱是否正确
						{
							pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '请输入正确的邮箱地址！'
						},
					],
					password:[
						// 必填规则
						{
							required: true,
							message: '密码不能为空！',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
						{
							min: 6,
							message: '密码不能少于6位！'
						},
					],
					password_confirmation:[
						// 必填规则
						{
							required: true,
							message: '密码不能为空！',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						},
						{
							min: 6,
							message: '密码不能少于6位！'
						},
					],
				}
			}
		},
		methods: {
			
			// 提交
			submit() {
				
				console.log(this.registerInfo)
				this.$refs.uForm.validate().then(res => {
					if(this.registerInfo.password !== this.registerInfo.password_confirmation) {
						uni.$u.toast('密码和确认密码请保持一致！')
					} else {
						const params = this.registerInfo
						authResigter(params).then((res) => {
							console.log(res)
							uni.$u.toast("注册成功，请登录！")
							setTimeout(()=>{
								uni.$u.route({
									type:'reLaunch',
									url:'pages/auth/login'
								})
							},1500)
						}).catch((err) => {
							
						})
					}
					
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.register-box {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		.submit-btn {
			width: 80%;
			margin: 20px auto;
		}
	}
</style>
