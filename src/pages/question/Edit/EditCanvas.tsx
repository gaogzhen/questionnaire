import { FC } from "react";
import styles from "./EditCanvas.module.scss";

import { Spin } from "antd";

// import QuestionTitle from "@/components/QuestionComponents/QuestionTitle/Component";
// import QuestionInput from "@/components/QuestionComponents/QuestionInput/Component";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { ComponentInfoType } from "@/store/componentsReducer";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { changeSelectedId } from "@/store/componentsReducer";

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
  const { componentList = [], selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 获取当前选中的组件
  function handleClick(e: React.MouseEvent<HTMLDivElement>, fe_id: string) {
    e.stopPropagation();
    dispatch(changeSelectedId(fe_id));
  }

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

        // 拼接 class name
        const wrapperDefaultClassName = styles["component-wrapper"];
        const selectedClassName = styles.selected;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={(e) => handleClick(e, fe_id)}
          >
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
