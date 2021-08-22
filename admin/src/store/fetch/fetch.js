import axios from 'axios'
/**
 * 网络请求配置
 */

 axios.defaults.timeout = 5000;
//  axios.defaults.baseURL = "http://localhost:5000";
 axios.defaults.baseURL = "http://admin.zznmovielab.top/api";
 
 /**
  * http request 拦截器
  */
 axios.interceptors.request.use(
   (config) => {
     config.data = JSON.stringify(config.data);
     config.headers = {
       "Content-Type": "application/json",
     }
     config.withCredentials = true
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
 );
 
 /**
  * http response 拦截器
  */
    axios.interceptors.response.use(
        (response) => {
            return response.data;
        },
    );

export function post(url, data) {
   return axios.post(url,data)
}


/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
 export function get(url,param) {
    return axios.get(url,{params:param})
  }