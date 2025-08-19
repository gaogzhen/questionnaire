import { FC } from "react";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";

import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { changeSelectedId } from "@/store/componentsReducer";
import { useDispatch } from "react-redux";

const Edit: FC = () => {
  // 获取问卷信息
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  // 点击空白处，取消选中
  function handleClearSelected() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: "40px" }}>Header</div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main} onClick={handleClearSelected}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
