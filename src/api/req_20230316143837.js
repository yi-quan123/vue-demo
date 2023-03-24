import Axios from 'axios'
import qs from 'query-string'

const instance = Axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(config => {

    // 统一处理POST请求
    if(config.method=='post'){
        config.data=qs.stringify(config.data)
    }

    return config;
})

// 相应拦截
instance.interceptors.response.use(res => {

    // 成功
    return res.data;
}, err => {

    // 失败
    return Promise.reject(err)
})



export default instance;