import axios from "axios";
import { message } from "antd";

const request = axios.create({
  timeout: 5000,
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
