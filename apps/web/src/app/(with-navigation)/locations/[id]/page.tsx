import LocationsPage from "@/page/locations/[id]";

interface LocationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Locations({ params }: LocationPageProps) {
  const { id } = await params;

  return <LocationsPage id={id} />;
}
