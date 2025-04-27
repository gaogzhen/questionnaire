import { FC, useState } from "react";
import { useRequest, useTitle } from "ahooks";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Spin,
} from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";
import styles from "./common.module.scss";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";
import { deleteQuestionsApi, recoverQuestionsApi } from "@/api/question";

const { Title } = Typography;
const { confirm } = Modal;

const List: FC = () => {
  useTitle("调查问卷-回收站");

  //问卷列表数据
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

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

  const { loading: recoverLoading, run: handleRecover } = useRequest(
    async () => await recoverQuestionsApi(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("恢复成功！");
        // todo 查询问卷列表
      },
    },
  );

  const { loading: delLoading, run: handleDel } = useRequest(
    async () => await deleteQuestionsApi(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功！");
        // todo 请求问卷列表
      },
    },
  );

  function del() {
    confirm({
      title: "您确定要删除吗？",
      okText: "确定",
      cancelText: "取消",
      content: "删除以后不可找回！",
      icon: <ExclamationCircleOutlined />,
      onOk: handleDel,
    });
  }

  const TableEle = (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0 || recoverLoading}
            onClick={handleRecover}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0 || delLoading}
            onClick={del}
          >
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={(q: any) => q._id}
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
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {TableEle}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default List;
