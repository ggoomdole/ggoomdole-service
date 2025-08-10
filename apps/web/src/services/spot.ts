import { BaseResponseDTO } from "@/models";
import { NearbyTouristSpotResponseDTO } from "@/models/spot";
import { getParams } from "@/utils/params";

import { serverApi } from "./api";

export const getNearbyTouristSpots = async (props: {
  lat: number;
  lng: number;
}): Promise<BaseResponseDTO<NearbyTouristSpotResponseDTO[]>> => {
  const params = getParams(props);
  return serverApi.get<BaseResponseDTO<NearbyTouristSpotResponseDTO[]>>(`spot/dataSpot?${params}`);
};
