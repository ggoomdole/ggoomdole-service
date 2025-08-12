import { checkNicknameDuplicate, signup, uploadProfileImage } from "@/services/user";
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

export const useCheckNicknameDuplicate = () => {
  return useMutation({
    mutationFn: checkNicknameDuplicate,
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
