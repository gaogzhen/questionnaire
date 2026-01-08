/**
 * @description 问卷多行输入框
 * @author gaogzhen
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTextareaDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "多行输入框",
  type: "questionTextarea",
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
};
