import { FC } from "react";
import { Typography } from "antd";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface"; // 引入类型和默认属性

const { Title } = Typography; // 从Typography中解构出Title组件

// 定义问卷标题组件
const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType, // 组件属性
) => {
  // 合并默认属性和传入属性
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };

  // 根据标题级别生成对应的字体大小
  const genFontSize = (level: number) => {
    if (level === 1) {
      return "24px"; // 1级标题字体大小
    } else if (level === 2) {
      return "20px"; // 2级标题字体大小
    } else if (level === 3) {
      return "16px"; // 3级标题字体大小
    } else if (level === 4) {
      return "12px"; // 4级标题字体大小
    } else {
      return "16px"; // 其他情况默认字体大小
    }
  };

  // 渲染标题组件
  return (
    <Title
      level={level} // 标题级别
      style={{
        textAlign: isCenter ? "center" : "start", // 是否居中
        marginBottom: "0", // 去除下边距
        fontSize: genFontSize(level), // 设置字体大小
      }}
    >
      {text} {/* 显示标题文本 */}
    </Title>
  );
};

export default QuestionTitle; // 导出组件
