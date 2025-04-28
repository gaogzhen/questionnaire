import axios from "axios";
import { message } from "antd";
import { AUTHORIZATION } from "@/constant";
import { getToken } from "@/utils/userToken";

const request = axios.create({
  timeout: 5000,
});

// request拦截：每次请求携带token
request.interceptors.request.use((config) => {
  // todo token 校验
  config.headers[AUTHORIZATION] = `Bearer ${getToken()}`;
  return config;
});

// response 拦截：统一处理errno和msg
request.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }

  return data as any;
});
export default request;

export type ResDataType = {
  [key: string]: any;
};

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};
