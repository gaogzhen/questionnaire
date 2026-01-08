export type OptionType = {
  value: string;
  label: string;
};
export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;
  // 用于PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: "单选标题",
  isVertical: false,
  options: [
    { value: "item1", label: "选项1" },
    { value: "item2", label: "选项2" },
    { value: "item3", label: "选项3" },
  ],
  value: "",
};
