import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
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
  if (activeElement === document.body) {
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
}

export default useBindCanvasKeyPress;
