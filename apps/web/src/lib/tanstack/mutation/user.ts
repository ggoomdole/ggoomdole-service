import { uploadProfileImage } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
