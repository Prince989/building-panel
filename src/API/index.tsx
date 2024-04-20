import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import toast from 'react-hot-toast';

console.log(process.env.REACT_APP_URL);
const httpClient = axios.create({
    baseURL: process.env.REACT_APP_URL
});

httpClient.interceptors.request.use(async config => {
    if (config.data) {
        for (const key of Object.keys(config.data)) {
            if (config.data[key] === '') {
                delete config.data[key];
            }
        }
    }

    if (typeof window !== 'undefined' && localStorage.getItem('site') !== null) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('site')}`;
    }

    return config;
});

httpClient.interceptors.response.use(
    res => {
        if (res?.data?.detail && res?.status === 200) {
            toast.success(res?.data?.detail, { style: { zIndex: 2000 } });
        }
        return res;
    },
    error => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('site');
            window.location.href = '/auth/login';
        } else {
            if (error?.response?.data) {
                enqueueSnackbar(error.response.data.message, {
                    variant : "error",
                    anchorOrigin : {
                        horizontal : "right",
                        vertical : "bottom"
                    }
                })
                Object?.keys(error?.response?.data)?.forEach((item: any, index) => {
                    if (index === 0) {
                        Object.values(error?.response?.data).forEach((item1: any, index) => {
                            if (index === 0) {
                                toast.error(`${item} : ${item1}`, { style: { zIndex: 2000 } });
                            }
                        });
                    }
                });
            }
        }
        return Promise.reject(error);
    }
);

export default httpClient;
