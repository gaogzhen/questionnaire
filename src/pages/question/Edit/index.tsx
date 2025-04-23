import { FC } from "react";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";

const Edit: FC = () => {
  // 获取问卷信息
  const { loading, data } = useLoadQuestionData();
  return (
    <div>
      <p>Edit page</p>
      <div>{loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}</div>
    </div>
  );
};

export default Edit;
