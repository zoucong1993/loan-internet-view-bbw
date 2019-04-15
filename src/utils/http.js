import axios from 'axios'
import { error as errorMessage } from './message'
import router from '@/router';
import sessionStorage from '@/utils/sessionStorage';

const http = axios.create({
    baseURL: '',
    timeout: 30000,
    headers: {'content-type': 'application/json;charset=UTF-8'},
});

// request 拦截器
http.interceptors.request.use(
    config => {
        // config.url = config.url.replace('/loan/', '/').replace('/rule/', '/');
        if (router.history.current.meta.id) {
            if (config.data || (config.data = {})) {
                config.data._APP_ID_ = router.history.current.meta.id;
            }
        }
        return config;
    },
    error => {
        errorMessage(error.message);
        return Promise.reject(error);
    }
);

// respone 拦截器
http.interceptors.response.use(
    response => {
        const res = response.data;
        // 用户未登录
        if (res.code && res.code === 999999){
            errorMessage(res.msg);
            // 清除所有数据
            sessionStorage.clearAll();
            router.push('/login');
        }
        return Promise.resolve(res);
    },
    error => {
        errorMessage(error.message);
        return Promise.reject(error);
    }
);

export default http
