import { ComponentInfoType } from "./index";

/**
 * 获取下一个选中的组件id
 * @param fe_id 当前组件id
 * @param componentList 组件列表
 * @returns 下一个选中的组件id
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[],
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) {
    // 未找到组件
    return "";
  }

  const length = visibleComponentList.length;
  let newSelectedId;
  if (length <= 1) {
    // 只有一个组件,删除后为空
    newSelectedId = "";
  } else if (index + 1 === length) {
    // 删除最后一个组件，选中上一个组件
    newSelectedId = visibleComponentList[index - 1].fe_id;
  } else {
    // 选中下一个组件
    newSelectedId = visibleComponentList[index + 1].fe_id;
  }

  return newSelectedId;
}
