import { SEARCH } from "@/constants/search";
import { searchRoad } from "@/services/search";
import { useQuery } from "@tanstack/react-query";

export const useSearchRoad = (props: { word: string; sort: string }) => {
  return useQuery({
    queryKey: [SEARCH.ROAD, props.word, props.sort],
    queryFn: () => searchRoad(props),
  });
};
