import { FC } from "react";
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from "./interface";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const QuestionInfo: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType,
) => {
  const { title, desc = "" } = { ...QuestionInfoDefaultProps, ...props };

  const descList = desc.split("\n");
  const descElement = descList.map((d, index) => (
    <span key={index}>
      {d}
      {index < descList.length - 1 && <br />}
    </span>
  ));

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }} level={1}>
        {title}
      </Title>
      <Paragraph>{descElement}</Paragraph>
    </div>
  );
};

export default QuestionInfo;
