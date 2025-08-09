import { useGeolocation } from "@/hooks/use-geolocation";
import { getNearbyTouristSpots } from "@/services/spot";
import { useQuery } from "@tanstack/react-query";

export const useGetNearbyTouristSpots = () => {
  const { latitude: userLat, longitude: userLon } = useGeolocation();

  return useQuery({
    queryKey: ["nearby-tourist-spots"],
    queryFn: () => getNearbyTouristSpots({ lat: userLat, lng: userLon }),
  });
};
