import { configureStore } from "@reduxjs/toolkit";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";

export type StateType = {
  user: UserStateType;
  // components: ComponentsStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    // 组件列表 没有undo功能
    // components: componentsReducer,
    // 组件列表 有undo功能
    components: undoable(componentsReducer, {
      limit: 20, // 最多20个历史记录
      filter: excludeAction([
        "components/resetComponents",
        "components/changeSelectedId",
        "components/selectNextComponent",
        "components/selectPreviousComponent",
      ]),
    }),
    // 页面信息
    pageInfo: pageInfoReducer,
  },
});
