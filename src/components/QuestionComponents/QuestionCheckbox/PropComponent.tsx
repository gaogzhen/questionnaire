import { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { OptionType, QuestionCheckboxPropsType } from "./interface";

const PropComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const { title, isVertical, list = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, isVertical, list]);

  function handleValuesChange() {
    if (onChange == null) {
      return;
    }
    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType;
    if (newValues.list) {
      newValues.list = newValues.list.filter((opt) => !(opt.text == null));
    }
    const { list = [] } = newValues;

    list.forEach((opt) => {
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
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
    >
      <Form.Item
        label="复选标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/**  遍历所有的选项（可删除） */}
              {fields.map((item, index) => {
                const { key, name } = item;

                return (
                  <Space key={key} align="baseline">
                    {/** 当前选项是否选中 */}
                    <Form.Item name={[name, "checked"]} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
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
                              return Promise.reject(
                                new Error("和其他选项重复!"),
                              );
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
                    {index >= 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}

              {/** 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: "", text: "", checked: false })}
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
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
