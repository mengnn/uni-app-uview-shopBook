// 自定义工具
// import 
import {authLogin, userInfo} from '@/config/api.js';
export const isLogin = () => {
	const token = uni.getStorageSync('lifeData').vuex_token
	if(!token) {
		// hx内置方法 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
		const {options,route} = getCurrentPages().pop()
		
		console.log(options)
		
		const optionsKeys = Object.keys(options)
		console.log(optionsKeys)
		let params = ''
		if(optionsKeys.length !== 0) {
			params = optionsKeys.reduce((pre,current) => {
				return pre += current + "=" + options[current] + '&'
			},'?').slice(0,-1)
		}
		console.log(params)
		// 内置数据缓存
		uni.setStorageSync("back_url",route+params)
		
		uni.$u.toast("请登录")
		setTimeout(()=>{
			uni.$u.route({
				type:'redirect',
				url:'pages/auth/login'
			})
		},1500)
		return false
	} else {
		return true
	}
}


// 更新用户信息
export const userInfoUpdate = async () => {
	const userInfoRes = await userInfo();
	// console.log(userInfoRes)
	uni.$u.vuex("vuex_user",userInfoRes)
}