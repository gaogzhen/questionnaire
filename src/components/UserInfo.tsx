import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useRequest } from "ahooks";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { LOGIN_PATHNAME } from "../router/index";
// import { getUserInfoApi } from "@/api/user";
import { removeToken } from "@/utils/userToken";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "@/store/userReducer";

const UserInfo: FC = () => {
  const nav = useNavigate();

  // const { data } = useRequest(getUserInfoApi);
  // const { username, nickname } = data || {};
  const { username, nickname } = useGetUserInfo();
  const dispatch = useDispatch();

  function logout() {
    // 清除用户信息和token信息
    dispatch(logoutReducer());
    removeToken();
    // 跳转登录页
    nav(LOGIN_PATHNAME);
  }

  const User = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;
  return <>{username ? User : Login}</>;
};
export default UserInfo;
