import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Space, Form, Input, Button, Checkbox } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { REGISTER_PATHNAME } from "../router";

import styles from "./Register.module.scss";
import Password from "antd/es/input/Password";

const { Title } = Typography;

const USERNAME_KEY = "usename";
const PASSWORD_KEY = "password";

/**
 * 浏览器本地存储用户信息
 * @param username 用户名
 * @param password 密码
 */
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

/**
 * 浏览器本地删除用户信息
 * @param username 用户名
 * @param password 密码
 */
function deleteUserFromStorage(username: string, password: string) {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

/**
 * 浏览器本地获取用户信息
 */
function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  // 表单组件初始化
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onFinish(values: any) {
    // todo 注册api
    console.log(values);
    const { username, password, remember } = values || {};
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage(username, password);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
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
                pattern: /^\w$/,
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
            wrapperCol={{ offset: 6, span: 16 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
