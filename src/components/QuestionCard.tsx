import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import styles from "./QuestionCard.module.scss";
import { useRequest } from "ahooks";
import { duplicateQuestionApi, updateQuestionApi } from "@/api/question";

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props;

  const [isStarState, setIsStarState] = useState(isStar);

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionApi(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("更新成功");
        // todo 重新执行列表请求
      },
    },
  );

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionApi(_id),
    {
      manual: true,
      onSuccess(res) {
        message.success("复制成功！");
        nav(`/question/edit/${res.id}`);
        // todo重新执行列表请求
      },
    },
  );

  const { loading: delLoading, run: fakeDel } = useRequest(
    async () => await updateQuestionApi(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功！");
        // todo重新执行列表请求
      },
    },
  );

  function del() {
    confirm({
      title: "确定要执行删除操作吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: fakeDel,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles["btn-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title="确定执行复制吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
              disabled={delLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
