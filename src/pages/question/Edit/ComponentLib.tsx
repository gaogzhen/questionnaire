import { FC } from "react";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import {
  componentConfGroup,
  ComponentConfType,
} from "@/components/QuestionComponents";
import { addComponent } from "@/store/componentsReducer";
import styles from "./ComponentLib.module.scss";

const { Title } = Typography;

// 生成组件函数，接收 dispatch 作为参数
function genComponent(
  c: ComponentConfType,
  dispatch: ReturnType<typeof useDispatch>,
) {
  const { title, type, Component, defaultProps } = c; // 解构组件配置

  // 处理点击事件，添加组件到画布
  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(), // 生成唯一 ID
        title, // 组件标题
        type, // 组件类型
        props: defaultProps, // 默认属性
      }),
    );
  }
  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  // 在组件顶层调用 hook
  const dispatch = useDispatch();

  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group; // 解构分组信息
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{
                fontSize: "16px",
                marginTop: index === 0 ? "0" : "20px",
              }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c, dispatch))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
