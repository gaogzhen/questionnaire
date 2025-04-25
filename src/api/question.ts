import request, { ResDataType } from "../services/request";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

/**
 * 获取问卷信息
 * @param id 问卷id
 * @returns  问卷信息
 */
export async function getQuestionApi(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await request.get(url)) as ResDataType;
  return data;
}

/**
 * 新建问卷
 * @returns 问卷id
 */
export async function createQuestionApi(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await request.post(url)) as ResDataType;
  return data;
}

/**
 * 获取问卷列表
 * @param opt 请求参数
 * @returns 问卷列表数据
 */
export async function getQuestionListApi(
  opt: Partial<SearchOption>,
): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await request.get(url, { params: opt })) as ResDataType;
  return data;
}
