import request, { ResDataType } from "../services/request";

/**
 * 获取用户信息
 * @returns  用户信息
 */
export async function getUserInfoApi(): Promise<ResDataType> {
  const url = "/api/user/info";
  const data = (await request.get(url)) as ResDataType;
  return data;
}

/**
 * 注册新用户
 * @returns  注册是否成功
 */
export async function registerApi(
  username: string,
  password: string,
  nickname?: string,
): Promise<ResDataType> {
  const url = "/api/user/register";
  const body = { username, password, nickname: nickname || username };
  const data = (await request.post(url, body)) as ResDataType;
  return data;
}

/**
 * 用户登录
 * @returns  token
 */
export async function loginApi(
  username: string,
  password: string,
): Promise<ResDataType> {
  const url = "/api/user/login";
  const body = { username, password };
  const data = (await request.post(url, body)) as ResDataType;
  return data;
}
