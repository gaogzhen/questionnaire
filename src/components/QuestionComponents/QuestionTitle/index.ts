/**
 * @description 问卷标题
 * @author gaogzhen
 */

import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "标题",
  type: "questionTitle",
  Component,
  defaultProps: QuestionTitleDefaultProps,
};
