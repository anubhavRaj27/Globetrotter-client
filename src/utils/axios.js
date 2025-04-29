import axios from 'axios';
import { getApiUrl } from './config';
import store from '../store/index.js'

const axiosWithHeaders = axios.create({
  baseURL: getApiUrl(),
  timeout: 10_000,          
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

axiosWithHeaders.interceptors.request.use(
  config => {
    const { auth: { token } } = store.getState();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default axiosWithHeaders;
