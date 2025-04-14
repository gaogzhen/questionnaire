import { FC } from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";

const UserInfo: FC = () => (
  // 登录跳转 todo
  <Link to={LOGIN_PATHNAME}>登录</Link>
);
export default UserInfo;
