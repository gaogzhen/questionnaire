import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, message, Space } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import classNames from "classnames";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import {
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  toggleComponentLocked,
} from "@/store/componentsReducer";
import styles from "./Layers.module.scss";

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 当前正在修改标题的组件id
  const [changingTitleId, setChangingTitleId] = useState<string>("");

  // 点击标题
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("该组件被隐藏，无法选中");
      return;
    }

    if (fe_id !== selectedId) {
      // 执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId(""); // 清空
      return;
    }
    // 点击标题，开始修改标题
    setChangingTitleId(fe_id);
  }

  function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim();
    if (newTitle === "") {
      message.info("标题不能为空");
      return;
    }
    if (!selectedId) {
      return;
    }

    // 更新标题
    dispatch(changeComponentTitle({ fe_id: selectedId, newTitle }));
  }

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }

  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;
        // 拼接 title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;

        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleTitleClick(fe_id)}
            >
              {changingTitleId === fe_id && (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => setChangingTitleId("")}
                  onBlur={() => setChangingTitleId("")}
                />
              )}
              {changingTitleId !== fe_id && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={isHidden ? styles.btn : ""}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? "primary" : "text"}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                  size="small"
                  shape="circle"
                  className={isLocked ? styles.btn : ""}
                  icon={<LockOutlined />}
                  type={isLocked ? "primary" : "text"}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Layers;
