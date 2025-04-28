import axios from 'axios';
import { getApiUrl } from './config';

// 1) Create the instance
const axiosWithHeaders = axios.create({
  baseURL: getApiUrl(),
  timeout: 10_000,           // optional: how long to wait
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// // 2) Request interceptor (e.g. auth token)
// axiosWithHeaders.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('authToken');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // 3) Response interceptor (error handling)
// axiosWithHeaders.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosWithHeaders;
