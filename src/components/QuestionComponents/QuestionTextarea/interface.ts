export type QuestionTextareaPropsType = {
  text?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionTextareaPropsType) => void;
  disabled?: boolean;
};

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  text: "多行输入框标题",
  placeholder: "请输入多行文本...",
};
