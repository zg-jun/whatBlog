import axios from 'axios';
import Router from '../../router';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // 未登录处理
    Router.push({name:'admin.login'});
  }
  return Promise.reject(error);
});

export default axios;