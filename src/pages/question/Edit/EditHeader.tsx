import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useKeyPress, useRequest, useDebounceEffect } from "ahooks";
import { Button, Typography, Space, Input, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";

import useGetPageInfo from "@/hooks/useGetPageInfo";
import { changePageTitle } from "@/store/pageInfoReducer";
import { updateQuestionApi } from "@/api/question";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import styles from "./EditHeader.module.scss";
import EditToolBar from "./EditToolBar";

const { Title } = Typography;

// 显示标题，可以修改
const TitleElem: FC = () => {
  const { title = "" } = useGetPageInfo();
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim();
    if (!newTitle) {
      return;
    }
    dispatch(changePageTitle(newTitle));
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleTitleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    );
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setEditState(true)}
      />
    </Space>
  );
};

// 修改按钮
const SaveButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();

  const { loading, run: updateQuestion } = useRequest(updateQuestionApi, {
    manual: true,
    onSuccess: () => {
      message.success("保存成功");
    },
  });
  function handleSave() {
    if (!id) {
      return;
    }
    updateQuestion(id, {
      ...pageInfo,
      componentList,
    });
  }

  // 快捷键保存
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) {
      handleSave();
    }
  });

  // 自动保存
  useDebounceEffect(
    () => {
      if (!loading) {
        handleSave();
      }
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    },
  );

  return (
    <Button
      onClick={handleSave}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};

// 发布按钮
const PublishButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();
  const nav = useNavigate();
  const { loading, run: publishQuestion } = useRequest(updateQuestionApi, {
    manual: true,
    onSuccess: () => {
      message.success("发布成功");
      // 跳转到统计页面
      if (id) {
        nav(`/question/stat/${id}`);
      }
    },
  });
  function handlePublish() {
    if (!id) {
      return;
    }
    publishQuestion(id, {
      ...pageInfo,
      componentList,
      isPublished: true, // 发布状态
    });
  }

  return (
    <Button
      onClick={handlePublish}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      发布
    </Button>
  );
};

// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["header"]}>
        <div className={styles["left"]}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles["main"]}>
          <EditToolBar />
        </div>
        <div className={styles["right"]}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
