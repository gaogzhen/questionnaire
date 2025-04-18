import { FC } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

const { Title } = Typography;

const Logo: FC = () => (
  <div className={styles.container}>
    <Link to="/">
      <Space>
        <Title>
          <FormOutlined />
        </Title>
        <Title>调查问卷</Title>
      </Space>
    </Link>
  </div>
);

export default Logo;
