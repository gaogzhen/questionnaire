import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from "./Home.module.scss";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();

  // function clickHandler() {
  //   nav({
  //     pathname: LOGIN_PATHNAME,
  //     search: "a=20",
  //   });
  // }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>调查问卷 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到问卷 980 份
        </Paragraph>
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Home;
