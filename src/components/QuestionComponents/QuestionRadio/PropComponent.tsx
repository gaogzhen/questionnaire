import { FC, useEffect } from "react";
import { Checkbox, Form, Input, Select } from "antd";

import { QuestionRadioPropsType } from "./interface";

const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const { title, isVertical, value, options, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, isVertical, value, options]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ title, isVertical, value, options }}
      disabled={disabled}
    >
      <Form.Item
        label="单选标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select options={options}></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
