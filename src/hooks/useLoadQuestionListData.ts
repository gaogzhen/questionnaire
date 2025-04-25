import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListApi } from "@/api/question";

import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_DEFAULT,
} from "@/constant";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

/**
 * 获取问卷列表
 * @returns 问卷列表
 */
function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
  const page =
    parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || LIST_PAGE_DEFAULT;
  const pageSize =
    parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
    LIST_PAGE_SIZE_DEFAULT;

  async function load() {
    const data = await getQuestionListApi({
      keyword,
      isStar,
      isDeleted,
      page,
      pageSize,
    });
    return data;
  }
  const { loading, data, error } = useRequest(load, {
    refreshDeps: [searchParams],
  });
  return { loading, data, error };
}

export default useLoadQuestionListData;
