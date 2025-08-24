import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO, UploadRoadRequestDTO, UploadRoadResponseDTO } from "@/models/road";
import { getParams } from "@/utils/params";

import { clientApi } from "./api";

export const uploadRoad = async (props: {
  formData: FormData;
  body: UploadRoadRequestDTO;
}): Promise<BaseResponseDTO<UploadRoadResponseDTO>> => {
  return clientApi.post("road", { data: JSON.stringify(props.body) }, { body: props.formData });
};

export const checkRoadNameDuplicate = async (title: string): Promise<BaseResponseDTO<boolean>> => {
  return clientApi.get(`road/name?title=${title}`);
};

export const getAllRoads = async (props: {
  categoryId: string;
  sortBy: string;
}): Promise<BaseResponseDTO<RoadResponseDTO[]>> => {
  const params = getParams(props);
  return clientApi.get(`road?${params}`);
};

export const updateRoad = async (props: {
  formData: FormData;
  body: UploadRoadRequestDTO;
  roadId: string;
}): Promise<BaseResponseDTO<unknown>> => {
  return clientApi.patch(
    `road/${props.roadId}`,
    { data: JSON.stringify(props.body) },
    { body: props.formData }
  );
};
