import { FC } from "react";

import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

// 各个组件属性类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

// 统一组件配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: "titleGroup",
    groupName: "标题组件",
    components: [QuestionTitleConf],
  },
  {
    groupId: "inputGroup",
    groupName: "输入组件",
    components: [QuestionInputConf],
  },
];

// 根据组件类型获取组件
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
