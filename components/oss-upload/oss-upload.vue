<!-- 图片上传组件 -->
<template>
	<u-upload
		uploadIcon="camera-fill"
		maxSize="5 * 1024 * 1024"
		name="1"
		:maxCount="1"
		:multiple="false"
		:deletable="true"
		@afterRead="afterRead"
		@beforeRead="beforeRead"
	>
	  <slot :imgSrc="imgSrc"></slot>
	</u-upload>
</template>

<script>
	import {authOssToken,updateAvatar} from '@/config/api.js';
	import {userInfoUpdate} from '@/config/utils.js';
	export default {
		name:"oss-upload",
		data() {
			return {
				// fileListArr: [],
				imgSrc:'',
				action:''  ,// 上传域名
				formData:{}  ,// 上传携带参数
				thisUpFileName:''
			};
		},
		methods: {
			beforeRead(){
				console.log("")
			},
			
			// 新增图片
			async afterRead(event) {
				let lists = [].concat(event.file)
				
				// #ifdef H5
				const fileName = lists[0].name
				// #endif
				
				// #ifndef H5
				 const fileName = lists[0].path
				// #endif
				
				console.log(fileName)
				
				// 获取osstoken
				const ossToken = await authOssToken()
				console.log(ossToken)
				
				// 设置上传域名
				this.action = ossToken.host
				// 处理唯一的文件名
				const suffix = fileName.slice(fileName.lastIndexOf('.'))
				// 生成唯一文件名
				const upFileName = uni.$u.guid(20) + suffix
				this.thisUpFileName = upFileName
				console.log(upFileName)
				
				// 设置携带参数
				this.formData = {
					'key' : upFileName, //上传后的文件名
					'policy': ossToken.policy, // 上传策略
					'OSSAccessKeyId': ossToken.accessid, 
					'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
					'signature': ossToken.signature, // 签名
				}
				
				// this.uploadFilePromise(upFileName,ossToken.host,this.formData)
				
				uni.uploadFile({
					url: ossToken.host, // 仅为示例，非真实的接口地址
					filePath: upFileName,
					name: 'file',
					formData: this.formData,
					success: (res) => {
						console.log(res)
						const params = {
								avatar:this.thisUpFileName
							}
						updateAvatar(params)
						
						// 更新用户信息
						userInfoUpdate()
					}
				});
				
				// return true
			},
		
		}
	}
</script>

<style>

</style>