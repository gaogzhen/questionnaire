import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { useTitle } from "ahooks";
import { Typography } from "antd";

import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import styles from "./common.module.scss";

const { Title } = Typography;

const questions = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: false,
    answerCount: 0,
    createdAt: "3月10号 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: "2月10号 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: false,
    answerCount: 3,
    createdAt: "1月10号 13:23",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "5月13号 13:23",
  },
];

const List: FC = () => {
  useTitle("调查问卷-我的问卷");

  // const [searchParams] = useSearchParams();
  // console.log("keyword", searchParams.get("keyword"));

  //问卷列表数据
  const [questionList, updateQuestionList] = useImmer(questions);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>lodingMore 上划加载更多</div>
    </>
  );
};

export default List;
