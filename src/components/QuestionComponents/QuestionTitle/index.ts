/**
 * @description 问卷标题
 * @author gaogzhen
 */

// 引入问卷标题组件
import Component from "./Component";
// 引入问卷标题组件的默认属性
import { QuestionTitleDefaultProps } from "./interface";

// 导出问卷标题相关的类型和默认属性
export * from "./interface";

// 默认导出问卷标题组件的配置信息
export default {
  title: "标题", // 组件名称
  type: "questionTitle", // 组件类型标识
  Component, // 组件本体
  defaultProps: QuestionTitleDefaultProps, // 组件默认属性
};
