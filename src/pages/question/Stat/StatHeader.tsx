import { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  Space,
  Button,
  Typography,
  Input,
  Tooltip,
  message,
  Popover,
} from "antd";
import { InputRef } from "antd";
import useGetPageInfo from "@/hooks/useGetPageInfo";

import styles from "./StatHeader.module.scss";
import {
  CopyOutlined,
  EditOutlined,
  LeftOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { title = "", isPublished } = useGetPageInfo();
  const { id } = useParams();

  const urlInputRef = useRef<InputRef>(null);
  /**
   * 拷贝链接 - 使用现代 Clipboard API
   */
  async function copy() {
    const ele = urlInputRef.current;
    if (ele == null) {
      return;
    }
    // 获取要复制的文本内容
    const textToCopy = ele.input?.value || "";
    try {
      // 使用现代的 Clipboard API 替代已弃用的 document.execCommand
      await navigator.clipboard.writeText(textToCopy);
      // 选中 input 文本以提供视觉反馈
      ele.select();
      message.success("拷贝成功");
    } catch (err) {
      // 如果 Clipboard API 不可用（如非 HTTPS 环境），降级到传统方法
      ele.select();
      document.execCommand("Copy");
      message.success("拷贝成功");
    }
  }

  /**
   * 获取链接和二维码元素
   */
  function getLinkAndQRCodeElem() {
    if (!isPublished) {
      return null;
    }
    // 拼接url，参考C端规则
    const url = `http://localhost:3000/question/${id}`;

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCodeSVG value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input
          ref={urlInputRef}
          value={url}
          style={{ width: "300px" }}
          className={styles["url-input"]}
        />
        <Tooltip title="拷贝链接">
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={copy}
          ></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["header"]}>
        <div className={styles["left"]}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles["main"]}>{getLinkAndQRCodeElem()}</div>
        <div className={styles["right"]}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => nav(`/question/edit/${id}`)}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
