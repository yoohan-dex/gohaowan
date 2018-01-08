import axios from 'axios';
import { MessageBox } from 'mint-ui';
import store from '@/store';

const BASE_API = 'http://112.74.25.233:8004';

const service = axios.create({
  baseURL: BASE_API, // process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  headers: { 'content-type': 'application/json', isAjax: '1' },
});

service.interceptors.request.use(
  (config) => {
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
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.data.code === 10030) {
      return response.data;
    }
    if (response.data.code !== 0) {
      MessageBox.alert(response.error, '请求异常');
    }
    return response.data;
  },
  (error) => {
    console.log(`err${error}`);
    MessageBox.alert(error.message, '请求错误');
    return Promise.reject(error);
  },
);
export default service;
