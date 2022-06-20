import {isLogin} from 'config/utils.js';

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = 'https://api.shop.eduwork.cn/'; /* 根域名 */
		return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	 //    config.data = config.data || {}
		// // 根据custom参数中配置的是否需要token，添加对应的请求头
		// if(config?.custom?.auth) {
		// 	// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		// 	// config.header.token = vm.$store.state.userInfo.token
			config.header.Authorization = "Bearer " + vm.vuex_token
		// }
		
		// config.header.Authorization = "Bearer" + " eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnNob3AuZWR1d29yay5jblwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1NTQzMjE1NywiZXhwIjoxNjU1NzkyMTU3LCJuYmYiOjE2NTU0MzIxNTcsImp0aSI6ImVYOTRwejB2SHRlS2xzd1oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.TR03KbjEm_bemh5xAATslcsYLbX_otejiuUQrMJBpPU"
		
	    return config 
	}
	, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
	   
	    // console.log(response)
	    const { statusCode,data } = response
		// const data = response.data
		// console.log(statusCode)

		// 自定义参数
		const custom = response.config?.custom
		if (statusCode < 400) { 
			return data === undefined ? {} : data
		}else {
			
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.message)
			}
			
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => { })
			}
		}
		
	}, (response) => { 
		console.log(response)
		if (response.statusCode == 400) {
			uni.$u.toast(response.data.message)
			return false
		}else if (response.statusCode == 401) { 
			// 401的两种情况，一种是认证未通过，一种是没有token或者过期
			if(response.data.message == "Unauthorized") {
				uni.$u.toast("邮箱或密码错误！")
			} else {
				// uni.$u.toast("验证失败，请重新登录！")
				// uni.$u.route('/pages/auth/login.vue');
				
				// 调用工具里面的方法
				// isLogin()
			}
			
			return false
		}else if (response.statusCode == 422) { 
			// uni.$u.toast("未登录")
			// console.log(Object.values(response.data.errors)[0][0])
			uni.$u.toast(Object.values(response.data.errors)[0][0])
			return false
		}else {
			
		}
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
	
	
	// 增加patch请求
	vm.$u.http.patch = (url,params={},header={}) => {
		// 模拟patch请求
		const _params = {
			...params,
			_method:"PATCH"
		}
		return vm.$u.http.post(url,_params,header)
	}
	
}