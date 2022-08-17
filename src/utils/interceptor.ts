import { AxiosRequestConfig } from "axios";
import axios from "../constants/axios";

export const requestInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.ContentType = "application/test";
  }
  return config;
};

export const createInterceptors = () => {
  axios.interceptors.request.use(requestInterceptor);
};
