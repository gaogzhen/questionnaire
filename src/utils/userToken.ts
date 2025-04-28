/**
 * @description localStorage管理用户token
 * @author gaogzhen
 */

const KEY = "USER-TOKEN";

/**
 * 设置token
 * @param token
 */
export function setToken(token: string) {
  localStorage.setItem(KEY, token);
}

/**
 * 获取token
 * @returns token
 */
export function getToken() {
  return localStorage.getItem(KEY) || "";
}

/**
 * 删除token
 */
export function removeToken() {
  localStorage.removeItem(KEY);
}
