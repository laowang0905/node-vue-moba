import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(config => {
  if (sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return config
}, err => {
  console.log(err);

})
http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  // 根据服务端返回的状态码定位回登录页， 在路由守卫上不能只判断是否存在token， 因为很可能伪造一个token
  // console.log(err.response.status);
  if(err.response.status >= 400) {
    router.replace('/login')
  }
  
  return Promise.reject(err)
})
export default http