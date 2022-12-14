import axios from "axios";

// 创建实例对象
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 引自 环境变量
  timeout: 100000, // request timeout
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
