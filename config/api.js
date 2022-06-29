const http = uni.$u.http

// post请求，获取菜单
// export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('api/index', data)


// 首页get请求
export const getIndexData = (data) => http.get("/api/index", data)

// 认证相关的

export const authLogin = (params, config = {}) => http.post("/api/auth/login", params, config) // 登录

export const authResigter = (params, config = {}) => http.post("/api/auth/register", params, config) // 注册

export const authLogOut = () => http.post("/api/auth/logout") // 退出登录

export const authOssToken = () => http.get("/api/auth/oss/token") // 获取osstoken 用于上传图片


// 商品相关

export const goodsInfo = (id) => http.get(`/api/goods/${id}`) // 商品详情

export const goodsList = (params) => http.get('/api/goods',params) // 商品列表

// 搜藏
export const isCollect = (id) => http.post(`/api/collects/goods/${id}`) // 收藏

// 购物车相关
export const cardAdd = (params) => http.post("/api/carts",params) // 添加购物车
export const cardCount = () => http.get("/api/carts") // 购物车商品数量


// 用户相关

export const userInfo = () => http.get("/api/user")  // 用户详情

export const updateUserInfo = (params) => http.put("/api/user", params) // 更新用户信息

export const updateAvatar = (params) => http.patch("/api/user/avatar", params) // 更新头像