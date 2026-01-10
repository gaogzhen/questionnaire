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
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((option, index) => {
            const { value = "", text = "" } = option;
            // 使用 value 或 index 作为唯一 key
            return (
              <Radio key={value || index} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
