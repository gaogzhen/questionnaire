import { FC } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { changeSelectedId, moveComponent } from "@/store/componentsReducer";
import useBindCanvasKeyPress from "@/hooks/useBindCanvasKeyPress";
import { Spin } from "antd";

import styles from "./EditCanvas.module.scss";
// import QuestionTitle from "@/components/QuestionComponents/QuestionTitle/Component";
// import QuestionInput from "@/components/QuestionComponents/QuestionInput/Component";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { ComponentInfoType } from "@/store/componentsReducer";
import SortableContainer from "@/components/DragSortable/SortableContainer";
import SortableItem from "@/components/DragSortable/SortableItem";

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
  // 绑定快捷键
  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  const componentListWithId = componentList.map((c) => ({
    ...c,
    id: c.fe_id,
  }));

  function handleDragEnd(oldIndex: number, newIndex: number) {
    console.log(oldIndex, newIndex);
    // verify: oldIndex and newIndex are valid
    if (
      oldIndex < 0 ||
      oldIndex >= componentListWithId.length ||
      newIndex < 0 ||
      newIndex >= componentListWithId.length ||
      oldIndex === newIndex
    ) {
      return;
    }
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c;

            // 拼接 class name
            const wrapperDefaultClassName = styles["component-wrapper"];
            const selectedClassName = styles.selected;
            const lockedclassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedclassName]: isLocked,
            });

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
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
    </SortableContainer>
  );
};

export default EditCanvas;
