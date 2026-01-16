import { FC } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import { Button, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
  CopyOutlined,
  BlockOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";

import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from "@/store/componentsReducer";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";

const EditToolBar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetComponentInfo();

  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
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

  // 上移组件
  function handleMoveUp() {
    if (selectedIndex <= 0) {
      return;
    }
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }),
    );
  }
  // 下移组件
  function handleMoveDown() {
    if (selectedIndex >= componentList.length - 1) {
      return;
    }
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }),
    );
  }

  // 撤销
  function handleUndo() {
    dispatch(ActionCreators.undo());
  }
  // 重做
  function handleRedo() {
    dispatch(ActionCreators.redo());
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
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<ArrowUpOutlined />}
          onClick={handleMoveUp}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<ArrowDownOutlined />}
          onClick={handleMoveDown}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          onClick={handleUndo}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={handleRedo}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolBar;
