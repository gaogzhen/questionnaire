import { FC } from "react";
import { Spin } from "antd";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";

const Stat: FC = () => {
  // 获取问卷信息
  const { loading } = useLoadQuestionData();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Spin />
      </div>
    );
  }
  return <div>stat</div>;
};

export default Stat;
