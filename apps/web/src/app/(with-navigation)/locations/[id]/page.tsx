import LocationsPage from "@/page/locations/[id]";

interface LocationPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab: string;
  }>;
}

export default async function Locations({ params, searchParams }: LocationPageProps) {
  const { id } = await params;
  const { tab } = await searchParams;

  return <LocationsPage id={id} tab={tab} />;
}
