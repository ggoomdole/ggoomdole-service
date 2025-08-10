import { SPOT } from "@/constants/spot";
import { useGeolocation } from "@/hooks/use-geolocation";
import { getNearbyTouristSpots } from "@/services/spot";
import { useQuery } from "@tanstack/react-query";

export const useGetNearbyTouristSpots = () => {
  const { latitude: userLat, longitude: userLon } = useGeolocation();

  return useQuery({
    queryKey: [SPOT.NEARBY_TOURIST_SPOTS],
    queryFn: () => getNearbyTouristSpots({ lat: userLat, lng: userLon }),
  });
};
