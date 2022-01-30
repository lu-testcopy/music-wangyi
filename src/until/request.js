import axios from 'axios'
import vue from 'vue'
// http://www.codeman.ink/api
const request = axios.create({
    baseURL: 'http://www.codeman.ink/api',
    timeout: 30000,
})
// request.defaults.withCredentials = true;
// request.interceptors.request.use(config =>{
//     // 任何请求都会经过这里
//     // config是当前请求的相关配置信息
//     // 可以将token设置在请求拦截里面
//     const cookie = window.localStorage.getItem('cookie')
//     if(cookie) {
//       // config.headers.cookie = cookie
//     }
//     // console.log(config);
//     return config;
//   },err => {
//     console.log(err);
//   })
export default request 