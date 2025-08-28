import { useRouter } from "next/navigation";

import { ROAD } from "@/constants/road";
import {
  checkRoadNameDuplicate,
  createMyRoad,
  participateRoad,
  removeRoad,
  updateRoad,
  uploadRoad,
} from "@/services/road";
import { revalidateTags } from "@/utils/revalidate";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

import { invalidateMany, invalidateQueries } from "..";

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

export const useParticipateRoad = () => {
  return useMutation({
    mutationFn: participateRoad,
    onSuccess: () => {
      successToast("순례길 참여가 완료되었어요.");
      invalidateQueries([ROAD.PARTICIPATIONS]);
    },
    onError: () => {
      errorToast("순례길 참여에 실패했어요.");
    },
  });
};

export const useRemoveRoad = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: removeRoad,
    onSuccess: () => {
      successToast("순례길 삭제가 완료되었어요.");
      invalidateMany([
        [ROAD.ALL_ROADS],
        [ROAD.DETAIL],
        [ROAD.MY_CUSTOM_ROADS],
        [ROAD.PARTICIPATIONS],
        [ROAD.RECOMMEND],
      ]);
      router.back();
    },
    onError: () => {
      errorToast("순례길 삭제에 실패했어요.");
    },
  });
};
