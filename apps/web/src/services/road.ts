import { BaseResponseDTO } from "@/models";
import { UploadRoadRequestDTO, UploadRoadResponseDTO } from "@/models/road";

import { clientApi } from "./api";

export const uploadRoad = async (props: {
  formData: FormData;
  body: UploadRoadRequestDTO;
}): Promise<BaseResponseDTO<UploadRoadResponseDTO>> => {
  return clientApi.post("road", props.body, { body: props.formData });
};

export const checkRoadNameDuplicate = async (title: string): Promise<BaseResponseDTO<boolean>> => {
  return clientApi.get(`road/name?title=${title}`);
};
