import { FC } from "react";
import { Typography } from "antd";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };

  const genFontSize = (level: number) => {
    if (level === 1) {
      return "24px";
    } else if (level === 2) {
      return "20px";
    } else if (level === 3) {
      return "16px";
    } else if (level === 4) {
      return "12px";
    } else {
      return "16px";
    }
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: "0",
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
