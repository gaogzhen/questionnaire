import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Logo from "../components/Logo";
import Userinfo from "../components/UserInfo";
import styles from "./MainLayout.module.scss";
import useLoadUserData from "@/hooks/useLoadUserData";
import useNavPage from "@/hooks/useNavPage";

const { Header, Content, Footer } = Layout;
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>
            <Userinfo />
          </div>
        </Header>
        <Layout className={styles.main}>
          <Content>{!waitingUserData && <Outlet />}</Content>
        </Layout>

        <Footer className={styles.footer}>
          调查问卷&copy;2025 - present. Created by gaogzhen
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
