import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Typography, Spin, Empty } from "antd";

import QuestionCard from "@/components/QuestionCard";
import ListSearch from "@/components/ListSearch";
import styles from "./common.module.scss";
import { getQuestionListApi } from "@/api/question";
import { LIST_PAGE_SIZE_DEFAULT, LIST_SEARCH_PARAM_KEY } from "@/constant";

const { Title } = Typography;

const List: FC = () => {
  useTitle("调查问卷-我的问卷");

  //问卷列表数据
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]); // 全部列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0);

  const hasMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  // 搜索重置状态
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 加载数据
  const { run: loadData, loading } = useRequest(
    async () => {
      const data = await getQuestionListApi({
        page,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        const { list: newList = [], total = 0 } = res;
        // 累计数据
        setList(list.concat(newList));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );
  // 尝试触发加载-防抖处理
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) {
        return;
      }
      // 判断如果div bottom 小于等于页面的高度
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) {
        return;
      }
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        // 加载数据
        loadData();
        setStarted(true);
      }
    },
    { wait: 500 },
  );

  // 触发时机：页面加载或者url参数（keyword）变化时
  useEffect(() => {
    // 第一次加载，初始化
    tryLoadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 监听页面滚动事件
  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }

    return () => {
      // 解绑事件
      window.removeEventListener("scroll", tryLoadMore);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, hasMoreData]);

  // 加载更多显示优化
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) {
      return <Spin />;
    }
    if (total === 0) {
      return <Empty description="暂无数据" />;
    }
    if (!hasMoreData) {
      return <span>没有更多了……</span>;
    }
    return <span>开始加载下一页</span>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, loading, hasMoreData]);
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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
