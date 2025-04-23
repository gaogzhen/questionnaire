import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListApi } from "@/api/question";

import { LIST_SEARCH_PARAM_KEY } from "@/constant";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

/**
 * 获取问卷列表
 * @returns 问卷列表
 */
function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  async function load() {
    const data = await getQuestionListApi({ keyword, isStar, isDeleted });
    return data;
  }
  const { loading, data, error } = useRequest(load, {
    refreshDeps: [searchParams],
  });
  return { loading, data, error };
}

export default useLoadQuestionListData;
