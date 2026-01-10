export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};
export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];
  // 用于PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: "复选",
  isVertical: false,
  list: [
    { value: "Dp_7_", text: "选项1", checked: false },
    { value: "s0iyj", text: "选项2", checked: false },
    { value: "9jVTJ", text: "选项3", checked: false },
  ],
};
