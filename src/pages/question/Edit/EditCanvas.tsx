import { FC } from "react";
import styles from "./EditCanvas.module.scss";

import { Spin } from "antd";

// import QuestionTitle from "@/components/QuestionComponents/QuestionTitle/Component";
// import QuestionInput from "@/components/QuestionComponents/QuestionInput/Component";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { ComponentInfoType } from "@/store/componentsReducer";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) {
    return null;
  }
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList = [] } = useGetComponentInfo();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c;
        return (
          <div key={fe_id} className={styles["component-wrapper"]}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        );
      })}
      {/* <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;
