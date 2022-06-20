<template>
	<view class="baseinfo-box">
		<u--form
			labelPosition="left"
			:model="baseinfo"
			:rules="rules"
			ref="uForm"
			labelAlign="right"
		>
			<u-form-item
				label="昵称:"
				prop="name"
				ref="item1"
				borderBottom
			>
			    <u--input
					v-model="baseinfo.name"
					placeholder="请输入昵称"
					border="none"
				></u--input>
			</u-form-item>
	   </u--form>
	   <u-button type="primary" class="submit-btn" @click="submit">保存</u-button>
	</view>
</template>

<script>
	import {authResigter} from '../../config/api.js';
	export default {
		data() {
			return {
				baseinfo:{
					name:'',
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
				}
			}
		},
		onLoad() {
			this.baseinfo.name = this.vuex_user.name
		},
		methods: {
			
			// 提交
			submit() {
				
				console.log(this.baseinfo)
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast("校验成功")
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.baseinfo-box {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		.submit-btn {
			width: 80%;
			margin: 20px auto;
		}
	}
</style>
