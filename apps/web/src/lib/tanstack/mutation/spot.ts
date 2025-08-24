import { requestSpot } from "@/services/spot";
import { useMutation } from "@tanstack/react-query";

export const useRequestSpot = () => {
  return useMutation({
    mutationFn: requestSpot,
  });
};
