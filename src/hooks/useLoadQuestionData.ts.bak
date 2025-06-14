import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionApi } from "@/api/question";

/**
 * 获取带加载状态的问卷信息
 * @returns loading状态，问卷信息
 */
function useLoadQuestionData() {
  const { id = "" } = useParams();

  async function load() {
    const data = await getQuestionApi(id);
    return data;
  }
  const { loading, data, error } = useRequest(load);
  return { loading, data, error };
}

export default useLoadQuestionData;
