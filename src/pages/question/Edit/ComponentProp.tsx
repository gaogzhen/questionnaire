import { FC } from "react";
import { useDispatch } from "react-redux";

import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import {
  getComponentConfByType,
  ComponentPropsType,
} from "@/components/QuestionComponents";

import { changeComponentProps } from "@/store/componentsReducer";

const NoProp: FC = () => <div style={{ textAlign: "center" }}>未选中组件</div>;

const ComponentProp: FC = () => {
  const dispatch = useDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) {
    return <NoProp />;
  }

  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) {
    return <NoProp />;
  }

  const { PropComponent } = componentConf;

  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) {
      return;
    }
    const { fe_id } = selectedComponent;

    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  );
};

export default ComponentProp;
