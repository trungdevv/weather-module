import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';
const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_END_POINT,
  responseType: "json",
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE",
  //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  // },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);
api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);
export { api };
