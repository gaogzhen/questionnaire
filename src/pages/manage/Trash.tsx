import { FC, useState } from "react";
import { useTitle } from "ahooks";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
} from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import styles from "./common.module.scss";

const { Title } = Typography;
const { confirm } = Modal;

const questions = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 0,
    createdAt: "3月10号 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: false,
    answerCount: 3,
    createdAt: "2月10号 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: true,
    answerCount: 3,
    createdAt: "1月10号 13:23",
  },
];

const List: FC = () => {
  useTitle("调查问卷-回收站");

  // const [searchParams] = useSearchParams();
  // console.log("keyword", searchParams.get("keyword"));

  //问卷列表数据
  const [questionList, updateQuestionList] = useState(questions);
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];

  // 选择ids集合
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function del() {
    confirm({
      title: "您确定要删除吗？",
      okText: "确定",
      cancelText: "取消",
      content: "删除以后不可找回！",
      icon: <ExclamationCircleOutlined />,
      onOk: () => message.success("删除成功"),
    });
  }

  const TableEle = (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={columns}
        pagination={false}
        rowKey={(r) => r._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectRowKeys) => {
            setSelectedIds(selectRowKeys as string[]);
          },
        }}
      ></Table>
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {TableEle}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default List;
