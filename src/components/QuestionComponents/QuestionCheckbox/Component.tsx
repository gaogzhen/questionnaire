import { FC } from "react";
import { Typography, Checkbox, Space } from "antd";
import type {} from "antd";

import {
  QuestionCheckboxPropsType,
  QuestionCheckboxDefaultProps,
} from "./interface";

const { Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const {
    title = "单选标题",
    isVertical = false,
    list = [],
  } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>

      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          // 使用 value 或 index 作为唯一 key
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
