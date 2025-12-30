import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import clonedeep from "lodash.clonedeep";
import { nanoid } from "nanoid";

import { ComponentPropsType } from "@/components/QuestionComponents";
import { getNextSelectedId, insertNewComponent } from "./utils";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
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
        insertNewComponent(draft, newComponent);
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
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp == null) {
          return;
        }

        curComp.props = {
          ...curComp,
          ...newProps,
        };
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
        if (curComp == null) {
          return;
        }

        curComp.isHidden = isHidden;
        if (isHidden) {
          // 隐藏组件，重新获取选中的组件
          draft.selectedId = getNextSelectedId(fe_id, componentList);
        } else {
          // 显示组件，选中要显示的组件
          draft.selectedId = fe_id;
        }
      },
    ),
    // 切换组件锁定/解锁
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>,
      ) => {
        const { componentList = [] } = draft;
        const { fe_id } = action.payload;
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp == null) {
          return;
        }

        curComp.isLocked = !curComp.isLocked;
      },
    ),
    // 复制组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId } = draft;

      const curComp = componentList.find((c) => c.fe_id === selectedId);
      if (curComp == null) {
        return;
      }
      draft.copiedComponent = clonedeep(curComp);
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) {
        return;
      }
      copiedComponent.fe_id = nanoid();
      insertNewComponent(draft, copiedComponent);
    }),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
