import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Space, Form, Input, Button, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";

import { LOGIN_PATHNAME } from "../router";
import { registerApi } from "@/api/user";

import styles from "./Register.module.scss";

const { Title } = Typography;

const Register: FC = () => {
  const nav = useNavigate();

  const { run: handleRegister } = useRequest(
    async (values) => {
      const { username, password, nickname } = values;
      return await registerApi(username, password, nickname);
    },
    {
      manual: true,
      onSuccess() {
        message.success("注册成功");
        // 跳转登录页
        nav(LOGIN_PATHNAME);
      },
    },
  );

  function onFinish(values: any) {
    handleRegister(values);
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "字符长度再5-20之间",
              },
              {
                pattern: /^\w+$/,
                message: "只能是字母数字下划线",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                min: 8,
                message: "密码长度最少8位",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "请输入确认密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("两次密码不一致"));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
