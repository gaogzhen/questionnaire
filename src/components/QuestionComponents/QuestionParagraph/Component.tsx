import { FC } from "react";
import { Typography } from "antd";

import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";

const { Paragraph } = Typography;
const QuestionParagraph: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text = "", isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  };

  const textList = text.split("\n");
  const textElement = textList.map((t, index) => (
    <span key={index}>
      {t}
      {index < textList.length - 1 && <br />}
    </span>
  ));

  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0" }}
    >
      {textElement}
    </Paragraph>
  );
};

export default QuestionParagraph;
