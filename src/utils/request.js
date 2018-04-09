import axios from 'axios';
import { MessageBox } from 'mint-ui';
import store from '@/store';

const service = axios.create({
  baseURL: process.env.BASE_API, // process.env.BASE_API, // api的base_url
  timeout: 10000, // 请求超时时间
  headers: { 'content-type': 'application/json', isAjax: '1' },
  withCredentials: true,
});

service.interceptors.request.use(
  config => {
    console.log('store', store); // eslint-disable-line
    if (store.getters.token) {
      return {
        ...config,
        headers: {
          'X-Token': '',
        },
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    const code = response.data.code;
    if (code === 10030 || code === 10031) {
      return response.data;
    }
    if (response.data.code !== 0) {
      MessageBox.alert(response.data.message, '请求异常');
    }
    return response.data;
  },
  error => {
    MessageBox.alert('请求繁忙，请稍后重试', '请求错误');
    return Promise.reject(error);
  },
);
export default service;
