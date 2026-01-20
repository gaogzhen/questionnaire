import { FC } from "react";
import { useDispatch } from "react-redux";
import { useTitle } from "ahooks";

import { changeSelectedId } from "@/store/componentsReducer";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";
import useGetPageInfo from "@/hooks/useGetPageInfo";

import styles from "./index.module.scss";

import EditCanvas from "./EditCanvas";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

const Edit: FC = () => {
  // 获取问卷信息
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  const { title } = useGetPageInfo();
  useTitle(`问卷编辑 - ${title}`);

  // 点击空白处，取消选中
  function handleClearSelected() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: "40px" }}>
        <EditHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={handleClearSelected}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
