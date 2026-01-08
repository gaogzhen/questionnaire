import { FC } from "react";

import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from "./QuestionParagraph";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextareaConf, {
  QuestionTextareaPropsType,
} from "./QuestionTextarea";
import QuestionRadioConf, { QuestionRadioPropsType } from "./QuestionRadio";

// 各个组件属性类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType;

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
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: "titleGroup",
    groupName: "标题组件",
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: "inputGroup",
    groupName: "输入组件",
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: "selectGroup",
    groupName: "选择组件",
    components: [QuestionRadioConf],
  },
];

// 根据组件类型获取组件
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
