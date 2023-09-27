/*
 * @Author: 黄叶
 * @Date: 2023-03-16 14:11:42
 * @LastEditTime: 2023-04-14 09:07:13
 * @FilePath: /class/src/utils/request.js
 * @Description: 
 */
import axios from "axios";

//  创建axios的对象
const instance = axios.create({
  // baseURL: "http://192.168.31.141:8088/api",
  // baseURL: "http://127.0.0.1:8088/api",
  // baseURL: "http://192.168.219.22:8088",
  baseURL: "http://43.139.54.138:8088/api",
  // baseURL: "http://112.94.99.140:8088",

  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

//  请求拦截
//  所有的网络请求都会走这个方法,可以在请求添加自定义内容
instance.interceptors.request.use(
  function (config) {
    config.headers.token = ""; // 请求头添加token值
    config.headers.info = ""; // 请求头添加info值
    return config;
  },
  function (err) {
    return Promise.request(err);
  }
);

// 响应拦截
// 此处可以根据服务器返回的状态码做相应的数据
// instance.interceptors.response.use(
//     function (response) {
//         const res = response
//         if (res.status === 500) {
//             MessageBox.alert('系统未登录，请重新登录', '错误', {
//                 confirmButtonText: '确定',
//                 type: 'error'
//             }).then(() => {
//                 store.dispatch('FedLogOut').then(() => {
//                     location.reload()
//                 })
//             })
//             return Promise.reject('error')
//         } else if (res.errno === 502) {
//             MessageBox.alert('系统内部错误，请联系管理员维护', '错误', {
//                 confirmButtonText: '确定',
//                 type: 'error'
//             })
//             return Promise.reject('error')
//         }
//     },
//     function (err) {
//         return Promise.request(err)
//     }
// )

//  封装get和post请求
export function get(url, params) {
  return instance.get(url, { params });
}

export function post(url, data) {
    return instance.post(url, data)
}

export default instance;
