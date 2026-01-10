import { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { OptionType, QuestionRadioPropsType } from "./interface";

const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, isVertical, value, options]);

  function handleValuesChange() {
    if (onChange == null) {
      return;
    }
    const newValues = form.getFieldsValue() as QuestionRadioPropsType;
    if (newValues.options) {
      newValues.options = newValues.options.filter(
        (opt) => !(opt.text == null),
      );
    }
    const { options = [] } = newValues;

    options.forEach((opt) => {
      if (opt.value) {
        return;
      }
      opt.value = nanoid(5);
    });

    onChange(newValues);
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
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/**  遍历所有的选项（可删除） */}
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  {/** 当前选项 输入框 */}
                  <Form.Item
                    name={[name, "text"]}
                    validateTrigger="onBlur"
                    rules={[
                      { required: true, message: "请输入选项" },
                      {
                        validator: (_, text) => {
                          // 如果文本为空，不进行重复检查
                          if (!text) {
                            return Promise.resolve();
                          }
                          // 获取所有选项
                          const { options = [] } = form.getFieldsValue();
                          // 统计当前文本出现的次数（排除当前正在编辑的选项）
                          let count = 0;
                          options.forEach((opt: OptionType, idx: number) => {
                            // 排除当前正在编辑的选项
                            if (idx !== name && opt.text === text) {
                              count++;
                            }
                          });

                          // 如果出现次数大于0，说明有重复
                          if (count > 0) {
                            return Promise.reject(new Error("和其他选项重复!"));
                          }

                          // 没有重复，验证通过
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="输入选项" />
                  </Form.Item>
                  {/** 当前选项 删除按钮 */}
                  {index >= 2 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}

              {/** 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: "", text: "" })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          options={options.map(({ text, value }) => ({
            value,
            label: text || "",
          }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
