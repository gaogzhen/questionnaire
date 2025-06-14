import { FC } from "react";
import { Typography, Input } from "antd";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
) => {
  const { text = "", placeholder = "" } = {
    ...QuestionInputDefaultProps,
    ...props,
  };

  return (
    <div>
      <Paragraph strong>{text}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
