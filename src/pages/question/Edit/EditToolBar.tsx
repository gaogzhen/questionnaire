import { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
  CopyOutlined,
  BlockOutlined,
} from "@ant-design/icons";

import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from "@/store/componentsReducer";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";

const EditToolBar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

  // 删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }

  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }

  // 复制组件
  function handleCopy() {
    dispatch(copySelectedComponent());
  }

  // 粘贴组件
  function handlePaste() {
    dispatch(pasteCopiedComponent());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title={isLocked ? "解锁" : "锁定"}>
        <Button
          shape="circle"
          icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
          onClick={handleLock}
          // type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolBar;
