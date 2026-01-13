import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionApi } from "@/api/question";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "@/store/componentsReducer";
import { resetPageInfo } from "@/store/pageInfoReducer";

/**
 * 获取带加载状态的问卷信息
 * @returns loading状态，问卷信息
 */
function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  // ajax 加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error("没有问卷 id");
      }
      const data = await getQuestionApi(id);
      return data;
    },
    {
      manual: true,
    },
  );

  // 根据获取的data，设置store
  useEffect(() => {
    if (!data) {
      return;
    }
    const {
      title = "",
      desc = "",
      js = "",
      css = "",
      componentList = [],
    } = data;

    // 获取默认的 selectedId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }

    // componentList 存入redux store
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null }),
    );
    // pageInfo 存入redux store
    dispatch(resetPageInfo({ title, desc, js, css }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // 根据id变化，加载问卷数据
  useEffect(() => {
    run(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { loading, error };
}

export default useLoadQuestionData;
