import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import { Button, Result, Spin } from "antd";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";
import useGetPageInfo from "@/hooks/useGetPageInfo";

import styles from "./index.module.scss";
import StatHeader from "./StatHeader";

const Stat: FC = () => {
  // 获取问卷信息
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();
  const nav = useNavigate();

  useTitle(`问卷统计 - ${title}`);

  // 生成 loading 元素
  const loadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  // 生成未发布元素
  const notPublishedElem = (
    <div style={{ flex: "1" }}>
      <Result
        status="warning"
        title="该页面尚未发布"
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            返回
          </Button>
        }
      />
    </div>
  );

  // 生成内容元素
  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return notPublishedElem;
    }
    return (
      <>
        <div className={styles.left}>left</div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>right</div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <StatHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        {loading && loadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
};

export default Stat;
