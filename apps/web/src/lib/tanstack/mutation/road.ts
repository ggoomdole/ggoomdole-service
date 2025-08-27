import { useRouter } from "next/navigation";

import { ROAD } from "@/constants/road";
import { checkRoadNameDuplicate, createMyRoad, updateRoad, uploadRoad } from "@/services/road";
import { revalidateTags } from "@/utils/revalidate";
import { successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

import { invalidateQueries } from "..";

export const useUploadRoad = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: uploadRoad,
    onSuccess: () => {
      successToast("순례길 생성이 완료되었어요.");
      invalidateQueries([ROAD.ALL_ROADS]);
      revalidateTags([ROAD.PARTICIPATIONS]);
      router.push("/courses");
    },
  });
};

export const useCheckRoadNameDuplicate = () => {
  return useMutation({
    mutationFn: checkRoadNameDuplicate,
  });
};

export const useUpdateRoad = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateRoad,
    onSuccess: () => {
      successToast("순례길 수정이 완료되었어요.");
      invalidateQueries([ROAD.ALL_ROADS]);
      revalidateTags([ROAD.PARTICIPATIONS]);
      router.back();
    },
  });
};

export const useCreateMyRoad = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createMyRoad,
    onSuccess: () => {
      successToast("커스텀 순례길 생성이 완료되었어요.");
      revalidateTags([ROAD.PARTICIPATIONS]);
      router.push("/mypage/courses");
    },
  });
};
