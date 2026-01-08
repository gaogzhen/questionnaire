import { FC } from "react";
import { Typography, Radio, Space } from "antd";
import type {} from "antd";

import { QuestionRadioPropsType, QuestionRadioDefaultProps } from "./interface";

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const {
    title = "单选标题",
    isVertical = false,
    options = [],
    value = "",
  } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((option) => {
            const { value = "", label = "" } = option;
            return <Radio value={value}>{label}</Radio>;
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
