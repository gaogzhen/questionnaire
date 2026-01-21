import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "antd";

import {
  LIST_PAGE_DEFAULT,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "@/constant/index";

type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const [current, setCurrent] = useState(LIST_PAGE_DEFAULT);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_DEFAULT);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const curPage =
      parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") ||
      LIST_PAGE_DEFAULT;
    const curPageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE_DEFAULT;

    setCurrent(curPage);
    setPageSize(curPageSize);
  }, [searchParams]);

  const { total } = props;

  // 当page pageSize改变时，跳转页面（改变url）
  const nav = useNavigate();
  const { pathname } = useLocation();

  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  );
};

export default ListPage;
