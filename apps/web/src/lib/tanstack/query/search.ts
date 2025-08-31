import { SEARCH } from "@/constants/search";
import { getRecentSearchWords, searchRoad } from "@/services/search";
import { useQuery } from "@tanstack/react-query";

export const useSearchRoad = (props: { word: string; sort: string }) => {
  return useQuery({
    queryKey: [SEARCH.ROAD, props.word, props.sort],
    queryFn: () => searchRoad(props),
  });
};

export const useGetRecentSearchWords = (isTokenExist: boolean) => {
  return useQuery({
    queryKey: [SEARCH.RECENT],
    queryFn: getRecentSearchWords,
    enabled: isTokenExist,
  });
};
