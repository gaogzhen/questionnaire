import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isLoginOrRegister,
  isNotNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from "@/router";

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();

  const nav = useNavigate();
  useEffect(() => {
    if (waitingUserData) {
      return;
    }
    // 已登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        console.log("url", pathname);

        // 不需要再登录或者注册
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登录
    if (isNotNeedUserInfo(pathname)) {
      // 不需要用户信息
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
