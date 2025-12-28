import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { ComponentPropsType } from "@/components/QuestionComponents";

import { getNextSelectedId } from "./utils";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  // 其他扩展
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents(
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>,
    ) {
      return action.payload;
    },
    // 切换选中组件
    changeSelectedId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      },
    ),
    // 添加组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>,
      ) => {
        const newComponent = action.payload;
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex((c) => c.fe_id === selectedId);
        if (index >= 0) {
          // 如果当前有选中组件，则添加到选中组件的后面
          componentList.splice(index + 1, 0, newComponent);
        } else {
          // 如果当前没有选中组件，则添加到组件列表末尾
          componentList.push(newComponent);
        }
        draft.selectedId = newComponent.fe_id;
      },
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = action.payload;
        // 当前需要修改的组件
        const curComponent = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComponent) {
          curComponent.props = {
            ...curComponent,
            ...newProps,
          };
        }
      },
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removedId, componentList = [] } = draft;
      draft.selectedId = getNextSelectedId(removedId, componentList);

      const index = componentList.findIndex((c) => c.fe_id === removedId);
      componentList.splice(index, 1);
    }),
    // 修改组件的隐藏/显示
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
      ) => {
        const { componentList = [] } = draft;
        const { fe_id, isHidden } = action.payload;
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
          if (isHidden) {
            // 隐藏组件，重新获取选中的组件
            draft.selectedId = getNextSelectedId(fe_id, componentList);
          } else {
            // 显示组件，选中要显示的组件
            draft.selectedId = fe_id;
          }
        }
      },
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
} = componentsSlice.actions;
export default componentsSlice.reducer;
