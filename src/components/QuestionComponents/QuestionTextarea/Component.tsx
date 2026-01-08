import { FC } from "react";
import { Typography, Input } from "antd";
import {
  QuestionTextareaPropsType,
  QuestionTextareaDefaultProps,
} from "./interface";

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType,
) => {
  const { text = "", placeholder = "" } = {
    ...QuestionTextareaDefaultProps,
    ...props,
  };

  return (
    <div>
      <Paragraph strong>{text}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextarea;
