import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { loginReducer } from "@/store/userReducer";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoApi } from "@/api/user";

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);

  const dispatch = useDispatch();

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoApi, {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });
  // 判断redux是否已经存在用户信息
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return { waitingUserData };
}

export default useLoadUserData;
