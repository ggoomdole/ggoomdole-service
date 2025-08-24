import { useRouter } from "next/navigation";

import { checkRoadNameDuplicate, updateRoad, uploadRoad } from "@/services/road";
import { successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export const useUploadRoad = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: uploadRoad,
    onSuccess: () => {
      successToast("순례길 생성이 완료되었어요.");
      router.push("/courses");
    },
    onError: (error) => {
      console.error(error);
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
    onSuccess: (data) => {
      console.log("updateRoad data", data);
      successToast("순례길 수정이 완료되었어요.");
      router.back();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
