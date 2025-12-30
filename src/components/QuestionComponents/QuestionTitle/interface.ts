// 定义问卷标题组件的属性类型
export type QuestionTitlePropsType = {
  text?: string; // 标题文本内容
  level?: 1 | 2 | 3 | 4 | 5; // 标题级别，对应不同字号
  isCenter?: boolean; // 是否居中显示
  onChange?: (newProps: QuestionTitlePropsType) => void;
  disabled?: boolean;
};

// 问卷标题组件的默认属性
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: "一行标题", // 默认标题文本
  level: 1, // 默认标题级别为1
  isCenter: false, // 默认不居中
};
