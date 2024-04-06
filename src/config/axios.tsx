import axios from 'axios';

const instance = axios.create({
    baseURL: "https://s4n7uc90k5.execute-api.us-east-1.amazonaws.com/staging"
});

instance.interceptors.request.use(async config => {
    if (config.data) {
        for (const key of Object.keys(config.data)) {
            if (config.data[key] === '') {
                delete config.data[key];
            }
        }
    }
/* 
    if (typeof window !== 'undefined' && localStorage.getItem('Token') !== null) {
        config.headers.Authorization = `Token ${localStorage.getItem('Token')}`;
    } */

    return config;
});

instance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        if (error?.response?.status === 401) {
            window.location.href = '/';
        } else {
            if (error?.response?.data) {
                Object?.keys(error?.response?.data)?.forEach((item: any, index) => {
                    if (index === 0) {
                        Object.values(error?.response?.data).forEach((item1: any, index) => {
                            
                        });
                    }
                });
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
