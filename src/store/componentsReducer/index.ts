import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { ComponentPropsType } from "@/components/QuestionComponents";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
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
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
} = componentsSlice.actions;
export default componentsSlice.reducer;
