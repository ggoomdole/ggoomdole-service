import { createReview } from "@/services/review";
import { useMutation } from "@tanstack/react-query";

export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
