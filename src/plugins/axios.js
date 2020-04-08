'use strict'

import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
// Full config:  https://github.com/axios/axios#request-config
//axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
//x-www-form-urlencoded
const config = {

  baseURL: 'http://localhost:8005',//process.env.baseURL || process.env.apiUrl || "",
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //为请求添加token
    let token =Cookies.get('token')
    if(token){
      config.headers.token=token//此处的token方法 token=token
      console.log(token);
      console.log(config);
    }else {
      //router.push('/login')
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
