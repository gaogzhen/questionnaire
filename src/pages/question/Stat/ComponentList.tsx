import { FC } from "react";
import classNames from "classnames";

import styles from "./ComponentList.module.scss";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { getComponentConfByType } from "@/components/QuestionComponents";

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = (props) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { componentList = [] } = useGetComponentInfo();

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, props, type } = c;
          const componentConf = getComponentConfByType(type);
          if (componentConf == null) {
            return null;
          }
          const { Component } = componentConf;

          // 拼接 class name
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
          });

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
