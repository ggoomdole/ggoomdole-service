import { BaseResponseDTO } from "@/models";
import { SearchRoadResponseDTO } from "@/models/road";
import { getParams } from "@/utils/params";

import { clientApi } from "./api";

export const searchRoad = async (props: { word: string; sort: string }) => {
  const params = getParams(props);
  return clientApi.get<BaseResponseDTO<SearchRoadResponseDTO>>(`search/road?${params}`);
};
