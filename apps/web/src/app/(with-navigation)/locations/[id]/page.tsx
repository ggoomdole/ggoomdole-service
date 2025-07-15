import LocationsPage from "@/page/locations/[id]";

interface LocationPageProps {
  params: Promise<{
    id: string;
    tab: string;
  }>;
}

export default async function Locations({ params }: LocationPageProps) {
  return <LocationsPage {...await params} />;
}
