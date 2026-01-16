import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectPreviousComponent,
  selectNextComponent,
} from "@/store/componentsReducer";

/**
 * 判断当前活动元素是否有效
 * @returns 是否有效
 */
function isActiveElementValid() {
  const activeElement = document.activeElement;
  // 未增加dnd-kit的拖拽功能，当活动元素为body时，认为有效
  if (activeElement === document.body) {
    return true;
  }
  // 增加dnd-kit的拖拽功能后，当活动元素为dnd-kit的拖拽元素时，认为有效
  if (activeElement?.matches("div[role='button']")) {
    return true;
  }
  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  // 删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(removeSelectedComponent());
  });

  // 复制
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(copySelectedComponent());
  });

  // 粘贴
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(pasteCopiedComponent());
  });

  // 选中上一个组件
  useKeyPress("uparrow", () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(selectPreviousComponent());
  });
  // 选中下一个组件
  useKeyPress("downarrow", () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(selectNextComponent());
  });
  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) {
        return;
      }
      dispatch(ActionCreators.undo());
    },
    {
      exactMatch: true,
    },
  );
  // 重做
  useKeyPress(
    ["ctrl.shift.z", "meta.shift.z"],
    () => {
      if (!isActiveElementValid()) {
        return;
      }
      dispatch(ActionCreators.redo());
    },
    {
      exactMatch: true,
    },
  );
}

export default useBindCanvasKeyPress;
